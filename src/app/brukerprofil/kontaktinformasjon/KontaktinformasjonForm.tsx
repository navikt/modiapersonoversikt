import * as React from 'react';
import { FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import KnappBase from 'nav-frontend-knapper';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';

import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducers';
import { KodeverkResponse } from '../../../models/kodeverk';
import { Telefon } from '../../../models/person/NAVKontaktinformasjon';
import {
    formaterTelefonnummer,
    sorterRetningsnummerMedNorgeFørst
} from '../../../utils/telefon-utils';
import { TelefonInput, TelefonMetadata } from './TelefonInput';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import {
    endreNavKontaktinformasjon,
    tilbakestillReducer
} from '../../../redux/restReducers/brukerprofil/kontaktinformasjon';
import { Request } from '../../../api/brukerprofil/endre-navkontaktinformasjon-api';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { STATUS } from '../../../redux/restReducers/utils';
import { erTomStreng, removeWhitespace } from '../../../utils/string-utils';
import { reloadPerson } from '../../../redux/restReducers/personinformasjon';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';
import { getValidTelefonInput, validerTelefonInput } from './kontaktinformasjonValidator';

export interface TelefonInput {
    retningsnummer: string;
    identifikator: string;
}

export interface EndreKontaktinformasjonInputs {
    mobil: TelefonInput;
    jobb: TelefonInput;
    hjem: TelefonInput;
}

export interface EndreKontaktinformasjonValidator {
    mobil: ValideringsResultat<TelefonInput>;
    hjem: ValideringsResultat<TelefonInput>;
    jobb: ValideringsResultat<TelefonInput>;
}

export interface EndreKontaktinformasjonState {
    inputs: EndreKontaktinformasjonInputs;
    validator: EndreKontaktinformasjonValidator;
    visFeilmeldinger: boolean;
}

interface DispatchProps {
    reloadPerson: (fødselsnummer: string) => void;
    endreNavKontaktinformasjon: (request: Request, fødselsnummer: string) => Promise<{}>;
    tilbakestillReducer: () => void;
}

interface StateProps {
    reducerStatus: STATUS;
}

interface OwnProps {
    person: Person;
    retningsnummerKodeverk: KodeverkResponse;
}

type Props = DispatchProps & StateProps & OwnProps;

const InputWrapper = styled.div`
  margin-top: 1em;
`;

const TelefonWrapper = styled.div`
  margin-bottom: 1em;
`;

function getInitialTelefonState(telefon: Telefon | undefined): TelefonInput {
    if (!telefon) {
        return {
            retningsnummer: '',
            identifikator: ''
        };
    }

    return {
        retningsnummer: telefon.retningsnummer ? telefon.retningsnummer.kodeRef : '',
        identifikator: formaterTelefonnummer(telefon.identifikator)
    };
}

function getTelefonHvisSatt(telefon: TelefonInput) {
    if (erTomStreng(telefon.identifikator) || erTomStreng(telefon.retningsnummer)) {
        return undefined;
    }
    return {
        identifikator: removeWhitespace(telefon.identifikator),
        retningsnummer: removeWhitespace(telefon.retningsnummer)
    };
}

class KontaktinformasjonForm extends React.Component<Props, EndreKontaktinformasjonState> {

    constructor(props: Props) {
        super(props);

        this.state = this.getInitialState();
        this.mobilTelefonnummerInputChange = this.mobilTelefonnummerInputChange.bind(this);
        this.mobilRetningsnummerInputChange = this.mobilRetningsnummerInputChange.bind(this);
        this.jobbTelefonnummerInputChange = this.jobbTelefonnummerInputChange.bind(this);
        this.jobbRetningsnummerInputChange = this.jobbRetningsnummerInputChange.bind(this);
        this.hjemTelefonnummerInputChange = this.hjemTelefonnummerInputChange.bind(this);
        this.hjemRetningsnummerInputChange = this.hjemRetningsnummerInputChange.bind(this);
        this.avbryt = this.avbryt.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        sorterRetningsnummerMedNorgeFørst(props.retningsnummerKodeverk);
    }

    componentWillUnmount() {
        this.resetReducer();
    }

    componentDidUpdate(prevProps: Props) {
        this.reloadOnEndret(prevProps);
    }

    getInitialState(): EndreKontaktinformasjonState {
        const kontaktinformasjon = this.props.person.kontaktinformasjon;
        const inputs = {
            mobil: getInitialTelefonState(kontaktinformasjon.mobil),
            jobb: getInitialTelefonState(kontaktinformasjon.jobbTelefon),
            hjem: getInitialTelefonState(kontaktinformasjon.hjemTelefon)
        };
        const initialValidator: EndreKontaktinformasjonValidator = {
            hjem: getValidTelefonInput(),
            jobb: getValidTelefonInput(),
            mobil: getValidTelefonInput()
        };
        return {
            inputs: inputs,
            validator: initialValidator,
            visFeilmeldinger: false
        };
    }

    reloadOnEndret(prevProps: Props) {
        if (prevProps.reducerStatus !== STATUS.OK && this.props.reducerStatus === STATUS.OK) {
            this.props.reloadPerson(this.props.person.fødselsnummer);
        }
    }

    inputChange(change: Partial<EndreKontaktinformasjonInputs>) {
        this.setState({
            inputs: {
                ...this.state.inputs,
                ...change
            },
            validator: this.getInitialState().validator
        });
    }

    mobilTelefonnummerInputChange(input: string) {
        this.inputChange({
            mobil: {
                ...this.state.inputs.mobil,
                identifikator: formaterTelefonnummer(input)
            }
        });
        this.resetReducer();
    }

    mobilRetningsnummerInputChange(input: string) {
        this.inputChange({
            mobil: {
                ...this.state.inputs.mobil,
                retningsnummer: input

            }
        });
        this.resetReducer();
    }

    jobbTelefonnummerInputChange(input: string) {
        this.inputChange({
            jobb: {
                ...this.state.inputs.jobb,
                identifikator: formaterTelefonnummer(input)
            }
        });
        this.resetReducer();
    }

    jobbRetningsnummerInputChange(input: string) {
        this.inputChange({
            jobb: {
                ...this.state.inputs.jobb,
                retningsnummer: input
            }
        });
        this.resetReducer();
    }

    hjemTelefonnummerInputChange(input: string) {
        this.inputChange({
            hjem: {
                ...this.state.inputs.hjem,
                identifikator: formaterTelefonnummer(input)
            }
        });
        this.resetReducer();
    }

    hjemRetningsnummerInputChange(input: string) {
        this.inputChange({
            hjem: {
                ...this.state.inputs.hjem,
                retningsnummer: input
            }
        });
        this.resetReducer();
    }

    resetReducer() {
        if (this.props.reducerStatus !== STATUS.NOT_STARTED) {
            this.props.tilbakestillReducer();
        }
    }

    avbryt(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState(this.getInitialState());
        this.resetReducer();
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validerinsResultat = this.getValideringsResultat();
        const formErGyldig =
            validerinsResultat.mobil.formErGyldig
            && validerinsResultat.jobb.formErGyldig
            && validerinsResultat.hjem.formErGyldig;

        if (!formErGyldig) {
            this.setState({
                validator: validerinsResultat
            });
            return;
        }

        const request = {
            mobil: getTelefonHvisSatt(this.state.inputs.mobil),
            jobb: getTelefonHvisSatt(this.state.inputs.jobb),
            hjem: getTelefonHvisSatt(this.state.inputs.hjem)
        };
        this.props.endreNavKontaktinformasjon(request, this.props.person.fødselsnummer);
    }

    getValideringsResultat(): EndreKontaktinformasjonValidator {
        const hjemValidator = validerTelefonInput(this.state.inputs.hjem, 'hjem');
        const jobbValidator = validerTelefonInput(this.state.inputs.jobb, 'jobb');
        const mobilValidator = validerTelefonInput(this.state.inputs.mobil, 'mobil');

        return {
            hjem: hjemValidator,
            jobb: jobbValidator,
            mobil: mobilValidator
        };
    }

    requestIsPending() {
        return this.props.reducerStatus === STATUS.LOADING;
    }

    formErEndret() {
        const initialState: EndreKontaktinformasjonState = this.getInitialState();
        return JSON.stringify(initialState) !== JSON.stringify(this.state);
    }

    kontaktInfoBleLagret() {
        return this.props.reducerStatus === STATUS.OK;
    }

    Tilbakemelding() {
        return (
            <RequestTilbakemelding
                status={this.props.reducerStatus}
                onSuccess={'Telefonnummer(e) ble endret.'}
                onError={'Det skjedde en feil ved lagring av telefonnummer'}
            />
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <UndertekstBold>Telefonnummer bruker ønsker å bli oppringt på</UndertekstBold>
                <InputWrapper>
                    <TelefonWrapper>
                        <TelefonInput
                            retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                            inputValue={this.state.inputs.mobil}
                            valideringsresultat={this.state.validator.mobil}
                            retningsnummerInputChange={this.mobilRetningsnummerInputChange}
                            telfonnummerInputChange={this.mobilTelefonnummerInputChange}
                        >
                            Mobiltelefon
                        </TelefonInput>
                        <TelefonMetadata telefon={this.props.person.kontaktinformasjon.mobil}/>
                    </TelefonWrapper>
                    <TelefonWrapper>
                        <TelefonInput
                            retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                            inputValue={this.state.inputs.hjem}
                            valideringsresultat={this.state.validator.hjem}
                            retningsnummerInputChange={this.hjemRetningsnummerInputChange}
                            telfonnummerInputChange={this.hjemTelefonnummerInputChange}
                        >
                            Hjemmenummer
                        </TelefonInput>
                    </TelefonWrapper>
                    <TelefonMetadata telefon={this.props.person.kontaktinformasjon.hjemTelefon}/>
                    <TelefonInput
                        retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                        inputValue={this.state.inputs.jobb}
                        valideringsresultat={this.state.validator.jobb}
                        retningsnummerInputChange={this.jobbRetningsnummerInputChange}
                        telfonnummerInputChange={this.jobbTelefonnummerInputChange}
                    >
                        Jobbnummer
                    </TelefonInput>
                    <TelefonMetadata telefon={this.props.person.kontaktinformasjon.jobbTelefon}/>
                </InputWrapper>
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        disabled={!this.formErEndret() || this.requestIsPending() || this.kontaktInfoBleLagret()}
                        onClick={this.avbryt}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        disabled={!this.formErEndret() || this.kontaktInfoBleLagret()}
                        spinner={this.requestIsPending()}
                        autoDisableVedSpinner={true}
                    >
                        Endre telefonnummer
                    </KnappBase>
                </FormKnapperWrapper>
                {this.Tilbakemelding()}
            </form>

        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        reducerStatus: state.restEndepunkter.endreKontaktinformasjonReducer.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        reloadPerson: (fødselsnummer: string) => dispatch(reloadPerson(fødselsnummer)),
        endreNavKontaktinformasjon: (request: Request, fødselsnummer: string) =>
            dispatch(endreNavKontaktinformasjon(request, fødselsnummer)),
        tilbakestillReducer: () => dispatch(tilbakestillReducer())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(KontaktinformasjonForm);
