import { HeartFillIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Detail } from '@navikt/ds-react';
import { type PersonData, SivilstandType } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import Diskresjonskode from '../../common/DiskresjonsKode';
import { erPartner, hentAlderEllerDod, hentNavn } from '../../utils';
import { InfoElement } from '../components';

type Sivilstand = PersonData['sivilstand'][0];

interface Props {
    harFeilendeSystem: boolean;
    sivilstand: Sivilstand[];
}

function Sivilstand(props: { sivilstand: Sivilstand }) {
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

function Partner(props: { partner: Sivilstand; harFeilendeSystem: boolean }) {
    if (props.harFeilendeSystem) {
        return (
            <>
                <BodyShort size="small">
                    <Sivilstand sivilstand={props.partner} />
                </BodyShort>
                <Alert variant="warning">Feilet ved uthenting av informasjon om partner</Alert>
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
            <BodyShort size="small">
                <Sivilstand sivilstand={props.partner} />
            </BodyShort>
            <Diskresjonskode adressebeskyttelse={partnerRelasjon.adressebeskyttelse} />
            <BodyShort size="small">
                {navn && hentNavn(navn)} ({hentAlderEllerDod(partnerRelasjon)})
            </BodyShort>
            <Detail>{partnerRelasjon.fnr}</Detail>
            <Detail textColor="subtle">
                {partnerRelasjon.harSammeAdresse ? <>Bor med bruker</> : <>Bor ikke med bruker</>}
            </Detail>
        </>
    );
}

function SivilstandWrapper({ harFeilendeSystem, sivilstand: sivilstandList }: Props) {
    const sivilstand = sivilstandList.firstOrNull();

    if (!sivilstand) {
        return null;
    }

    return (
        <InfoElement title="Sivilstand" icon={<HeartFillIcon fontSize="1.2rem" color="var(--a-red-100)" />}>
            {erPartner(sivilstand) ? (
                <Partner harFeilendeSystem={harFeilendeSystem} partner={sivilstand} />
            ) : (
                <BodyShort>
                    <Sivilstand sivilstand={sivilstand} />
                </BodyShort>
            )}
        </InfoElement>
    );
}

export default SivilstandWrapper;
