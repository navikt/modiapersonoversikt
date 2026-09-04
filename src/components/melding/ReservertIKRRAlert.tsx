import { InlineMessage } from '@navikt/ds-react';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { overskridKontaktReservasjonAtom } from 'src/lib/state/dialog';

export const ReservertIKRRAlert = () => {
    const { data } = usePersonData();
    const reservertIKRR = !!data?.person.kontaktInformasjon?.erReservert?.value;
    const [overskridReservasjon, setOverskridReservasjon] = useAtom(overskridKontaktReservasjonAtom);

    const aktivBruker = useAtomValue(aktivBrukerAtom);

    useEffect(() => {
        setOverskridReservasjon(false);
    }, [aktivBruker]);

    if (!reservertIKRR) return null;
    return (
        <InlineMessage size="small" status="error" className="mb-4">
            Bruker er reservert fra digital utsendelse, og skal ikke kontaktes via dialogen i Modia personoversikt.
            {!overskridReservasjon && (
                <button
                    type="button"
                    className="aksel-link text-ax-text-danger cursor-pointer"
                    onClick={() => setOverskridReservasjon((prev) => !prev)}
                >
                    Overskrid
                </button>
            )}
        </InlineMessage>
    );
};
