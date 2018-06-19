///<reference path="kontonummerUtils.ts"/>
import * as React from 'react';
import { FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import Input from 'nav-frontend-skjema/lib/input';

import { STATUS } from '../../../redux/utils';
import { BankAdresse, Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducer';
import { VeilederRoller } from '../../../models/veilederRoller';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import KnappBase from 'nav-frontend-knapper';
import RadioPanelGruppe, { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { ChangeEvent } from 'react';
import {
    removeWhitespaceAndDot,
    formaterNorskKontonummer,
    validerKontonummer,
    erBrukersKontonummerUtenlandsk,
    BankKontoUtenOptionals,
    tomBankKonto
}
    from './kontonummerUtils';
import UtenlandskKontonrInputs from './UtenlandskKontonummerInputs';
import RequestTilbakemelding from '../RequestTilbakemelding';

enum bankEnum {
    erNorsk = 'Kontonummer i Norge',
    erUtenlandsk = 'Kontonummer i utlandet'
}

interface State {
    bankKontoInput: BankKontoUtenOptionals;
    norskKontoRadio: boolean;
}

interface DispatchProps {
}

interface StateProps {
    status: STATUS;
}

interface OwnProps {
    person: Person;
    veilederRoller?: VeilederRoller;
}
type Props = DispatchProps & StateProps & OwnProps;

class EndreKontonummerForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState();
        this.createInputChangeHandler = this.createInputChangeHandler.bind(this);
        this.createSelectChangeHandler = this.createSelectChangeHandler.bind(this);
        this.createAdresseInputChangeHandler = this.createAdresseInputChangeHandler.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.tilbakestill = this.tilbakestill.bind(this);
    }

    getInitialState(): State {
        return {
            bankKontoInput: this.getBrukersBankkonto(),
            norskKontoRadio: !erBrukersKontonummerUtenlandsk(this.props.person)
        };
    }

    getBrukersBankkonto(): BankKontoUtenOptionals {
        const person = this.props.person;
        if (person.bankkonto === undefined) {
            return tomBankKonto;
        }
        return {
            ...tomBankKonto,
            ...person.bankkonto,
            kontonummer: erBrukersKontonummerUtenlandsk(person)
                ? person.bankkonto.kontonummer
                : formaterNorskKontonummer(person.bankkonto.kontonummer)
        };
    }

    erKontonummerValid(kontonummer?: string) {
        return !this.state.norskKontoRadio
            || validerKontonummer(kontonummer || this.state.bankKontoInput.kontonummer);
    }

    getRadioKnappProps(): RadioProps[] {
        return [
            {
                label: bankEnum.erNorsk,
                value: bankEnum.erNorsk
            },
            {
                label: bankEnum.erUtenlandsk,
                value: bankEnum.erUtenlandsk
            }
        ];
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    createInputChangeHandler(property: string) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const value = property === 'kontonummer' && this.state.norskKontoRadio
                ? formaterNorskKontonummer(event.target.value)
                : event.target.value;
            this.setState({
                bankKontoInput: {
                    ...this.state.bankKontoInput,
                    [property]: value
                }
            });
        };
    }

    createSelectChangeHandler(property: string) {
        return (event: ChangeEvent<HTMLSelectElement>) => {
            console.log(event.target.value);
            const value = event.target.value;
            this.setState({
                bankKontoInput: {
                    ...this.state.bankKontoInput,
                    [property]: value
                }
            });
        };
    }

    createAdresseInputChangeHandler(property: string) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const adresse: BankAdresse = {
                ...this.state.bankKontoInput.adresse,
                [property]: event.target.value
            };
            this.setState({
                    bankKontoInput: {
                        ...this.state.bankKontoInput,
                        adresse: adresse
                    }
                }
            );
        };
    }

    handleRadioChange(event: React.SyntheticEvent<EventTarget>, value: string) {
        this.setState({
            norskKontoRadio: value === bankEnum.erNorsk
        });
    }

    tilbakestill() {
        this.setState({
            ...this.getInitialState(),
            norskKontoRadio: this.state.norskKontoRadio
        });
    }

    kontoErEndret() {
        return JSON.stringify(this.getBrukersBankkonto()) !== JSON.stringify(this.state.bankKontoInput);
    }

    getNorskKontonrInputs() {
        const ugyldigKontonummer = this.state.norskKontoRadio
        && removeWhitespaceAndDot(this.state.bankKontoInput.kontonummer).length >= 11
            ? !this.erKontonummerValid(this.state.bankKontoInput.kontonummer)
            : false;
        return (
            <Input
                label="Kontonummer"
                value={this.state.bankKontoInput.kontonummer}
                onChange={this.createInputChangeHandler('kontonummer')}
                feil={ugyldigKontonummer ? { feilmelding: 'Kontonummer er ugyldig' } : undefined}
            />
        );
    }

    render() {
        console.log(this.state.bankKontoInput);
        return (
            <form onSubmit={this.handleSubmit}>
                <Undertittel>Kontonummer</Undertittel>
                <RadioPanelGruppe
                    radios={this.getRadioKnappProps()}
                    legend={''}
                    name={'Velg norsk eller utenlandsk konto'}
                    checked={this.state.norskKontoRadio ? bankEnum.erNorsk : bankEnum.erUtenlandsk}
                    onChange={this.handleRadioChange}
                />
                {
                    this.state.norskKontoRadio
                        ? this.getNorskKontonrInputs()
                        : <UtenlandskKontonrInputs
                            bankkonto={this.state.bankKontoInput}
                            createInputChangeHandler={this.createInputChangeHandler}
                            createAdresseInputChangeHandler={this.createAdresseInputChangeHandler}
                            createSelectInputChangeHandler={this.createSelectChangeHandler}
                        />
                }
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        onClick={this.tilbakestill}
                        disabled={!this.kontoErEndret()}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        spinner={this.props.status === STATUS.PENDING}
                        autoDisableVedSpinner={true}
                        disabled={!this.kontoErEndret() || !this.erKontonummerValid()}
                    >
                        Endre kontonummer
                    </KnappBase>
                </FormKnapperWrapper>
                <RequestTilbakemelding
                    status={this.props.status}
                    onError={'Det skjedde en feil ved endring av kontonummer.'}
                    onSuccess={`Kontonummer ble endret.
                         Det kan ta noen minutter før endringene blir synlig.`}
                />
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
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EndreKontonummerForm);
