import type { MouseEventHandler } from 'react';
import type { JournalforingsSak } from 'src/models/meldinger/journalforing';
import { formatterDatoMedMaanedsnavnOrNull } from '../../../../../../../utils/date-utils';
import { ENDASH } from '../../../../../../../utils/string-utils';
import { ClickableTable } from '../../../../../../../utils/table/ClickableTable';

interface Props {
    saker: Array<JournalforingsSak>;
    velgSak(sak: JournalforingsSak): void;
}

function SaksTabell(props: Props) {
    const tittelRekke = ['Saks id', 'Opprettet dato', 'Fagsystem'];
    const rows = props.saker.map((sak) => [
        sak.fagsystemSaksId,
        formatterDatoMedMaanedsnavnOrNull(sak.opprettetDato) ?? ENDASH,
        sak.fagsystemNavn
    ]);
    const handlers: Array<MouseEventHandler> = props.saker.map((sak) => {
        return (e) => {
            e.preventDefault();
            props.velgSak(sak);
        };
    });

    return <ClickableTable rows={rows} tittelRekke={tittelRekke} rowsOnClickHandlers={handlers} />;
}

export default SaksTabell;
