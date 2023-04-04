import { HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";



export const useKeydownOnTextArea = <T extends HTMLElement = HTMLTextAreaElement>() => {
    const ref = useRef<T>(null);
    const [code, setCode] = useState<string>('');


    useEffect(() => {
        if(!ref || !ref.current) {
            return;
        }

        const handleKeyDown =  (event: KeyboardEvent) => {
            setCode(event.code)
        }

        ref.current.addEventListener("keydown", handleKeyDown);

        return () => {
            ref.current?.removeEventListener("keydown",handleKeyDown);
        }
    }, []);
    return {code, ref}
}