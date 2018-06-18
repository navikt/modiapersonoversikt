import * as React from 'react';
import { BegrensetTilgang } from '../../models/person/person';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import { Periode } from '../../models/periode';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import VisPeriode from '../../components/person/VisPeriode';
import { Sikkerhetstiltak } from '../../models/sikkerhetstiltak';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

interface BegrensetTilgangProps {
    person: BegrensetTilgang;
}

function BegrensetTilgangSide({person}: BegrensetTilgangProps) {
    return (
        <FillCenterAndFadeIn>
            <AlertStripe type="advarsel">
                <BegrensetTilgangBegrunnelse begrunnelseType={person.begrunnelse}/>
                {visSikkerhetstiltak(person.sikkerhetstiltak)}
            </AlertStripe>
        </FillCenterAndFadeIn>
    );
}

function visSikkerhetstiltak(sikkerhetstiltak?: Sikkerhetstiltak) {
    if (sikkerhetstiltak == null) {
        return null;
    }
    return (
        <>
            <Undertittel>Sikkerhetstiltak</Undertittel>
            {hentPeriode(sikkerhetstiltak.periode)}
            <Undertekst>{sikkerhetstiltak.sikkerhetstiltaksbeskrivelse}</Undertekst>
        </>
    );
}

function hentPeriode(periode?: Periode) {
    if (periode != null) {
        return (
            <VisPeriode periode={periode}/>
        );
    }
    return null;
}

export default BegrensetTilgangSide;