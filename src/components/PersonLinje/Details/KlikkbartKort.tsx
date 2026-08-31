import type { ComponentProps, KeyboardEvent, PropsWithChildren, ReactNode } from 'react';
import Card from 'src/components/Card';

type CardProps = ComponentProps<typeof Card>;

type Props = PropsWithChildren<{
    ariaLabel: string;
    onAktiver: () => void;
    children: ReactNode;
}> &
    Omit<CardProps, 'onClick' | 'onKeyDown' | 'role' | 'tabIndex' | 'aria-label' | 'children'>;

function KlikkbartKort({ ariaLabel, onAktiver, children, style, ...rest }: Props) {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
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
        >
            {children}
        </Card>
    );
}

export default KlikkbartKort;
