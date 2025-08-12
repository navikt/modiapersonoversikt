import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
    tema: string;
    valgt: boolean;
    onChange: (value: string) => void;
}

function TemaListeElement({ tema, valgt, onChange }: Props) {
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputRef.current && valgt) {
            inputRef.current.focus();
        }
    }, [valgt]);

    return (
        <div
            id={tema.replace(/\s+/g, '')}
            className={twMerge(
                'cursor-pointer list-none m-1 p-1.5 rounded-sm hover:bg-ax-bg-accent-moderate-hover focus-visible:outline-2 focus:outline-0 focus-visible:outline-ax-border-accent-strong',
                valgt && 'bg-ax-bg-accent-moderate-pressed'
            )}
            ref={inputRef}
            // biome-ignore lint/a11y/useSemanticElements: <Custom tabindex og tastaturnavigasjon gir bedre ux enn select/option>
            role="option"
            aria-selected={valgt}
            tabIndex={-1}
            onClick={() => {
                onChange(tema);
            }}
            onKeyDown={() => {}}
        >
            <span>{tema}</span>
        </div>
    );
}

export default TemaListeElement;
