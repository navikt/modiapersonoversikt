import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import HeartIkon from '../../../../../svg/Heart';
import { formaterDato } from '../../../../../utils/string-utils';
import { type Sivilstand as SivilstandInterface, SivilstandType } from '../../PersondataDomain';
import { erPartner, hentAlderEllerDod, hentNavn } from '../../visittkort-utils';
import VisittkortElement from '../VisittkortElement';
import Diskresjonskode from './common/Diskresjonskode';

interface Props {
    harFeilendeSystem: boolean;
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

function Partner(props: { partner: SivilstandInterface; harFeilendeSystem: boolean }) {
    if (props.harFeilendeSystem) {
        return (
            <>
                <Normaltekst>
                    <Sivilstand sivilstand={props.partner} />
                </Normaltekst>
                <Feilmelding>Feilet ved uthenting av informasjon om partner</Feilmelding>
            </>
        );
    }

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

function SivilstandWrapper({ harFeilendeSystem, sivilstandListe }: Props) {
    const sivilstand = sivilstandListe.firstOrNull();

    if (!sivilstand) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Sivilstand" ikon={<HeartIkon />}>
            {erPartner(sivilstand) ? (
                <Partner harFeilendeSystem={harFeilendeSystem} partner={sivilstand} />
            ) : (
                <Normaltekst>
                    <Sivilstand sivilstand={sivilstand} />
                </Normaltekst>
            )}
        </VisittkortElement>
    );
}

export default SivilstandWrapper;
