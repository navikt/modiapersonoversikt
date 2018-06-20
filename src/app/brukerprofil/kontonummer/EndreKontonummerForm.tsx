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
    BankkontoUtenOptionals,
    tomBankkonto
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
    { label: bankEnum.erNorsk, value: bankEnum.erNorsk },
    { label: bankEnum.erUtenlandsk, value: bankEnum.erUtenlandsk }
];

interface State {
    bankkontoInput: BankkontoUtenOptionals;
    norskKontoRadio: boolean;
}

interface DispatchProps {
}

interface StateProps {
    status: STATUS;
}

interface OwnProps {
    person: Person;
    veilederRoller: VeilederRoller;
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
            bankkontoInput: this.getBrukersBankkonto(),
            norskKontoRadio: !erBrukersKontonummerUtenlandsk(this.props.person)
        };
    }

    getBrukersBankkonto(): BankkontoUtenOptionals {
        const person = this.props.person;
        if (person.bankkonto === undefined) {
            return tomBankkonto;
        }
        return {
            ...tomBankkonto,
            ...person.bankkonto,
            kontonummer: erBrukersKontonummerUtenlandsk(person)
                ? person.bankkonto.kontonummer
                : formaterNorskKontonummer(person.bankkonto.kontonummer)
        };
    }

    erKontonummerValid(kontonummer?: string) {
        return !this.state.norskKontoRadio
            || validerKontonummer(kontonummer || this.state.bankkontoInput.kontonummer);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); // TODO kall til backend
    }

    handleNorskKontonummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        const kontonummer = formaterNorskKontonummer(event.target.value);
        this.setState({
            bankkontoInput: {
                ...this.state.bankkontoInput,
                kontonummer: kontonummer
            }
        });
    }

    createPropertyUpdateHandler(property: string) {
        return (value: string | Kodeverk | BankAdresse) => {
            this.setState({
                bankkontoInput: {
                    ...this.state.bankkontoInput,
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
        return JSON.stringify(this.getBrukersBankkonto()) !== JSON.stringify(this.state.bankkontoInput);
    }

    getNorskKontonrInputs() {
        const ugyldigKontonummer = this.state.norskKontoRadio
        && removeWhitespaceAndDot(this.state.bankkontoInput.kontonummer).length >= 11
            ? !this.erKontonummerValid(this.state.bankkontoInput.kontonummer)
            : false;
        return (
            <Input
                label="Kontonummer"
                value={this.state.bankkontoInput.kontonummer}
                onChange={this.handleNorskKontonummerInputChange}
                feil={ugyldigKontonummer ? { feilmelding: 'Kontonummer er ugyldig' } : undefined}
            />
        );
    }

    render() {
        const norskEllerUtenlandskKontoRadio = (
            <RadioPanelGruppe
                radios={radioKnappProps}
                legend={''}
                name={'Velg norsk eller utenlandsk konto'}
                checked={this.state.norskKontoRadio ? bankEnum.erNorsk : bankEnum.erUtenlandsk}
                onChange={this.handleRadioChange}
            />);
        const kontoInputs = this.state.norskKontoRadio ? this.getNorskKontonrInputs() : (
                    <UtenlandskKontonrInputs
                        bankkonto={this.state.bankkontoInput}
                        createPropertyUpdateHandler={this.createPropertyUpdateHandler}
                    />);
        const knapper = (
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
        );
        const endreKontonummerRequestTilbakemelding = (
            <RequestTilbakemelding
                status={this.props.status}
                onError={'Det skjedde en feil ved endring av kontonummer.'}
                onSuccess={`Kontonummer ble endret.
                 Det kan ta noen minutter før endringene blir synlig.`}
            />
        );
        return (
            <form onSubmit={this.handleSubmit}>
                <Undertittel>Kontonummer</Undertittel>
                {norskEllerUtenlandskKontoRadio}
                {kontoInputs}
                {knapper}
                {endreKontonummerRequestTilbakemelding}
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
