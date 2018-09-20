import * as React from 'react';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';

interface Props {
    sakstema?: Sakstema;
}

function Saker(props: Props) {
    if (!props.sakstema) {
        return <b>Ingen saker</b>;
    }
    return (
        <b>Saker: {props.sakstema.temanavn}</b>
    );
}

export default Saker;