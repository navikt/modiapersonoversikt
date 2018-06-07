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
import { Telefon } from '../../../models/person/NAVKontaktinformasjon';
import { formaterHustelefonnummer, formaterMobiltelefonnummer } from '../../../utils/telefon-utils';
import { TelefonInput, TelefonMetadata } from './TelefonInput';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { endreNavKontaktinformasjon, tilbakestillReducer } from '../../../redux/brukerprofil/kontaktinformasjon';
import { Request } from '../../../api/brukerprofil/endre-navkontaktinformasjon-api';
import RequestTilbakemelding from './RequestTilbakemelding';
import { STATUS } from '../../../redux/utils';

export interface TelefonInput {
    retningsnummer: string;
    identifikator: string;
}

interface State {
    mobilInput: TelefonInput;
    jobbTelefonInput: TelefonInput;
    hjemTelefonInput: TelefonInput;
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

function getInitialTelefonState(telefon: Telefon | undefined) {
    return {
        retningsnummer: telefon ? telefon.retningsnummer : '',
        identifikator: telefon ? formaterMobiltelefonnummer(telefon.identifikator) : ''
    };
}

class KontaktinformasjonForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            mobilInput: getInitialTelefonState(this.props.person.kontaktinformasjon.mobil),
            jobbTelefonInput: getInitialTelefonState(this.props.person.kontaktinformasjon.jobb),
            hjemTelefonInput: getInitialTelefonState(this.props.person.kontaktinformasjon.hjem),
        };

        this.mobilTelefonnummerInputChange = this.mobilTelefonnummerInputChange.bind(this);
        this.mobilRetningsnummerInputChange = this.mobilRetningsnummerInputChange.bind(this);
        this.jobbTelefonnummerInputChange = this.jobbTelefonnummerInputChange.bind(this);
        this.jobbRetningsnummerInputChange = this.jobbRetningsnummerInputChange.bind(this);
        this.hjemTelefonnummerInputChange = this.hjemTelefonnummerInputChange.bind(this);
        this.hjemRetningsnummerInputChange = this.hjemRetningsnummerInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.tilbakestillReducer();
    }

    mobilTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            mobilInput: {
                ...this.state.mobilInput,
                identifikator: formaterMobiltelefonnummer(event.target.value),
            }
        });
    }

    mobilRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            mobilInput: {
                ...this.state.mobilInput,
                identifikator: event.target.value
            }
        });
    }

    jobbTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            jobbTelefonInput: {
                ...this.state.jobbTelefonInput,
                identifikator: formaterHustelefonnummer(event.target.value)
            }
        });
    }

    jobbRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            jobbTelefonInput: {
                ...this.state.jobbTelefonInput,
                identifikator: event.target.value
            }
        });
    }

    hjemTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            hjemTelefonInput: {
                ...this.state.hjemTelefonInput,
                identifikator: formaterHustelefonnummer(event.target.value)
            }
        });
    }

    hjemRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            hjemTelefonInput: {
                ...this.state.hjemTelefonInput,
                identifikator: event.target.value
            }
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        console.log('Submitting...');
        this.props.endreNavKontaktinformasjon({
            fødselsnummer: this.props.person.fødselsnummer,
            mobil: this.state.mobilInput,
            hjem: this.state.hjemTelefonInput,
            jobb: this.state.jobbTelefonInput
        });
        event.preventDefault();
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
                        disabled={false}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        disabled={false}
                        spinner={this.props.reducerStatus === STATUS.PENDING}
                        autoDisableVedSpinner={true}
                    >
                        Endre telefonnummer
                    </KnappBase>
                </FormKnapperWrapper>
                <RequestTilbakemelding
                    status={this.props.reducerStatus}
                    onSuccess={'Telefonnummer(e) ble endret. Det kan ta noen minutter før endringene blir synlig.'}
                    onError={'Det skjedde en feil ved lagring av telefonnummer'}
                />
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
