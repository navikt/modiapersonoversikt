import { GlobeFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import ValidPeriod from 'src/components/PersonLinje/common/ValidPeriod';
import { Group, InfoElement, LastChanged } from 'src/components/PersonLinje/Details/components';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

export default function Flytting() {
    const { data } = usePersonData();
    const person = data?.person;

    if (!person || (person.innflyttingTilNorge.isEmpty() && person.utflyttingFraNorge.isEmpty())) {
        return <></>;
    }

    return (
        <Group title="Flytting">
            {person.innflyttingTilNorge.isNotEmpty() && (
                <InfoElement title="Flyttet fra" icon={<GlobeFillIcon fontSize="1.2rem" color="var(--a-gray-400)" />}>
                    {person.innflyttingTilNorge.map((innFlytting, index) => {
                        return (
                            <Box key={`${innFlytting.fraflyttingsland}-${index}`} marginBlock="2">
                                <BodyShort>{innFlytting.fraflyttingsland} </BodyShort>
                                <LastChanged sistEndret={innFlytting.sistEndret} />
                                <ValidPeriod
                                    from={innFlytting.gyldighetsPeriode?.gyldigFraOgMed}
                                    to={innFlytting.gyldighetsPeriode?.gyldigTilOgMed}
                                />
                            </Box>
                        );
                    })}
                </InfoElement>
            )}
            {person.utflyttingFraNorge.isNotEmpty() && (
                <InfoElement title="Flyttet til" icon={<GlobeFillIcon fontSize="1.2rem" color="var(--a-gray-400)" />}>
                    {person.utflyttingFraNorge.map((utflytting, index) => {
                        return (
                            <Box key={`${utflytting.utflyttingsdato}-${index}`} marginBlock="2">
                                <BodyShort>{utflytting.tilflyttingsland} </BodyShort>
                                {utflytting.utflyttingsdato && (
                                    <BodyShort>
                                        Utflyttingsdato: {formaterDato(new Date(utflytting.utflyttingsdato))}
                                    </BodyShort>
                                )}
                                <ValidPeriod
                                    from={utflytting.gyldighetsPeriode?.gyldigFraOgMed}
                                    to={utflytting.gyldighetsPeriode?.gyldigTilOgMed}
                                />
                                <LastChanged sistEndret={utflytting.sistEndret} />
                            </Box>
                        );
                    })}
                </InfoElement>
            )}
        </Group>
    );
}
