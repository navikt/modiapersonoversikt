import * as React from 'react';
import Input from 'nav-frontend-skjema/lib/input';
import Select from 'nav-frontend-skjema/lib/select';
import { ChangeEvent } from 'react';
import { EndreBankkontoState } from './kontonummerUtils';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import * as valutaKodeverkReducer from '../../../redux/kodeverk/valutaKodeverk';
import * as landKodeverkReducer from '../../../redux/kodeverk/landKodeverk';
import { AppState, RestReducer } from '../../../redux/reducer';
import { Kodeverk, KodeverkResponse } from '../../../models/kodeverk';
import { STATUS } from '../../../redux/utils';
import Innholdslaster from '../../../components/Innholdslaster';
import { formaterStatsborgerskapMedRiktigCasing } from '../../personside/visittkort/header/status/Statsborgerskap';
import { ignoreEnter } from '../formUtils';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';

interface OwnProps {
    bankkonto: EndreBankkontoState;
    bankkontoValidering: ValideringsResultat<EndreBankkontoState>;
    updateBankkontoInputsState: (property: Partial<EndreBankkontoState>) => void;
    disabled: boolean;
}

interface State {
}

interface DispatchProps {
    hentValutaKodeverk: () => void;
    hentLandKodeverk: () => void;
}

interface StateProps {
    valuttaKodeverkReducer: RestReducer<KodeverkResponse>;
    landKodeverkReducer: RestReducer<KodeverkResponse>;
}

type Props = OwnProps & DispatchProps & StateProps;

class UtenlandskKontonrInputs extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        if (this.props.valuttaKodeverkReducer.status === STATUS.NOT_STARTED) {
            this.props.hentValutaKodeverk();
        }

        if (this.props.landKodeverkReducer.status === STATUS.NOT_STARTED) {
            this.props.hentLandKodeverk();
        }
    }

    render() {
        return (
            <Innholdslaster
                avhengigheter={[this.props.valuttaKodeverkReducer, this.props.landKodeverkReducer]}
            >
                <Inputs {...this.props} />
            </Innholdslaster>
        );
    }
}

function Inputs(props: Props) {
    const bankkonto = props.bankkonto;
    const validering = props.bankkontoValidering.felter;
    return (
        <>
            <VelgLand {...props} />
            <Input
                label="Bankens navn"
                id="Bankens navn"
                value={bankkonto.banknavn || ''}
                disabled={props.disabled}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ banknavn: event.target.value })}
                feil={validering.banknavn.skjemafeil}
            />
            <Input
                label="Bankens adresse"
                id="Bankens adresse linje 1"
                value={bankkonto.adresse.linje1}
                disabled={props.disabled}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({
                    adresse: {
                        ...props.bankkonto.adresse,
                        linje1: event.target.value
                    }
                })}
                feil={!validering.adresse.erGyldig ? { feilmelding: '' } : undefined}
            />
            <Input
                label=""
                id="Bankens adresse linje 2"
                value={bankkonto.adresse.linje2}
                disabled={props.disabled}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({
                    adresse: {
                        ...props.bankkonto.adresse,
                        linje2: event.target.value
                    }
                })}
                feil={!validering.adresse.erGyldig ? { feilmelding: '' } : undefined}
            />
            <Input
                label=""
                id="Bankens adresse linje 3"
                value={bankkonto.adresse.linje3}
                disabled={props.disabled}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({
                    adresse: {
                        ...props.bankkonto.adresse,
                        linje3: event.target.value
                    }
                })}
                feil={validering.adresse.skjemafeil}
            />
            <Input
                label="Kontonummer eller IBAN"
                id="Kontonummer eller IBAN"
                value={bankkonto.kontonummer}
                disabled={props.disabled}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ kontonummer: event.target.value })}
                feil={validering.kontonummer.skjemafeil}
            />
            <Input
                label="BC/SWIFT-kode"
                id="BC/SWIFT-kode"
                value={bankkonto.swift}
                disabled={props.disabled}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ swift: event.target.value })}
                feil={validering.swift.skjemafeil}
            />
            <Input
                label="Bankkode"
                id="BankKode"
                value={bankkonto.bankkode}
                disabled={props.disabled}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ bankkode: event.target.value })}
                feil={validering.bankkode.skjemafeil}
            />
            <VelgValutta {...props} />
        </>
    );
}

function VelgLand(props: Props) {
    const options = props.landKodeverkReducer.data.kodeverk
        .sort(sorterKodeverkAlfabetisk)
        .map(landKodeverk => {
            return (
                <option key={landKodeverk.kodeRef} value={landKodeverk.kodeRef}>
                    {formaterStatsborgerskapMedRiktigCasing(landKodeverk.beskrivelse)}
                </option>
            );
        });
    return (
        <Select
            label="Velg land"
            id="Velg land"
            value={props.bankkonto.landkode.kodeRef}
            disabled={props.disabled}
            onChange={event => handleLandChange(props, event)}
        >
            <option key="default" value="Velg land">Velg Land</option>
            {options}
        </Select>
    );
}

function VelgValutta(props: Props) {
    const options = props.valuttaKodeverkReducer.data.kodeverk
        .sort(sorterKodeverkAlfabetisk)
        .map((valuttakodeverk: Kodeverk) => {
            return (
                <option key={valuttakodeverk.kodeRef} value={valuttakodeverk.kodeRef}>
                    {valuttakodeverk.beskrivelse}
                </option>
            );
        });
    return (
        <Select
            label="Velg valutta"
            id="Velg valutta"
            value={props.bankkonto.valuta.kodeRef}
            disabled={props.disabled}
            onChange={event => handleValutaChange(props, event)}
        >
            <option key="default" value="Velg valuta">Velg valuta</option>
            {options}
        </Select>
    );
}

function sorterKodeverkAlfabetisk(a: Kodeverk, b: Kodeverk) {
    return a.beskrivelse > b.beskrivelse ? 1 : a.beskrivelse === b.beskrivelse ? 0 : -1;
}

function handleLandChange(props: Props, event: ChangeEvent<HTMLSelectElement>) {
        const valgtKodeverk: Kodeverk = props.landKodeverkReducer.data.kodeverk
                .find(kodeverk => kodeverk.kodeRef === event.target.value)
            || { kodeRef: '', beskrivelse: '' };

        props.updateBankkontoInputsState({ landkode: valgtKodeverk });
}

function handleValutaChange(props: Props, event: ChangeEvent<HTMLSelectElement>) {
        const valgtKodeverk: Kodeverk = props.valuttaKodeverkReducer.data.kodeverk
                .find(kodeverk => kodeverk.kodeRef === event.target.value)
            || { kodeRef: '', beskrivelse: '' };

        props.updateBankkontoInputsState({ valuta: valgtKodeverk });
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return ({
        hentValutaKodeverk: () => dispatch(valutaKodeverkReducer.hentValutaer()),
        hentLandKodeverk: () => dispatch(landKodeverkReducer.hentLandKodeverk())
    });
};

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        valuttaKodeverkReducer: state.valuttaReducer,
        landKodeverkReducer: state.landReducer
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(UtenlandskKontonrInputs);
