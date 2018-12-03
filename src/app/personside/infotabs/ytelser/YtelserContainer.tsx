import * as React from 'react';
import ForeldrePengerContainer from './foreldrepenger/ForeldrePengerContainer';
import YtelseValgListe from './valg/YtelseValgListe';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import PleiePengerContainer from './pleiepenger/PleiePengerContainer';
import SykePengerContainer from './sykepenger/SykePengerContainer';
import { YtelseValg } from '../../../../redux/ytelser/yteslerStateReducer';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { assertUnreachable } from '../../../../utils/assertUnreachable';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    valgtYtelse: YtelseValg;
}

type Props = OwnProps & StateProps;

const Styling = styled.section`
  @media(min-width: 65rem) {
      display: flex;
      align-items: flex-start;
      > *:last-child {
        flex-grow: 1;
        margin-left: ${theme.margin.layout};
      }
  }
  > * {
    margin-bottom: ${theme.margin.layout};
  }
`;

function getValgtTab(valgtTab: YtelseValg, fnr: string) {
    switch (valgtTab) {
        case YtelseValg.Foreldrepenger:
            return <ForeldrePengerContainer fødselsnummer={fnr}/>;
        case YtelseValg.Pleiepenger:
            return <PleiePengerContainer fødselsnummer={fnr}/>;
        case YtelseValg.Sykepenger:
            return <SykePengerContainer fødselsnummer={fnr}/>;
        default:
            return assertUnreachable();
    }
}

class YtelserContainer extends React.Component<Props> {

    render() {
        const valgtTab = getValgtTab(this.props.valgtYtelse, this.props.fødselsnummer);
        return (
            <Styling>
                <YtelseValgListe/>
                {valgtTab}
            </Styling>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtYtelse: state.ytelser.valgtYtelse
    };
}

export default connect(mapStateToProps)(YtelserContainer);
