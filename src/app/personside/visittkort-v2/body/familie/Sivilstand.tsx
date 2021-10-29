import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';
import HeartIkon from '../../../../../svg/Heart';
import { Person, Sivilstand as SivilstandInterface, SivilstandType } from '../../PersondataDomain';
import { hentNavn, hentPartner } from '../../visittkort-utils';
import Diskresjonskode from './common/Diskresjonskode';
import { formaterDato } from '../../../../../utils/string-utils';

interface Props {
    person: Person;
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
    const alder = partnerRelasjon.alder ? `(${partnerRelasjon.alder})` : null;
    return (
        <>
            <Normaltekst>
                <Sivilstand sivilstand={props.partner} />
            </Normaltekst>
            <Diskresjonskode adressebeskyttelse={partnerRelasjon.adressebeskyttelse} />
            <Normaltekst>
                {navn && hentNavn(navn)}
                {alder}
            </Normaltekst>
            <Normaltekst>{partnerRelasjon.fnr}</Normaltekst>
            <Normaltekst>
                {partnerRelasjon.harSammeAdresse ? <>Bor med bruker</> : <>Bor ikke med bruker</>}
            </Normaltekst>
        </>
    );
}

function SivilstandWrapper({ person }: Props) {
    const partner = hentPartner(person.sivilstand);
    const sivilstand = person.sivilstand.firstOrNull();

    if (!sivilstand?.sivilstandRelasjon) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Sivilstand" ikon={<HeartIkon />}>
            {partner ? (
                <Partner partner={partner} />
            ) : (
                <Normaltekst>
                    <Sivilstand sivilstand={sivilstand} />
                </Normaltekst>
            )}
        </VisittkortElement>
    );
}

export default SivilstandWrapper;
