import { CheckmarkIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import Diskresjonskode from '../../common/DiskresjonsKode';
import { erDod, harDiskresjonskode, hentNavn } from '../../utils';

type ForelderBarnRelasjon = PersonData['forelderBarnRelasjon'][0];

export function ForelderBarnRelasjonVisning({
    harFeilendeSystem,
    relasjon,
    beskrivelse
}: {
    harFeilendeSystem: boolean;
    relasjon: ForelderBarnRelasjon;
    beskrivelse: string;
    erBarn: boolean;
}) {
    const harDiskresjon = harDiskresjonskode(relasjon.adressebeskyttelse);
    const navn = relasjon.navn.firstOrNull();
    const fnr = relasjon.ident;
    const erDød = erDod(relasjon.dodsdato);
    const alder = erDød ? 'Død' : relasjon.alder;
    const dodsdato = relasjon.dodsdato.firstOrNull();

    return (
        <VStack gap="space-4">
            {harDiskresjon ? (
                <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
            ) : (
                <BodyShort size="small">
                    {navn ? hentNavn(navn) : 'Ukjent navn'} ({alder}, {beskrivelse})
                </BodyShort>
            )}
            {fnr && !harDiskresjon && (
                <Box>
                    <KopierFnrKnapp fnr={fnr} />
                </Box>
            )}
            {harFeilendeSystem && (
                <InlineMessage status="warning" size="small">
                    Feilet ved uthenting av informasjon om {relasjon.rolle.toLowerCase()}
                </InlineMessage>
            )}
            {!erDød &&
                (relasjon.harSammeAdresse ? (
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
                ))}
            {erDød && dodsdato && (
                <Tag data-color="neutral" variant="moderate" size="small" style={{ alignSelf: 'flex-start' }}>
                    Død ({formaterDato(dodsdato)})
                </Tag>
            )}
        </VStack>
    );
}
