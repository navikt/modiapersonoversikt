import { MouseEventHandler } from 'react';
import { JournalforingsSak } from './JournalforingPanel';
import { ClickableTable } from '../../../../../../../utils/table/ClickableTable';
import { formatterDatoMedMaanedsnavnOrNull } from '../../../../../../../utils/date-utils';
import { ENDASH } from '../../../../../../../utils/string-utils';

interface Props {
    saker: Array<JournalforingsSak>;
    velgSak(sak: JournalforingsSak): void;
}

function SaksTabell(props: Props) {
    const tittelRekke = ['Saks id', 'Opprettet dato', 'Fagsystem'];
    const rows = props.saker.map((sak) => [
        sak.saksIdVisning,
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
