import * as React from 'react';
import { SladdeComponentProps } from './Sladdevalg';
import { feilmelding } from '../../oppgave/validering';
import { Select } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import MeldIPortenAdvarsel from './MeldIPortenAdvarsel';

function SladdTradMedArsak(props: SladdeComponentProps) {
    const { formstate } = props;
    return (
        <>
            <div>
                <MeldIPortenAdvarsel />
                <Select
                    aria-label="Årsak"
                    {...formstate.fields.arsak.input}
                    feil={feilmelding(formstate.fields.arsak)}
                    className="blokk-xs"
                >
                    <option value="" disabled selected>
                        Velg årsak
                    </option>
                    {props.arsaker.map((it) => (
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
