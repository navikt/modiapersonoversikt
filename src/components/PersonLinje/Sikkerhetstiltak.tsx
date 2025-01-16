import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import ValidPeriod from './common/ValidPeriod';

type Sikkerhetstiltak = PersonData['sikkerhetstiltak'];

interface Props {
    sikkerhetstiltak: Sikkerhetstiltak;
}

export const Sikkerhetstiltak = ({ sikkerhetstiltak }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (sikkerhetstiltak.isNotEmpty()) {
            ref.current?.showModal();
        }
    }, [sikkerhetstiltak]);

    return (
        <Modal
            ref={ref}
            header={{
                heading: 'Sikkerhetstiltak',
                icon: <ExclamationmarkTriangleFillIcon color="var(--a-icon-danger)" />,
                closeButton: false
            }}
        >
            <Modal.Body>
                <ul className="p-4">
                    {sikkerhetstiltak.map((s) => (
                        <li className="my-4" key={s.beskrivelse}>
                            <ValidPeriod
                                from={s.gyldighetsPeriode?.gyldigFraOgMed}
                                to={s.gyldighetsPeriode?.gyldigTilOgMed}
                            />
                            <BodyShort>{s.beskrivelse}</BodyShort>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => ref.current?.close()}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
};
