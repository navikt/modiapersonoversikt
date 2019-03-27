import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Arbeidsforhold } from '../../../../../../models/ytelse/sykepenger';
import ArbeidsForholdListeElement from './ArbeidsForholdListeElement';
import DetaljerCollapse from '../../../../../../components/DetaljerCollapse';
import { useState } from 'react';

interface Props {
    arbeidsforhold?: Arbeidsforhold[];
}

function ArbeidsForholdListe({ arbeidsforhold }: Props) {
    const [open, setOpen] = useState(false);
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return <AlertStripeInfo>Kunne ikke finne noen arbeidsforhold</AlertStripeInfo>;
    }

    if (arbeidsforhold.length === 1) {
        return <ArbeidsForholdListeElement arbeidsforhold={arbeidsforhold[0]} />;
    }

    const [førsteArbForhold, ...resten] = arbeidsforhold;
    return (
        <ol>
            <li>
                <ArbeidsForholdListeElement arbeidsforhold={førsteArbForhold} />
            </li>
            <DetaljerCollapse open={open} toggle={() => setOpen(!open)} tittel="Vis alle arbeidsforhold">
                {resten.map(element => (
                    <li>
                        <ArbeidsForholdListeElement arbeidsforhold={element} />
                    </li>
                ))}
            </DetaljerCollapse>
        </ol>
    );
}

export default ArbeidsForholdListe;
