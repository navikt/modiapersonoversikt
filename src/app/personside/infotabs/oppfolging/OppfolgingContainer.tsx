import * as React from 'react';
import { isNotStarted, RestReducer } from '../../../../redux/restReducers/restReducer';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentDetaljertOppfolging } from '../../../../redux/restReducers/oppfolging';
import { connect } from 'react-redux';
import PlukkRestData from '../ytelser/pleiepenger/PlukkRestData';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import ArenaLenkerPanel from './ArenaLenkerKomponent';
import OppfolgingDatoPanel from './OppfolgingDatoKomponent';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefravarsoppfolgingEkspanderbartPanel from './SykefravarsoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';

const LenkeOgDatoWrapper = styled.div`
    > *:first-child {
        margin-bottom: ${theme.margin.layout};
    }
    display: flex;
    flex-direction: column;
    > * {
        flex-grow: 1;
    }
`;

interface VisningProps {
    detaljertOppfølging: DetaljertOppfolging;
}

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    oppfølgingReducer: RestReducer<DetaljertOppfolging>;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentDetaljertOppfølging: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const OppfolgingArticle = styled.article``;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    > *:last-child {
        margin-left: ${theme.margin.layout};
    }
    > * {
        flex-basis: 50%;
    }
`;

const EkspanderbartPanelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        margin-top: ${theme.margin.layout};
    }
`;

function OppfolgingVisning(props: VisningProps) {
    return (
        <OppfolgingArticle>
            <Wrapper>
                <LenkeOgDatoWrapper>
                    <ArenaLenkerPanel />
                    <OppfolgingDatoPanel />
                </LenkeOgDatoWrapper>
                <VisOppfolgingDetaljer detaljertOppfølging={props.detaljertOppfølging} />
            </Wrapper>
            <EkspanderbartPanelWrapper>
                <SykefravarsoppfolgingEkspanderbartPanel syfoPunkt={props.detaljertOppfølging.sykefraværsoppfølging} />
                <OppfolgingYtelserEkspanderbartPanel ytelser={props.detaljertOppfølging.ytelser} />
            </EkspanderbartPanelWrapper>
        </OppfolgingArticle>
    );
}

class OppfolgingContainer extends React.PureComponent<Props> {
    componentDidMount() {
        if (isNotStarted(this.props.baseUrlReducer)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.oppfølgingReducer)) {
            this.props.hentDetaljertOppfølging(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData restReducer={this.props.oppfølgingReducer}>
                {data => <OppfolgingVisning detaljertOppfølging={data} />}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrlReducer: state.restEndepunkter.baseUrlReducer,
        oppfølgingReducer: state.restEndepunkter.oppfolgingReducer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentDetaljertOppfølging: (fødselsnummer: string) => dispatch(hentDetaljertOppfolging(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OppfolgingContainer);
