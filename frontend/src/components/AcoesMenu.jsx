import { useEffect, useRef, useState } from 'react'

export default function AcoesMenu({ onVer, onEditar, onExcluir }) {
  const [aberto, setAberto] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!aberto) return

    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setAberto(false)
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setAberto(false)
    }

    document.addEventListener('mousedown', handleClickFora)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickFora)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [aberto])

  function acionar(fn) {
    setAberto(false)
    fn()
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label="Ações"
        aria-haspopup="menu"
        aria-expanded={aberto}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-blue-50 hover:text-blue-700"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {aberto && (
        <div role="menu" className="absolute right-0 z-10 mt-1 w-32 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
          <button role="menuitem" onClick={() => acionar(onVer)} className="block w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-blue-50">
            Ver
          </button>
          <button role="menuitem" onClick={() => acionar(onEditar)} className="block w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-blue-50">
            Editar
          </button>
          <button role="menuitem" onClick={() => acionar(onExcluir)} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
            Excluir
          </button>
        </div>
      )}
    </div>
  )
}
