import styled from 'styled-components/macro';
import * as React from 'react';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import theme from '../../../styles/personOversiktTheme';
import { lukkKontrollSporsmal, roterKontrollSporsmal } from '../../../redux/kontrollSporsmal/actions';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import KnappBase from 'nav-frontend-knapper';
import { AppState } from '../../../redux/reducers';
import { getFnrFromPerson } from '../../../redux/restReducers/personinformasjon';
import { settSkjulKontrollsporsmalPaTversAvVinduerForBrukerCookie } from './cookie-utils';
import { KontrollSporsmalState } from '../../../redux/kontrollSporsmal/types';

interface DispatchProps {
    lukkKontrollSporsmal: () => void;
    nyttSporsmal: () => void;
}

interface StateProps {
    fnr?: string;
    kontrollSporsmal: KontrollSporsmalState;
}

type Props = StateProps & DispatchProps;

const KnapperStyling = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    > *:last-child {
        margin-top: ${theme.margin.px10};
    }
`;

class KontrollSporsmalKnapper extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.handleNyttSporsmalClick = this.handleNyttSporsmalClick.bind(this);
        this.handleLukkClick = this.handleLukkClick.bind(this);
    }

    handleNyttSporsmalClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Nytt' });
        this.props.nyttSporsmal();
    }

    handleLukkClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Lukk' });
        this.skjulPaaTversAvVinduer();
        this.props.lukkKontrollSporsmal();
    }

    skjulPaaTversAvVinduer() {
        if (!this.props.fnr) {
            return;
        }
        settSkjulKontrollsporsmalPaTversAvVinduerForBrukerCookie(this.props.fnr);
    }

    visNyttKnapp() {
        return this.props.kontrollSporsmal.sporsmal && this.props.kontrollSporsmal.sporsmal.length !== 0;
    }

    render() {
        return (
            <KnapperStyling>
                <KnappBase aria-label={'Lukk spørsmålspanel'} type="standard" onClick={this.handleLukkClick}>
                    Lukk
                </KnappBase>
                {this.visNyttKnapp() ? (
                    <KnappBase aria-label={'Nytt spørsmål'} type="standard" onClick={this.handleNyttSporsmalClick}>
                        Nytt
                    </KnappBase>
                ) : null}
            </KnapperStyling>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fnr: getFnrFromPerson(state.restResources.personinformasjon),
        kontrollSporsmal: state.kontrollSporsmal
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        lukkKontrollSporsmal: () => dispatch(lukkKontrollSporsmal()),
        nyttSporsmal: () => dispatch(roterKontrollSporsmal())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(KontrollSporsmalKnapper);
