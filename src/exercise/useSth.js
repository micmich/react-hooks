import { useState, useEffect } from "react";

export default function useLocalStorage({storageName, initialValue = ''}) {

    const [currentValue, setValue] = useState(() => { 
        const stored = window.localStorage.getItem(storageName);
        if (!stored) {
            return initialValue;
        }
        return JSON.parse(stored);
    });

    useEffect(() => {
        window.localStorage.setItem(storageName, JSON.stringify(currentValue));
    }, [storageName, currentValue])

    return [currentValue, setValue];
}