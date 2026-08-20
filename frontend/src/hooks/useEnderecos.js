import { useCallback, useEffect, useState } from "react";
import { listEnderecos, createEndereco, updateEndereco, deleteEndereco } from '../api/enderecos';

export function useEnderecos({ busca, pagina }) {
    const [enderecos, setEnderecos] = useState([])
    const [meta, setMeta] = useState(null)
    const [carregando, setCarregando] = useState([])
    const [erro, setErro] = useState(null)

    const carregar = useCallback(async () => {
        setCarregando(true)
        setErro(null)

        try {
            const resposta = await listEnderecos({ busca, page: pagina})
        
            setEnderecos(resposta.data)
            setMeta(resposta.meta)
        } catch {
            setErro('Não foi possível carregar os endereços.')
        } finally {
            setCarregando(false)
        }
    }, [busca, pagina])

    useEffect(() => {
        carregar()
    }, [carregar])

    async function salvar(dados, enderecoEmEdicao) {
        if (enderecoEmEdicao) {
            await updateEndereco(enderecoEmEdicao.id, dados)
        } else {
            await createEndereco(dados)
        }

        await carregar()
    }

    async function remover(endereco) {
        setEnderecos((atual) => atual.filter((e) => e.id !== endereco.id))

        try {
            await deleteEndereco(endereco.id)
        } finally {
            await carregar()
        }
    }

    return { enderecos, meta, carregando, erro, salvar, remover }
}