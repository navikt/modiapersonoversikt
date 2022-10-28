import * as React from 'react';
import { SladdeComponentProps } from './Sladdevalg';
import { feilmeldingReactHookForm } from '../../oppgave/validering';
import { Select } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import MeldIPortenAdvarsel from './MeldIPortenAdvarsel';

function SladdTradMedArsak({ arsaker, formState, getNativeProps }: SladdeComponentProps) {
    const { ref, ...other } = getNativeProps('arsak');
    return (
        <>
            <div>
                <MeldIPortenAdvarsel />
                <Select
                    aria-label="Årsak"
                    selectRef={ref as any}
                    {...other}
                    feil={feilmeldingReactHookForm('arsak', formState)}
                    className="blokk-xs"
                >
                    <option value="" disabled selected>
                        Velg årsak
                    </option>
                    {arsaker.map((it) => (
                        <option value={it} key={it}>
                            {it}
                        </option>
                    ))}
                </Select>
            </div>
            <Hovedknapp>Send til sladding</Hovedknapp>
        </>
    );
}

export default SladdTradMedArsak;
