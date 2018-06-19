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
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
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
import { Kodeverk } from '../../../models/kodeverk';

enum bankEnum {
    erNorsk = 'Kontonummer i Norge',
    erUtenlandsk = 'Kontonummer i utlandet'
}

const radioKnappProps = [
    {
        label: bankEnum.erNorsk,
        value: bankEnum.erNorsk
    },
    {
        label: bankEnum.erUtenlandsk,
        value: bankEnum.erUtenlandsk
    }
];

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
        this.handleNorskKontonummerInputChange = this.handleNorskKontonummerInputChange.bind(this);
        this.createPropertyUpdateHandler = this.createPropertyUpdateHandler.bind(this);
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

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); // TODO kall til backend
    }

    handleNorskKontonummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        const kontonummer = formaterNorskKontonummer(event.target.value);
        this.setState({
            bankKontoInput: {
                ...this.state.bankKontoInput,
                kontonummer: kontonummer
            }
        });
    }

    createPropertyUpdateHandler(property: string) {
        return (value: string | Kodeverk | BankAdresse) => {
            this.setState({
                bankKontoInput: {
                    ...this.state.bankKontoInput,
                    [property]: value
                }
            });
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
                onChange={this.handleNorskKontonummerInputChange}
                feil={ugyldigKontonummer ? { feilmelding: 'Kontonummer er ugyldig' } : undefined}
            />
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Undertittel>Kontonummer</Undertittel>
                <RadioPanelGruppe
                    radios={radioKnappProps}
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
                            createPropertyUpdateHandler={this.createPropertyUpdateHandler}
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
                        disabled={!this.kontoErEndret()}
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
        status: state.endreNavn.status // TODO, riktig status her
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EndreKontonummerForm);
