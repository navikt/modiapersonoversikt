import { ChevronDownIcon, ChevronUpIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, CopyButton, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useLocation } from '@tanstack/react-router';
import { Suspense, useEffect, useState } from 'react';
import config from 'src/config';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { Kjonn, type KodeBeskrivelseKjonn } from 'src/lib/types/modiapersonoversikt-api';
import useHotkey from 'src/utils/hooks/use-hotkey';
import { useClickAway } from 'src/utils/hooks/useClickAway';
import { twMerge } from 'tailwind-merge';
import Card from '../Card';
import ErrorBoundary from '../ErrorBoundary';
import { PersonBadges } from './Badges';
import { PersonlinjeDetails } from './Details';
import { Sikkerhetstiltak } from './Sikkerhetstiltak';

const ukjentKjonn: KodeBeskrivelseKjonn = {
    kode: Kjonn.U,
    beskrivelse: 'Ukjent kjønn'
};

export const PersonLinje = () => (
    <Suspense fallback={<Skeleton variant="rounded" height={40} />}>
        <ErrorBoundary boundaryName="personlinje">
            <PersonLinjeContent />
        </ErrorBoundary>
    </Suspense>
);

const PersonlinjeHeader = ({ isExpanded }: { isExpanded: boolean }) => {
    const { data } = usePersonData();

    const kjonn = data.person.kjonn.firstOrNull() ?? ukjentKjonn;
    const navn = data.person.navn.firstOrNull();

    return (
        <>
            <HStack gap="4" paddingBlock="2">
                <Personalia
                    navn={navn ? `${navn.fornavn} ${navn.mellomnavn ?? ''} ${navn.etternavn}` : 'UKJENT'}
                    kjonn={kjonn}
                    alder={data.person.alder}
                />
                <HStack align="center" className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                    <BodyShort size="small">F.nr: {data.person.personIdent}</BodyShort>
                    <CopyButton size="xsmall" copyText={data.person.personIdent} />
                </HStack>
                {data.person.kontaktInformasjon.mobil?.value && (
                    <HStack align="center" className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                        <BodyShort size="small">Tlf.nr: {data.person.kontaktInformasjon.mobil.value}</BodyShort>
                        <CopyButton size="xsmall" copyText={data.person.kontaktInformasjon.mobil.value} />
                    </HStack>
                )}
                <PersonBadges />
            </HStack>
            <VStack justify="center">
                <Button
                    className="grow-0"
                    size="small"
                    title="Åpne personlinje"
                    icon={isExpanded ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
                    variant="tertiary-neutral"
                />
            </VStack>
        </>
    );
};

const PersonLinjeContent = () => {
    const pathname = useLocation().pathname;
    const erPaaOversikt = pathname.includes('oversikt');
    const [isExpanded, setIsExpanded] = useState(erPaaOversikt);
    const ref = useClickAway<HTMLDivElement>(() => setIsExpanded(isExpanded));

    const { data } = usePersonData();

    const lenkeNyBrukerprofil = config.isProd ? 'https://pdl-web.intern.nav.no' : 'https://pdl-web.intern.dev.nav.no';

    useHotkey({ char: 'n', altKey: true }, () => setIsExpanded((v) => !v), [setIsExpanded], 'Visittkort');
    useHotkey(
        { char: 'b', altKey: true },
        () => window.open(lenkeNyBrukerprofil, '_blank', 'noopener noreferrer'),
        [lenkeNyBrukerprofil],
        'Visittkort'
    );

    useEffect(() => {
        setIsExpanded(erPaaOversikt);
    }, [erPaaOversikt]);

    return (
        <>
            <Sikkerhetstiltak sikkerhetstiltak={data.person.sikkerhetstiltak} />
            <Card
                ref={ref}
                as="section"
                aria-label="personlinje"
                className="has-[:focus]:border-ax-border-neutral-strong overflow-scroll max-h-[90vh]"
            >
                <Heading visuallyHidden size="xsmall" level="2">
                    Personlinje
                </Heading>
                <HStack
                    onClick={() => setIsExpanded((v) => !v)}
                    paddingInline="4"
                    justify="space-between"
                    className="hover:bg-ax-bg-neutral-moderate-hover cursor-pointer"
                    wrap={false}
                >
                    <PersonlinjeHeader isExpanded={isExpanded} />
                </HStack>
                <Box
                    className={twMerge(
                        'border-t border-ax-border-neutral-subtle transition-all duration-75',
                        !isExpanded && 'h-0 invisible overflow-hidden'
                    )}
                >
                    <PersonlinjeDetails />
                </Box>
            </Card>
        </>
    );
};

type PersonaliaProps = {
    navn: string;
    alder?: number;
    kjonn: KodeBeskrivelseKjonn;
};

const Personalia = ({ navn, alder, kjonn }: PersonaliaProps) => {
    return (
        <HStack align="center" gap="1">
            <PersonIcon fontSize="1.2rem" aria-hidden />
            <p className="capitalize font-medium">{navn.toLowerCase()}</p>
            <BodyShort>
                ({kjonn.beskrivelse}, {alder ?? 'Unkjent alder'})
            </BodyShort>
        </HStack>
    );
};
