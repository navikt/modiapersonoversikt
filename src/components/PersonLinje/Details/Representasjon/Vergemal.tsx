import { Accordion, BodyShort, Box, Heading, HelpText, HStack, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { harFeilendeSystemer, hentNavn, hentPeriodeTekst } from '../../utils';

type Verge = PersonData['vergemal'][0];

function VergeDetaljer(props: { feilendeSystemer: PersonDataFeilendeSystemer[]; verge: Verge }) {
    const { verge } = props;
    const harFeilendeSystemOgIngenNavn =
        harFeilendeSystemer(props.feilendeSystemer, PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER) &&
        !verge.navn ? (
            <InlineMessage status="warning" size="small">
                Feilet ved uthenting av navn på verge
            </InlineMessage>
        ) : (
            <BodyShort size="small">{hentNavn(verge.navn, 'Navn ikke tilgjengelig')}</BodyShort>
        );

    const gyldigFra = verge.gyldighetsPeriode?.gyldigFraOgMed ? dayjs(verge.gyldighetsPeriode.gyldigFraOgMed) : null;
    const visTjenesteOppgaver = gyldigFra?.isAfter('2023-10-31');

    const hjelpeTekst = (
        <HelpText title="Hva ligger i tjenesteområde?">
            Tjenesteområde sier hvilke områder vergen kan handle på vegne av vergehaver. Dette vises kun om vergemålet
            har Nav som tjenestevirksomhet.
        </HelpText>
    );

    return (
        <>
            <Box className="mb-2">
                {harFeilendeSystemOgIngenNavn}
                <KopierFnrKnapp fnr={verge.ident} />
            </Box>
            <VStack gap="space-8">
                <BodyShort size="small">
                    Gyldig:{' '}
                    {hentPeriodeTekst(verge.gyldighetsPeriode?.gyldigFraOgMed, verge.gyldighetsPeriode?.gyldigTilOgMed)}
                </BodyShort>
                <BodyShort size="small">Type: {verge.vergesakstype}</BodyShort>
                <BodyShort size="small" as="div">
                    <HStack wrap={false}>
                        <span>Tjenesteområde</span> {hjelpeTekst}:
                    </HStack>

                    {visTjenesteOppgaver
                        ? (verge?.tjenesteOppgaver?.length ?? 0) > 0
                            ? verge.tjenesteOppgaver?.join(', ')
                            : ''
                        : verge.omfang}
                </BodyShort>
                <BodyShort size="small">Embete: {verge.embete}</BodyShort>
            </VStack>
        </>
    );
}

function Vergemal() {
    const { data } = usePersonData();
    const person = data?.person;
    const vergemal = person?.vergemal ?? [];
    const historiskeVergeMal = person?.historiskeVergemal ?? [];
    const feilendeSystemer = data?.feilendeSystemer ?? [];

    if (vergemal?.isEmpty() && historiskeVergeMal.isEmpty()) {
        return null;
    }

    const sammenSattVerger = [...vergemal, ...historiskeVergeMal];

    return (
        <VStack gap="space-8">
            <Heading size="xsmall" as="h3">
                Vergemål
            </Heading>
            <Accordion size="small" indent={false}>
                {sammenSattVerger.map((verge, index) => {
                    const vergenavn = hentNavn(verge.navn, 'Ukjent verge');
                    return (
                        <Accordion.Item key={`${verge.ident}-${index}`}>
                            <Accordion.Header>
                                <VStack className="justify-start items-start">
                                    {vergenavn} - {verge.vergesakstype}
                                    <Tag
                                        variant="moderate"
                                        size="xsmall"
                                        data-color={verge.historisk ? 'neutral' : 'success'}
                                    >
                                        {verge.historisk ? 'Historisk' : 'Aktiv'}
                                    </Tag>
                                </VStack>
                            </Accordion.Header>
                            <Accordion.Content>
                                <VergeDetaljer feilendeSystemer={feilendeSystemer} verge={verge} />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </VStack>
    );
}

export default Vergemal;
