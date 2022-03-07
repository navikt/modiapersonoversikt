import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';
import HeartIkon from '../../../../../svg/Heart';
import { Sivilstand as SivilstandInterface, SivilstandType } from '../../PersondataDomain';
import { erPartner, hentAlderEllerDod, hentNavn } from '../../visittkort-utils';
import Diskresjonskode from './common/Diskresjonskode';
import { formaterDato } from '../../../../../utils/string-utils';

interface Props {
    sivilstandListe: SivilstandInterface[];
}

function Sivilstand(props: { sivilstand: SivilstandInterface }) {
    if (props.sivilstand.type.kode === SivilstandType.UGIFT) {
        return <>{props.sivilstand.type.beskrivelse}</>;
    }
    const relasjonFraOgMed = props.sivilstand.gyldigFraOgMed
        ? `(${formaterDato(props.sivilstand.gyldigFraOgMed)})`
        : null;

    return (
        <>
            {props.sivilstand.type.beskrivelse} {relasjonFraOgMed}
        </>
    );
}

function Partner(props: { partner: SivilstandInterface }) {
    const partnerRelasjon = props.partner.sivilstandRelasjon;
    if (!partnerRelasjon) {
        return null;
    }
    const navn = partnerRelasjon.navn.firstOrNull();
    return (
        <>
            <Normaltekst>
                <Sivilstand sivilstand={props.partner} />
            </Normaltekst>
            <Diskresjonskode adressebeskyttelse={partnerRelasjon.adressebeskyttelse} />
            <Normaltekst>
                {navn && hentNavn(navn)} ({hentAlderEllerDod(partnerRelasjon)})
            </Normaltekst>
            <Normaltekst>{partnerRelasjon.fnr}</Normaltekst>
            <Normaltekst>
                {partnerRelasjon.harSammeAdresse ? <>Bor med bruker</> : <>Bor ikke med bruker</>}
            </Normaltekst>
        </>
    );
}

function SivilstandWrapper({ sivilstandListe }: Props) {
    const sivilstand = sivilstandListe.firstOrNull();

    if (!sivilstand) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Sivilstand" ikon={<HeartIkon />}>
            {erPartner(sivilstand) ? (
                <Partner partner={sivilstand} />
            ) : (
                <Normaltekst>
                    <Sivilstand sivilstand={sivilstand} />
                </Normaltekst>
            )}
        </VisittkortElement>
    );
}

export default SivilstandWrapper;
