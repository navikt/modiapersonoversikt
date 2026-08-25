import { Accordion, BodyShort, Box, Detail, HelpText, HStack, InlineMessage } from '@navikt/ds-react';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import ValidPeriod from '../common/ValidPeriod';
import { harFeilendeSystemer, hentNavn } from '../utils';
import { InfoElement } from './components';

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

    return (
        <InfoElement>
            <Box className="mb-2">
                {harFeilendeSystemOgIngenNavn}
                <KopierFnrKnapp fnr={verge.ident} />
            </Box>
            {verge.tjenesteOppgaver && verge.tjenesteOppgaver?.length > 0 ? (
                <>
                    <HStack>
                        <BodyShort weight="semibold" size="small">
                            Område{' '}
                        </BodyShort>
                        <HelpText title="Hva ligger i område?">
                            Viser områdene verge har innsynsrett i.
                            <br />
                            Viser kun tjenesteoppgaver knyttet til NAV.
                        </HelpText>
                    </HStack>
                    <Detail>{verge.tjenesteOppgaver.join(', ')}</Detail>
                </>
            ) : (
                <>
                    <BodyShort weight="semibold" size="small">
                        Omfang
                    </BodyShort>
                    <Detail>{verge.omfang}</Detail>
                </>
            )}
            <Detail textColor="subtle">{verge.embete}</Detail>
            <ValidPeriod from={verge.gyldighetsPeriode?.gyldigFraOgMed} to={verge.gyldighetsPeriode?.gyldigTilOgMed} />
        </InfoElement>
    );
}

function Vergemal() {
    const { data } = usePersonData();
    const person = data?.person;
    const vergemal = person?.vergemal;
    const feilendeSystemer = data?.feilendeSystemer ?? [];

    if (!vergemal || vergemal.isEmpty()) {
        return null;
    }

    return (
        <Accordion size="small" indent={false}>
            {vergemal.map((verge, index) => {
                const vergenavn = hentNavn(verge.navn, 'Ukjent verge');
                return (
                    <Accordion.Item key={`${verge.ident}-${index}`}>
                        <Accordion.Header>
                            <HStack gap="space-2" align="center">
                                {vergenavn}
                            </HStack>
                        </Accordion.Header>
                        <Accordion.Content>
                            <VergeDetaljer feilendeSystemer={feilendeSystemer} verge={verge} />
                        </Accordion.Content>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}

export default Vergemal;
