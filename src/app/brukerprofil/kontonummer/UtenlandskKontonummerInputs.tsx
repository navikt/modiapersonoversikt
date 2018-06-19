import * as React from 'react';
import Input from 'nav-frontend-skjema/lib/input';
import Select from 'nav-frontend-skjema/lib/select';
import { ChangeEvent } from 'react';
import { BankKontoUtenOptionals } from './kontonummerUtils';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import * as valuttaKodeverkReducer from '../../../redux/kodeverk/valuttaKodeverk';
import * as landKodeverkReducer from '../../../redux/kodeverk/landKodeverk';
import { AppState, RestReducer } from '../../../redux/reducer';
import { Kodeverk, KodeverkResponse } from '../../../models/kodeverk';
import { STATUS } from '../../../redux/utils';
import Innholdslaster from '../../../components/Innholdslaster';
import { formaterStatsborgerskapMedRiktigCasing } from '../../personside/visittkort/header/status/Statsborgerskap';
import { BankAdresse } from '../../../models/person/person';

interface OwnProps {
    bankkonto: BankKontoUtenOptionals;
    createPropertyUpdateHandler: (property: string) => (value: string | Kodeverk | BankAdresse) => void;
}

interface State {
}

interface DispatchProps {
    hentValuttaKodeverk: () => void;
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
            this.props.hentValuttaKodeverk();
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
    return (
        <>
            <VelgLand {...props} />
            <Input
                label="Bankens navn"
                value={bankkonto.banknavn}
                onChange={event => props.createPropertyUpdateHandler('banknavn')(event.target.value)}
            />
            <Input
                label="Bankens adresse"
                value={bankkonto.adresse.linje1}
                onChange={event => props.createPropertyUpdateHandler('adresse')({
                    ...props.bankkonto.adresse,
                    linje1: event.target.value
                })}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje2}
                onChange={event => props.createPropertyUpdateHandler('adresse')({
                    ...props.bankkonto.adresse,
                    linje2: event.target.value
                })}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje3}
                onChange={event => props.createPropertyUpdateHandler('adresse')({
                    ...props.bankkonto.adresse,
                    linje3: event.target.value
                })}
            />
            <Input
                label="Kontonummer eller IBAN"
                value={bankkonto.kontonummer}
                onChange={event => props.createPropertyUpdateHandler('kontonummer')(event.target.value)}
            />
            <Input
                label="BC/SWIFT-kode"
                value={bankkonto.swift}
                onChange={event => props.createPropertyUpdateHandler('swift')(event.target.value)}
            />
            <Input
                label="BankKode"
                value={bankkonto.bankkode}
                onChange={event => props.createPropertyUpdateHandler('bankkode')(event.target.value)}
            />
            <VelgValutta {...props} />
        </>
    );
}

function VelgLand(props: Props) {
    const options = props.landKodeverkReducer.data.kodeverk
        .sort(sorterKodeverkAlfabetisk)
        .map(landKodeverk => (
            <option key={landKodeverk.kodeRef} value={landKodeverk.kodeRef}>
                {formaterStatsborgerskapMedRiktigCasing(landKodeverk.beskrivelse)}
            </option>
        ));
    return (
        <Select label="Velg land" onChange={handleSelectChange('landkode', props.landKodeverkReducer, props)}>
            <option key="default" value="Velg land">Velg Land</option>
            {options}
        </Select>
    );
}

function VelgValutta(props: Props) {
    const options = props.valuttaKodeverkReducer.data.kodeverk
        .sort(sorterKodeverkAlfabetisk)
        .map(valuttakodeverk => (
            <option key={valuttakodeverk.kodeRef} value={valuttakodeverk.kodeRef}>
                {valuttakodeverk.beskrivelse}
            </option>
        ));
    return (
        <Select
            label="Velg valutta"
            onChange={handleSelectChange('valuta', props.valuttaKodeverkReducer, props)}
        >
            <option key="default" value="Velg valuta">Velg valuta</option>
            {options}
        </Select>
    );
}

function sorterKodeverkAlfabetisk(a: Kodeverk, b: Kodeverk) {
    return a.beskrivelse > b.beskrivelse ? 1 : a.beskrivelse === b.beskrivelse ? 0 : -1;
}

function handleSelectChange(property: string, kodeverkReducer: RestReducer<KodeverkResponse>, props: Props) {
    return (event: ChangeEvent<HTMLSelectElement>) => {
        const valgtKodeverk: Kodeverk = kodeverkReducer.data.kodeverk
            .find(kodeverk => kodeverk.kodeRef === event.target.value)
            || { kodeRef: '', beskrivelse: '' };
        props.createPropertyUpdateHandler(property)(valgtKodeverk);
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return ({
        hentValuttaKodeverk: () => dispatch(valuttaKodeverkReducer.hentValuttaer()),
        hentLandKodeverk: () => dispatch(landKodeverkReducer.hentLand())
    });
};

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        valuttaKodeverkReducer: state.valuttaReducer,
        landKodeverkReducer: state.landReducer
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(UtenlandskKontonrInputs);
