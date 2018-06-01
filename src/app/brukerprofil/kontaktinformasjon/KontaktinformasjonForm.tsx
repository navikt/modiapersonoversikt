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
                ...this.state.mobilInput,
                telefonnummer: formaterMobiltelefonnummer(event.target.value),
            }
        });
    }

    mobilRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            mobilInput: {
                ...this.state.mobilInput,
                retningsnummer: event.target.value
            }
        });
    }

    jobbTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            jobbTelefonInput: {
                ...this.state.jobbTelefonInput,
                telefonnummer: formaterHustelefonnummer(event.target.value)
            }
        });
    }

    jobbRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            jobbTelefonInput: {
                ...this.state.jobbTelefonInput,
                retningsnummer: event.target.value
            }
        });
    }

    hjemTelefonnummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            hjemTelefonInput: {
                ...this.state.hjemTelefonInput,
                telefonnummer: formaterHustelefonnummer(event.target.value)
            }
        });
    }

    hjemRetningsnummerInputChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            hjemTelefonInput: {
                ...this.state.hjemTelefonInput,
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
                    <TelefonMetadata telefon={this.props.person.kontaktinformasjon.hjemTelefon}/>
                    <TelefonInput
                        retningsnummerKodeverk={this.props.retningsnummerKodeverk}
                        inputValue={this.state.jobbTelefonInput}
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
                        disabled={false}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        disabled={false}
                        autoDisableVedSpinner={true}
                    >
                        Endre telefonnummer
                    </KnappBase>
                </FormKnapperWrapper>
            </form>

        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (KontaktinformasjonForm);
