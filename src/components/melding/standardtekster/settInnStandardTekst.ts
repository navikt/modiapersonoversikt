import type { ChangeEvent, RefObject } from 'react';

export const settInnStandardTekst = (
    standardTekst: string,
    textAreaRef: RefObject<HTMLTextAreaElement | null>,
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
) => {
    if (!textAreaRef.current) return;
    textAreaRef.current.value =
        !textAreaRef.current.value || textAreaRef.current.value === ''
            ? standardTekst
            : `${textAreaRef.current.value}\n${standardTekst}`;

    const syntheticEvent = {
        target: textAreaRef.current,
        currentTarget: textAreaRef.current
    } as ChangeEvent<HTMLTextAreaElement>;

    onChange?.(syntheticEvent);
};
