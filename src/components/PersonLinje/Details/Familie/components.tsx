import { CheckmarkIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import { FamilierelasjonIkon } from 'src/components/PersonLinje/Details/Familie/utils';
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
}) {
    const harDiskresjon = harDiskresjonskode(relasjon.adressebeskyttelse);
    const navn = relasjon.navn.firstOrNull();
    const fnr = relasjon.ident;
    const erDød = erDod(relasjon.dodsdato);
    const alder = erDød ? 'Død' : relasjon.alder;
    const dodsdato = relasjon.dodsdato.firstOrNull();

    return (
        <VStack gap="space-4" className="items-start">
            {harFeilendeSystem && (
                <InlineMessage status="warning" size="small">
                    Feilet ved uthenting av informasjon om {relasjon.rolle.toLowerCase()}
                </InlineMessage>
            )}
            {harDiskresjon ? (
                <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
            ) : (
                <HStack>
                    <FamilierelasjonIkon relasjon={relasjon} erBarn={true} />
                    <BodyShort size="small">
                        {navn ? hentNavn(navn) : 'Ukjent navn'} ({alder}, {beskrivelse})
                    </BodyShort>
                </HStack>
            )}
            {fnr && !harDiskresjon && <KopierFnrKnapp fnr={fnr} />}
            {erDød && dodsdato && (
                <Tag data-color="neutral" variant="moderate" size="small" className="self-start">
                    Død ({formaterDato(dodsdato)})
                </Tag>
            )}
            {!erDød &&
                !harFeilendeSystem &&
                (relasjon.harSammeAdresse ? (
                    <Tag
                        data-color="success"
                        variant="moderate"
                        size="xsmall"
                        icon={<CheckmarkIcon aria-hidden />}
                        className="self-start"
                    >
                        Bor med bruker
                    </Tag>
                ) : (
                    <Tag
                        data-color="danger"
                        variant="moderate"
                        size="xsmall"
                        icon={<XMarkOctagonIcon aria-hidden />}
                        className="self-start"
                    >
                        Bor ikke med bruker
                    </Tag>
                ))}
        </VStack>
    );
}
