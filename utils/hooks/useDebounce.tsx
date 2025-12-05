import { useState, useEffect } from "react";



export default function useDebounce<T>(value: T, delay: number = 1000) {

    const [debounce, setDebounce] = useState(value);


    useEffect(() => {

        const id = setTimeout(() => { setDebounce(value) }, delay)

        return () => clearTimeout(id)
    }, [value, delay])


    return debounce;
}