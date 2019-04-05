import * as React from 'react';
import { ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import KnappBase from 'nav-frontend-knapper';
import Select from 'nav-frontend-skjema/lib/select';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';

import { Oppgave } from '../../../models/oppgave';
import { setNyBrukerIPath } from '../../routes/routing';
import { History } from 'history';
import ResourceFeilmelding from '../../../components/feilmelding/ResourceFeilmelding';
import { velgTemagruppe } from '../../../redux/temagruppe';
import { plukkOppgaver, selectFodselsnummerfraOppgaver } from '../../../redux/restReducers/oppgaver';
import { AppState } from '../../../redux/reducers';
import { isLoading, DeprecatedRestResource } from '../../../redux/restReducers/deprecatedRestResource';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { settJobberMedSpørsmålOgSvar } from '../kontrollsporsmal/cookieUtils';

const HentOppgaveLayout = styled.div`
    text-align: center;
    > *:not(:first-child) {
        margin: 0.4em 0 0 0;
    }
`;

const KnappLayout = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    align-items: flex-end;
    > * {
        margin-right: 0.4em;
        flex-grow: 1;
    }
    > *:first-child {
        margin-bottom: 0;
        white-space: nowrap;
    }
    > *:last-child {
        margin-top: 0.4em;
        text-transform: none;
    }
`;

const PLUKKBARE_TEMAGRUPPER = [
    { kode: 'ARBD', beskrivelse: 'Arbeid' },
    { kode: 'FMLI', beskrivelse: 'Familie' },
    { kode: 'HJLPM', beskrivelse: 'Hjelpemidler' },
    { kode: 'BIL', beskrivelse: 'Hjelpemidler bil' },
    { kode: 'ORT_HJE', beskrivelse: 'Ortopediske hjelpemidler' },
    { kode: 'PENS', beskrivelse: 'Pensjon' },
    { kode: 'PLEIEPENGERSY', beskrivelse: 'Pleiepenger sykt barn' },
    { kode: 'UFRT', beskrivelse: 'Uføretrygd' },
    { kode: 'UTLAND', beskrivelse: 'Utland' }
];

interface State {
    temagruppeFeilmelding?: string;
    tomKø: boolean;
}

interface StateProps {
    valgtTemagruppe?: string;
    oppgaveResource: DeprecatedRestResource<Oppgave[]>;
    routeHistory: History;
}

interface DispatchProps {
    plukkOppgaver: (temagruppe: string) => Promise<Oppgave[]>;
    velgTemagruppe: (temagruppe: string) => void;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

class HentOppgaveKnapp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onPlukkOppgaver = this.onPlukkOppgaver.bind(this);
        this.onTemagruppeChange = this.onTemagruppeChange.bind(this);
        this.state = { tomKø: false };
    }

    onPlukkOppgaver() {
        if (!this.props.valgtTemagruppe) {
            this.setState({ temagruppeFeilmelding: 'Du må velge temagruppe' });
            return;
        }
        this.setState({ temagruppeFeilmelding: undefined, tomKø: false });
        settJobberMedSpørsmålOgSvar();
        this.props.plukkOppgaver(this.props.valgtTemagruppe).then((oppgaver: Oppgave[]) => {
            const fødselsnummer = selectFodselsnummerfraOppgaver(oppgaver);
            if (!fødselsnummer) {
                this.setState({ tomKø: true });
                return;
            }
            setNyBrukerIPath(this.props.history, fødselsnummer);
        });
    }

    render() {
        const valgtTemagruppe = this.props.valgtTemagruppe;
        const tomtTilbakemelding = this.state.tomKø ? (
            <AlertStripeInfo>Det er ingen nye oppgaver på valgt temagruppe</AlertStripeInfo>
        ) : null;
        const temagruppeOptions = PLUKKBARE_TEMAGRUPPER.map(temagruppe => (
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
                        feil={
                            this.state.temagruppeFeilmelding
                                ? { feilmelding: this.state.temagruppeFeilmelding }
                                : undefined
                        }
                    >
                        <option disabled={true} value={''}>
                            Velg temagruppe
                        </option>
                        {temagruppeOptions}
                    </Select>
                    <KnappBase
                        id="hentoppgaveknapp"
                        type="hoved"
                        onClick={this.onPlukkOppgaver}
                        spinner={isLoading(this.props.oppgaveResource)}
                    >
                        Hent
                    </KnappBase>
                </KnappLayout>
                <ResourceFeilmelding resource={this.props.oppgaveResource} />
                {tomtTilbakemelding}
            </HentOppgaveLayout>
        );
    }

    private onTemagruppeChange(event: ChangeEvent<HTMLSelectElement>) {
        this.props.velgTemagruppe(event.target.value);
        this.setState({ temagruppeFeilmelding: undefined });
    }
}

function mapStateToProps(state: AppState, routeProps: RouteComponentProps<{}>): StateProps {
    return {
        valgtTemagruppe: state.temagruppe.valgtTemagruppe,
        oppgaveResource: state.restResources.oppgaver,
        routeHistory: routeProps.history
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        plukkOppgaver: temagruppe => dispatch(plukkOppgaver(temagruppe)),
        velgTemagruppe: temagruppe => dispatch(velgTemagruppe(temagruppe))
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HentOppgaveKnapp)
);
