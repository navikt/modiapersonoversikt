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

function KontrollSporsmalKnapper(props: Props) {
    const persondata = useHentPersondata();
    const person = hasData(persondata) ? persondata.data.person : null;

    function handleNyttSporsmalClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Nytt' });
        props.nyttSporsmal();
    }

    function handleLukkClick() {
        loggEvent('Knapp', 'Kontrollsporsmal', { type: 'Lukk' });
        skjulPaTversAvVinduer();
        props.lukkKontrollSporsmal();
    }

    function skjulPaTversAvVinduer() {
        if (!person) {
            return;
        }
        settSkjulKontrollsporsmalPaTversAvVinduerForBrukerCookie(person.personIdent);
    }

    function visNyttKnapp() {
        return props.kontrollSporsmal.sporsmal && props.kontrollSporsmal.sporsmal.isNotEmpty();
    }

    return (
        <KnapperStyling>
            <KnappBase aria-label={'Lukk spørsmålspanel'} type="standard" onClick={() => handleLukkClick()}>
                Lukk
            </KnappBase>
            {visNyttKnapp() ? (
                <KnappBase aria-label={'Nytt spørsmål'} type="standard" onClick={() => handleNyttSporsmalClick()}>
                    Nytt
                </KnappBase>
            ) : null}
        </KnapperStyling>
    );
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
