import * as React from 'react';

interface Props {
    statsborgerskap?: string;
}

export function Statsborgerskap({ statsborgerskap }: Props) {
    if (!statsborgerskap) {
        return (
            <li title="Statsborgerskap">
                Ingen statsborgerskap registrert i NAV
            </li>
        );
    }
    return (
        <li title="Statsborgerskap">
            {statsborgerskap}
        </li>
    );
}