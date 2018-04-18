import * as React from 'react';

interface Props {
    statsborgerskap?: string;
}

export function Statsborgerskap({statsborgerskap}: Props) {
    if (!statsborgerskap) {
        return (
            <>Ingen statsborgerskap registrert i NAV</>
        );
    }
    return (
        <>{statsborgerskap}</>
    );
}