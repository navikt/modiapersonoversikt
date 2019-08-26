import * as React from 'react';
import { FormEvent } from 'react';
import { connect } from 'react-redux';

import KnappBase from 'nav-frontend-knapper';
import { AppState } from '../../../redux/reducers';
import { EndreTilrettelagtKommunikasjonrequest } from '../../../redux/restReducers/brukerprofil/endreTilrettelagtKommunikasjonrequest';
import { Person } from '../../../models/person/person';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';
import { KodeverkResponse } from '../../../models/kodeverk';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import styled from 'styled-components';
import { loggEvent } from '../../../utils/frontendLogger';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { PostStatus } from '../../../rest/utils/postResource';

interface State {
    checkbokser: CheckboksProps[];
}

interface DispatchProps {
    reloadPerson: (fødselsnummer: string) => void;
    endreTilrettelagtKommunikasjon: (request: EndreTilrettelagtKommunikasjonrequest) => void;
    resetEndreTilrettelagtKommunikasjonResource: () => void;
}

interface StateProps {
    resourceStatus: PostStatus;
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
        this.props.resetEndreTilrettelagtKommunikasjonResource();
    }

    componentDidUpdate(prevProps: Props) {
        this.reloadOnEndret(prevProps);
    }

    reloadOnEndret(prevProps: Props) {
        if (prevProps.resourceStatus !== PostStatus.SUCCESS && this.props.resourceStatus === PostStatus.SUCCESS) {
            this.props.reloadPerson(this.props.person.fødselsnummer);
        }
    }

    lagKnapper() {
        const tilrettelagtKommunikasjonKodeverk = this.props.tilrettelagtKommunikasjonKodeverk.kodeverk;
        return tilrettelagtKommunikasjonKodeverk.map(kommunikasjonsmetode => {
            return {
                label: kommunikasjonsmetode.beskrivelse,
                value: kommunikasjonsmetode.kodeRef,
                id: kommunikasjonsmetode.kodeRef,
                checked: this.props.person.tilrettelagtKomunikasjonsListe.some(
                    tk => tk.kodeRef === kommunikasjonsmetode.kodeRef
                )
            };
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        this.props.endreTilrettelagtKommunikasjon({
            tilrettelagtKommunikasjon: this.hentValgtTilrettelagtKommunikasjon()
        });
        event.preventDefault();
        loggEvent('Endre tilrettelagt kommunikasjon', 'Brukerprofil');
    }

    handleOnChange(event: React.SyntheticEvent<EventTarget>, value?: string) {
        const newCheckboksState = this.state.checkbokser.map((checkboks: CheckboksProps) => {
            if (checkboks.value === value) {
                return { ...checkboks, checked: !checkboks.checked };
            }
            return checkboks;
        });
        this.setState({
            checkbokser: newCheckboksState
        });
    }

    erEndret() {
        return this.state.checkbokser.some(checkboks => {
            const erTilrettelagt = this.props.person.tilrettelagtKomunikasjonsListe.some(
                tk => checkboks.id === tk.kodeRef
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
        this.props.resetEndreTilrettelagtKommunikasjonResource();
        event.preventDefault();
    }

    hentValgtTilrettelagtKommunikasjon() {
        return this.state.checkbokser.filter(element => element.checked).map(element => element.value as string);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CheckboksPanelGruppe checkboxes={this.state.checkbokser} legend={''} onChange={this.handleOnChange} />
                <Luft />
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        onClick={this.tilbakestillForm}
                        disabled={!this.erEndret() || this.props.resourceStatus === PostStatus.POSTING}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        spinner={this.props.resourceStatus === PostStatus.POSTING}
                        disabled={!this.erEndret()}
                        title={!this.erEndret() ? 'Ingen endringer' : ''}
                        autoDisableVedSpinner={true}
                    >
                        Endre tilrettelagt kommunikasjon
                    </KnappBase>
                </FormKnapperWrapper>
                <RequestTilbakemelding
                    status={this.props.resourceStatus}
                    onError={'Det skjedde en feil ved endring av tilrettelagt kommunikasjon.'}
                    onSuccess={`Tilrettelagt kommunikasjon ble endret.`}
                />
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        resourceStatus: state.restResources.endreTilrettelagtKommunikasjon.status
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        reloadPerson: (fødselsnummer: string) =>
            dispatch((d, getState) => d(getState().restResources.personinformasjon.actions.reload)),
        endreTilrettelagtKommunikasjon: (request: EndreTilrettelagtKommunikasjonrequest) =>
            dispatch((d, getState) => d(getState().restResources.endreTilrettelagtKommunikasjon.actions.post(request))),
        resetEndreTilrettelagtKommunikasjonResource: () =>
            dispatch((d, getState) => d(getState().restResources.endreTilrettelagtKommunikasjon.actions.reset))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TilrettelagtKommunikasjonsForm);
