import { useState } from 'react'
import EnderecoTable from './components/EnderecoTable'
import EnderecoFormModal from './components/EnderecoFormModal'
import ConfirmDialog from './components/ConfirmDialog'
import Pagination from './components/Pagination'
import { useEnderecos } from './hooks/useEnderecos'
import { useDebouncedValue } from './hooks/useDebouncedValue'

export default function App() {
  const [buscaDigitada, setBuscaDigitada] = useState('')
  const [pagina, setPagina] = useState(1)
  const busca = useDebouncedValue(buscaDigitada, 300)

  const { enderecos, meta, carregando, erro, salvar, remover } = useEnderecos({ busca, pagina })

  const [modal, setModal] = useState(null)
  const [errosValidacao, setErrosValidacao] = useState(null)
  const [paraExcluir, setParaExcluir] = useState(null)

  async function handleSalvar(dados) {
    setErrosValidacao(null)
    try {
      await salvar(dados, modal.modo === 'editar' ? modal.endereco : null)
      setModal(null)
    } catch (erroRequisicao) {
      if (erroRequisicao.response?.status === 422) {
        setErrosValidacao(erroRequisicao.response.data.errors)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">Endereços</h1>
          <button
            onClick={() => { setErrosValidacao(null); setModal({ modo: 'criar', endereco: null }) }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Novo endereço
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar por logradouro, bairro, cidade ou CEP..."
          value={buscaDigitada}
          onChange={(e) => { setBuscaDigitada(e.target.value); setPagina(1) }}
          className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        {erro && <p className="mb-4 text-sm text-red-600">{erro}</p>}

        {carregando ? (
          <p className="text-gray-500">Carregando...</p>
        ) : (
          <EnderecoTable
            enderecos={enderecos}
            onVisualizar={(endereco) => setModal({ modo: 'ver', endereco })}
            onEditar={(endereco) => { setErrosValidacao(null); setModal({ modo: 'editar', endereco }) }}
            onExcluir={(endereco) => setParaExcluir(endereco)}
          />
        )}

        <Pagination meta={meta} pagina={pagina} onMudarPagina={setPagina} />
      </div>

      <EnderecoFormModal
        aberto={modal !== null}
        endereco={modal?.endereco}
        somenteLeitura={modal?.modo === 'ver'}
        erros={errosValidacao}
        onSalvar={handleSalvar}
        onFechar={() => setModal(null)}
      />

      <ConfirmDialog
        aberto={paraExcluir !== null}
        titulo="Excluir endereço"
        mensagem={`Tem certeza que deseja excluir o endereço em ${paraExcluir?.logradouro}?`}
        onConfirmar={() => { remover(paraExcluir); setParaExcluir(null) }}
        onCancelar={() => setParaExcluir(null)}
      />
    </div>
  )
}
