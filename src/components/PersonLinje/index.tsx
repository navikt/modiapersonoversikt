import { ChevronDownIcon, ChevronUpIcon, FigureInwardIcon, FigureOutwardIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, CopyButton, Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { useLocation } from '@tanstack/react-router';
import { Suspense, useEffect, useState } from 'react';
import { erUbesvartHenvendelseFraBruker, useTraader } from 'src/components/Meldinger/List/utils';
import { useFilterOppgave } from 'src/components/Oppgave/List/utils';
import Statsborgerskap from 'src/components/PersonLinje/Details/Familie/Statsborgerskap';
import config from 'src/config';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { type Dodsdato, Kjonn, type KodeBeskrivelseKjonn } from 'src/lib/types/modiapersonoversikt-api';
import { trackAccordionClosed, trackAccordionOpened } from 'src/utils/analytics';
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
    const { traader } = useTraader();
    const { oppgaver } = useFilterOppgave();

    const antallUbesvarteTraader = traader?.filter((traad) => erUbesvartHenvendelseFraBruker(traad))?.length;

    const kjonn = data.person.kjonn.firstOrNull() ?? ukjentKjonn;
    const navn = data.person.navn.firstOrNull();

    return (
        <>
            <VStack gap="2" paddingBlock="2" id="personlinje-header" className="focus:outline-0" tabIndex={-1}>
                <HStack gap="1" align="center">
                    <Personalia
                        navn={navn ? `${navn.fornavn} ${navn.mellomnavn ?? ''} ${navn.etternavn}` : 'UKJENT'}
                        kjonn={kjonn}
                        alder={data.person.alder}
                        dodsDato={data.person.dodsdato}
                    />
                    <HStack align="center" className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                        <BodyShort size="small">
                            <CopyButton
                                aria-label={`Kopier f.nr: ${data.person.personIdent}`}
                                size="xsmall"
                                copyText={data.person.personIdent}
                                activeText="Kopiert f.nr"
                                text={`F.nr: ${data.person.personIdent}`}
                            />
                        </BodyShort>
                    </HStack>
                    {data.person.kontaktInformasjon.mobil?.value && (
                        <HStack align="center" className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                            <CopyButton
                                activeText="Kopiert tlf.nr"
                                aria-label={`Kopier tlf.nr: ${data.person.kontaktInformasjon.mobil.value}`}
                                text={`Tlf.nr: ${data.person.kontaktInformasjon.mobil.value}`}
                                size="xsmall"
                                copyText={data.person.kontaktInformasjon.mobil.value}
                            />
                        </HStack>
                    )}
                    <Statsborgerskap />
                </HStack>
                <PersonBadges />
                {oppgaver.length > 0 && (
                    <BodyShort visuallyHidden>{`Bruker har ${oppgaver.length} åpne oppgaver`}</BodyShort>
                )}
                {antallUbesvarteTraader > 0 && (
                    <BodyShort visuallyHidden>{`Bruker har ${antallUbesvarteTraader} ubesvart hendelse`}</BodyShort>
                )}
            </VStack>
            <VStack justify="center">
                <Button
                    className="grow-0"
                    size="small"
                    title={isExpanded ? 'Skjul personinformasjon' : 'Vis personinformasjon'}
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

    useHotkey({ char: 'n', altKey: true }, () => setIsExpanded((v) => toggleExpand(!v)), [setIsExpanded], 'Visittkort');
    useHotkey(
        { char: 'b', altKey: true },
        () => window.open(lenkeNyBrukerprofil, '_blank', 'noopener noreferrer'),
        [lenkeNyBrukerprofil],
        'Visittkort'
    );

    const toggleExpand = (expand: boolean) => {
        if (expand) {
            trackAccordionOpened('Visittkort');
        } else {
            trackAccordionClosed('Visittkort');
        }
        return expand;
    };

    useEffect(() => {
        setIsExpanded(erPaaOversikt);
    }, [erPaaOversikt]);

    return (
        <>
            <Sikkerhetstiltak sikkerhetstiltak={data.person.sikkerhetstiltak} />
            <Card
                aria-labelledby="personinformasjon-heading"
                ref={ref}
                as="section"
                className={twMerge(
                    'has-[:focus]:border-ax-border-neutral-strong',
                    isExpanded ? 'h-full flex flex-col' : 'h-100 flex-0'
                )}
            >
                <HStack
                    onClick={() => setIsExpanded((v) => toggleExpand(!v))}
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
                        isExpanded && 'flex-1 overflow-y-auto',
                        !isExpanded && 'h-0 invisible overflow-hidden flex-0'
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
    dodsDato?: Dodsdato[];
};

const Personalia = ({ navn, alder, kjonn, dodsDato }: PersonaliaProps) => {
    const dato = dodsDato?.firstOrNull();
    const erDod = !!dato?.dodsdato;

    const farge = erDod
        ? 'var(--ax-text-neutral-subtle)'
        : kjonn.kode === Kjonn.K
          ? 'var(--ax-bg-meta-purple-strong-pressed)'
          : kjonn.kode === Kjonn.M
            ? 'var(--ax-text-accent-decoration)'
            : 'var(--ax-text-neutral-subtle)';

    return (
        <HStack align="center" gap="1">
            <HStack gap="3" align="center">
                <Box.New borderRadius="full" borderWidth="2" style={{ borderColor: farge }}>
                    {kjonn.kode === Kjonn.K ? (
                        <FigureOutwardIcon aria-hidden color={farge} fontSize="2rem" />
                    ) : (
                        <FigureInwardIcon aria-hidden color={farge} fontSize="2rem" />
                    )}
                </Box.New>

                <Heading
                    id="personinformasjon-heading"
                    size="xsmall"
                    as="h2"
                    style={{ color: farge }}
                    className="capitalize font-medium"
                >
                    {navn.toLowerCase()}
                </Heading>
            </HStack>
            <BodyShort style={{ color: farge }}>
                ({kjonn.beskrivelse}, {erDod ? 'død' : (alder ?? 'Ukjent alder')})
            </BodyShort>
        </HStack>
    );
};
