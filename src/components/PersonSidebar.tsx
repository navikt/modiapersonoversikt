import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BellIcon,
    BriefcaseIcon,
    ChatIcon,
    FaceSmileIcon,
    FileIcon,
    HandShakeHeartIcon,
    PersonGroupIcon,
    PiggybankIcon
} from '@navikt/aksel-icons';
import { Box, Button, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { type ComponentProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './PersonSidebar.css';

type MenuItem = {
    title: string;
    href: ComponentProps<typeof Link>['to'];
    Icon: React.ExoticComponent;
};

const menuItems = [
    {
        title: 'Oversikt',
        href: '/new/person/oversikt',
        Icon: FaceSmileIcon
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
        title: 'Arbeid',
        href: '/new/person/oppfolging',
        Icon: BriefcaseIcon
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
        <Box background="surface-subtle" className="h-dvh" borderRadius="medium" margin="2">
            <Box padding="2" className="flex">
                <Button
                    aria-hidden
                    icon={
                        expanded ? (
                            <ArrowLeftIcon className="group-hover:-translate-x-1" />
                        ) : (
                            <ArrowRightIcon className="group-hover:translate-x-1" />
                        )
                    }
                    variant="tertiary-neutral"
                    size="small"
                    onClick={() => setExpanded((v) => !v)}
                    className="flex-1 justify-end group"
                    iconPosition="right"
                >
                    {expanded && <span className="font-normal">Skjul</span>}
                </Button>
            </Box>
            <VStack as="nav" aria-label="Person" padding="2" className="person-sidebar divide-y divide-border-divider">
                {menuItems.map(({ title, href, Icon }) => (
                    <Link key={title} to={href}>
                        {({ isActive }) => (
                            <Button
                                aria-hidden
                                icon={<Icon aria-hidden />}
                                variant="tertiary"
                                size="small"
                                className={twMerge(
                                    'my-1',
                                    'font-normal',
                                    expanded && ['justify-start', 'min-w-60'],
                                    isActive && [
                                        'bg-surface-alt-1',
                                        'text-text-on-alt-1',
                                        'hover:bg-surface-alt-1',
                                        'hover:text-text-on-alt-1'
                                    ]
                                )}
                            >
                                {expanded && <span className="font-normal">{title}</span>}
                            </Button>
                        )}
                    </Link>
                ))}
            </VStack>
        </Box>
    );
};
