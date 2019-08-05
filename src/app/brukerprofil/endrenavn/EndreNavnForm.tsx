import * as React from 'react';
import { FormEvent } from 'react';
import { connect } from 'react-redux';

import { Input } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { EndreNavnRequest } from '../../../redux/restReducers/brukerprofil/endreNavnRequest';
import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducers';
import { VeilederRoller } from '../../../models/veilederRoller';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { brukersNavnKanEndres, validerNavn } from './endrenavn-utils';
import { EndreNavnInfomeldingWrapper } from '../Infomelding';
import { ignoreEnter, InputState, visEndringsinfo } from '../utils/formUtils';
import { FormFieldSet } from '../../personside/visittkort/body/VisittkortStyles';
import { veilederHarPåkrevdRolleForEndreNavn } from '../utils/RollerUtils';
import { loggEvent } from '../../../utils/frontendLogger';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { PostStatus } from '../../../rest/utils/postResource';

interface NavnInputProps {
    label: string;
    state: InputState;
    onChange: (input: string) => void;
}

function NavnInput({ label, state, onChange }: NavnInputProps) {
    const feilmelding = state.feilmelding ? { feilmelding: state.feilmelding } : undefined;
    return (
        <Input
            label={label}
            name={label}
            value={state.input}
            onChange={event => onChange(event.target.value.toUpperCase())}
            onKeyPress={ignoreEnter}
            feil={feilmelding}
        />
    );
}

interface State {
    fornavn: InputState;
    mellomnavn: InputState;
    etternavn: InputState;
    formErEndret: boolean;
}

interface DispatchProps {
    endreNavn: (request: EndreNavnRequest) => void;
    resetEndreNavnResource: () => void;
}

interface StateProps {
    resourceStatus: PostStatus;
}

interface OwnProps {
    person: Person;
    veilederRoller: VeilederRoller;
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
                feilmelding: null
            },
            mellomnavn: {
                input: props.person.navn.mellomnavn || '',
                feilmelding: null
            },
            etternavn: {
                input: props.person.navn.etternavn || '',
                feilmelding: null
            },
            formErEndret: false
        };
    }

    componentWillUnmount() {
        this.props.resetEndreNavnResource();
    }

    fornavnInputChange(input: string) {
        this.setState({
            fornavn: {
                input,
                feilmelding: null
            },
            formErEndret: true
        });
    }

    mellomnavnInputChange(input: string) {
        this.setState({
            mellomnavn: {
                feilmelding: null,
                input
            },
            formErEndret: true
        });
    }

    etternavnInputChange(input: string) {
        this.setState({
            etternavn: {
                feilmelding: null,
                input
            },
            formErEndret: true
        });
    }

    navnErEndret() {
        const fornavnErEndret = this.state.fornavn.input !== this.props.person.navn.fornavn;
        const mellomnavnErEndret = this.state.mellomnavn.input !== this.props.person.navn.mellomnavn;
        const etternavnErEndret = this.state.etternavn.input !== this.props.person.navn.etternavn;
        return fornavnErEndret || mellomnavnErEndret || etternavnErEndret;
    }

    tilbakestillForm(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.initialState(this.props));
        this.props.resetEndreNavnResource();
        event.preventDefault();
    }

    validerFornavn() {
        try {
            validerNavn(this.state.fornavn.input);
        } catch (error) {
            this.setState({
                fornavn: {
                    ...this.state.fornavn,
                    feilmelding: error.message
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
                    feilmelding: error.message
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
        loggEvent('Endre navn', 'Brukerprofil');
    }

    render() {
        const kanEndreNavn =
            veilederHarPåkrevdRolleForEndreNavn(this.props.veilederRoller) && brukersNavnKanEndres(this.props.person);
        return (
            <form onSubmit={this.handleSubmit}>
                <FormFieldSet disabled={!kanEndreNavn}>
                    <Undertittel>Navn</Undertittel>
                    {visEndringsinfo(this.props.person.navn.endringsinfo)}
                    <EndreNavnInfomeldingWrapper person={this.props.person} veilderRoller={this.props.veilederRoller} />
                    <NavnInput label="Fornavn" state={this.state.fornavn} onChange={this.fornavnInputChange} />
                    <NavnInput label="Mellomnavn" state={this.state.mellomnavn} onChange={this.mellomnavnInputChange} />
                    <NavnInput label="Etternavn" state={this.state.etternavn} onChange={this.etternavnInputChange} />
                    <FormKnapperWrapper>
                        <KnappBase
                            type="standard"
                            onClick={this.tilbakestillForm}
                            disabled={!kanEndreNavn || !this.state.formErEndret || !this.navnErEndret()}
                        >
                            Avbryt
                        </KnappBase>
                        <KnappBase
                            type="hoved"
                            spinner={this.props.resourceStatus === PostStatus.POSTING}
                            disabled={!kanEndreNavn || !this.state.formErEndret || !this.navnErEndret()}
                            autoDisableVedSpinner={true}
                        >
                            Endre navn
                        </KnappBase>
                    </FormKnapperWrapper>
                    {!this.state.formErEndret ? (
                        <RequestTilbakemelding
                            status={this.props.resourceStatus}
                            onSuccess={'Navnet ble endret. Det kan ta noe tid før endringen blir synlig'}
                            onError={'Det skjedde en feil ved endring av navn.'}
                        />
                    ) : null}
                </FormFieldSet>
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        resourceStatus: state.restResources.endreNavn.status
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        endreNavn: (request: EndreNavnRequest) =>
            dispatch((d, getState) => d(getState().restResources.endreNavn.actions.post(request))),
        resetEndreNavnResource: () => dispatch((d, getState) => d(getState().restResources.endreNavn.actions.reset))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EndreNavnForm);
