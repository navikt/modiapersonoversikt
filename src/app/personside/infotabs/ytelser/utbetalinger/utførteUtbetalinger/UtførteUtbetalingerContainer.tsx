import * as React from 'react';
import { AppState } from '../../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../../redux/ThunkTypes';
import { connect } from 'react-redux';
import { UtbetalingerResponse } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import { filtrerOgSorterUtbetalinger, getKnappStatus } from './utførteUtbetalingerUtils';
import { AlignTextCenter } from '../../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../../../../components/ErrorBoundary';
import styled from 'styled-components';
import UtførteUtbetalingerListe from './UtførteUtbetalingerListe';
import RestResourceConsumer from '../../../../../../rest/consumer/RestResourceConsumer';
import { RestResource } from '../../../../../../rest/utils/restResource';
import { getToÅrGamleUtbetalingerFetchUri } from '../../../../../../redux/restReducers/ytelser/utførteUtbetalinger';

export enum KnappStatus {
    Vis,
    Skjul,
    Spinner
}

interface OwnProps {
    ytelseType: YtelserKeys;
}

interface StateProps {
    utførteUtbetalinger: RestResource<UtbetalingerResponse>;
}

interface DispatchProps {
    dispatch: AsyncDispatch;
}

type Props = DispatchProps & StateProps & OwnProps;

const Padding = styled.div`
    padding: 0.5rem;
`;

function UtførteUtbetalingerContainer(props: Props) {
    function hentToÅrGamleUtbetalinger() {
        props.dispatch(
            props.utførteUtbetalinger.actions.reloadWithCustomUriGenerator(getToÅrGamleUtbetalingerFetchUri)
        );
    }
    return (
        <ErrorBoundary boundaryName="Utførte utbetalinger">
            <section>
                <Padding>
                    <AlignTextCenter>
                        <Undertittel tag="h4">Utførte utbetalinger</Undertittel>
                    </AlignTextCenter>
                </Padding>
                <RestResourceConsumer<UtbetalingerResponse>
                    getResource={restResources => restResources.utførteUtbetalingerYtelser}
                    spinnerSize="S"
                >
                    {data => (
                        <UtførteUtbetalingerListe
                            utbetalinger={filtrerOgSorterUtbetalinger(data.utbetalinger, props.ytelseType)}
                            hentToÅrGamleUtbetalinger={hentToÅrGamleUtbetalinger}
                            knappStatus={getKnappStatus(props.utførteUtbetalinger)}
                        />
                    )}
                </RestResourceConsumer>
            </section>
        </ErrorBoundary>
    );
}

function mapStateToProops(state: AppState): StateProps {
    return {
        utførteUtbetalinger: state.restResources.utførteUtbetalingerYtelser
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        dispatch: dispatch
    };
}

export default connect(
    mapStateToProops,
    mapDispatchToProps
)(UtførteUtbetalingerContainer);
