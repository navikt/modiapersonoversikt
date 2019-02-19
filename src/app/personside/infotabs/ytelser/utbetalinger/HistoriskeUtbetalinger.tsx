import { HistoriskUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import * as React from 'react';
import HistoriskUtbetalingKomponent from './HistoriskUtbetalingKomponent';
import { Knapp } from 'nav-frontend-knapper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import {
    filtrerBortUtbetalingerSomIkkeErUtbetalt,
    fjernTommeUtbetalinger
} from '../../utbetalinger/utils/utbetalingerUtils';
import { genericAscendingDateComparator } from '../../../../../utils/dateUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { YtelserKeys } from '../ytelserKeys';
import { AlignTextCenter, FlexCenter } from '../../../../../components/common-styled-components';
import { fjernUrelevanteUtbetalinger, mapUtbetlaingerTilHistoriskeUtbetalinger } from './utbetalingerUtils';
import { STATUS } from '../../../../../redux/restReducers/utils';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { Utbetaling } from '../../../../../models/utbetalinger';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';

interface Props {
    historiskeUtbetalinger: HistoriskUtbetaling[];
    ytelseType: YtelserKeys;
    toÅrGamleUtbetalingerFraUtbetalingerRestkonto: Utbetaling[] | null;
    reducerStatus: STATUS;
    hentHistoriskeUtbetalinger: () => void;
}

const Padding = styled.div`
    padding: 0.5rem;
`;

class HistoriskeUtbetalinger extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    getSammenflettedeUtbetalinger(): HistoriskUtbetaling[] {
        if (!this.props.toÅrGamleUtbetalingerFraUtbetalingerRestkonto) {
            return this.props.historiskeUtbetalinger;
        } else {
            const relevanteUtbetlaingerFraUtbetalingRestkonto = this.props.toÅrGamleUtbetalingerFraUtbetalingerRestkonto
                .map(fjernUrelevanteUtbetalinger(this.props.ytelseType))
                .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
                .filter(fjernTommeUtbetalinger);

            const mappetTilHistoriskUtbetaling = mapUtbetlaingerTilHistoriskeUtbetalinger(
                relevanteUtbetlaingerFraUtbetalingRestkonto
            );

            return [...this.props.historiskeUtbetalinger, ...mappetTilHistoriskUtbetaling];
        }
    }

    render() {
        const sorterteSammenflettedeUtbetalinger = this.getSammenflettedeUtbetalinger()
            .sort(genericAscendingDateComparator(utbetaling => utbetaling.utbetalingsdato || new Date()))
            .reverse();

        if (this.props.reducerStatus === STATUS.SUCCESS && sorterteSammenflettedeUtbetalinger.length === 0) {
            return <AlertStripeInfo>Kunne ikke finne noen historiske utbetalinger</AlertStripeInfo>;
        }

        const historiskeUtbetalinger = sorterteSammenflettedeUtbetalinger.map((utbetaling, index) => (
            <HistoriskUtbetalingKomponent key={index} historiskUtbetaling={utbetaling} />
        ));

        const hentAlleUtbetalingerKnapp = this.props.reducerStatus === STATUS.NOT_STARTED && (
            <FlexCenter>
                <Knapp onClick={this.props.hentHistoriskeUtbetalinger}>Hent alle historiske utbetalinger</Knapp>
            </FlexCenter>
        );

        const spinner = this.props.reducerStatus === STATUS.LOADING && <NavFrontendSpinner type={'S'} />;

        return (
            <ErrorBoundary boundaryName="Historiske utbetalinger">
                <section>
                    <Padding>
                        <AlignTextCenter>
                            <Undertittel tag="h4">Utførte utbetalinger</Undertittel>
                        </AlignTextCenter>
                    </Padding>
                    <ol>{historiskeUtbetalinger}</ol>
                    {hentAlleUtbetalingerKnapp}
                    {spinner}
                </section>
            </ErrorBoundary>
        );
    }
}

export default HistoriskeUtbetalinger;
