import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import { Oppgave } from '../../../models/oppgave';
import { settPersonIKontekst } from '../../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { History } from 'history';
import Feilmelding from '../../../components/feilmelding/Feilmelding';
import Select from 'nav-frontend-skjema/lib/select';
import { ChangeEvent } from 'react';
import { velgTemagruppe } from '../../../redux/temagruppe';
import { Action } from 'redux';
import styled from 'styled-components';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { plukkOppgaver, selectFodselsnummerfraOppgaver } from '../../../redux/restReducers/oppgaver';
import { STATUS } from '../../../redux/restReducers/utils';
import { AppState } from '../../../redux/reducers';
import { RestReducer } from '../../../redux/restReducers/restReducer';

const HentOppgaveLayout = styled.div`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  > *:not(first-child) {
    margin: .4em 0 0 0;
  }
`;

const KnappLayout = styled.div`
  display: flex;
  align-items: flex-start;
  > *:first-child {
    margin-bottom: 0;
    flex-grow: 2;
    white-space: nowrap;
  }
  > *:last-child {
    flex-grow: 1;
    margin-left: .4em;
    margin-top: 1.9rem;
    text-transform: none;
  }
`;

const PLUKKBARE_TEMAGRUPPER = [
    {kode: 'ARBD',          beskrivelse: 'Arbeid'},
    {kode: 'FMLI',          beskrivelse: 'Familie'},
    {kode: 'HJLPM',         beskrivelse: 'Hjelpemidler'},
    {kode: 'BIL',           beskrivelse: 'Hjelpemidler bil'},
    {kode: 'ORT_HJE',       beskrivelse: 'Ortopediske hjelpemidler'},
    {kode: 'PENS',          beskrivelse: 'Pensjon'},
    {kode: 'PLEIEPENGERSY', beskrivelse: 'Pleiepenger sykt barn'},
    {kode: 'UFRT',          beskrivelse: 'Uføretrygd'},
    {kode: 'UTLAND',        beskrivelse: 'Utland'}
];

interface State {
    temagruppeFeilmelding?: string;
    tomKø: boolean;
}

interface StateProps {
    valgtEnhet: string;
    valgtTemagruppe: string | null;
    oppgaveReducer: RestReducer<Oppgave[]>;
    routeHistory: History;
}

interface DispatchProps {
    plukkOppgaver: (enhet: string, temagruppe: string) => Promise<Oppgave[]>;
    velgTemagruppe: (temagruppe: string) => void;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

class HentOppgaveKnapp extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.onPlukkOppgaver = this.onPlukkOppgaver.bind(this);
        this.onTemagruppeChange = this.onTemagruppeChange.bind(this);
        this.state = {tomKø: false};
    }

    onPlukkOppgaver() {
        if (!this.props.valgtTemagruppe) {
            this.setState({temagruppeFeilmelding: 'Du må velge temagruppe'});
            return;
        }
        this.setState({temagruppeFeilmelding: undefined, tomKø: false});
        this.props.plukkOppgaver(this.props.valgtEnhet, this.props.valgtTemagruppe)
            .then((oppgaver: Oppgave[]) => {
                const fødselsnummer = selectFodselsnummerfraOppgaver(oppgaver);
                if (!fødselsnummer) {
                    this.setState({tomKø: true});
                    return;
                }
                settPersonIKontekst(this.props.history, fødselsnummer);
            });
    }

    render() {
        const valgtTemagruppe = this.props.valgtTemagruppe || '';
        const tomtTilbakemelding = this.state.tomKø
            ? <AlertStripeInfo>Det er ingen nye oppgaver på valgt temagruppe</AlertStripeInfo>
            : null;
        const temagruppeOptions = PLUKKBARE_TEMAGRUPPER.map((temagruppe) => (
                <option value={temagruppe.kode} key={temagruppe.kode}>
                    {temagruppe.beskrivelse}
                </option>
            ));
        return (
            <HentOppgaveLayout>
                <KnappLayout>
                    <Select
                        label="Hent oppgave fra temagruppe"
                        value={valgtTemagruppe}
                        onChange={this.onTemagruppeChange}
                        feil={this.state.temagruppeFeilmelding
                            ? {feilmelding: this.state.temagruppeFeilmelding}
                            : undefined}
                    >
                        <option disabled={true} value={''}>Velg temagruppe</option>
                        {temagruppeOptions}
                    </Select>
                    <KnappBase
                        type="hoved"
                        onClick={this.onPlukkOppgaver}
                        spinner={this.props.oppgaveReducer.status === STATUS.PENDING}
                    >
                        Hent
                    </KnappBase>
                </KnappLayout>
                <Feilmelding reducer={this.props.oppgaveReducer}/>
                {tomtTilbakemelding}
            </HentOppgaveLayout>
        );
    }

    private onTemagruppeChange(event: ChangeEvent<HTMLSelectElement>) {
        this.props.velgTemagruppe(event.target.value);
        this.setState({temagruppeFeilmelding: undefined});
    }
}

function mapStateToProps(state: AppState, routeProps: RouteComponentProps<{}>): StateProps {
    return {
        valgtEnhet: '4100',
        valgtTemagruppe: state.valgtTemagruppe,
        oppgaveReducer: state.restEndepunkter.oppgaver,
        routeHistory: routeProps.history
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        plukkOppgaver: (enhet, temagruppe) => dispatch(plukkOppgaver(enhet, temagruppe)),
        velgTemagruppe: (temagruppe) => dispatch(velgTemagruppe(temagruppe))
    };

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HentOppgaveKnapp));