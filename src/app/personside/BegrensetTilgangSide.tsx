import * as React from 'react';
import { BegrensetTilgang, BegrensetTilgangTyper } from '../../models/person/person';
import { Periode } from '../../models/periode';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import VisPeriode from '../../components/person/VisPeriode';
import { Sikkerhetstiltak } from '../../models/sikkerhetstiltak';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

interface BegrensetTilgangProps {
    person: BegrensetTilgang;
}

function BegrensetTilgangSide({ person }: BegrensetTilgangProps) {
    const erEgenAnsatt = BegrensetTilgangTyper[person.begrunnelse] === BegrensetTilgangTyper.EgenAnsatt;
    return (
        <FillCenterAndFadeIn>
            <AlertStripe type="advarsel">
                <BegrensetTilgangBegrunnelse begrunnelseType={person.begrunnelse} />
                {visSikkerhetstiltak(person.sikkerhetstiltak, erEgenAnsatt)}
            </AlertStripe>
        </FillCenterAndFadeIn>
    );
}

function visSikkerhetstiltak(sikkerhetstiltak?: Sikkerhetstiltak, erEgenAnsatt?: boolean) {
    if (!sikkerhetstiltak) {
        return null;
    }
    if (erEgenAnsatt) {
        return (
            <>
                <Undertittel>Egen ansatt</Undertittel>
            </>
        );
    }
    return (
        <>
            <Undertittel>Sikkerhetstiltak</Undertittel>
            {hentPeriode(sikkerhetstiltak.periode)}
            <Normaltekst>{sikkerhetstiltak.sikkerhetstiltaksbeskrivelse}</Normaltekst>
        </>
    );
}

function hentPeriode(periode?: Periode) {
    if (periode != null) {
        return <VisPeriode periode={periode} />;
    }
    return null;
}

export default BegrensetTilgangSide;
