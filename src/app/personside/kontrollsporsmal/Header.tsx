import styled from 'styled-components';
import * as React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import theme from '../../../styles/personOversiktTheme';
import { roterKontrollSpørsmål, lukkKontrollSpørsmål } from '../../../redux/kontrollSporsmal/actions';
import { loggEvent } from '../../../utils/frontendLogger';
import KnappBase from 'nav-frontend-knapper';
import { AppState } from '../../../redux/reducers';
import { getFnrFromPerson } from '../../../redux/restReducers/personinformasjon';
import { settSkjulKontrollspørsmålPåTversAvVinduerForBrukerCookie } from './skjulPåTversAvVinduerUtils';

interface DispatchProps {
    lukkKontrollSpørsmål: () => void;
    nyttSpørsmål: () => void;
}

interface StateProps {
    fnr?: string;
}

type Props = StateProps & DispatchProps;

const HeaderStyling = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin: ${theme.margin.px10};
    justify-content: space-between;
`;

const KnapperStyling = styled.div`
    display: flex;
    align-items: center;
    > * {
        margin-left: ${theme.margin.px20};
    }
`;

class Header extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.handleNyttSpørsmålClick = this.handleNyttSpørsmålClick.bind(this);
        this.handleLukkClick = this.handleLukkClick.bind(this);
    }

    handleNyttSpørsmålClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Nytt' });
        this.props.nyttSpørsmål();
    }

    handleLukkClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Lukk' });
        this.skjulPåTversAvVinduer();
        this.props.lukkKontrollSpørsmål();
    }

    skjulPåTversAvVinduer() {
        if (!this.props.fnr) {
            return;
        }
        settSkjulKontrollspørsmålPåTversAvVinduerForBrukerCookie(this.props.fnr);
    }

    render() {
        return (
            <HeaderStyling>
                <Undertittel tag="h1">Kontrollspørsmål</Undertittel>
                <KnapperStyling>
                    <KnappBase type="standard" onClick={this.handleNyttSpørsmålClick}>
                        Nytt spørsmål
                    </KnappBase>
                    <KnappBase type="standard" onClick={this.handleLukkClick}>
                        Lukk
                    </KnappBase>
                </KnapperStyling>
            </HeaderStyling>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fnr: getFnrFromPerson(state.restEndepunkter.personinformasjon)
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        lukkKontrollSpørsmål: () => dispatch(lukkKontrollSpørsmål()),
        nyttSpørsmål: () => dispatch(roterKontrollSpørsmål())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
