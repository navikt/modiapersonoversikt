import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, Detail, HStack, HelpText } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import ValidPeriod from '../common/ValidPeriod';
import { harFeilendeSystemer, hentNavn } from '../utils';
import { Group, InfoElement } from './components';

type Verge = PersonData['vergemal'][0];

function Verge(props: {
    feilendeSystemer: PersonDataFeilendeSystemer[];
    verge: Verge;
}) {
    const { verge } = props;
    const harFeilendeSystemOgIngenNavn =
        harFeilendeSystemer(props.feilendeSystemer, PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER) &&
        !verge.navn ? (
            <Alert variant="warning">Feilet ved uthenting av navn på verge</Alert>
        ) : (
            <BodyShort size="small">{hentNavn(verge.navn, 'Navn ikke tilgjengelig')}</BodyShort>
        );

    return (
        <InfoElement title="Verge">
            <Box className="mb-2">
                {harFeilendeSystemOgIngenNavn}
                <Detail>{verge.ident}</Detail>
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

function Vergesakstype(props: { vergemal: Verge[] }) {
    const alleVergesakstyper = props.vergemal.map((verge) => verge.vergesakstype);
    const unikeVergessakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return <BodyShort size="small">Vergesakstyper: {unikeVergessakstyper}</BodyShort>;
}

function Vergemal() {
    const { data } = usePersonData();
    const {
        feilendeSystemer,
        person: { vergemal }
    } = data;

    if (vergemal.isEmpty()) {
        return null;
    }

    return (
        <Group
            icon={<ExclamationmarkTriangleFillIcon color="var(--a-icon-warning)" />}
            title="Bruker er under vergemål"
        >
            <Vergesakstype vergemal={vergemal} />
            {vergemal.map((verge, index) => (
                <Verge feilendeSystemer={feilendeSystemer} verge={verge} key={`${verge.ident}-${index}`} />
            ))}
        </Group>
    );
}

export default Vergemal;
