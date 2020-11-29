import { useState, useEffect } from 'react';

import { DEBOUNCE_DELAY } from "utils/constants.js"


export default function DebounceInput(input) {
    const [debouncedInput, setDebouncedInput] = useState(input);

    useEffect(() => {
        // wait to actually run the setter
        const handler = setTimeout(() => {
            setDebouncedInput(input);
        }, DEBOUNCE_DELAY);

        // when input changes, clearTimeout and then start it over
        return () => {
            clearTimeout(handler);
        };
    }, [input]);

    return debouncedInput;
}