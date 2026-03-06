import { ExpansionCard } from '@navikt/ds-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { trackExpansionCardApnet, trackExpansionCardLukket } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';

export const FilterExpansionCard = ({
    fane,
    title,
    children
}: {
    fane: string;
    title: ReactNode;
    children: ReactNode;
}) => {
    const [expanded, setExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const toggle = (open: boolean) => {
        setExpanded(open);
        open ? trackExpansionCardApnet(fane) : trackExpansionCardLukket(fane);
    };

    useEffect(() => {
        // Lukk kortet når Escape trykkes og fokuset er innenfor kortet
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && expanded && cardRef.current) {
                const focusedElement = document.activeElement;
                if (cardRef.current.contains(focusedElement)) {
                    toggle(false);
                    const button = cardRef.current.querySelector('button');
                    button?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [expanded]);

    return (
        <ExpansionCard
            ref={cardRef}
            onToggle={toggle}
            open={expanded}
            size="small"
            aria-label={`${fane}-filter`}
            className={twMerge('border-none rounded-xs')}
        >
            <ExpansionCard.Header className="py-0 pr-0 hover:rounded-xs">
                <ExpansionCard.Title size="small" as="h3" className="text-ax-medium">
                    {title}
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content className="h-full">{children}</ExpansionCard.Content>
        </ExpansionCard>
    );
};
