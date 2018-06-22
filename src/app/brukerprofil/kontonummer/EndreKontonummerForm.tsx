import * as React from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import Input from 'nav-frontend-skjema/lib/input';

import { STATUS } from '../../../redux/utils';
import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducer';
import { VeilederRoller } from '../../../models/veilederRoller';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import KnappBase from 'nav-frontend-knapper';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { ChangeEvent, FormEvent } from 'react';
import {
    removeWhitespaceAndDot,
    formaterNorskKontonummer,
    validerKontonummer,
    erBrukersKontonummerUtenlandsk,
    EndreBankkontoState,
    tomBankkonto
}
    from './kontonummerUtils';
import UtenlandskKontonrInputs from './UtenlandskKontonummerInputs';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { endreKontonummer, reset } from '../../../redux/brukerprofil/endreKontonummer';
import { EndreKontonummerRequest } from '../../../redux/brukerprofil/endreKontonummerRequest';
import AlertStripe from 'nav-frontend-alertstriper';
import styled from 'styled-components';

const Luft = styled.div`
  margin-top: 1em;
`;

enum bankEnum {
    erNorsk = 'Kontonummer i Norge',
    erUtenlandsk = 'Kontonummer i utlandet'
}

interface State {
    bankkontoInput: EndreBankkontoState;
    norskKontoRadio: boolean;
}

interface DispatchProps {
    endreKontonummer: (fødselsnummer: string, request: EndreKontonummerRequest) => void;
    resetEndreKontonummerReducer: () => void;
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
        this.updateBankkontoInputsState = this.updateBankkontoInputsState.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tilbakestill = this.tilbakestill.bind(this);
    }

    componentWillUnmount() {
        this.props.resetEndreKontonummerReducer();
    }

    getInitialState(): State {
        return {
            bankkontoInput: this.getBrukersBankkonto(),
            norskKontoRadio: !erBrukersKontonummerUtenlandsk(this.props.person)
        };
    }

    getBrukersBankkonto(): EndreBankkontoState {
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
        event.preventDefault();

        const kontoInput = this.state.bankkontoInput;
        const fnr = this.props.person.fødselsnummer;

        if (this.state.norskKontoRadio) {
            this.props.endreKontonummer(fnr, {
                kontonummer: removeWhitespaceAndDot(kontoInput.kontonummer)
            });
        } else {
            this.props.endreKontonummer(fnr, {
                kontonummer: removeWhitespaceAndDot(kontoInput.kontonummer),
                landkode: kontoInput.landkode.kodeRef,
                valuta: kontoInput.valuta.kodeRef,
                swift: kontoInput.swift,
                banknavn: kontoInput.banknavn,
                bankkode: kontoInput.bankkode,
                bankadresse: kontoInput.adresse
            });
        }
    }

    handleNorskKontonummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.updateBankkontoInputsState({
            kontonummer: formaterNorskKontonummer(event.target.value)
        });
    }

    updateBankkontoInputsState(partial: Partial<EndreBankkontoState>) {
        this.setState({
            bankkontoInput: {
                ...this.state.bankkontoInput,
                ...partial
            }
        });
    }

    handleRadioChange(event: React.SyntheticEvent<EventTarget>, value: string) {
        this.setState({
            norskKontoRadio: value === bankEnum.erNorsk
        });
    }

    tilbakestill() {
        this.props.resetEndreKontonummerReducer();
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
                disabled={!this.harPåkrevdRolle()}
                feil={ugyldigKontonummer ? { feilmelding: 'Kontonummer er ugyldig' } : undefined}
            />
        );
    }

    harPåkrevdRolle() {
        return this.props.veilederRoller.roller.includes('0000-GA-BD06_EndreKontonummer');
    }

    radioKnappProps() {
        const disabled = !this.harPåkrevdRolle();
        return [
            { label: bankEnum.erNorsk, value: bankEnum.erNorsk, disabled },
            { label: bankEnum.erUtenlandsk, value: bankEnum.erUtenlandsk, disabled }
        ];
    }

    render() {
        const norskEllerUtenlandskKontoRadio = (
            <RadioPanelGruppe
                radios={this.radioKnappProps()}
                legend={''}
                name={'Velg norsk eller utenlandsk konto'}
                checked={this.state.norskKontoRadio ? bankEnum.erNorsk : bankEnum.erUtenlandsk}
                onChange={this.handleRadioChange}
            />);
        const kontoInputs = this.state.norskKontoRadio ? this.getNorskKontonrInputs() : (
            <UtenlandskKontonrInputs
                bankkonto={this.state.bankkontoInput}
                updateBankkontoInputsState={this.updateBankkontoInputsState}
                disabled={!this.harPåkrevdRolle()}
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
                    disabled={!this.kontoErEndret() || !this.harPåkrevdRolle()}
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
        const manglerRolleTekst = 'Du mangler rettigheter til å endre brukers bankkonto';
        const manglerRollerWarning = !this.harPåkrevdRolle() &&
            <Luft><AlertStripe type="info">{manglerRolleTekst}</AlertStripe></Luft>;
        const title = this.harPåkrevdRolle() ? undefined : manglerRolleTekst;
        return (
            <form onSubmit={this.handleSubmit} title={title}>
                <Undertittel>Kontonummer</Undertittel>
                {manglerRollerWarning}
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
        status: state.endreKontonummer.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        endreKontonummer: (fødselsnummer: string, request: EndreKontonummerRequest) =>
            dispatch(endreKontonummer(fødselsnummer, request)),
        resetEndreKontonummerReducer: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EndreKontonummerForm);
