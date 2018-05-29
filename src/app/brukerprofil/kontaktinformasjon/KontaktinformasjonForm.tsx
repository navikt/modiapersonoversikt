import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';

import { STATUS } from '../../../redux/utils';
import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducer';
import { KodeverkResponse } from '../../../models/kodeverk';
import { Telefon } from '../../../models/person/NAVKontaktinformasjon';
import { formaterHustelefonnummer, formaterMobiltelefonnummer } from '../../../utils/telefon-utils';
import { TelefonInput } from './TelefonInput';

const TilbakemeldingWrapper = styled.div`
  margin-top: 1em;
`;

export interface TelefonInput {
    retningsnummer: string;
    telefonnummer: string;
}

interface State {
    mobilInput: TelefonInput;
    jobbTelefonInput: TelefonInput;
    hjemTelefonInput: TelefonInput;
}

interface DispatchProps {
}

interface StateProps {
    status: STATUS;
}

interface OwnProps {
    person: Person;
    retningsnummerKodeverk: KodeverkResponse;
}

type Props = DispatchProps & StateProps & OwnProps;

const InputWrapper = styled.div`
  margin-top: 1em;
`;

function getInitialTelefonState(telefon: Telefon | undefined) {
    return {
        retningsnummer: telefon ? telefon.retningsnummer : '',
        telefonnummer: telefon ? formaterMobiltelefonnummer(telefon.telefonnummer) : ''
    };
}

class KontaktinformasjonForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            mobilInput: getInitialTelefonState(this.props.person.kontaktinformasjon.mobil),
            jobbTelefonInput: getInitialTelefonState(this.props.person.kontaktinformasjon.jobbTelefon),
            hjemTelefonInput: getInitialTelefonState(this.props.person.kontaktinformasjon.hjemTelefon),
        };

        this.mobilTelefonnummerInputChange = this.mobilTelefonnummerInputChange.bind(this);
        this.mobilRetningsnummerInputChange = this.mobilRetningsnummerInputChange.bind(this);
        this.jobbTelefonnummerInputChange = this.jobbTelefonnummerInputChange.bind(this);
        this.jobbRetningsnummerInputChange = this.jobbRetningsnummerInputChange.bind(this);
        this.hjemTelefonnummerInputChange = this.hjemTelefonnummerInputChange.bind(this);
        this.hjemRetningsnummerInputChange = this.hjemRetningsnummerInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    mobilTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            mobilInput: {
                telefonnummer: formaterMobiltelefonnummer(event.target.value),
                retningsnummer: this.state.mobilInput.retningsnummer
            }
        });
    }

    mobilRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            mobilInput: {
                telefonnummer: this.state.mobilInput.telefonnummer,
                retningsnummer: event.target.value
            }
        });
    }

    jobbTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            jobbTelefonInput: {
                telefonnummer: formaterHustelefonnummer(event.target.value),
                retningsnummer: this.state.jobbTelefonInput.retningsnummer
            }
        });
    }

    jobbRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            jobbTelefonInput: {
                telefonnummer: this.state.jobbTelefonInput.telefonnummer,
                retningsnummer: event.target.value
            }
        });
    }

    hjemTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            hjemTelefonInput: {
                telefonnummer: formaterHustelefonnummer(event.target.value),
                retningsnummer: this.state.hjemTelefonInput.retningsnummer
            }
        });
    }

    hjemRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            hjemTelefonInput: {
                telefonnummer: this.state.hjemTelefonInput.telefonnummer,
                retningsnummer: event.target.value
            }
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <UndertekstBold>Telefonnummer bruker ønsker å bli oppringt på</UndertekstBold>
                <InputWrapper>
                    <TelefonInput
                        retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                        inputValue={this.state.mobilInput}
                        retningsnummerInputChange={this.mobilRetningsnummerInputChange}
                        telfonnummerInputChange={this.mobilTelefonnummerInputChange}
                    >
                        Mobiltelefon
                    </TelefonInput>
                    <TelefonInput
                        retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                        inputValue={this.state.jobbTelefonInput}
                        retningsnummerInputChange={this.jobbRetningsnummerInputChange}
                        telfonnummerInputChange={this.jobbTelefonnummerInputChange}
                    >
                        Jobb telefon
                    </TelefonInput>
                    <TelefonInput
                        retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                        inputValue={this.state.hjemTelefonInput}
                        retningsnummerInputChange={this.hjemRetningsnummerInputChange}
                        telfonnummerInputChange={this.hjemTelefonnummerInputChange}
                    >
                        Hjem telefon
                    </TelefonInput>
                </InputWrapper>

                <KnappBase
                    type="standard"
                    spinner={this.props.status === STATUS.PENDING}
                    disabled={false}
                    autoDisableVedSpinner={true}
                >
                    Endre telefonnummer
                </KnappBase>
                <TilbakemeldingWrapper><Tilbakemelding status={this.props.status}/></TilbakemeldingWrapper>
            </form>

        );
    }
}

function Tilbakemelding(props: {status: STATUS}) {
    if (props.status === STATUS.OK) {
        return (
            <AlertStripe
                type={'suksess'}
            >
                Navnet ble endret. Det kan ta noen minutter før endringene blir synlig.
            </AlertStripe>
        );
    } else if (props.status === STATUS.ERROR) {
        return (
            <AlertStripe type={'advarsel'}>Det skjedde en feil ved endring av navn.</AlertStripe>
        );
    } else {
        return null;
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        status: state.endreNavn.status,
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (KontaktinformasjonForm);
