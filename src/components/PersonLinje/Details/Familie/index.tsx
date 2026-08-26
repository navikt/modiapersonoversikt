import { Accordion, Box, Heading, VStack } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { harFeilendeSystemer } from '../../utils';
import Barn from './Barn';
import Foreldre from './Foreldre';
import ForeldreansvarListe from './ForeldreansvarListe';
import Sivilstand from './Sivilstand';

function Familie() {
    const { data } = usePersonData();

    const person = data?.person;
    const feilendeSystemer = data?.feilendeSystemer;
    const erUnder22 = person?.alder != null && person.alder <= 21;
    const harFeilendeSystem = harFeilendeSystemer(
        feilendeSystemer ?? [],
        PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER
    );

    if (!person) {
        return <></>;
    }

    return (
        <Accordion size="small" indent={false}>
            <Accordion.Item>
                <Accordion.Header>Familiemedlemmer</Accordion.Header>
                <Accordion.Content>
                    <Box
                        borderWidth="0 0 0 2"
                        borderColor="neutral-subtle"
                        style={{ paddingLeft: 'var(--ax-space-16)' }}
                    >
                        <VStack gap="space-8">
                            <Heading size="xsmall">Partner</Heading>
                            <Sivilstand harFeilendeSystem={harFeilendeSystem} sivilstand={person.sivilstand} />
                            <Heading size="xsmall">Barn</Heading>
                            <Barn harFeilendeSystem={harFeilendeSystem} relasjoner={person.forelderBarnRelasjon} />
                            {erUnder22 && (
                                <>
                                    <Heading size="xsmall">Foreldre</Heading>
                                    <Foreldre
                                        harFeilendeSystem={harFeilendeSystem}
                                        forelderBarnRelasjon={person.forelderBarnRelasjon}
                                    />
                                </>
                            )}
                        </VStack>
                    </Box>
                </Accordion.Content>
            </Accordion.Item>
            {person.foreldreansvar.isNotEmpty() && (
                <Accordion.Item>
                    <Accordion.Header>Foreldreansvar</Accordion.Header>
                    <Accordion.Content>
                        <ForeldreansvarListe
                            harFeilendeSystem={harFeilendeSystemer(
                                feilendeSystemer ?? [],
                                PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER
                            )}
                            foreldreansvar={person.foreldreansvar}
                        />
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </Accordion>
    );
}

export default Familie;
