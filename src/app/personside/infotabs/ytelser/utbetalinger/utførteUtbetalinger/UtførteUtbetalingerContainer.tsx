import * as React from 'react';
import { AppState } from '../../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../../redux/ThunkTypes';
import { connect } from 'react-redux';
import { UtbetalingerResponse } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import { filtrerOgSorterUtbetalinger, getKnappStatus } from './utførteUtbetalingerUtils';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../../../../components/ErrorBoundary';
import styled from 'styled-components';
import UtførteUtbetalinger from './UtførteUtbetalinger';
import RestResourceConsumer from '../../../../../../rest/consumer/RestResourceConsumer';
import { RestResource } from '../../../../../../rest/utils/restResource';
import { hentToÅrgamleUtbetalingerActionCreator } from '../../../../../../redux/restReducers/ytelser/utførteUtbetalinger';
import theme from '../../../../../../styles/personOversiktTheme';

export enum KnappStatus {
    Viser90DagerMedUtbetalinger,
    Viser2årMedUtbetalinger,
    Henter2årMedUtbetalinger
}

interface OwnProps {
    ytelseType: YtelserKeys;
}

interface StateProps {
    utførteUtbetalinger: RestResource<UtbetalingerResponse>;
}

interface DispatchProps {
    hentToÅrGamleUtbetalinger: () => void;
}

type Props = DispatchProps & StateProps & OwnProps;

const Style = styled.section`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
    ${theme.gråttPanel};
`;

function UtførteUtbetalingerContainer(props: Props) {
    return (
        <ErrorBoundary boundaryName="Utførte utbetalinger">
            <Style>
                <Undertittel tag="h4">Utførte utbetalinger</Undertittel>
                <RestResourceConsumer<UtbetalingerResponse>
                    getResource={restResources => restResources.utførteUtbetalingerYtelser}
                    spinnerSize="S"
                >
                    {data => (
                        <UtførteUtbetalinger
                            utbetalinger={filtrerOgSorterUtbetalinger(data.utbetalinger, props.ytelseType)}
                            hentToÅrGamleUtbetalinger={props.hentToÅrGamleUtbetalinger}
                            knappStatus={getKnappStatus(props.utførteUtbetalinger)}
                        />
                    )}
                </RestResourceConsumer>
            </Style>
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
        hentToÅrGamleUtbetalinger: () => dispatch(hentToÅrgamleUtbetalingerActionCreator)
    };
}

export default connect(
    mapStateToProops,
    mapDispatchToProps
)(UtførteUtbetalingerContainer);
