import {
    Alert,
    BodyShort,
    Detail,
    Heading,
    HGrid,
    HStack,
    InlineMessage,
    Label,
    Link,
    Skeleton,
    VStack
} from '@navikt/ds-react';
import type { ReactNode } from 'react';
import QueryErrorBoundary from 'src/components/QueryErrorBoundary';
import { useArbeidsoppfolging, useBaseUrls, usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import NavLogoNy from 'src/svg/navLogoNy.svg';
import { harFeilendeSystemer, mapUgyldigGT } from '../../utils';
import { Adresseinfo } from '../components';

const IKKE_TILGJENGELIG = 'Ikke tilgjengelig';
const STENGT = 'Stengt';

function hentDagensApningstid(apningstider: { ukedag: string; apningstid: string }[]): string | null {
    if (apningstider.length === 0) return null;
    const dagensUkedag = new Date().toLocaleDateString('nb-NO', { weekday: 'long' }).toLowerCase();
    return apningstider.find((a) => a.ukedag.toLowerCase() === dagensUkedag)?.apningstid ?? STENGT;
}

function InfoFelt({ label, children }: { label: string; children: ReactNode }) {
    return (
        <VStack gap="space-4">
            <Label size="small">{label}</Label>
            {children}
        </VStack>
    );
}

function KontorLenke({ navEnhetId }: { navEnhetId: string }) {
    const { data, isLoading, error } = useBaseUrls();
    const baseUrl = data?.norg2Frontend ?? '';

    return (
        <QueryErrorBoundary loading={isLoading} error={error} loader={<Skeleton variant="text" />}>
            <Detail>
                <Link href={`${baseUrl}/#/startsok?enhetNr=${navEnhetId}`} target="_blank" rel="noopener noreferrer">
                    Fler detaljer om kontoret
                </Link>
            </Detail>
        </QueryErrorBoundary>
    );
}

function Veileder() {
    const { data } = useArbeidsoppfolging();
    const veileder = data?.oppfolging?.veileder;
    if (!veileder) return null;
    return (
        <InfoFelt label="Veileder - arbeidsoppfølging">
            <BodyShort size="small">{veileder.navn}</BodyShort>
        </InfoFelt>
    );
}

function NavKontor() {
    const { data } = usePersonData();
    const person = data?.person;
    const feilendeSystemer = data?.feilendeSystemer ?? [];
    const geografiskTilknytning = person?.geografiskTilknytning;
    const navEnhet = person?.navEnhet;

    if (harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.NORG_NAVKONTOR)) {
        return (
            <VStack gap="space-16">
                <HStack justify="space-between" align="center">
                    <Heading size="small" level="2">
                        Ukjent NAV-kontor
                    </Heading>
                    <NavLogoNy style={{ height: '1.2rem', width: 'auto' }} aria-hidden />
                </HStack>
                <InlineMessage status="warning" size="small">
                    Feilet ved uthenting av informasjon om NAV-kontor
                </InlineMessage>
            </VStack>
        );
    }

    if (!geografiskTilknytning) {
        return null;
    }

    if (!navEnhet) {
        return (
            <VStack gap="space-16">
                <HStack justify="space-between" align="center">
                    <Heading size="small" level="2">
                        {mapUgyldigGT(geografiskTilknytning)}
                    </Heading>
                    <NavLogoNy style={{ height: '1.2rem', width: 'auto' }} aria-hidden />
                </HStack>
                <Alert variant="warning" size="small">
                    Fant ikke geografisk tilknyttning for bruker
                </Alert>
            </VStack>
        );
    }

    const forsteMottakAdresse = navEnhet.publikumsmottak.at(0)?.besoksadresse;
    const apningstider = navEnhet.publikumsmottak.at(0)?.apningstider ?? [];
    const dagensApningstid = hentDagensApningstid(apningstider);

    return (
        <VStack gap="space-24">
            <HStack justify="space-between" align="center">
                <Heading size="small" level="2">
                    {navEnhet.navn}
                </Heading>
                <NavLogoNy style={{ height: '1.2rem', width: 'auto' }} aria-hidden />
            </HStack>

            <Veileder />

            <VStack gap="space-6">
                <HGrid columns={2} gap="space-16">
                    <InfoFelt label="Kontaktadresse">
                        {forsteMottakAdresse ? (
                            <Adresseinfo adresse={forsteMottakAdresse} />
                        ) : (
                            <BodyShort size="small" textColor="subtle">
                                {IKKE_TILGJENGELIG}
                            </BodyShort>
                        )}
                    </InfoFelt>

                    <InfoFelt label="E-post">
                        {navEnhet.epost ? (
                            <BodyShort size="small">{navEnhet.epost}</BodyShort>
                        ) : (
                            <BodyShort size="small" textColor="subtle">
                                {IKKE_TILGJENGELIG}
                            </BodyShort>
                        )}
                    </InfoFelt>
                </HGrid>

                <HGrid columns={2} gap="space-16">
                    <InfoFelt label="Åpent i dag">
                        {dagensApningstid ? (
                            <BodyShort size="small">{dagensApningstid}</BodyShort>
                        ) : (
                            <BodyShort size="small" textColor="subtle">
                                {IKKE_TILGJENGELIG}
                            </BodyShort>
                        )}
                    </InfoFelt>

                    <InfoFelt label="Telefonnummer">
                        {navEnhet.telefonnummer ? (
                            <BodyShort size="small">{navEnhet.telefonnummer}</BodyShort>
                        ) : (
                            <BodyShort size="small" textColor="subtle">
                                {IKKE_TILGJENGELIG}
                            </BodyShort>
                        )}
                    </InfoFelt>
                </HGrid>
            </VStack>

            <KontorLenke navEnhetId={navEnhet.id} />
        </VStack>
    );
}

export default NavKontor;
