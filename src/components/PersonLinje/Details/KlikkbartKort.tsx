import type { ComponentProps, KeyboardEvent, PropsWithChildren, ReactNode } from 'react';
import Card from 'src/components/Card';

type CardProps = ComponentProps<typeof Card>;

type Props = PropsWithChildren<{
    ariaLabel: string;
    onAktiver: () => void;
    children: ReactNode;
}> &
    Omit<CardProps, 'onClick' | 'onKeyDown' | 'onKeyUp' | 'role' | 'tabIndex' | 'aria-label' | 'children'>;

function KlikkbartKort({ ariaLabel, onAktiver, children, style, ...rest }: Props) {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            return;
        }
        if (event.key === 'Enter' && !event.repeat) {
            event.preventDefault();
            onAktiver();
        }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            onAktiver();
        }
    };

    return (
        <Card
            {...rest}
            style={{ cursor: 'pointer', ...style }}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel}
            onClick={onAktiver}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        >
            {children}
        </Card>
    );
}

export default KlikkbartKort;
