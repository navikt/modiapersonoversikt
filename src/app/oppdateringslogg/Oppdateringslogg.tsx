import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react';
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
                <span className="oppdateringslogg-meny__knapp-innhold">
                    <BodyShort weight="semibold">{innslag.tittel}</BodyShort>
                    <BodyShort size="small" className="oppdateringslogg-meny__dato">
                        Lagt til {formatterDato(innslag.dato)}
                    </BodyShort>
                </span>
            </Button>
        </li>
    );
}

function Oppdateringslogg(props: { oppdateringslogg: OppdateringsloggInnslag[]; onClose: () => void }) {
    const { oppdateringslogg, onClose } = props;

    const sortertOppdateringslogg = [...oppdateringslogg].sort(datoSynkende((innslag) => innslag.dato));
    const [selectedId, setSelectedId] = useState<number>(sortertOppdateringslogg[0]?.id ?? -1);

    if (sortertOppdateringslogg.length === 0) {
        return <Alert variant="info">Fant ingen oppdateringer</Alert>;
    }

    const selectedEntry = sortertOppdateringslogg.find((i) => i.id === selectedId) ?? sortertOppdateringslogg[0];

    return (
        <div className="oppdateringslogg">
            <div className="oppdateringslogg__meny">
                <Heading size="large" className="oppdateringslogg__tittel">
                    Oppdateringslogg
                </Heading>
                <BodyShort size="small" className="oppdateringslogg__ingress">
                    Her finner du en oversikt over oppdateringer som er gjort i Modia personoversikt siste året
                </BodyShort>
                <ul className="oppdateringslogg-meny-elementer">
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
                <div className="oppdateringslogg__innhold-tekst">
                    <EnkeltOppdateringslogg enOppdateringslogg={selectedEntry} />
                </div>
                <div className="oppdateringslogg__lukk-rad">
                    <Button variant="tertiary" onClick={onClose}>
                        Lukk
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Oppdateringslogg;
