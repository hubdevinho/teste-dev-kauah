import { useEffect, useState } from "react";

export function useDebouncedValue(valor, atrasoMs = 300) {
    const [valorAtrasado, setValorAtrasado] = useState(valor)

    useEffect(() => {
        const temporizador = setTimeout(() => setValorAtrasado(valor), atrasoMs)
        return () => clearTimeout(temporizador)
    }, [valor, atrasoMs])

    return valorAtrasado
}