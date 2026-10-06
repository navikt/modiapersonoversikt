import { Accordion, BodyShort, Box, Detail, Heading, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { formaterRettighetstemaer } from 'src/utils/fullmakt-utils';
import { capitalizeName } from 'src/utils/string-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import { harFeilendeSystemer, hentNavn, hentPeriodeTekst } from '../../utils';

type Fullmektig = PersonData['fullmektige'][number];
type Fullmakt = Fullmektig['fullmakt'];

function FullmektigDetaljer(props: { feilendeSystemer: PersonDataFeilendeSystemer[]; fullmektig: Fullmektig }) {
    const { fullmektig } = props;

    const harFeilendeSystemOgIngenNavn =
        (harFeilendeSystemer(props.feilendeSystemer, PersonDataFeilendeSystemer.REPR_API) ||
            harFeilendeSystemer(props.feilendeSystemer, PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER)) &&
        !fullmektig.navn ? (
            <InlineMessage status="warning" size="small">
                Feilet ved uthenting av navn på fullmektig
            </InlineMessage>
        ) : (
            <BodyShort size="small">{capitalizeName(hentNavn(fullmektig.navn, 'Navn ikke tilgjengelig'))}</BodyShort>
        );

    const mobilnummer = formaterMobiltelefonnummer(
        fullmektig.digitalKontaktinformasjonTredjepartsperson?.mobiltelefonnummer ?? 'Fant ikke telefonnummer'
    );

    return (
        <>
            <Box className="mb-2">
                {harFeilendeSystemOgIngenNavn}
                <KopierFnrKnapp fnr={fullmektig.ident} />
                {fullmektig.digitalKontaktinformasjonTredjepartsperson && (
                    <>
                        <BodyShort size="small">Tlf.: {mobilnummer}</BodyShort>
                        {fullmektig.digitalKontaktinformasjonTredjepartsperson?.reservasjon === true && (
                            <Tag variant="moderate" data-color="warning" size="xsmall">
                                Reservert i KRR
                            </Tag>
                        )}
                        <Detail textColor="subtle">Kontakt- og reservasjonsregisteret</Detail>
                    </>
                )}
            </Box>
            <VStack gap="space-8">
                <FullmaktDetaljer fullmakt={fullmektig.fullmakt} />
            </VStack>
        </>
    );
}

function FullmaktDetaljer({ fullmakt }: { fullmakt: Fullmakt }) {
    const leserettigheter = formaterRettighetstemaer(fullmakt.leserettigheter);
    const skriverettigheter = formaterRettighetstemaer(fullmakt.skriverettigheter);

    return (
        <VStack gap="space-8">
            <BodyShort size="small">
                Gyldig: {hentPeriodeTekst(fullmakt.gyldigFraOgMed, fullmakt.gyldigTilOgMed)}
            </BodyShort>
            {leserettigheter && <BodyShort size="small">Leserettigheter: {leserettigheter}</BodyShort>}
            {skriverettigheter && <BodyShort size="small">Skriverettigheter: {skriverettigheter}</BodyShort>}
        </VStack>
    );
}

export const Fullmakt = () => {
    const { data } = usePersonData();
    const person = data?.person;
    const fullmektige = person?.fullmektige ?? [];
    const feilendeSystemer = data?.feilendeSystemer ?? [];
    const navnObjekt = person?.navn.firstOrNull();
    const brukersNavn = navnObjekt
        ? `${navnObjekt.fornavn} ${navnObjekt.mellomnavn ?? ''} ${navnObjekt.etternavn}`
        : null;
    const reprApiFeil = harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.REPR_API);

    if (fullmektige?.isEmpty() && !reprApiFeil) {
        return null;
    }

    return (
        <VStack gap="space-8">
            <Heading size="xsmall" as="h3">
                Fullmektige
            </Heading>

            {reprApiFeil ? (
                <InlineMessage status="warning" size="small">
                    Feilet ved uthenting av fullmakter
                </InlineMessage>
            ) : (
                <>
                    <Detail>
                        En fullmektig har myndighet til å opptre på vegne av fullmaktsgiver,{' '}
                        {brukersNavn ? capitalizeName(brukersNavn) : 'ukjent navn'}.
                    </Detail>
                    <Accordion size="small" indent={false}>
                        {fullmektige.map((fullmektig) => {
                            const fullmektigNavn = hentNavn(fullmektig.navn, 'Ukjent fullmektig');
                            const gyldigTilOgMed = fullmektig.fullmakt.gyldigTilOgMed
                                ? dayjs(fullmektig.fullmakt.gyldigTilOgMed)
                                : null;

                            const gyldigFraOgMed = dayjs(fullmektig.fullmakt.gyldigFraOgMed);

                            return (
                                <Accordion.Item key={fullmektig.fullmakt.fullmaktId}>
                                    <Accordion.Header>
                                        <VStack className="justify-start items-start">
                                            {capitalizeName(fullmektigNavn)}
                                            {gyldigFraOgMed.isAfter(dayjs(), 'day') ? (
                                                <Tag variant="moderate" size="xsmall">
                                                    Fremtidig
                                                </Tag>
                                            ) : gyldigTilOgMed?.isBefore(dayjs(), 'day') ? (
                                                <Tag variant="moderate" size="xsmall">
                                                    Historisk
                                                </Tag>
                                            ) : (
                                                <Tag variant="moderate" size="xsmall" data-color="success">
                                                    Aktiv
                                                </Tag>
                                            )}
                                        </VStack>
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <FullmektigDetaljer
                                            feilendeSystemer={feilendeSystemer}
                                            fullmektig={fullmektig}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                </>
            )}
        </VStack>
    );
};
