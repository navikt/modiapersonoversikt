import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { AlignTextCenter } from '../../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import UtbetalingPåVentElement from './UtbetalingPåVentElement';
import { UtbetalingPåVent } from '../../../../../../models/ytelse/ytelse-utbetalinger';

interface Props {
    utbetalingerPåVent: UtbetalingPåVent[];
}

const Padding = styled.div`
    padding: 0.5rem;
`;

function getInnhold(utbetalingerpåVent: UtbetalingPåVent[]) {
    if (utbetalingerpåVent.length === 0) {
        return <AlertStripeInfo>Ingen utbetalinger på vent funnet</AlertStripeInfo>;
    }
    const kommendeUtbetalingerMarkup = utbetalingerpåVent.map((utbetaling, index) => (
        <UtbetalingPåVentElement key={index} utbetalingPåVent={utbetaling} />
    ));
    return <ol>{kommendeUtbetalingerMarkup}</ol>;
}

function UtbetalingerPåVentListe(props: Props) {
    return (
        <section>
            <Padding>
                <AlignTextCenter>
                    <Undertittel tag="h4">Utbetalinger på vent</Undertittel>
                </AlignTextCenter>
            </Padding>
            {getInnhold(props.utbetalingerPåVent)}
        </section>
    );
}

export default UtbetalingerPåVentListe;
