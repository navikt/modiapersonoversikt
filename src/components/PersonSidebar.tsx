import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BellIcon,
    ChatElipsisIcon,
    CircleFillIcon,
    FolderIcon,
    HandShakeHeartIcon,
    HouseIcon,
    PersonGroupIcon,
    PiggybankIcon
} from '@navikt/aksel-icons';
import { Bleed, Box, Button, Heading, HStack, Tag, Tooltip, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { type ComponentProps, type KeyboardEvent, type ReactElement, useRef } from 'react';
import { getOpenTabFromRouterPath, useOpenTab } from 'src/app/personside/infotabs/utils/useOpenTab';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { erUbesvartHenvendelseFraBruker, useTraader } from 'src/components/Meldinger/List/utils';
import { usePersonSideBarKotkeys } from 'src/components/usePersonSidebarHotkeys';
import { usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { ekspanderSidebarAtom } from 'src/lib/state/dialog';
import { trackFaneEndret } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import { ThemeIconToggle } from './theme/ThemeToggle';

type MenuItem = {
    title: string;
    href: ComponentProps<typeof Link>['to'];
    Icon: React.ExoticComponent;
    krevFeatureToggle?: FeatureToggles;
    beta?: boolean;
};

type ConditionalTooltipProps = {
    content: string;
    enabled: boolean;
    children: ReactElement;
};

const ConditionalTooltip = ({ content, enabled, children }: ConditionalTooltipProps) => {
    if (!enabled) return <>{children}</>;
    return (
        <Tooltip content={content} placement="right">
            {children}
        </Tooltip>
    );
};

export const menuItems = [
    {
        title: 'Hjem',
        href: '/new/person/hjem',
        Icon: HouseIcon,
        krevFeatureToggle: FeatureToggles.NyOversiktDesign,
        beta: true
    },
    {
        title: 'Oversikt',
        href: '/new/person/oversikt',
        Icon: HouseIcon
    },
    {
        title: 'Kommunikasjon',
        href: '/new/person/meldinger',
        Icon: ChatElipsisIcon
    },
    {
        title: 'Oppfølging',
        href: '/new/person/oppfolging',
        Icon: PersonGroupIcon
    },
    {
        title: 'Utbetaling',
        href: '/new/person/utbetaling',
        Icon: PiggybankIcon
    },
    {
        title: 'Ytelser',
        href: '/new/person/ytelser',
        Icon: HandShakeHeartIcon
    },
    {
        title: 'Dokumenter',
        href: '/new/person/dokumenter',
        Icon: FolderIcon
    },
    {
        title: 'Varsler',
        href: '/new/person/varsler',
        Icon: BellIcon
    }
] as const satisfies MenuItem[];

export const PersonSidebarMenu = () => {
    const [ekspanderSidebarMedStorage, setEkspanderSidebarMedStorage] = useAtom(ekspanderSidebarAtom);

    const openTab = useOpenTab();
    usePersonSideBarKotkeys();
    const { data: traader = [] } = useTraader();
    const { data: oppgaver = [] } = usePersonOppgaver();
    const nyOversiktDesign = useFeatureToggle(FeatureToggles.NyOversiktDesign);
    const harOppgaverPaaEnTraad = oppgaver.some((oppgave) => oppgave.traadId !== null);
    const harUbesvarteTraader = traader.some((traad) => erUbesvartHenvendelseFraBruker(traad));
    const navRef = useRef<HTMLDivElement>(null);

    const featureToggleStatus: Partial<Record<FeatureToggles, boolean>> = {
        [FeatureToggles.NyOversiktDesign]: nyOversiktDesign.isOn === true
    };
    const synligeMenuItems = menuItems.filter(
        (item) => !('krevFeatureToggle' in item) || featureToggleStatus[item.krevFeatureToggle]
    );

    const visNotifikasjon = (tab: string) => {
        if (tab !== 'Kommunikasjon') return false;
        return harOppgaverPaaEnTraad || harUbesvarteTraader;
    };

    const handleNavKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        const links = Array.from(navRef.current?.querySelectorAll<HTMLElement>('a') ?? []);
        const currentIndex = links.indexOf(document.activeElement as HTMLElement);
        if (currentIndex === -1) return;
        e.preventDefault();
        const lastIndex = links.length - 1;
        const nextIndex = e.key === 'ArrowDown' ? Math.min(currentIndex + 1, lastIndex) : Math.max(currentIndex - 1, 0);
        links[nextIndex].focus();
    };

    return (
        <Card className="h-full overflow-auto">
            <VStack justify="space-between" height="100%">
                <Box>
                    <Box padding="space-8" className="flex">
                        <Button
                            data-color="neutral"
                            icon={
                                ekspanderSidebarMedStorage ? (
                                    <ArrowLeftIcon className="group-hover:-translate-x-1" aria-hidden />
                                ) : (
                                    <ArrowRightIcon className="group-hover:translate-x-1" aria-hidden />
                                )
                            }
                            aria-controls="sidebar-person"
                            aria-expanded={ekspanderSidebarMedStorage}
                            variant="tertiary"
                            size="small"
                            onClick={() => setEkspanderSidebarMedStorage((v) => !v)}
                            className="flex-1 justify-end group p-0"
                            iconPosition="right"
                        >
                            {ekspanderSidebarMedStorage && <span className="font-normal">Skjul</span>}
                            {!ekspanderSidebarMedStorage && <span className="sr-only">Vis</span>}
                        </Button>
                    </Box>
                    <VStack
                        as="nav"
                        id="sidebar-person"
                        ref={navRef}
                        aria-label="Person sidenavigasjon"
                        padding="space-8"
                        className="divide-y divide-ax-border-neutral-subtle "
                        onKeyDown={handleNavKeyDown}
                    >
                        <Heading visuallyHidden size="small" level="2">
                            Faner
                        </Heading>
                        {synligeMenuItems.map((item) => {
                            const { title, href, Icon } = item;
                            const beta = 'beta' in item && item.beta;
                            const tittelMedBeta = beta ? `${title} (beta)` : title;
                            return (
                                <ConditionalTooltip
                                    key={title}
                                    content={tittelMedBeta}
                                    enabled={!ekspanderSidebarMedStorage}
                                >
                                    <Link
                                        onClick={() => {
                                            trackFaneEndret(getOpenTabFromRouterPath(href).path, openTab.path);
                                        }}
                                        to={href}
                                        aria-label={tittelMedBeta}
                                        activeProps={{ tabIndex: 0 }}
                                        inactiveProps={{ tabIndex: -1 }}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <Button
                                                    data-color="neutral"
                                                    aria-hidden
                                                    tabIndex={-1}
                                                    icon={
                                                        <>
                                                            <Icon aria-hidden />
                                                            {visNotifikasjon(title) && (
                                                                <Box
                                                                    position="absolute"
                                                                    className={
                                                                        ekspanderSidebarMedStorage ? 'left-6' : 'left-4'
                                                                    }
                                                                >
                                                                    <Bleed marginBlock="space-2" asChild>
                                                                        <CircleFillIcon
                                                                            fontSize="0.8rem"
                                                                            color="var(--ax-text-logo)"
                                                                            title="Brukeren har ubesvarte meldinger og/eller oppgave må løses"
                                                                        />
                                                                    </Bleed>
                                                                </Box>
                                                            )}
                                                        </>
                                                    }
                                                    variant="tertiary"
                                                    size="small"
                                                    className={twMerge(
                                                        'my-1 relative',
                                                        'font-normal',
                                                        !isActive && ['hover:bg-ax-bg-accent-moderate-hover'],
                                                        ekspanderSidebarMedStorage && ['justify-start', 'min-w-42'],
                                                        isActive && [
                                                            'bg-ax-bg-accent-moderate-pressed',
                                                            'text-ax-text-accent',
                                                            'hover:text-ax-text-accent'
                                                        ]
                                                    )}
                                                >
                                                    {ekspanderSidebarMedStorage && (
                                                        <HStack gap="space-8" align="center" wrap={false}>
                                                            <span className="font-normal">{title}</span>
                                                            {beta && (
                                                                <Tag
                                                                    data-color="success"
                                                                    variant="moderate"
                                                                    size="small"
                                                                >
                                                                    Beta
                                                                </Tag>
                                                            )}
                                                        </HStack>
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                    </Link>
                                </ConditionalTooltip>
                            );
                        })}
                    </VStack>
                </Box>
                <Box padding="space-8">
                    <ThemeIconToggle />
                </Box>
            </VStack>
        </Card>
    );
};
