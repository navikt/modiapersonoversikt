import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';
import AlertStripe from 'nav-frontend-alertstriper';

import { STATUS } from '../../redux/utils';
import { EndreNavnRequest } from '../../redux/brukerprofil/endreNavnRequest';
import { BostatusTyper, Person } from '../../models/person/person';
import { AppState } from '../../redux/reducer';
import { endreNavn, reset } from '../../redux/brukerprofil/endreNavn';
import { VeilederRoller } from '../../models/veilederRoller';
import { FormKnapperWrapper } from './BrukerprofilForm';
import RequestTilbakemelding from './kontaktinformasjon/RequestTilbakemelding';
import { erDnummer } from '../../utils/fnr-utils';

const InfomeldingWrapper = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

interface State {
    fornavnInput: string;
    mellomnavnInput: string;
    etternavnInput: string;
    formErEndret: boolean;
}

interface DispatchProps {
    endreNavn: (request: EndreNavnRequest) => void;
    resetEndreNavnReducer: () => void;
}

interface StateProps {
    status: STATUS;
}

interface OwnProps {
    person: Person;
    veilederRoller?: VeilederRoller;
}

type Props = DispatchProps & StateProps & OwnProps;

class EndreNavnForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = this.initialState(props);

        this.fornavnInputChange = this.fornavnInputChange.bind(this);
        this.mellomnavnInputChange = this.mellomnavnInputChange.bind(this);
        this.etternavnInputChange = this.etternavnInputChange.bind(this);
        this.tilbakestillForm = this.tilbakestillForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    initialState(props: Props) {
        return {
            fornavnInput: props.person.navn.fornavn || '',
            mellomnavnInput: props.person.navn.mellomnavn || '',
            etternavnInput: props.person.navn.etternavn || '',
            formErEndret: false
        };
    }

    componentWillUnmount() {
        this.props.resetEndreNavnReducer();
    }

    fornavnInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            fornavnInput: event.target.value,
            formErEndret: true
        });
    }

    mellomnavnInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            mellomnavnInput: event.target.value,
            formErEndret: true
        });
    }

    etternavnInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            etternavnInput: event.target.value,
            formErEndret: true
        });
    }

    brukersNavnKanEndres() {
        if (erDnummer(this.props.person.fødselsnummer)) {
            return true;
        } else if (this.props.person.personstatus === BostatusTyper.Utvandret) {
            return true;
        }

        return false;
    }

    navnErEndret() {
        const fornavnErEndret = this.state.fornavnInput !== this.props.person.navn.fornavn;
        const mellomnavnErEndret = this.state.mellomnavnInput !== this.props.person.navn.mellomnavn;
        const etternavnErEndret = this.state.etternavnInput !== this.props.person.navn.etternavn;
        return fornavnErEndret || mellomnavnErEndret || etternavnErEndret;
    }

    tilbakestillForm(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.initialState(this.props));
        this.props.resetEndreNavnReducer();
        event.preventDefault();
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        this.setState({
            formErEndret: false
        });

        this.props.endreNavn({
            fødselsnummer: this.props.person.fødselsnummer,
            fornavn: this.state.fornavnInput,
            mellomnavn: this.state.mellomnavnInput,
            etternavn: this.state.etternavnInput
        });
        event.preventDefault();
    }

    harVeilderPåkrevdRolle() {
        if (!this.props.veilederRoller) {
            return false;
        }
        return this.props.veilederRoller.roller.includes('0000-GA-BD06_EndreNavn');
    }

    potensiellInfomelding() {
        if (!this.harVeilderPåkrevdRolle()) {
            return (
                <InfomeldingWrapper>
                    <AlertStripe
                        type={'info'}
                    >
                        Du har ikke nødvendig rolle for å endre navn.
                    </AlertStripe>
                </InfomeldingWrapper>
            );
        }

        if (!this.brukersNavnKanEndres()) {
            return (
                <InfomeldingWrapper>
                    <AlertStripe
                        type={'info'}
                    >
                        Bruker har ikke D-nummer eller er ikke utvandret. Du kan derfor ikke endre navnet.
                    </AlertStripe>
                </InfomeldingWrapper>
            );
        }

        return null;
    }

    render() {
        const kanEndreNavn = this.harVeilderPåkrevdRolle() && this.brukersNavnKanEndres();
        const infomelding = this.potensiellInfomelding();
        return (
            <form onSubmit={this.handleSubmit}>
                <Undertittel>Navn</Undertittel>
                {infomelding}
                <Input
                    label="Fornavn"
                    value={this.state.fornavnInput}
                    onChange={this.fornavnInputChange}
                    disabled={!kanEndreNavn}
                />
                <Input
                    label="Mellomnavn"
                    value={this.state.mellomnavnInput}
                    onChange={this.mellomnavnInputChange}
                    disabled={!kanEndreNavn}
                />
                <Input
                    label="Etternavn"
                    value={this.state.etternavnInput}
                    onChange={this.etternavnInputChange}
                    disabled={!kanEndreNavn}
                />
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        onClick={this.tilbakestillForm}
                        disabled={!kanEndreNavn || !this.state.formErEndret}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        spinner={this.props.status === STATUS.PENDING}
                        disabled={!kanEndreNavn || !this.state.formErEndret}
                        autoDisableVedSpinner={true}
                    >
                        Endre navn
                    </KnappBase>
                </FormKnapperWrapper>
                {!this.state.formErEndret
                    ? (<RequestTilbakemelding
                        status={this.props.status}
                        onSuccess={'Navnet ble endret. Det kan ta noen minutter før endringene blir synlig.'}
                        onError={'Det skjedde en feil ved endring av navn.'}
                    />)
                    : null
                }
            </form>

        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        status: state.endreNavn.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        endreNavn: (request: EndreNavnRequest) => dispatch(endreNavn(request)),
        resetEndreNavnReducer: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EndreNavnForm);
