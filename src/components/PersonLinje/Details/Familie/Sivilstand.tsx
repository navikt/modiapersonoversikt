import { CheckmarkIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import { InfoElement } from 'src/components/PersonLinje/Details/components';
import { type PersonData, SivilstandType } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import Diskresjonskode from '../../common/DiskresjonsKode';
import { hentNavn } from '../../utils';

type Sivilstand = PersonData['sivilstand'][0];

interface Props {
    harFeilendeSystem: boolean;
    sivilstand: Sivilstand[];
}

function SivilstandTekst(props: { sivilstand: Sivilstand }) {
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
    const partnerRelasjon = props.partner.sivilstandRelasjon;

    if (props.harFeilendeSystem || !partnerRelasjon) {
        return (
            <VStack gap="space-4">
                <BodyShort size="small" weight="semibold">
                    <SivilstandTekst sivilstand={props.partner} />
                </BodyShort>
                {props.harFeilendeSystem && (
                    <InlineMessage status="warning" size="small">
                        Feilet ved uthenting av informasjon om partner
                    </InlineMessage>
                )}
            </VStack>
        );
    }

    const navn = partnerRelasjon.navn.firstOrNull();
    const erDod = partnerRelasjon.dodsdato.firstOrNull() !== undefined;
    const dodsdato = partnerRelasjon.dodsdato.firstOrNull();
    const alder = erDod ? 'Død' : partnerRelasjon.alder;
    const fnr = partnerRelasjon.fnr;

    return (
        <VStack gap="space-4">
            <Diskresjonskode adressebeskyttelse={partnerRelasjon.adressebeskyttelse} />
            {navn && (
                <BodyShort size="small">
                    {hentNavn(navn)} ({alder})
                </BodyShort>
            )}
            <BodyShort size="small" textColor="subtle">
                <SivilstandTekst sivilstand={props.partner} />
            </BodyShort>
            <Box style={{ alignSelf: 'flex-start' }}>
                <KopierFnrKnapp fnr={fnr} />
            </Box>
            {partnerRelasjon.harSammeAdresse ? (
                <Tag
                    data-color="success"
                    variant="moderate"
                    size="small"
                    icon={<CheckmarkIcon aria-hidden />}
                    style={{ alignSelf: 'flex-start' }}
                >
                    Bor med bruker
                </Tag>
            ) : (
                <Tag
                    data-color="danger"
                    variant="moderate"
                    size="small"
                    icon={<XMarkOctagonIcon aria-hidden />}
                    style={{ alignSelf: 'flex-start' }}
                >
                    Bor ikke med bruker
                </Tag>
            )}
            {erDod && dodsdato && (
                <Tag data-color="neutral" variant="moderate" size="small" style={{ alignSelf: 'flex-start' }}>
                    Død ({formaterDato(dodsdato)})
                </Tag>
            )}
        </VStack>
    );
}

function SivilstandWrapper({ harFeilendeSystem, sivilstand: sivilstandList }: Props) {
    const sivilstand = sivilstandList.firstOrNull();

    if (!sivilstand) {
        return 'Ingen registrert partner.';
    }

    return (
        <InfoElement>
            {sivilstand.type.kode !== SivilstandType.UGIFT ? (
                <Partner harFeilendeSystem={harFeilendeSystem} partner={sivilstand} />
            ) : (
                <BodyShort>
                    <SivilstandTekst sivilstand={sivilstand} />
                </BodyShort>
            )}
        </InfoElement>
    );
}

export default SivilstandWrapper;
