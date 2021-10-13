import * as React from 'react';
import dayjs from 'dayjs';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';
import HeartIkon from '../../../../../svg/Heart';
import { Person, Sivilstand as SivilstandInterface, SivilstandType } from '../../PersondataDomain';
import { harDiskresjonskode, hentPartner } from '../../person-utils';
import { hentNavn } from '../../utils-visittkort';
import Diskresjonskode from './common/Diskresjonskode';
// import Diskresjonskode from './common/Diskresjonskode';

interface Props {
    person: Person;
}

function Sivilstand(props: { sivilstand: SivilstandInterface }) {
    if (props.sivilstand.type.kode === SivilstandType.UGIFT) {
        return <>{props.sivilstand.type.beskrivelse}</>;
    }
    const relasjonFraOgMed = props.sivilstand.gyldigFraOgMed
        ? `(${dayjs(props.sivilstand.gyldigFraOgMed).format('DD.MM.YYYY')})`
        : '';

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
    const adressebeskyttet = harDiskresjonskode(partnerRelasjon.adressebeskyttelse);
    const navn = partnerRelasjon.navn.firstOrNull() ?? null;
    const alder = adressebeskyttet ? '' : `(${partnerRelasjon.alder})`;
    return (
        <>
            <Normaltekst>
                <Sivilstand sivilstand={props.partner} />
            </Normaltekst>
            <Diskresjonskode adressebeskyttelse={partnerRelasjon.adressebeskyttelse} />
            <Normaltekst>
                {hentNavn(navn)}
                {alder}
            </Normaltekst>
            {!adressebeskyttet && <Normaltekst>{partnerRelasjon.fnr || ''}</Normaltekst>}
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
