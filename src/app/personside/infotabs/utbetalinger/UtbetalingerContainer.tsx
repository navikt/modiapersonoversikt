import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import {
    isLoading,
    isNotStarted,
    isReloading,
    Loaded,
    DeprecatedRestResource
} from '../../../../redux/restReducers/deprecatedRestResource';
import { UtbetalingerResponse } from '../../../../models/utbetalinger';
import Innholdslaster from '../../../../components/Innholdslaster';
import { hentUtbetalinger, reloadUtbetalinger } from '../../../../redux/restReducers/utbetalinger';
import Filter from './filter/Filter';
import { getFraDateFromFilter, getTilDateFromFilter } from './utils/utbetalingerUtils';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { loggEvent } from '../../../../utils/frontendLogger';
import Arenalenke from './Arenalenke/Arenalenke';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { UtbetalingFilterState } from '../../../../redux/utbetalinger/types';

interface StateProps {
    utbetalingerResource: DeprecatedRestResource<UtbetalingerResponse>;
    fødselsnummer: string;
    filter: UtbetalingFilterState;
}

interface DispatchProps {
    hentUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) => void;
    reloadUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) => void;
}

type Props = StateProps & DispatchProps;

const UtbetalingerArticle = styled.article`
    display: flex;
    align-items: flex-start;
    @media (max-width: ${theme.media.utbetalinger}) {
        display: block;
    }
`;

const FiltreringSection = styled.section`
    min-width: 19rem;
    flex-basis: 19rem;
`;

const UtbetalingerSection = styled.section`
    position: relative;
    flex-grow: 1;
    min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
    @media not all and (max-width: ${theme.media.utbetalinger}) {
        margin-left: ${theme.margin.layout};
    }
`;

class UtbetalingerContainer extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.reloadUtbetalinger = this.reloadUtbetalinger.bind(this);
        loggEvent('Sidevisning', 'Utbetalinger');
    }

    reloadUtbetalinger() {
        if (isLoading(this.props.utbetalingerResource) || isReloading(this.props.utbetalingerResource)) {
            return;
        }
        const fra = getFraDateFromFilter(this.props.filter);
        const til = getTilDateFromFilter(this.props.filter);
        this.props.reloadUtbetalinger(this.props.fødselsnummer, fra, til);
    }

    componentDidMount() {
        if (isNotStarted(this.props.utbetalingerResource)) {
            this.props.hentUtbetalinger(
                this.props.fødselsnummer,
                getFraDateFromFilter(this.props.filter),
                getTilDateFromFilter(this.props.filter)
            );
        }
    }

    render() {
        return (
            <ErrorBoundary>
                <UtbetalingerArticle role="region" aria-label="Utbetalinger">
                    <VisuallyHiddenAutoFokusHeader tittel="Utbetalinger" />
                    <div>
                        <Arenalenke fødselsnummer={this.props.fødselsnummer} />
                        <FiltreringSection>
                            <Filter hentUtbetalinger={this.reloadUtbetalinger} />
                        </FiltreringSection>
                    </div>
                    <UtbetalingerSection aria-label="Filtrerte utbetalinger">
                        <Innholdslaster avhengigheter={[this.props.utbetalingerResource]}>
                            <Utbetalinger
                                utbetalingerData={
                                    (this.props.utbetalingerResource as Loaded<UtbetalingerResponse>).data
                                }
                                filter={this.props.filter}
                            />
                        </Innholdslaster>
                    </UtbetalingerSection>
                </UtbetalingerArticle>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        utbetalingerResource: state.restResources.utbetalinger,
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
        filter: state.utbetalinger.filter
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) =>
            dispatch(hentUtbetalinger(fødselsnummer, fra, til)),
        reloadUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) =>
            dispatch(reloadUtbetalinger(fødselsnummer, fra, til))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UtbetalingerContainer);
