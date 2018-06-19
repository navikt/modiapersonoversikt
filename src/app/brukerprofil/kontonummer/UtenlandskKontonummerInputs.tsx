import * as React from 'react';
import Input from 'nav-frontend-skjema/lib/input';
import Select from 'nav-frontend-skjema/lib/select';
import { ChangeEvent } from 'react';
import { BankKontoUtenOptionals } from './kontonummerUtils';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import * as valuttaKodeverkReducer from '../../../redux/kodeverk/valuttaKodeverk';
import * as landKodeverkReducer from '../../../redux/kodeverk/landKodeverk';
import { AppState, Reducer } from '../../../redux/reducer';
import { Kodeverk, KodeverkResponse } from '../../../models/kodeverk';
import { STATUS } from '../../../redux/utils';
import Innholdslaster from '../../../components/Innholdslaster';
import { formaterStatsborgerskapMedRiktigCasing } from '../../personside/visittkort/header/status/Statsborgerskap';

interface OwnProps {
    bankkonto: BankKontoUtenOptionals;
    createInputChangeHandler: (property: string) => (event: ChangeEvent<HTMLInputElement>) => void;
    createSelectInputChangeHandler: (property: string) => (event: ChangeEvent<HTMLSelectElement>) => void;
    createAdresseInputChangeHandler: (property: string) => (event: ChangeEvent<HTMLInputElement>) => void;
}

interface State {
}

interface DispatchProps {
    hentValuttaKodeverk: () => void;
    hentLandKodeverk: () => void;
}

interface StateProps {
    valuttaKodeverkReducer: Reducer<KodeverkResponse>;
    landKodeverkReducer: Reducer<KodeverkResponse>;
}

type Props = OwnProps & DispatchProps & StateProps;

function Inputs(props: Props) {
    const bankkonto = props.bankkonto;
    return (
        <>
            {VelgLand(props)}
            <Input
                label="Bankens navn"
                value={bankkonto.banknavn}
                onChange={props.createInputChangeHandler('banknavn')}
            />
            <Input
                label="Bankens adresse"
                value={bankkonto.adresse.linje1}
                onChange={props.createAdresseInputChangeHandler('linje1')}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje2}
                onChange={props.createAdresseInputChangeHandler('linje2')}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje3}
                onChange={props.createAdresseInputChangeHandler('linje3')}
            />
            <Input
                label="Kontonummer eller IBAN"
                value={bankkonto.kontonummer}
                onChange={props.createInputChangeHandler('kontonummer')}
            />
            <Input
                label="BC/SWIFT-kode"
                value={bankkonto.swift}
                onChange={props.createInputChangeHandler('swift')}
            />
            <Input
                label="BankKode"
                value={bankkonto.bankkode}
                onChange={props.createInputChangeHandler('bankkode')}
            />
            {VelgValutta(props)}
        </>
    );
}

function sorterKodeverkAlfabetisk(a: Kodeverk, b: Kodeverk) {
    return a.beskrivelse > b.beskrivelse ? 1 : a.beskrivelse === b.beskrivelse ? 0 : -1;
}

function VelgLand(props: Props) {
    if (props.landKodeverkReducer.data === undefined) {
        return new Error('Feil med landkodeverk i endre kontonummer');
    }
    const options = props.landKodeverkReducer.data.kodeverk
        .sort(sorterKodeverkAlfabetisk)
        .map(landKodeverk => (
            <option key={landKodeverk.kodeRef} value={landKodeverk.kodeRef}>
                {formaterStatsborgerskapMedRiktigCasing(landKodeverk.beskrivelse)}
            </option>
        ));
    return (
        <Select label="Velg land" onChange={props.createSelectInputChangeHandler('landkode')}>
            <option key="default" value="Velg land">Velg Land</option>
            {options}
        </Select>
    );
}

function VelgValutta(props: Props) {
    if (props.valuttaKodeverkReducer.data === undefined) {
        return new Error('Feil med valuttakodeverk i endre kontonummer');
    }
    const options = props.valuttaKodeverkReducer.data.kodeverk
        .sort(sorterKodeverkAlfabetisk)
        .map(valuttakodeverk => (
            <option key={valuttakodeverk.kodeRef} value={valuttakodeverk.kodeRef}>
                {valuttakodeverk.beskrivelse}
            </option>
        ));
    return (
        <Select label="Velg valutta" onChange={props.createSelectInputChangeHandler('valuta')}>
            <option key="default" value="Velg valuta">Velg valuta</option>
            {options}
        </Select>
    );
}

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
            <Innholdslaster avhengigheter={[this.props.valuttaKodeverkReducer, this.props.landKodeverkReducer]}>
                <Inputs {...this.props} />
            </Innholdslaster>
        );
    }
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
