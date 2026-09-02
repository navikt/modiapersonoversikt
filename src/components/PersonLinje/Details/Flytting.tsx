import { GlobeFillIcon } from '@navikt/aksel-icons';
import { Accordion, BodyShort, Box, HStack } from '@navikt/ds-react';
import ValidPeriod from 'src/components/PersonLinje/common/ValidPeriod';
import { LastChanged } from 'src/components/PersonLinje/Details/components';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

export default function Flytting() {
    const { data } = usePersonData();
    const person = data?.person;

    if (!person || (person.innflyttingTilNorge.isEmpty() && person.utflyttingFraNorge.isEmpty())) {
        return <></>;
    }

    return (
        <Accordion size="small" indent={false}>
            {person.innflyttingTilNorge.isNotEmpty() && (
                <Accordion.Item>
                    <Accordion.Header>
                        <HStack gap="space-2" align="center">
                            <GlobeFillIcon aria-hidden fontSize="1rem" color="var(--ax-neutral-500)" />
                            Flyttet fra
                        </HStack>
                    </Accordion.Header>
                    <Accordion.Content>
                        {person.innflyttingTilNorge.map((innFlytting, index) => (
                            <Box key={`${innFlytting.fraflyttingsland}-${index}`} marginBlock="space-8">
                                <BodyShort size="small">{innFlytting.fraflyttingsland}</BodyShort>
                                <LastChanged sistEndret={innFlytting.sistEndret} />
                                <ValidPeriod
                                    from={innFlytting.gyldighetsPeriode?.gyldigFraOgMed}
                                    to={innFlytting.gyldighetsPeriode?.gyldigTilOgMed}
                                />
                            </Box>
                        ))}
                    </Accordion.Content>
                </Accordion.Item>
            )}
            {person.utflyttingFraNorge.isNotEmpty() && (
                <Accordion.Item>
                    <Accordion.Header>
                        <HStack gap="space-2" align="center">
                            <GlobeFillIcon aria-hidden fontSize="1rem" color="var(--ax-neutral-500)" />
                            Flyttet til
                        </HStack>
                    </Accordion.Header>
                    <Accordion.Content>
                        {person.utflyttingFraNorge.map((utflytting, index) => (
                            <Box key={`${utflytting.utflyttingsdato}-${index}`} marginBlock="space-8">
                                <BodyShort size="small">{utflytting.tilflyttingsland}</BodyShort>
                                {utflytting.utflyttingsdato && (
                                    <BodyShort size="small">
                                        Utflyttingsdato: {formaterDato(new Date(utflytting.utflyttingsdato))}
                                    </BodyShort>
                                )}
                                <ValidPeriod
                                    from={utflytting.gyldighetsPeriode?.gyldigFraOgMed}
                                    to={utflytting.gyldighetsPeriode?.gyldigTilOgMed}
                                />
                                <LastChanged sistEndret={utflytting.sistEndret} />
                            </Box>
                        ))}
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </Accordion>
    );
}
