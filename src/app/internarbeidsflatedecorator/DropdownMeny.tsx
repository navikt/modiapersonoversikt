import { SparklesIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useSetAtom } from 'jotai';
import { type KeyboardEvent, useRef, useState } from 'react';
import { openIntroduksjonsModalAtom } from 'src/components/NyModia/useHarSettNyModiaDialog';
import { NyModiaSwitch } from 'src/components/NyModiaSwitch';
import { openLumiFeedbackModalAtom } from './LumiFeedbackModal';

export const DropdownMeny = () => {
    const openIntroduksjonsModal = useSetAtom(openIntroduksjonsModalAtom);
    const openLumiFeedbackModal = useSetAtom(openLumiFeedbackModalAtom);
    const ref = useRef<HTMLInputElement | null>(null);
    const [openedWithKeyboard, setOpenedWithKeyboard] = useState(false);

    const onOpenChange = (open: boolean): void => {
        if (open && openedWithKeyboard) {
            setTimeout(() => ref.current?.focus(), 50);
        }
        if (!open) setOpenedWithKeyboard(false);
    };

    const handleContentKeyDown = (e: KeyboardEvent): void => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

        const content = e.currentTarget as HTMLElement;
        const items = Array.from(content.querySelectorAll<HTMLElement>('[role="menuitem"]:not([data-disabled])'));

        const currentIndex = items.indexOf(document.activeElement as HTMLElement);
        if (currentIndex === -1) return;

        const nextIndex =
            e.key === 'ArrowDown'
                ? (currentIndex + 1) % items.length
                : (currentIndex - 1 + items.length) % items.length;

        items[nextIndex]?.focus();
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <ActionMenu onOpenChange={onOpenChange}>
            <ActionMenu.Trigger onKeyDown={() => setOpenedWithKeyboard(true)}>
                <Button
                    className="py-[0.5rem]"
                    id="ny-modia-knapp"
                    data-color="neutral"
                    title="Åpne handlinger for ny Modia"
                    variant="secondary"
                    icon={<SparklesIcon aria-hidden />}
                />
            </ActionMenu.Trigger>
            <ActionMenu.Content onKeyDown={handleContentKeyDown}>
                <ActionMenu.Group label="Velg versjon">
                    <NyModiaSwitch ref={ref} />
                    <ActionMenu.Item onClick={() => openLumiFeedbackModal(true)}>Gi tilbakemelding</ActionMenu.Item>
                </ActionMenu.Group>
                <ActionMenu.Divider />
                <ActionMenu.Group label="Veiledning og tilbakemelding">
                    <ActionMenu.Item onClick={() => openIntroduksjonsModal(true)}>Introduksjon</ActionMenu.Item>
                    <a
                        href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-fagsystemer/SitePages/Brukermanual-Modia-personoversikt.aspx?csf=1&web=1&e=84H1WV"
                        target="_blank"
                        rel="noopener"
                    >
                        <ActionMenu.Item>Brukerveiledning</ActionMenu.Item>
                    </a>
                </ActionMenu.Group>
            </ActionMenu.Content>
        </ActionMenu>
    );
};
