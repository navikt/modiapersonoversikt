import * as React from 'react';
import { SladdeComponentProps } from './Sladdevalg';
import { feilmelding } from '../../oppgave/validering';
import { Select } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

function SladdTradMedArsak(props: SladdeComponentProps) {
    const { formstate } = props;
    return (
        <>
            <div>
                <AlertStripeAdvarsel className="blokk-xxs">
                    Sak om feilregistrering/sladding må meldes i{' '}
                    <a
                        href="https://jira.adeo.no/plugins/servlet/desk/portal/541/create/1481"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        porten
                    </a>
                    .
                </AlertStripeAdvarsel>
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
