import {
    EnvelopeClosedIcon,
    GavelSoundBlockIcon,
    HandHeartIcon,
    HouseIcon,
    PersonGroupIcon,
    PersonTallShortIcon,
    PiggybankIcon
} from '@navikt/aksel-icons';
import { Heading, HGrid, HStack, Skeleton, VStack } from '@navikt/ds-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { AlertBanner } from 'src/components/AlertBanner';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { Kjonn } from 'src/lib/types/modiapersonoversikt-api';
import DeltBosted from './DeltBosted';
import DodsdatoInfo from './DodsdatoInfo';
import Familie from './Familie';
import FamilieGammel from './Familie/FamilieGammel';
import Flytting from './Flytting';
import ForeldreAnsvar from './ForeldreAnsvar';
import Fullmakt from './Fullmakt';
import KontaktInfo from './KontaktInfo';
import NavKontor from './NavKontor';
import NavKontorGammel from './NavKontor/NavKontorGammel';
import OppfolgingOversikt from './OppfolgingOversikt';
import OppgaverOversikt from './OppgaverOversikt';
import PdlLenke from './PdlLenke';
import RettsligHandleevne from './RettsligHandleevne';
import Sikkerhetstiltak from './Sikkerhetstiltak';
import TilrettelagtKommunikasjon from './TilrettelagtKommunikasjon';
import TopKort from './TopKort';
import UtbetalingerOversikt from './UtbetalingerOversikt';
import Vergemal from './Vergemal';
import VergemalGammel from './VergemalGammel';
import YtelserOversikt from './YtelserOversikt';

export const OversiktWrapper = () => {
    const { errorMessages, isLoading, isError } = usePersonData();
    const featureToggle = useFeatureToggle(FeatureToggles.NyOversiktDesign);

    return (
        <ErrorBoundary boundaryName="personlinje">
            {isLoading || featureToggle.pending ? (
                <Skeleton variant="rectangle" height="100%" />
            ) : isError ? (
                <AlertBanner alerts={errorMessages} />
            ) : featureToggle.isOn ? (
                <PersonlinjeDetails />
            ) : (
                <PersonlinjeDetailsGammel />
            )}
        </ErrorBoundary>
    );
};

function SeksjonWrapper({ tittel, icon, children }: PropsWithChildren<{ tittel: string; icon?: ReactNode }>) {
    return (
        <VStack gap="space-4" as="section">
            <HStack gap="space-2" align="center">
                {icon}
                <Heading size="small" level="2">
                    {tittel}
                </Heading>
            </HStack>
            {children}
        </VStack>
    );
}

function hentToppkortBakgrunn(kjonn: string | undefined, erDod: boolean): string | undefined {
    if (erDod) return undefined;
    if (kjonn === Kjonn.K) return 'var(--ax-bg-brand-magenta-soft)';
    if (kjonn === Kjonn.M) return 'var(--ax-bg-info-soft)';
    return undefined;
}

const PersonlinjeDetails = () => {
    const { data } = usePersonData();
    const kjonn = data?.person?.kjonn.firstOrNull()?.kode;
    const erDod = data?.person?.dodsdato?.isNotEmpty() ?? false;
    const bakgrunn = hentToppkortBakgrunn(kjonn, erDod);

    return (
        <Card className="overflow-auto">
            <VStack gap="space-32">
                <div
                    className="flex items-stretch gap-0 pl-[69px] pr-8 py-6"
                    style={bakgrunn ? { backgroundColor: bakgrunn } : undefined}
                >
                    <div className="flex-7 pr-8 pt-6">
                        <TopKort />
                    </div>
                    <div style={{ borderLeft: '1px solid var(--ax-border-neutral-subtle)', margin: '0 1rem' }} />
                    <div className="flex-3 pl-4 pt-6">
                        <NavKontor />
                    </div>
                </div>

                <HStack gap="space-96" align="start" wrap={false} className="pl-[69px] pr-[133px] pt-8 pb-4">
                    <VStack gap="space-32" flexBasis="50%" flexGrow="1">
                        <SeksjonWrapper tittel="Oppfølging" icon={<PersonGroupIcon aria-hidden fontSize="2rem" />}>
                            <OppfolgingOversikt />
                        </SeksjonWrapper>
                        <SeksjonWrapper tittel="Ytelser" icon={<HandHeartIcon aria-hidden fontSize="2rem" />}>
                            <YtelserOversikt />
                        </SeksjonWrapper>
                        <SeksjonWrapper tittel="Oppgaver" icon={<EnvelopeClosedIcon aria-hidden fontSize="2rem" />}>
                            <OppgaverOversikt />
                        </SeksjonWrapper>
                    </VStack>
                    <VStack gap="space-32" flexBasis="50%" flexGrow="1">
                        <SeksjonWrapper tittel="Utbetalinger" icon={<PiggybankIcon aria-hidden fontSize="2rem" />}>
                            <UtbetalingerOversikt />
                        </SeksjonWrapper>
                        <HGrid columns={2} gap="space-64" align="start">
                            <SeksjonWrapper tittel="Familie" icon={<PersonTallShortIcon aria-hidden fontSize="2rem" />}>
                                <Familie />
                            </SeksjonWrapper>
                            <SeksjonWrapper tittel="Verge" icon={<GavelSoundBlockIcon aria-hidden fontSize="2rem" />}>
                                <Vergemal />
                            </SeksjonWrapper>
                        </HGrid>
                        <SeksjonWrapper tittel="Flytting" icon={<HouseIcon aria-hidden fontSize="2rem" />}>
                            <Flytting />
                        </SeksjonWrapper>
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

const PersonlinjeDetailsGammel = () => {
    return (
        <Card className="overflow-auto">
            <HStack gap="space-16" justify="space-between" padding="space-16">
                <VStack flexBasis="30%" flexGrow="1">
                    <DodsdatoInfo />
                    <KontaktInfo />
                    <Fullmakt />
                </VStack>
                <VStack flexBasis="30%" flexGrow="1">
                    <FamilieGammel />
                    <ForeldreAnsvar />
                    <DeltBosted />
                    <TilrettelagtKommunikasjon />
                    <VergemalGammel />
                    <RettsligHandleevne />
                </VStack>
                <VStack flexBasis="30%" flexGrow="1">
                    <NavKontorGammel />
                    <Sikkerhetstiltak />
                    <Flytting />
                    <PdlLenke />
                </VStack>
            </HStack>
        </Card>
    );
};
