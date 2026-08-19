import { useEffect, useRef, useState } from 'react'

const ENDERECO_VAZIO = { 
    cep: '', 
    logradouro: '', 
    numero: '', 
    complemento: '', 
    bairro: '', 
    cidade: '', 
    estado: '' 
}

const CAMPOS    = [
    { nome: 'cep', label: 'CEP' },
    { nome: 'logradouro', label: 'Logradouro' },
    { nome: 'numero', label: 'Número' },
    { nome: 'complemento', label: 'Complemento' },
    { nome: 'bairro', label: 'Bairro' },
    { nome: 'cidade', label: 'Cidade' },
    { nome: 'estado', label: 'UF' },
]

export default function EnderecoFormModal({ aberto, endereco, somenteLeitura, erros, onSalvar, onFechar }) {
    const [dados, setDados] = useState(ENDERECO_VAZIO)
    const [salvando, setSalvando] = useState(false)
    const primeiroCampoRef = useRef(null)

    useEffect(() => {
        setDados(endereco ?? ENDERECO_VAZIO)
        setSalvando(false)
    }, [endereco, aberto])

    useEffect(() => {
        if (!aberto) return 
        primeiroCampoRef.current?.focus()

        function handleEsc(e) {
            if (e.key === 'Escape') onFechar()
        }
        
        document.addEventListener('keydown', handleEsc)

        return () => document.removeEventListener('keydown', handleEsc)
    }, [aberto, onFechar])

    if (!aberto) return null

    function handleChange(campo, valor) {
        setDados((atual) => ({ ...atual, [campo]: valor }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setSalvando(true)
        await onSalvar(dados)
        setSalvando(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={(e) => e.target === e.currentTarget && onFechar()}>
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
            {somenteLeitura ? 'Endereço' : endereco ? 'Editar endereço' : 'Novo endereço'}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4">
            {CAMPOS.map(({ nome, label }, indice) => (
                <div key={nome} className={nome === 'logradouro' ? 'col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                    ref={indice === 0 ? primeiroCampoRef : undefined}
                    type="text"
                    value={dados[nome] ?? ''}
                    disabled={somenteLeitura || salvando}
                    onChange={(e) => handleChange(nome, e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100"
                />
                {erros?.[nome] && <p className="mt-1 text-xs text-red-600">{erros[nome][0]}</p>}
                </div>
            ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onFechar} className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                {somenteLeitura ? 'Fechar' : 'Cancelar'}
            </button>
            {!somenteLeitura && (
                <button type="submit" disabled={salvando} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
                {salvando ? 'Salvando...' : 'Salvar'}
                </button>
            )}
            </div>
        </form>
        </div>
    )
}
