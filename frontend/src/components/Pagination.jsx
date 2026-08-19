export default function Pagination({ meta, pagina, onMundarPagina }) {
    if (!meta || meta.last_page <= 1) return null

    return (
        <div className="mt-4 flex justify-center gap-2">
            <button 
                disabled={pagina <= 1} 
                onClick={() => onMundarPagina(pagina - 1)} 
                className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
                Anterior
            </button>

            <span className="px-2 py-1 text-sm text-gray-600">
                Página {meta.current_page} de {meta.last_page}
            </span>

            <button 
                disabled={pagina >= meta.last_page} 
                onClick={() => onMudarPagina(pagina + 1)} 
                className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
                Próxima
            </button>
        </div>
    )
}