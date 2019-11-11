import React from 'react';
import { JournalforingsSak } from './JournalforingPanel';
import { ClickableTable } from '../../../../../../../utils/table/ClickableTable';

interface Props {
    saker: Array<JournalforingsSak>;
    velgSak(sak: JournalforingsSak): void;
}

function SaksTabell(props: Props) {
    const tittelRekke = ['Saks id', 'Opprettet dato', 'Fagsystem'];
    const rows = props.saker.map(sak => [sak.saksIdVisning, sak.opprettetDatoFormatert, sak.fagsystemNavn]);
    const handlers = props.saker.map(sak => () => props.velgSak(sak));

    return <ClickableTable rows={rows} tittelRekke={tittelRekke} rowsOnClickHandlers={handlers} />;
}

export default SaksTabell;
