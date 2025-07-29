import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BellIcon,
    ChatIcon,
    FileIcon,
    HandShakeHeartIcon,
    HouseIcon,
    PersonGroupIcon,
    PiggybankIcon
} from '@navikt/aksel-icons';
import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { type ComponentProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import { ThemeIconToggle, ThemeToggle } from './theme/ThemeToggle';

type MenuItem = {
    title: string;
    href: ComponentProps<typeof Link>['to'];
    Icon: React.ExoticComponent;
};

const menuItems = [
    {
        title: 'Oversikt',
        href: '/new/person/oversikt',
        Icon: HouseIcon
    },
    {
        title: 'Oppfølging',
        href: '/new/person/oppfolging',
        Icon: PersonGroupIcon
    },
    {
        title: 'Kommunikasjon',
        href: '/new/person/meldinger',
        Icon: ChatIcon
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
        title: 'Saker',
        href: '/new/person/saker',
        Icon: FileIcon
    },
    {
        title: 'Varsler',
        href: '/new/person/varsler',
        Icon: BellIcon
    }
] as const satisfies MenuItem[];

export const PersonSidebarMenu = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <Card className="h-full overflow-auto">
            <VStack justify="space-between" height="100%" as="nav">
                <Box.New>
                    <Box.New padding="2" className="flex">
                        <Button
                            icon={
                                expanded ? (
                                    <ArrowLeftIcon className="group-hover:-translate-x-1" aria-hidden />
                                ) : (
                                    <ArrowRightIcon className="group-hover:translate-x-1" aria-hidden />
                                )
                            }
                            aria-controls="sidebar-person"
                            aria-expanded={expanded}
                            variant="tertiary-neutral"
                            size="small"
                            onClick={() => setExpanded((v) => !v)}
                            className="flex-1 justify-end group p-0"
                            iconPosition="right"
                        >
                            {expanded && <span className="font-normal">Skjul</span>}
                            {!expanded && <span className="sr-only">Vis</span>}
                        </Button>
                    </Box.New>
                    <VStack
                        id="sidebar-person"
                        aria-label="Person"
                        padding="2"
                        className="divide-y divide-ax-border-neutral-subtle "
                    >
                        <Heading visuallyHidden size="small" level="2">
                            Faner
                        </Heading>
                        {menuItems.map(({ title, href, Icon }) => (
                            <Link key={title} to={href} aria-label={title}>
                                {({ isActive }) => (
                                    <Button
                                        aria-hidden
                                        tabIndex={-1}
                                        icon={<Icon aria-hidden />}
                                        variant="tertiary-neutral"
                                        size="small"
                                        className={twMerge(
                                            'my-1',
                                            'font-normal',
                                            !isActive && ['hover:bg-ax-bg-accent-moderate-hover'],
                                            expanded && ['justify-start', 'min-w-44'],
                                            isActive && [
                                                'bg-ax-bg-accent-moderate-pressed',
                                                'text-ax-text-accent',
                                                'hover:text-ax-text-accent'
                                            ]
                                        )}
                                    >
                                        {expanded && <span className="font-normal">{title}</span>}
                                    </Button>
                                )}
                            </Link>
                        ))}
                    </VStack>
                </Box.New>
                <Box.New padding="2">{expanded ? <ThemeToggle /> : <ThemeIconToggle />}</Box.New>
            </VStack>
        </Card>
    );
};
