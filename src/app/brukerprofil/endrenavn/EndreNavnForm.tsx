import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import Input from 'nav-frontend-skjema/lib/input';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';

import { STATUS } from '../../../redux/utils';
import { EndreNavnRequest } from '../../../redux/brukerprofil/endreNavnRequest';
import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducer';
import { endreNavn, reset } from '../../../redux/brukerprofil/endreNavn';
import { VeilederRoller } from '../../../models/veilederRoller';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import RequestTilbakemelding from '../kontaktinformasjon/RequestTilbakemelding';
import { brukersNavnKanEndres, validerNavn, veilederHarPåkrevdRolle } from './endrenavn-utils';
import Infomelding from './Infomelding';

const ENTER_KEY_PRESS = 13;

function ignoreEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === ENTER_KEY_PRESS) {
        event.preventDefault();
    }
}

interface State {
    fornavn: {
        input: string;
        feilmelding: string | undefined;
    };
    mellomnavn: {
        input: string;
        feilmelding: string | undefined;
    };
    etternavn: {
        input: string;
        feilmelding: string | undefined;
    };
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
            fornavn: {
                input: props.person.navn.fornavn || '',
                feilmelding: undefined
            },
            mellomnavn: {
                input: props.person.navn.mellomnavn || '',
                feilmelding: undefined
            },
            etternavn: {
                input: props.person.navn.etternavn || '',
                feilmelding: undefined
            },
            formErEndret: false
        };
    }

    componentWillUnmount() {
        this.props.resetEndreNavnReducer();
    }

    fornavnInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            fornavn: {
                input: event.target.value.toUpperCase(),
                feilmelding: undefined
            },
            formErEndret: true
        });
    }

    mellomnavnInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            mellomnavn: {
                feilmelding: undefined,
                input: event.target.value.toUpperCase()
            },
            formErEndret: true
        });
    }

    etternavnInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            etternavn: {
                feilmelding: undefined,
                input: event.target.value.toUpperCase()
            },
            formErEndret: true
        });
        event.preventDefault();
    }

    navnErEndret() {
        const fornavnErEndret = this.state.fornavn.input !== this.props.person.navn.fornavn;
        const mellomnavnErEndret = this.state.mellomnavn.input !== this.props.person.navn.mellomnavn;
        const etternavnErEndret = this.state.etternavn.input !== this.props.person.navn.etternavn;
        return fornavnErEndret || mellomnavnErEndret || etternavnErEndret;
    }

    tilbakestillForm(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.initialState(this.props));
        this.props.resetEndreNavnReducer();
        event.preventDefault();
    }

    validerFornavn() {
        try {
            validerNavn(this.state.fornavn.input);
        } catch (error) {
            this.setState({
                fornavn: {
                    ...this.state.fornavn,
                    feilmelding: error.toString()
                }
            });
            throw error;
        }
    }

    validerEtternavn() {
        try {
            validerNavn(this.state.etternavn.input);
        } catch (error) {
            this.setState({
                etternavn: {
                    ...this.state.etternavn,
                    feilmelding: error.toString()
                }
            });
            throw error;
        }
    }

    validerInput() {
        let validInput = true;

        try {
            this.validerFornavn();
        } catch {
            validInput = false;
        }

        try {
            this.validerEtternavn();
        } catch {
            validInput = false;
        }

        return validInput;
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!this.validerInput()) {
            return;
        }

        this.setState({
            formErEndret: false
        });

        this.props.endreNavn({
            fødselsnummer: this.props.person.fødselsnummer,
            fornavn: this.state.fornavn.input,
            mellomnavn: this.state.mellomnavn.input,
            etternavn: this.state.etternavn.input
        });
    }

    render() {
        const kanEndreNavn = veilederHarPåkrevdRolle(this.props.veilederRoller) &&
            brukersNavnKanEndres(this.props.person);
        return (
            <form onSubmit={this.handleSubmit}>
                <Undertittel>Navn</Undertittel>
                <Infomelding person={this.props.person} veilderRoller={this.props.veilederRoller}/>
                <Input
                    label="Fornavn"
                    value={this.state.fornavn.input}
                    onChange={this.fornavnInputChange}
                    disabled={!kanEndreNavn}
                    onKeyPress={ignoreEnter}
                    feil={this.state.fornavn.feilmelding ? {feilmelding: this.state.fornavn.feilmelding} : undefined}
                />
                <Input
                    label="Mellomnavn"
                    value={this.state.mellomnavn.input}
                    onChange={this.mellomnavnInputChange}
                    disabled={!kanEndreNavn}
                    onKeyPress={ignoreEnter}
                    feil={this.state.mellomnavn.feilmelding ?
                        {feilmelding: this.state.mellomnavn.feilmelding} :
                        undefined}
                />
                <Input
                    label="Etternavn"
                    value={this.state.etternavn.input}
                    onChange={this.etternavnInputChange}
                    disabled={!kanEndreNavn}
                    onKeyPress={ignoreEnter}
                    feil={this.state.etternavn.feilmelding ?
                        {feilmelding: this.state.etternavn.feilmelding} :
                        undefined}
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
