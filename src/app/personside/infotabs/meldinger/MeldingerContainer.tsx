import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import PlukkRestData from '../ytelser/pleiepenger/PlukkRestData';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentMeldinger, reloadMeldinger } from '../../../../redux/restReducers/meldinger';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import TraadVisningContainer from './traadvisning/TraadVisningContainer';
import TraadListeContainer from './traadliste/TraadListeContainer';
import { isNotStarted, RestResource } from '../../../../redux/restReducers/restResource';

interface StateProps {
    meldingerResource: RestResource<Traad[]>;
    fødselsnummer: string;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentMeldinger: (fødselsnummer: string) => void;
    reloadMeldinger: (fødselsnummer: string) => void;
}

type Props = StateProps & DispatchProps;

const meldingerMediaTreshold = '80rem';

const MeldingerArticleStyle = styled.article`
    @media (min-width: ${meldingerMediaTreshold}) {
        display: flex;
        align-items: flex-start;
        > *:last-child {
            margin-left: ${theme.margin.layout};
        }
    }
    > * {
        margin-bottom: ${theme.margin.layout};
    }
`;

class MeldingerContainer extends React.PureComponent<Props> {
    componentDidMount() {
        if (isNotStarted(this.props.meldingerResource)) {
            this.props.hentMeldinger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData restResource={this.props.meldingerResource}>
                {() => (
                    <MeldingerArticleStyle>
                        <TraadListeContainer />
                        <TraadVisningContainer />
                    </MeldingerArticleStyle>
                )}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
        meldingerResource: state.restResources.tråderOgMeldinger
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentMeldinger: (fødselsnummer: string) => dispatch(hentMeldinger(fødselsnummer)),
        reloadMeldinger: (fødselsnummer: string) => dispatch(reloadMeldinger(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MeldingerContainer);
