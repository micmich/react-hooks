import { useState, useEffect } from "react";

export default function useLocalStorage({storageName, initialValue = ''}) {

    const [currentValue, setValue] = useState(() => { 
        return window.localStorage.getItem(storageName) || initialValue;
    });

    useEffect(() => {
        window.localStorage.setItem(storageName, [currentValue]);
    }, [storageName, currentValue])

    return [currentValue, setValue];
}