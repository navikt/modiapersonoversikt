import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { datoSynkende, formatterDato } from '../../utils/date-utils';
import EnkeltOppdateringslogg from './EnkeltOppdateringslogg';
import type { OppdateringsloggInnslag } from './OppdateringsloggContainer';

function MenyItem({
    innslag,
    erAktiv,
    onClick
}: {
    innslag: OppdateringsloggInnslag;
    erAktiv: boolean;
    onClick: () => void;
}) {
    return (
        <li className="oppdateringslogg-meny__item">
            <Button
                variant="tertiary"
                onClick={onClick}
                aria-current={erAktiv ? true : undefined}
                className={
                    erAktiv
                        ? 'oppdateringslogg-meny__knapp oppdateringslogg-meny__knapp--aktiv'
                        : 'oppdateringslogg-meny__knapp'
                }
            >
                <VStack gap="space-4" align="start">
                    <BodyShort weight="semibold">{innslag.tittel}</BodyShort>
                    <BodyShort size="small" className="text-ax-text-neutral-subtle">
                        Lagt til {formatterDato(innslag.dato)}
                    </BodyShort>
                </VStack>
            </Button>
        </li>
    );
}

function handleMenyKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button'));
    const idx = buttons.findIndex((el) => el === document.activeElement);
    if (idx === -1) return;
    const next = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
    buttons[Math.max(0, Math.min(buttons.length - 1, next))]?.focus();
}

function Oppdateringslogg(props: { oppdateringslogg: OppdateringsloggInnslag[] }) {
    const { oppdateringslogg } = props;

    const sortertOppdateringslogg = [...oppdateringslogg].sort(datoSynkende((innslag) => innslag.dato));
    const [selectedId, setSelectedId] = useState<number>(sortertOppdateringslogg[0]?.id ?? -1);

    if (sortertOppdateringslogg.length === 0) {
        return <Alert variant="info">Fant ingen oppdateringer</Alert>;
    }

    const selectedEntry = sortertOppdateringslogg.find((i) => i.id === selectedId) ?? sortertOppdateringslogg[0];

    return (
        <HStack height="100%" padding="space-24" wrap={false} align="stretch">
            <div className="oppdateringslogg__meny">
                <VStack paddingBlock="space-0 space-16" gap="space-8">
                    <Heading size="large">Oppdateringslogg</Heading>
                    <BodyShort size="small">
                        Her finner du en oversikt over oppdateringer som er gjort i Modia personoversikt siste året
                    </BodyShort>
                </VStack>
                <ul className="oppdateringslogg-meny-liste" onKeyDown={handleMenyKeyDown}>
                    {sortertOppdateringslogg.map((innslag) => (
                        <MenyItem
                            key={innslag.id}
                            innslag={innslag}
                            erAktiv={innslag.id === selectedEntry.id}
                            onClick={() => setSelectedId(innslag.id)}
                        />
                    ))}
                </ul>
            </div>

            <div className="oppdateringslogg__innhold">
                <EnkeltOppdateringslogg enOppdateringslogg={selectedEntry} />
            </div>
        </HStack>
    );
}

export default Oppdateringslogg;
