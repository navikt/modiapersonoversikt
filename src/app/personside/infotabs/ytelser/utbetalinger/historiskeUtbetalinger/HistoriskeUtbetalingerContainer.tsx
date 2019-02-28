import * as React from 'react';
import { AppState } from '../../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../../redux/ThunkTypes';
import {
    hentHistoriskeUtbetalinger,
    reloadHistoriskeUtbetalinger
} from '../../../../../../redux/restReducers/ytelser/historiskeUtbetalinger';
import { connect } from 'react-redux';
import { isLoading, isNotStarted, RestReducer } from '../../../../../../redux/restReducers/restReducer';
import { UtbetalingerResponse } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import {
    filtrerOgSorterUtbetalinger,
    getKnappStatus,
    inneholderToÅrGamleUtbetalinger,
    nittiDagerTilbakeITid,
    toÅrTilbakeITid
} from './historiskeUtbetalingerUtils';
import PlukkRestData from '../../pleiepenger/PlukkRestData';
import { AlignTextCenter } from '../../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../../../../components/ErrorBoundary';
import styled from 'styled-components';
import HistoriskeUtbetalingerListe from './HistoriskeUtbetalingerListe';

export enum KnappStatus {
    Vis,
    Skjul,
    Spinner
}

interface OwnProps {
    ytelseType: YtelserKeys;
    fødselsnummer: string;
}

interface StateProps {
    historiskeUtbetalinger: RestReducer<UtbetalingerResponse>;
}

interface DispatchProps {
    hentNyligeUtbetalinger: (fnr: string) => void;
    hentAlleUtbetalinger: (fnr: string) => void;
}

type Props = DispatchProps & StateProps & OwnProps;

const Padding = styled.div`
    padding: 0.5rem;
`;

class HistoriskeUtbetalingerContainer extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.hentToÅrGamleUtbetalinger = this.hentToÅrGamleUtbetalinger.bind(this);
    }

    componentDidMount() {
        if (isNotStarted(this.props.historiskeUtbetalinger)) {
            this.props.hentNyligeUtbetalinger(this.props.fødselsnummer);
        }
    }

    hentToÅrGamleUtbetalinger() {
        if (
            isLoading(this.props.historiskeUtbetalinger) ||
            inneholderToÅrGamleUtbetalinger(this.props.historiskeUtbetalinger)
        ) {
            return;
        }
        this.props.hentAlleUtbetalinger(this.props.fødselsnummer);
    }

    render() {
        return (
            <ErrorBoundary boundaryName="Historiske utbetalinger">
                <section>
                    <Padding>
                        <AlignTextCenter>
                            <Undertittel tag="h4">Utførte utbetalinger</Undertittel>
                        </AlignTextCenter>
                    </Padding>
                    <PlukkRestData restReducer={this.props.historiskeUtbetalinger} spinnerSize="S">
                        {data => (
                            <HistoriskeUtbetalingerListe
                                utbetalinger={filtrerOgSorterUtbetalinger(data.utbetalinger, this.props.ytelseType)}
                                hentToÅrGamleUtbetalinger={this.hentToÅrGamleUtbetalinger}
                                knappStatus={getKnappStatus(this.props.historiskeUtbetalinger)}
                            />
                        )}
                    </PlukkRestData>
                </section>
            </ErrorBoundary>
        );
    }
}

function mapStateToProops(state: AppState): StateProps {
    return {
        historiskeUtbetalinger: state.restEndepunkter.historiskeUtbetalingerYtelser
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentNyligeUtbetalinger: (fnr: string) => dispatch(hentHistoriskeUtbetalinger(fnr, nittiDagerTilbakeITid)),
        hentAlleUtbetalinger: (fnr: string) => dispatch(reloadHistoriskeUtbetalinger(fnr, toÅrTilbakeITid))
    };
}

export default connect(
    mapStateToProops,
    mapDispatchToProps
)(HistoriskeUtbetalingerContainer);
