import { useEffect } from "react";

export default function ConfirmDialog({ aberto, titulo, mensagem, onConfirmar, onCancelar }) {
    useEffect(() => {
        if (!aberto) return

        function handleEsc(e) {
            if (e.key === 'Escape') onCancelar()
        }
        document.addEventListener('keydown', handleEsc)

        return () => document.removeEventListener('keydown', handleEsc)
    }, [aberto, onCancelar])

    if (!aberto) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={(e) => e.target === e.currentTarget && onCancelar()}>
        <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">{titulo}</h2>
            <p className="mt-2 text-sm text-gray-600">{mensagem}</p>
            <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onCancelar} className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Cancelar</button>
            <button type="button" onClick={onConfirmar} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Excluir</button>
            </div>
        </div>
        </div>
    )
}