import * as React from 'react';
import { FormEvent } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import KnappBase from 'nav-frontend-knapper';

import { STATUS } from '../../../redux/restReducers/utils';
import { AppState } from '../../../redux/reducers';
import { EndreTilrettelagtKommunikasjonrequest }
    from '../../../redux/restReducers/brukerprofil/endreTilrettelagtKommunikasjonrequest';
import {
    endreTilrettelagtKommunikasjon,
    reset
} from '../../../redux/restReducers/brukerprofil/endreTilrettelagtKommunikasjon';
import { Person } from '../../../models/person/person';
import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';
import { KodeverkResponse } from '../../../models/kodeverk';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import styled from 'styled-components';
import { reloadPerson } from '../../../redux/restReducers/personinformasjon';
import { loggEvent } from '../../../utils/frontendLogger';

interface State {
    checkbokser: CheckboksProps[];
}

interface DispatchProps {
    reloadPerson: (fødselsnummer: string) => void;
    endreTilrettelagtKommunikasjon: (request: EndreTilrettelagtKommunikasjonrequest) => void;
    resetEndreTilrettelagtKommunikasjonReducer: () => void;
}

interface StateProps {
    reducerStatus: STATUS;
}

interface OwnProps {
    person: Person;
    tilrettelagtKommunikasjonKodeverk: KodeverkResponse;
}

type Props = DispatchProps & StateProps & OwnProps;

const Luft = styled.div`
  margin-top: 0.5em;
`;

class TilrettelagtKommunikasjonsForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            checkbokser: this.lagKnapper()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.tilbakestillForm = this.tilbakestillForm.bind(this);
    }

    componentWillUnmount() {
        this.props.resetEndreTilrettelagtKommunikasjonReducer();
    }

    componentDidUpdate(prevProps: Props) {
        this.reloadOnEndret(prevProps);
    }

    reloadOnEndret(prevProps: Props) {
        if (prevProps.reducerStatus !== STATUS.OK && this.props.reducerStatus === STATUS.OK) {
            this.props.reloadPerson(this.props.person.fødselsnummer);
        }
    }

    lagKnapper() {
        const tilrettelagtKommunikasjonKodeverk = this.props.tilrettelagtKommunikasjonKodeverk.kodeverk;
        return tilrettelagtKommunikasjonKodeverk.map((kommunikasjonsmetode) => {
            return {
                label: kommunikasjonsmetode.beskrivelse,
                value: kommunikasjonsmetode.kodeRef,
                id: kommunikasjonsmetode.kodeRef,
                checked: this.props.person.tilrettelagtKomunikasjonsListe.some((tk) =>
                    tk.kodeRef === kommunikasjonsmetode.kodeRef),
            };
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        this.props.endreTilrettelagtKommunikasjon({
            fødselsnummer: this.props.person.fødselsnummer,
            tilrettelagtKommunikasjon: this.hentValgtTilrettelagtKommunikasjon()
        } as EndreTilrettelagtKommunikasjonrequest);
        event.preventDefault();
        loggEvent('Endre tilrettelagt kommunikasjon', 'Brukerprofil');
    }

    handleOnChange(event: React.SyntheticEvent<EventTarget>, value?: string) {
        const newCheckboksState = this.state.checkbokser.map((checkboks: CheckboksProps) => {
                if (checkboks.value === value) {
                    return { ...checkboks, checked: !checkboks.checked };
                }
                return checkboks;
            }
        );
        this.setState({
            checkbokser: newCheckboksState
        });
    }

    erEndret() {
        return this.state.checkbokser.some((checkboks) => {
            const erTilrettelagt = this.props.person.tilrettelagtKomunikasjonsListe.some((tk) =>
                checkboks.id === tk.kodeRef
            );
            const fjernet = !checkboks.checked && erTilrettelagt;
            const lagtTil = checkboks.checked && !erTilrettelagt;
            return fjernet || lagtTil;
        });
    }

    tilbakestillForm(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({
            checkbokser: this.lagKnapper()
        });
        this.props.resetEndreTilrettelagtKommunikasjonReducer();
        event.preventDefault();
    }

    hentValgtTilrettelagtKommunikasjon() {
        return this.state.checkbokser
            .filter(element => element.checked)
            .map(element => element.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CheckboksPanelGruppe
                    checkboxes={this.state.checkbokser}
                    legend={''}
                    onChange={this.handleOnChange}
                />
                <Luft />
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        onClick={this.tilbakestillForm}
                        disabled={!this.erEndret() || this.props.reducerStatus === STATUS.LOADING}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        spinner={this.props.reducerStatus === STATUS.LOADING}
                        disabled={!this.erEndret()}
                        title={!this.erEndret() ? 'Ingen endringer' : ''}
                        autoDisableVedSpinner={true}
                    >
                        Endre tilrettelagt kommunikasjon
                    </KnappBase>
                </FormKnapperWrapper>
                <RequestTilbakemelding
                    status={this.props.reducerStatus}
                    onError={'Det skjedde en feil ved endring av tilrettelagt kommunikasjon.'}
                    onSuccess={`Tilrettelagt kommunikasjon ble endret.`}
                />
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        reducerStatus: state.restEndepunkter.endreTilrettelagtKommunikasjon.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        reloadPerson: (fødselsnummer: string) => dispatch(reloadPerson(fødselsnummer)),
        endreTilrettelagtKommunikasjon: (request: EndreTilrettelagtKommunikasjonrequest) =>
            dispatch(endreTilrettelagtKommunikasjon(request)),
        resetEndreTilrettelagtKommunikasjonReducer: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TilrettelagtKommunikasjonsForm);
