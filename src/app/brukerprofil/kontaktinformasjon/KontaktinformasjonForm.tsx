import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import KnappBase from 'nav-frontend-knapper';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';

import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducer';
import { KodeverkResponse } from '../../../models/kodeverk';
import { NavKontaktinformasjon, Telefon } from '../../../models/person/NAVKontaktinformasjon';
import { formaterHustelefonnummer, formaterMobiltelefonnummer } from '../../../utils/telefon-utils';
import { TelefonInput, TelefonMetadata } from './TelefonInput';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { endreNavKontaktinformasjon, tilbakestillReducer } from '../../../redux/brukerprofil/kontaktinformasjon';
import { Request } from '../../../api/brukerprofil/endre-navkontaktinformasjon-api';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { STATUS } from '../../../redux/utils';
import { removeWhitespace } from '../../../utils/string-utils';
import { InputState } from '../formUtils';

export interface TelefonInput {
    retningsnummer: InputState;
    identifikator: InputState;
}

interface State {
    mobilInput: TelefonInput;
    jobbTelefonInput: TelefonInput;
    hjemTelefonInput: TelefonInput;
    formErEndret: boolean;
}

interface DispatchProps {
    endreNavKontaktinformasjon: (request: Request) => Promise<{}>;
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
    return {
        retningsnummer: {
            input: telefon ? telefon.retningsnummer : ''
        },
        identifikator: {
            input: telefon ? formaterMobiltelefonnummer(telefon.identifikator) : ''
        }
    };
}

function initialState(kontaktinformasjon: NavKontaktinformasjon) {
    return {
        mobilInput: getInitialTelefonState(kontaktinformasjon.mobil),
        jobbTelefonInput: getInitialTelefonState(kontaktinformasjon.jobb),
        hjemTelefonInput: getInitialTelefonState(kontaktinformasjon.hjem),
        formErEndret: false
    };
}

function erEndret(telefon1: TelefonInput, telefon2: TelefonInput) {
    const retningsnummerEndret = telefon1.retningsnummer !== telefon2.retningsnummer;
    const identifikatorEndret = telefon1.identifikator !== telefon2.identifikator;
    return retningsnummerEndret || identifikatorEndret;
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
    }

    componentWillUnmount() {
        this.props.tilbakestillReducer();
    }

    mobilTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            mobilInput: {
                ...this.state.mobilInput,
                identifikator: {
                    input: formaterMobiltelefonnummer(event.target.value),
                    feil: undefined
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
                    feil: undefined
                }
            },
            formErEndret: true
        });
    }

    jobbTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            jobbTelefonInput: {
                ...this.state.jobbTelefonInput,
                identifikator: {
                    input: formaterHustelefonnummer(event.target.value),
                    feil: undefined
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
                    feil: undefined
                }
            },
            formErEndret: true
        });
    }

    hjemTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            hjemTelefonInput: {
                ...this.state.hjemTelefonInput,
                identifikator: {
                    input: formaterHustelefonnummer(event.target.value),
                    feil: undefined
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
                    feil: undefined
                }
            },
            formErEndret: true
        });
    }

    avbryt(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState(initialState(this.props.person.kontaktinformasjon));
    }

    valider() {
        console.log('hei');
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        try {
            this.valider();
        } catch (err) {
            return;
        }

        const request = {
            fødselsnummer: this.props.person.fødselsnummer,
            mobil: {
                identifikator: removeWhitespace(this.state.mobilInput.identifikator.input),
                retningsnummer: this.state.mobilInput.retningsnummer.input
            },
            jobb: {
                identifikator: removeWhitespace(this.state.jobbTelefonInput.identifikator.input),
                retningsnummer: this.state.jobbTelefonInput.retningsnummer.input
            },
            hjem: {
                identifikator: removeWhitespace(this.state.hjemTelefonInput.identifikator.input),
                retningsnummer: this.state.hjemTelefonInput.retningsnummer.input
            },
        };
        this.props.endreNavKontaktinformasjon(request);
        this.setState({formErEndret: false});
        event.preventDefault();
    }

    requestIsPending() {
        return this.props.reducerStatus === STATUS.PENDING;
    }

    formErEndret() {
        const mobilProps = getInitialTelefonState(this.props.person.kontaktinformasjon.mobil);
        const jobbProps = getInitialTelefonState(this.props.person.kontaktinformasjon.jobb);
        const hjemProps = getInitialTelefonState(this.props.person.kontaktinformasjon.hjem);

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
                    onSuccess={'Telefonnummer(e) ble endret. Det kan ta noen minutter før endringene blir synlig.'}
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
                        >
                            Hjemmenummer
                        </TelefonInput>
                    </TelefonWrapper>
                    <TelefonMetadata telefon={this.props.person.kontaktinformasjon.hjem}/>
                    <TelefonInput
                        retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                        inputValue={this.state.jobbTelefonInput}
                        retningsnummerInputChange={this.jobbRetningsnummerInputChange}
                        telfonnummerInputChange={this.jobbTelefonnummerInputChange}
                    >
                        Jobbnummer
                    </TelefonInput>
                    <TelefonMetadata telefon={this.props.person.kontaktinformasjon.jobb}/>
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
        endreNavKontaktinformasjon: (request: Request) =>
            dispatch(endreNavKontaktinformasjon(request)),
        tilbakestillReducer: () => dispatch(tilbakestillReducer())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (KontaktinformasjonForm);
