import AcoesMenu from './AcoesMenu'

export default function EnderecoTable({ enderecos, onVisualizar, onEditar, onExcluir }) {
  return (
    <table className="w-full border-collapse rounded-lg bg-white text-sm shadow">
      <thead className="bg-blue-50 text-blue-900">
        <tr>
          <th className="px-4 py-3 text-center font-semibold">CEP</th>
          <th className="px-4 py-3 text-center font-semibold">Logradouro</th>
          <th className="px-4 py-3 text-center font-semibold">Cidade</th>
          <th className="px-4 py-3 text-center font-semibold">UF</th>
          <th className="px-4 py-3 text-center font-semibold">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {enderecos.map((endereco) => (
          <tr key={endereco.id} className="hover:bg-blue-50/50">
            <td className="px-4 py-3 text-center">{endereco.cep}</td>
            <td className="px-4 py-3 text-center">
              {endereco.logradouro}
              {endereco.numero ? `, ${endereco.numero}` : ''}
            </td>
            <td className="px-4 py-3 text-center">{endereco.cidade}</td>
            <td className="px-4 py-3 text-center">
              <span className="inline-flex rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                {endereco.estado}
              </span>
            </td>
            <td className="px-4 py-3 text-center">
              <AcoesMenu
                onVer={() => onVisualizar(endereco)}
                onEditar={() => onEditar(endereco)}
                onExcluir={() => onExcluir(endereco)}
              />
            </td>
          </tr>
        ))}
        {enderecos.length === 0 && (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
              Nenhum endereço encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
