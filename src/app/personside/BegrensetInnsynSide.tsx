import * as React from 'react';
import { BegrensetInnsyn } from '../../models/person/person';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import { Periode } from '../../models/periode';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import VisPeriode from '../../components/person/VisPeriode';
import { Sikkerhetstiltak } from '../../models/sikkerhetstiltak';
import BegrensetInnsynBegrunnelse from '../../components/person/BegrensetInnsynBegrunnelse';

interface BegrensetInnsynProps {
    person: BegrensetInnsyn;
}

function BegrensetInnsynSide({person}: BegrensetInnsynProps) {
    return (
        <FillCenterAndFadeIn>
            <AlertStripe type="advarsel">
                <h3>Begrenset innsyn</h3>
                <BegrensetInnsynBegrunnelse begrunnelseType={person.begrunnelse}/>
                <h4>Sikkerhetstiltak</h4>
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

export default BegrensetInnsynSide;