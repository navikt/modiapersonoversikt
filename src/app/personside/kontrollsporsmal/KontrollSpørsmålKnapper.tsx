import styled from 'styled-components/macro';
import * as React from 'react';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import theme from '../../../styles/personOversiktTheme';
import { lukkKontrollSpørsmål, roterKontrollSpørsmål } from '../../../redux/kontrollSporsmal/actions';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import KnappBase from 'nav-frontend-knapper';
import { AppState } from '../../../redux/reducers';
import { getFnrFromPerson } from '../../../redux/restReducers/personinformasjon';
import { settSkjulKontrollsporsmaalPaaTversAvVinduerForBrukerCookie } from './cookie-utils';
import { KontrollSporsmaalState } from '../../../redux/kontrollSporsmal/types';

interface DispatchProps {
    lukkKontrollSporsmaal: () => void;
    nyttSporsmaal: () => void;
}

interface StateProps {
    fnr?: string;
    kontrollSporsmaal: KontrollSporsmaalState;
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

class KontrollSpørsmålKnapper extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.handleNyttSporsmaalClick = this.handleNyttSporsmaalClick.bind(this);
        this.handleLukkClick = this.handleLukkClick.bind(this);
    }

    handleNyttSporsmaalClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Nytt' });
        this.props.nyttSporsmaal();
    }

    handleLukkClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Lukk' });
        this.skjulPaaTversAvVinduer();
        this.props.lukkKontrollSporsmaal();
    }

    skjulPaaTversAvVinduer() {
        if (!this.props.fnr) {
            return;
        }
        settSkjulKontrollsporsmaalPaaTversAvVinduerForBrukerCookie(this.props.fnr);
    }

    visNyttKnapp() {
        return this.props.kontrollSporsmaal.sporsmaal && this.props.kontrollSporsmaal.sporsmaal.length !== 0;
    }

    render() {
        return (
            <KnapperStyling>
                <KnappBase aria-label={'Lukk spørsmålspanel'} type="standard" onClick={this.handleLukkClick}>
                    Lukk
                </KnappBase>
                {this.visNyttKnapp() ? (
                    <KnappBase aria-label={'Nytt spørsmål'} type="standard" onClick={this.handleNyttSporsmaalClick}>
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
        kontrollSporsmaal: state.kontrollSporsmaal
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        lukkKontrollSporsmaal: () => dispatch(lukkKontrollSpørsmål()),
        nyttSporsmaal: () => dispatch(roterKontrollSpørsmål())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(KontrollSpørsmålKnapper);
