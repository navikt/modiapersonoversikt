import * as React from 'react';
import { ChangeEvent } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';

import Input from 'nav-frontend-skjema/lib/input';
import Select from 'nav-frontend-skjema/lib/select';
import Innholdslaster from '../../../components/Innholdslaster';

import { EndreBankkontoState } from './kontonummerUtils';
import * as valutaKodeverkReducer from '../../../redux/restReducers/kodeverk/valutaKodeverk';
import * as landKodeverkReducer from '../../../redux/restReducers/kodeverk/landKodeverk';
import { AppState } from '../../../redux/reducers';
import { Kodeverk, KodeverkResponse } from '../../../models/kodeverk';
import { STATUS } from '../../../redux/restReducers/utils';
import { formaterStatsborgerskapMedRiktigCasing } from '../../personside/visittkort/header/status/Statsborgerskap';
import { ignoreEnter } from '../utils/formUtils';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';
import { alfabetiskKodeverkComparator } from '../../../utils/kodeverkUtils';
import { Loaded, RestReducer } from '../../../redux/restReducers/restReducer';
import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {
    bankkonto: EndreBankkontoState;
    bankkontoValidering: ValideringsResultat<EndreBankkontoState>;
    updateBankkontoInputsState: (property: Partial<EndreBankkontoState>) => void;
}

interface DispatchProps {
    hentValutaKodeverk: () => void;
    hentLandKodeverk: () => void;
}

interface StateProps {
    valutaKodeverkReducer: RestReducer<KodeverkResponse>;
    landKodeverkReducer: RestReducer<KodeverkResponse>;
}

interface LoadedProps {
    valutaKodeverkReducer: Loaded<KodeverkResponse>;
    landKodeverkReducer: Loaded<KodeverkResponse>;
}

type Props = OwnProps & DispatchProps;

class UtenlandskKontonrInputs extends React.Component<Props & StateProps> {

    constructor(props: Props & StateProps) {
        super(props);

        if (this.props.valutaKodeverkReducer.status === STATUS.NOT_STARTED) {
            this.props.hentValutaKodeverk();
        }

        if (this.props.landKodeverkReducer.status === STATUS.NOT_STARTED) {
            this.props.hentLandKodeverk();
        }
    }

    render() {
        return (
            <Innholdslaster
                avhengigheter={[this.props.valutaKodeverkReducer, this.props.landKodeverkReducer]}
            >
                <Inputs
                    {...this.props}
                    valutaKodeverkReducer={this.props.valutaKodeverkReducer as Loaded<KodeverkResponse>}
                    landKodeverkReducer={this.props.landKodeverkReducer as Loaded<KodeverkResponse>}
                />
            </Innholdslaster>
        );
    }
}

function Inputs(props: Props & LoadedProps) {
    const bankkonto = props.bankkonto;
    const validering = props.bankkontoValidering.felter;
    return (
        <>
            <VelgLand {...props} />
            <Input
                label="Bankens navn"
                value={bankkonto.banknavn || ''}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({banknavn: event.target.value})}
                feil={validering.banknavn.skjemafeil}
            />
            <Input
                label="Bankens adresse"
                value={bankkonto.adresse.linje1}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({
                    adresse: {
                        ...props.bankkonto.adresse,
                        linje1: event.target.value
                    }
                })}
                feil={!validering.adresse.erGyldig ? {feilmelding: ''} : undefined}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje2}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({
                    adresse: {
                        ...props.bankkonto.adresse,
                        linje2: event.target.value
                    }
                })}
                feil={!validering.adresse.erGyldig ? {feilmelding: ''} : undefined}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje3}
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
                label="BC/SWIFT-kode"
                value={bankkonto.swift}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({swift: event.target.value})}
                feil={validering.swift.skjemafeil}
            />
            <Input
                label="Kontonummer eller IBAN"
                value={bankkonto.kontonummer}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({kontonummer: event.target.value})}
                feil={validering.kontonummer.skjemafeil}
            />
            <Input
                label="Bankkode"
                value={bankkonto.bankkode}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({bankkode: event.target.value})}
                feil={validering.bankkode.skjemafeil}
            />
            <VelgValuta {...props} />
        </>
    );
}

function VelgLand(props: Props & LoadedProps) {
    const options = props.landKodeverkReducer.data.kodeverk
        .sort(alfabetiskKodeverkComparator)
        .map(landKodeverk => {
            return (
                <option key={landKodeverk.kodeRef} value={landKodeverk.kodeRef}>
                    {formaterStatsborgerskapMedRiktigCasing(landKodeverk.beskrivelse)} ({landKodeverk.kodeRef})
                </option>
            );
        });
    return (
        <Select
            label="Velg land"
            value={props.bankkonto.landkode.kodeRef}
            feil={props.bankkontoValidering.felter.landkode.skjemafeil}
            onChange={event => handleLandChange(props, event)}
        >
            <option key="default" disabled={true} value="">Velg Land</option>
            {options}
        </Select>
    );
}

function VelgValuta(props: Props & LoadedProps) {
    const options = props.valutaKodeverkReducer.data.kodeverk
        .sort(alfabetiskKodeverkComparator)
        .map((valutakodeverk: Kodeverk) => {
            return (
                <option key={valutakodeverk.kodeRef} value={valutakodeverk.kodeRef}>
                    {valutakodeverk.beskrivelse} ({valutakodeverk.kodeRef})
                </option>
            );
        });
    return (
        <Select
            label="Velg valuta"
            value={props.bankkonto.valuta.kodeRef}
            feil={props.bankkontoValidering.felter.valuta.skjemafeil}
            onChange={event => handleValutaChange(props, event)}
        >
            <option key="default" disabled={true} value="">Velg valuta</option>
            {options}
        </Select>
    );
}

function handleLandChange(props: Props & LoadedProps, event: ChangeEvent<HTMLSelectElement>) {
    const valgtKodeverk: Kodeverk = props.landKodeverkReducer.data.kodeverk
            .find(kodeverk => kodeverk.kodeRef === event.target.value)
        || {kodeRef: '', beskrivelse: ''};

    props.updateBankkontoInputsState({landkode: valgtKodeverk});
}

function handleValutaChange(props: Props & LoadedProps, event: ChangeEvent<HTMLSelectElement>) {
    const valgtKodeverk: Kodeverk = props.valutaKodeverkReducer.data.kodeverk
            .find(kodeverk => kodeverk.kodeRef === event.target.value)
        || {kodeRef: '', beskrivelse: ''};

    props.updateBankkontoInputsState({valuta: valgtKodeverk});
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, AnyAction>): DispatchProps => {
    return ({
        hentValutaKodeverk: () => dispatch(valutaKodeverkReducer.hentValutaer()),
        hentLandKodeverk: () => dispatch(landKodeverkReducer.hentLandKodeverk())
    });
};

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        valutaKodeverkReducer: state.restEndepunkter.valutaReducer,
        landKodeverkReducer: state.restEndepunkter.landReducer
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(UtenlandskKontonrInputs);
