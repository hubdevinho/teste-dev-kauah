export default function EnderecoTable({ enderecos, onVisualisar, onEditar, onExcluir }) {
    return (
        <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm shadow">
        <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
            <th className="px-4 py-3">CEP</th>
            <th className="px-4 py-3">Logradouro</th>
            <th className="px-4 py-3">Cidade</th>
            <th className="px-4 py-3">UF</th>
            <th className="px-4 py-3 text-right">Ações</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {enderecos.map((endereco) => (
            <tr key={endereco.id}>
                <td className="px-4 py-3">{endereco.cep}</td>
                <td className="px-4 py-3">{endereco.logradouro}{endereco.numero ? `, ${endereco.numero}` : ''}</td>
                <td className="px-4 py-3">{endereco.cidade}</td>
                <td className="px-4 py-3">{endereco.estado}</td>
                <td className="px-4 py-3 text-right">
                <button onClick={() => onVisualizar(endereco)} className="mr-3 text-gray-500 hover:underline">Ver</button>
                <button onClick={() => onEditar(endereco)} className="mr-3 text-blue-600 hover:underline">Editar</button>
                <button onClick={() => onExcluir(endereco)} className="text-red-600 hover:underline">Excluir</button>
                </td>
            </tr>
            ))}
            {enderecos.length === 0 && (
            <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Nenhum endereço encontrado.</td></tr>
            )}
        </tbody>
        </table>
    )
}