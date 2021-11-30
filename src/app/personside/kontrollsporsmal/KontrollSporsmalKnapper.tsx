import styled from 'styled-components/macro';
import * as React from 'react';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import theme from '../../../styles/personOversiktTheme';
import { lukkKontrollSporsmal, roterKontrollSporsmal } from '../../../redux/kontrollSporsmal/actions';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import KnappBase from 'nav-frontend-knapper';
import { AppState } from '../../../redux/reducers';
import { settSkjulKontrollsporsmalPaTversAvVinduerForBrukerCookie } from './cookie-utils';
import { KontrollSporsmalState } from '../../../redux/kontrollSporsmal/types';
import { useHentPersondata } from '../../../utils/customHooks';
import { Person } from '../visittkort-v2/PersondataDomain';
import { hasData } from '@nutgaard/use-fetch';

interface DispatchProps {
    lukkKontrollSporsmal: () => void;
    nyttSporsmal: () => void;
}

interface StateProps {
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

function HentPersondata(): Person | null {
    const persondata = useHentPersondata();
    return hasData(persondata) ? persondata.data.person : null;
}

class KontrollSporsmalKnapper extends React.PureComponent<Props> {
    persondata: Person | null = null;

    constructor(props: Props) {
        super(props);
        this.persondata = HentPersondata();
        this.handleNyttSporsmalClick = this.handleNyttSporsmalClick.bind(this);
        this.handleLukkClick = this.handleLukkClick.bind(this);
    }

    handleNyttSporsmalClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Nytt' });
        this.props.nyttSporsmal();
    }

    handleLukkClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Lukk' });
        this.skjulPaTversAvVinduer();
        this.props.lukkKontrollSporsmal();
    }

    skjulPaTversAvVinduer() {
        if (!this.persondata || !this.persondata.fnr) {
            return;
        }
        settSkjulKontrollsporsmalPaTversAvVinduerForBrukerCookie(this.persondata.fnr);
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
