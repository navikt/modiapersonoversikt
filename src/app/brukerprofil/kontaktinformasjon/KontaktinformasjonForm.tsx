import * as React from 'react';
import { FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import KnappBase from 'nav-frontend-knapper';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';

import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducer';
import { KodeverkResponse } from '../../../models/kodeverk';
import { NavKontaktinformasjon, Telefon } from '../../../models/person/NAVKontaktinformasjon';
import {
    formaterTelefonnummer,
    gyldigTelefonnummer,
    sorterRetningsnummerMedNorgeFørst
} from '../../../utils/telefon-utils';
import { TelefonInput, TelefonMetadata } from './TelefonInput';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { endreNavKontaktinformasjon, tilbakestillReducer } from '../../../redux/brukerprofil/kontaktinformasjon';
import { Request } from '../../../api/brukerprofil/endre-navkontaktinformasjon-api';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { STATUS } from '../../../redux/utils';
import { erTomStreng, removeWhitespace } from '../../../utils/string-utils';
import { InputState } from '../utils/formUtils';

export interface TelefonInput {
    retningsnummer: InputState;
    identifikator: InputState;
}

interface State {
    mobilInput: TelefonInput;
    jobbTelefonInput: TelefonInput;
    hjemTelefonInput: TelefonInput;
    formErEndret: boolean;
    visFeilmeldinger: boolean;
}

interface DispatchProps {
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
            retningsnummer: {
                input: '',
                feilmelding: null
            }, identifikator: {
                input: '',
                feilmelding: null
            }
        };
    }

    return {
        retningsnummer: {
            input: telefon.retningsnummer ? telefon.retningsnummer.kodeRef : '',
            feilmelding: null
        },
        identifikator: {
            input: formaterTelefonnummer(telefon.identifikator),
            feilmelding: null
        }
    };
}

function initialState(kontaktinformasjon: NavKontaktinformasjon) {
    return {
        mobilInput: getInitialTelefonState(kontaktinformasjon.mobil),
        jobbTelefonInput: getInitialTelefonState(kontaktinformasjon.jobbTelefon),
        hjemTelefonInput: getInitialTelefonState(kontaktinformasjon.hjemTelefon),
        formErEndret: false,
        visFeilmeldinger: false
    };
}

function erEndret(telefon1: TelefonInput, telefon2: TelefonInput) {
    const retningsnummerEndret = telefon1.retningsnummer.input !== telefon2.retningsnummer.input;
    const identifikatorEndret = telefon1.identifikator.input !== telefon2.identifikator.input;
    return retningsnummerEndret || identifikatorEndret;
}

function getTelefonHvisSatt(telefon: TelefonInput) {
    if (erTomStreng(telefon.identifikator.input) || erTomStreng(telefon.retningsnummer.input)) {
        return undefined;
    }
    return {
        identifikator: removeWhitespace(telefon.identifikator.input),
        retningsnummer: removeWhitespace(telefon.retningsnummer.input)
    };
}

class KontaktinformasjonForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = initialState(this.props.person.kontaktinformasjon);
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
        this.props.tilbakestillReducer();
    }

    mobilTelefonnummerInputChange(input: string) {
        this.setState({
            mobilInput: {
                ...this.state.mobilInput,
                identifikator: {
                    input: formaterTelefonnummer(input),
                    feilmelding: null
                },
            },
            formErEndret: true
        });
    }

    mobilRetningsnummerInputChange(input: string) {
        this.setState({
            mobilInput: {
                ...this.state.mobilInput,
                retningsnummer: {
                    input,
                    feilmelding: null
                }
            },
            formErEndret: true
        });
    }

    jobbTelefonnummerInputChange(input: string) {
        this.setState({
            jobbTelefonInput: {
                ...this.state.jobbTelefonInput,
                identifikator: {
                    input: formaterTelefonnummer(input),
                    feilmelding: null
                }
            },
            formErEndret: true
        });
    }

    jobbRetningsnummerInputChange(input: string) {
        this.setState({
            jobbTelefonInput: {
                ...this.state.jobbTelefonInput,
                retningsnummer: {
                    input,
                    feilmelding: null
                }
            },
            formErEndret: true
        });
    }

    hjemTelefonnummerInputChange(input: string) {
        this.setState({
            hjemTelefonInput: {
                ...this.state.hjemTelefonInput,
                identifikator: {
                    input: formaterTelefonnummer(input),
                    feilmelding: null
                }
            },
            formErEndret: true
        });
    }

    hjemRetningsnummerInputChange(input: string) {
        this.setState({
            hjemTelefonInput: {
                ...this.state.hjemTelefonInput,
                retningsnummer: {
                    input,
                    feilmelding: null
                }
            },
            formErEndret: true
        });
    }

    avbryt(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState(initialState(this.props.person.kontaktinformasjon));
    }

    telefonInputErUgyldig([telefontype, telefonnummer]: [string, TelefonInput]): boolean {
        let retningsnummerfeilmelding = null;
        let telefonnummerfeilmelding = null;

        if (!telefonnummer.retningsnummer.input && telefonnummer.identifikator.input.length !== 0) {
            retningsnummerfeilmelding = 'Velg retningsnummer';
        }
        if (telefonnummer.identifikator.input.length !== 0
            && !gyldigTelefonnummer(telefonnummer.identifikator.input)) {
            telefonnummerfeilmelding = 'Telefonnummer kan kun inneholde tall';
        }

        const state = {};
        state[telefontype] = {
            ...telefonnummer,
            identifikator: {
                ...telefonnummer.identifikator,
                feilmelding: telefonnummerfeilmelding
            },
            retningsnummer: {
                ...telefonnummer.retningsnummer,
                feilmelding: retningsnummerfeilmelding
            }
        };
        this.setState(state);

        return retningsnummerfeilmelding !== null || telefonnummerfeilmelding !== null;
    }

    validInput(): boolean {
        const {hjemTelefonInput, jobbTelefonInput, mobilInput} = this.state;

        return Object.entries({hjemTelefonInput, jobbTelefonInput, mobilInput})
            .filter(this.telefonInputErUgyldig, this)
            .length === 0;
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({formErEndret: false});

        if (!this.validInput()) {
            this.setState({visFeilmeldinger: true});
            return;
        }

        const request = {
            mobil: getTelefonHvisSatt(this.state.mobilInput),
            jobb: getTelefonHvisSatt(this.state.jobbTelefonInput),
            hjem: getTelefonHvisSatt(this.state.hjemTelefonInput)
        };
        this.props.endreNavKontaktinformasjon(request, this.props.person.fødselsnummer);
    }

    requestIsPending() {
        return this.props.reducerStatus === STATUS.PENDING;
    }

    formErEndret() {
        const mobilProps = getInitialTelefonState(this.props.person.kontaktinformasjon.mobil);
        const jobbProps = getInitialTelefonState(this.props.person.kontaktinformasjon.jobbTelefon);
        const hjemProps = getInitialTelefonState(this.props.person.kontaktinformasjon.hjemTelefon);

        const mobilErEndret = erEndret(mobilProps, this.state.mobilInput);
        const jobbErEndret = erEndret(jobbProps, this.state.jobbTelefonInput);
        const hjemErEndret = erEndret(hjemProps, this.state.hjemTelefonInput);

        return mobilErEndret || jobbErEndret || hjemErEndret;
    }

    Tilbakemelding() {
        if (this.state.formErEndret) {
            return null;
        } else {
            return (
                <RequestTilbakemelding
                    status={this.props.reducerStatus}
                    onSuccess={'Telefonnummer(e) ble endret.'}
                    onError={'Det skjedde en feil ved lagring av telefonnummer'}
                />
            );
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <UndertekstBold>Telefonnummer bruker ønsker å bli oppringt på</UndertekstBold>
                <InputWrapper>
                    <TelefonWrapper>
                        <TelefonInput
                            retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                            inputValue={this.state.mobilInput}
                            retningsnummerInputChange={this.mobilRetningsnummerInputChange}
                            telfonnummerInputChange={this.mobilTelefonnummerInputChange}
                            visFeilmeldinger={this.state.visFeilmeldinger}
                        >
                            Mobiltelefon
                        </TelefonInput>
                        <TelefonMetadata telefon={this.props.person.kontaktinformasjon.mobil}/>
                    </TelefonWrapper>
                    <TelefonWrapper>
                        <TelefonInput
                            retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                            inputValue={this.state.hjemTelefonInput}
                            retningsnummerInputChange={this.hjemRetningsnummerInputChange}
                            telfonnummerInputChange={this.hjemTelefonnummerInputChange}
                            visFeilmeldinger={this.state.visFeilmeldinger}
                        >
                            Hjemmenummer
                        </TelefonInput>
                    </TelefonWrapper>
                    <TelefonMetadata telefon={this.props.person.kontaktinformasjon.hjemTelefon}/>
                    <TelefonInput
                        retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                        inputValue={this.state.jobbTelefonInput}
                        retningsnummerInputChange={this.jobbRetningsnummerInputChange}
                        telfonnummerInputChange={this.jobbTelefonnummerInputChange}
                        visFeilmeldinger={this.state.visFeilmeldinger}
                    >
                        Jobbnummer
                    </TelefonInput>
                    <TelefonMetadata telefon={this.props.person.kontaktinformasjon.jobbTelefon}/>
                </InputWrapper>
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        disabled={!this.formErEndret() || this.requestIsPending() || !this.state.formErEndret}
                        onClick={this.avbryt}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        disabled={!this.formErEndret() || !this.state.formErEndret}
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
        reducerStatus: state.endreKontaktinformasjonReducer.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        endreNavKontaktinformasjon: (request: Request, fødselsnummer: string) =>
            dispatch(endreNavKontaktinformasjon(request, fødselsnummer)),
        tilbakestillReducer: () => dispatch(tilbakestillReducer())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(KontaktinformasjonForm);
