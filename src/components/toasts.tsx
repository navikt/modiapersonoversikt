import {
    BellFillIcon,
    CheckmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
    XMarkOctagonFillIcon
} from '@navikt/aksel-icons';
import { BodyShort, Box, type BoxNewProps } from '@navikt/ds-react';
import type { JSX } from 'react';
import { toast as sonnerToast } from 'sonner';
import { twMerge } from 'tailwind-merge';

interface ToastProps {
    id: string | number;
    title: string;
    description?: string;
    type: 'info' | 'success' | 'error' | 'warning';
}

export function toast({ title, description }: Omit<ToastProps, 'id' | 'type'>) {
    return sonnerToast.custom((id) => <Toast id={id} title={title} description={description} type="info" />);
}

toast.info = (title: string, toastProps?: Omit<ToastProps, 'id' | 'type' | 'title'>) =>
    sonnerToast.custom((id) => <Toast id={id} type="info" title={title} {...toastProps} />);

toast.success = (title: string, toastProps?: Omit<ToastProps, 'id' | 'type' | 'title'>) =>
    sonnerToast.custom((id) => <Toast id={id} type="success" title={title} {...toastProps} />);

toast.error = (title: string, toastProps?: Omit<ToastProps, 'id' | 'type' | 'title'>) =>
    sonnerToast.custom((id) => <Toast id={id} type="error" title={title} {...toastProps} />);

toast.warning = (title: string, toastProps?: Omit<ToastProps, 'id' | 'type' | 'title'>) =>
    sonnerToast.custom((id) => <Toast id={id} type="warning" title={title} {...toastProps} />);

const Toast = ({ title, description, type }: ToastProps) => {
    let bg: BoxNewProps['background'] = 'raised';
    let className: BoxNewProps['className'] = 'ring-ax-border-neutral-subtle';
    let icon: JSX.Element = <BellFillIcon />;

    if (type === 'success') {
        bg = 'success-moderate';
        className = 'text-ax-text-success ring-ax-border-success-subtle';
        icon = <CheckmarkCircleFillIcon className="text-ax-text-success-icon" />;
    }
    if (type === 'error') {
        bg = 'danger-moderate';
        className = 'text-ax-text-danger ring-ax-border-danger-subtle';
        icon = <XMarkOctagonFillIcon className="text-ax-text-danger-icon" />;
    }
    if (type === 'warning') {
        bg = 'warning-moderate';
        className = 'text-ax-text-warning ring-ax-border-warning-subtle';
        icon = <ExclamationmarkTriangleFillIcon className="text-ax-text-warning-icon" />;
    }

    return (
        <Box.New
            background={bg}
            padding="4"
            width="var(--width)"
            className={twMerge('flex flex-col rounded-lg justify-center shadow-lg ring-1 ring-black/5', className)}
            aria-live="polite"
        >
            <div className="flex gap-2 items-center">
                <div aria-hidden className="flex items-start">
                    {icon}
                </div>
                <BodyShort weight="semibold">{title}</BodyShort>
            </div>
            <div className="mt-1">
                {description && (
                    <BodyShort size="small" textColor="subtle">
                        {description}
                    </BodyShort>
                )}
            </div>
        </Box.New>
    );
};
