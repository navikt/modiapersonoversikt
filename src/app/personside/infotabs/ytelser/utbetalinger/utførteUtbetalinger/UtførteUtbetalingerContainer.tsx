import * as React from 'react';
import { AppState } from '../../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../../redux/ThunkTypes';
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
} from './utførteUtbetalingerUtils';
import PlukkRestData from '../../pleiepenger/PlukkRestData';
import { AlignTextCenter } from '../../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../../../../components/ErrorBoundary';
import styled from 'styled-components';
import UtførteUtbetalingerListe from './UtførteUtbetalingerListe';
import {
    hentUtførteUtbetalinger,
    reloadUtførteUtbetalinger
} from '../../../../../../redux/restReducers/ytelser/utførteUtbetalinger';

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
    utførteUtbetalinger: RestReducer<UtbetalingerResponse>;
}

interface DispatchProps {
    hentNyligeUtbetalinger: (fnr: string) => void;
    hentAlleUtbetalinger: (fnr: string) => void;
}

type Props = DispatchProps & StateProps & OwnProps;

const Padding = styled.div`
    padding: 0.5rem;
`;

class UtførteUtbetalingerContainer extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.hentToÅrGamleUtbetalinger = this.hentToÅrGamleUtbetalinger.bind(this);
    }

    componentDidMount() {
        if (isNotStarted(this.props.utførteUtbetalinger)) {
            this.props.hentNyligeUtbetalinger(this.props.fødselsnummer);
        }
    }

    hentToÅrGamleUtbetalinger() {
        if (
            isLoading(this.props.utførteUtbetalinger) ||
            inneholderToÅrGamleUtbetalinger(this.props.utførteUtbetalinger)
        ) {
            return;
        }
        this.props.hentAlleUtbetalinger(this.props.fødselsnummer);
    }

    render() {
        return (
            <ErrorBoundary boundaryName="Utførte utbetalinger">
                <section>
                    <Padding>
                        <AlignTextCenter>
                            <Undertittel tag="h4">Utførte utbetalinger</Undertittel>
                        </AlignTextCenter>
                    </Padding>
                    <PlukkRestData restReducer={this.props.utførteUtbetalinger} spinnerSize="S">
                        {data => (
                            <UtførteUtbetalingerListe
                                utbetalinger={filtrerOgSorterUtbetalinger(data.utbetalinger, this.props.ytelseType)}
                                hentToÅrGamleUtbetalinger={this.hentToÅrGamleUtbetalinger}
                                knappStatus={getKnappStatus(this.props.utførteUtbetalinger)}
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
        utførteUtbetalinger: state.restEndepunkter.utførteUtbetalingerYtelser
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentNyligeUtbetalinger: (fnr: string) => dispatch(hentUtførteUtbetalinger(fnr, nittiDagerTilbakeITid)),
        hentAlleUtbetalinger: (fnr: string) => dispatch(reloadUtførteUtbetalinger(fnr, toÅrTilbakeITid))
    };
}

export default connect(
    mapStateToProops,
    mapDispatchToProps
)(UtførteUtbetalingerContainer);
