import { Accordion, BodyShort, Box, Heading, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { capitalizeName } from 'src/utils/string-utils';
import { harFeilendeSystemer, hentNavn, hentPeriodeTekst } from '../../utils';

type Fullmektig = PersonData['fullmakt'][0];

function FullmektigDetaljer(props: { feilendeSystemer: PersonDataFeilendeSystemer[]; fullmektig: Fullmektig }) {
    const { fullmektig } = props;

    const harFeilendeSystemOgIngenNavn =
        (harFeilendeSystemer(props.feilendeSystemer, PersonDataFeilendeSystemer.FULLMAKT) ||
            harFeilendeSystemer(props.feilendeSystemer, PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER)) &&
        !fullmektig.motpartsPersonNavn ? (
            <InlineMessage status="warning" size="small">
                Feilet ved uthenting av navn på fullmektig
            </InlineMessage>
        ) : (
            <BodyShort size="small">
                {capitalizeName(hentNavn(fullmektig.motpartsPersonNavn, 'Navn ikke tilgjengelig'))}
            </BodyShort>
        );

    return (
        <>
            <Box className="mb-2">
                {harFeilendeSystemOgIngenNavn}
                <KopierFnrKnapp fnr={fullmektig.motpartsPersonident} />
            </Box>
            <VStack gap="space-8">
                <BodyShort size="small">
                    Gyldig:{' '}
                    {hentPeriodeTekst(
                        fullmektig.gyldighetsPeriode?.gyldigFraOgMed,
                        fullmektig.gyldighetsPeriode?.gyldigTilOgMed
                    )}
                </BodyShort>
                <BodyShort size="small">
                    Områder:
                    {fullmektig.omrade.map((o) => {
                        return (
                            <BodyShort size="small" key={o.omraade.kode}>
                                {o.omraade.beskrivelse} {o.handling?.join(', ')}
                            </BodyShort>
                        );
                    })}
                </BodyShort>
                <BodyShort size="small">Kilde: {fullmektig.kilde}</BodyShort>
            </VStack>
        </>
    );
}

export const Fullmakt = () => {
    const { data } = usePersonData();
    const person = data?.person;
    const fullmektige = person?.fullmakt;
    const feilendeSystemer = data?.feilendeSystemer ?? [];

    if (!fullmektige || fullmektige.isEmpty()) {
        return null;
    }

    return (
        <VStack gap="space-8">
            <Heading size="xsmall" as="h3">
                Fullmakt
            </Heading>
            <Accordion size="small" indent={false}>
                {fullmektige.map((fullmektig, index) => {
                    const fullmektigNavn = hentNavn(fullmektig.motpartsPersonNavn, 'Ukjent fullmektig');
                    return (
                        <Accordion.Item key={`${fullmektig.motpartsPersonident}-${index}`}>
                            <Accordion.Header>
                                <VStack className="justify-start items-start">
                                    {capitalizeName(fullmektigNavn)} - {capitalizeName(fullmektig.motpartsRolle)}
                                    <Tag variant="moderate" size="xsmall" data-color="success">
                                        Aktiv
                                    </Tag>
                                </VStack>
                            </Accordion.Header>
                            <Accordion.Content>
                                <FullmektigDetaljer feilendeSystemer={feilendeSystemer} fullmektig={fullmektig} />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </VStack>
    );
};
