import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { History } from 'history';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';

import KnappBase from 'nav-frontend-knapper';

import { AppState, RestReducer } from '../../../redux/reducer';
import { plukkOppgaver, selectFodselsnummerfraOppgaver } from '../../../redux/oppgaver';
import { STATUS } from '../../../redux/utils';
import Feilmelding from '../../../components/feilmelding/Feilmelding';
import { Oppgave } from '../../../models/oppgave';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import PilKnapp from '../../../components/pilknapp';
import { DialogPanelSize } from '../MainLayout';
import { settPersonIKontekst } from '../../routes/routing';

const DialogPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.margin.layout};
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.margin.layout};
  }
`;

const Knapperad = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > *:last-child {
    flex-grow: 1;
    margin-left: 2em;
  }
`;

interface StateProps {
    valgtEnhet: string;
    valgtTemagruppe: string;
    oppgaveReducer: RestReducer<Oppgave[]>;
    routeHistory: History;
}

interface OwnProps {
    onToggleDialogpanel: (event: React.MouseEvent<HTMLButtonElement>) => void;
    dialogPanelSize: DialogPanelSize;
}

interface DispatchProps {
    plukkOppgaver: (enhet: string, temagruppe: string) => Promise<Oppgave[]>;
}

type DialogPanelProps = StateProps & DispatchProps & OwnProps & RouteComponentProps<{}>;

class DialogPanel extends React.Component<DialogPanelProps> {

    constructor(props: DialogPanelProps) {
        super(props);
        this.onPlukkOppgaver = this.onPlukkOppgaver.bind(this);
    }

    onPlukkOppgaver() {
        this.props.plukkOppgaver(this.props.valgtEnhet, this.props.valgtTemagruppe).then((oppgaver: Oppgave[]) => {
            const fødselsnummer = selectFodselsnummerfraOppgaver(oppgaver);
            if (!fødselsnummer) {
                throw new Error('Ingen oppgave ble returnert når oppgaver ble plukket');
            }
            settPersonIKontekst(this.props.history, fødselsnummer);
        });
    }

    render() {
        return (
            <DialogPanelWrapper>
                <Knapperad>
                    <PilKnapp
                        width="30px"
                        direction={this.props.dialogPanelSize === DialogPanelSize.Normal ? 'left' : 'right'}
                        onClick={this.props.onToggleDialogpanel}
                    />
                    <KnappBase
                        type="hoved"
                        onClick={this.onPlukkOppgaver}
                        spinner={this.props.oppgaveReducer.status === STATUS.LOADING}
                    >
                        Hent oppgave
                    </KnappBase>
                </Knapperad>
                <ComponentPlaceholder height={'800px'} name={'Dialog Panel'}/>
                <Feilmelding reducer={this.props.oppgaveReducer}/>
            </DialogPanelWrapper>
        );
    }
}

function mapStateToProps(state: AppState, routeProps: RouteComponentProps<{}>) {
    return {
        valgtEnhet: '4100',
        valgtTemagruppe: 'ARBD',
        oppgaveReducer: state.oppgaver,
        routeHistory: routeProps.history
    };
}

function mapDispatchToProps(dispatch: Dispatch<Oppgave[]>): DispatchProps {
    return {
        plukkOppgaver: (enhet, temagruppe) => dispatch(plukkOppgaver(enhet, temagruppe))
    };

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DialogPanel));