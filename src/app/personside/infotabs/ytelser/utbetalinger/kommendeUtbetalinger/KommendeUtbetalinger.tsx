import { KommendeUtbetaling } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { AlignTextCenter } from '../../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import KommendeUtbetalingKomponent from './KommendeUtbetalingKomponent';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
}

const Padding = styled.div`
    padding: 0.5rem;
`;

function getInnhold(kommendeUtbetalinger: KommendeUtbetaling[]) {
    if (kommendeUtbetalinger.length === 0) {
        return <AlertStripeInfo>Ingen kommende utbetalinger funnet</AlertStripeInfo>;
    }
    const kommendeUtbetalingerMarkup = kommendeUtbetalinger.map((utbetaling, index) => (
        <KommendeUtbetalingKomponent key={index} kommendeUtbetaling={utbetaling} />
    ));
    return <ol>{kommendeUtbetalingerMarkup}</ol>;
}

function KommendeUtbetalinger(props: Props) {
    return (
        <section>
            <Padding>
                <AlignTextCenter>
                    <Undertittel tag="h4">Kommende utbetalinger</Undertittel>
                </AlignTextCenter>
            </Padding>
            {getInnhold(props.kommendeUtbetalinger)}
        </section>
    );
}

export default KommendeUtbetalinger;
