import * as React from 'react';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hentForeldrepenger } from '../../../../../redux/restReducers/ytelser/foreldrepenger';
import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { isNotStarted, Loaded, RestReducer } from '../../../../../redux/restReducers/restReducer';
import Foreldrepenger from './ForeldrePenger';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    foreldrepengerReducer: RestReducer<ForeldrepengerResponse>;
}

interface DispatchProps {
    hentForeldrepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Wrapper = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
`;

class ForeldrePengerContainer extends React.PureComponent<Props> {

    componentDidMount() {
        if (isNotStarted(this.props.foreldrepengerReducer)) {
            this.props.hentForeldrepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Wrapper>
                <Innholdslaster avhengigheter={[this.props.foreldrepengerReducer]}>
                    <Foreldrepenger
                        foreldrePengerRespons={
                            (this.props.foreldrepengerReducer as Loaded<ForeldrepengerResponse>).data
                        }
                    />
                </Innholdslaster>
            </Wrapper>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        foreldrepengerReducer: state.restEndepunkter.foreldrepengerReducer
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentForeldrepenger: (fødselsnummer: string) => dispatch(hentForeldrepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForeldrePengerContainer);
