import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import Input from 'nav-frontend-skjema/lib/input';

import { STATUS } from '../../../redux/restReducers/utils';
import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducers';
import { VeilederRoller } from '../../../models/veilederRoller';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import KnappBase from 'nav-frontend-knapper';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import {
    EndreBankkontoState,
    erBrukersKontonummerUtenlandsk,
    formaterNorskKontonummer,
    hentEndringstekst,
    removeWhitespaceAndDot,
    tomBankkonto
} from './kontonummerUtils';
import UtenlandskKontonrInputs from './UtenlandskKontonummerInputs';
import RequestTilbakemelding from '../RequestTilbakemelding';
import { endreKontonummer, reset } from '../../../redux/restReducers/brukerprofil/endreKontonummer';
import { EndreKontonummerRequest } from '../../../redux/restReducers/brukerprofil/endreKontonummerRequest';
import { ignoreEnter } from '../utils/formUtils';
import { getValidNorskBankKontoForm, validerNorskBankKonto } from './norskKontoValidator';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';
import { getValidUtenlandskKontoForm, validerUtenlandskKonto } from './utenlandskKontoValidator';
import EtikettGrå from '../../../components/EtikettGrå';
import { FormFieldSet } from '../../personside/visittkort/body/VisittkortStyles';
import { veilederHarPåkrevdRolleForEndreKontonummer } from '../utils/RollerUtils';
import { EndreKontonummerInfomeldingWrapper } from '../Infomelding';
import { reloadPerson } from '../../../redux/restReducers/personinformasjon';

enum bankEnum {
    erNorsk = 'Kontonummer i Norge',
    erUtenlandsk = 'Kontonummer i utlandet'
}

interface State {
    bankkontoInput: EndreBankkontoState;
    bankkontoValidering: ValideringsResultat<EndreBankkontoState>;
    norskKontoRadio: boolean;
}

interface DispatchProps {
    reloadPerson: (fødselsnummer: string) => void;
    endreKontonummer: (fødselsnummer: string, request: EndreKontonummerRequest) => void;
    resetEndreKontonummerReducer: () => void;
}

interface StateProps {
    reducerStatus: STATUS;
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
        this.slettKontonummer = this.slettKontonummer.bind(this);
    }

    componentWillUnmount() {
        this.resetReducer();
    }

    componentDidUpdate(prevProps: Props) {
        this.reloadOnEndret(prevProps);
    }

    reloadOnEndret(prevProps: Props) {
        if (prevProps.reducerStatus !== STATUS.OK && this.props.reducerStatus === STATUS.OK) {
            this.props.reloadPerson(this.props.person.fødselsnummer);
        }
    }

    getInitialState(): State {
        const brukersBankkonto = this.getBrukersBankkonto();
        const erNorsk = !erBrukersKontonummerUtenlandsk(this.props.person);
        return {
            bankkontoInput: brukersBankkonto,
            norskKontoRadio: erNorsk,
            bankkontoValidering: erNorsk ? getValidNorskBankKontoForm() : getValidUtenlandskKontoForm()
        };
    }

    getBrukersBankkonto(): EndreBankkontoState {
        const person = this.props.person;
        if (!person.bankkonto) {
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

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const kontoInput = this.state.bankkontoInput;
        const valideringsResultat = this.state.norskKontoRadio
            ? validerNorskBankKonto(kontoInput)
            : validerUtenlandskKonto(kontoInput);

        if (!valideringsResultat.formErGyldig) {
            this.setState({
                bankkontoValidering: valideringsResultat
            });
            return;
        }

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

    slettKontonummer() {
        this.props.endreKontonummer(this.props.person.fødselsnummer, {
            kontonummer: ''
        });
    }

    handleNorskKontonummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.updateBankkontoInputsState({
            kontonummer: formaterNorskKontonummer(event.target.value)
        });
    }

    updateBankkontoInputsState(partial: Partial<EndreBankkontoState>) {
        const gyldingValidering = this.state.norskKontoRadio
            ? getValidNorskBankKontoForm() : getValidUtenlandskKontoForm();
        this.setState({
            bankkontoValidering: gyldingValidering,
            bankkontoInput: {
                ...this.state.bankkontoInput,
                ...partial
            }
        });
        this.resetReducer();
    }

    handleRadioChange(event: React.SyntheticEvent<EventTarget>, value: string) {
        this.setState({
            norskKontoRadio: value === bankEnum.erNorsk
        });
    }

    tilbakestill() {
        this.props.resetEndreKontonummerReducer();
        this.setState({
            ...this.getInitialState()
        });
    }

    kontoErEndret() {
        return JSON.stringify(this.getBrukersBankkonto()) !== JSON.stringify(this.state.bankkontoInput);
    }

    getNorskKontonrInputs() {
        return (
            <Input
                label="Kontonummer"
                value={this.state.bankkontoInput.kontonummer}
                onChange={this.handleNorskKontonummerInputChange}
                onKeyPress={ignoreEnter}
                feil={this.state.bankkontoValidering.felter.kontonummer.skjemafeil}
            />
        );
    }

    radioKnappProps() {
        return [
            {label: bankEnum.erNorsk, id: bankEnum.erNorsk, value: bankEnum.erNorsk},
            {label: bankEnum.erUtenlandsk, id: bankEnum.erUtenlandsk, value: bankEnum.erUtenlandsk}
        ];
    }

    resetReducer() {
        if (this.props.reducerStatus !== STATUS.NOT_STARTED) {
            this.props.resetEndreKontonummerReducer();
        }
    }

    kontonummerBleLagret() {
        return this.props.reducerStatus === STATUS.OK;
    }

    requestIsPending() {
        return this.props.reducerStatus === STATUS.LOADING;
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
                bankkontoValidering={this.state.bankkontoValidering}
                updateBankkontoInputsState={this.updateBankkontoInputsState}
            />);
        const sletteKnapp = this.props.person.bankkonto && this.props.person.bankkonto.kontonummer !== ''
            ? (
                <KnappBase
                    type="fare"
                    onClick={this.slettKontonummer}
                    autoDisableVedSpinner={true}
                    spinner={this.requestIsPending()}
                    disabled={this.requestIsPending()}
                >
                    Slett kontonummer
                </KnappBase>
            )
            : null;

        const knapper = (
            <FormKnapperWrapper>
                {sletteKnapp}
                <KnappBase
                    type="standard"
                    onClick={this.tilbakestill}
                    disabled={!this.kontoErEndret() || this.kontonummerBleLagret() || this.requestIsPending()}
                >
                    Avbryt
                </KnappBase>
                <KnappBase
                    type="hoved"
                    spinner={this.props.reducerStatus === STATUS.LOADING}
                    autoDisableVedSpinner={true}
                    disabled={
                        !this.kontoErEndret()
                        || !veilederHarPåkrevdRolleForEndreKontonummer(this.props.veilederRoller)
                        || this.kontonummerBleLagret()
                    }
                >
                    Endre kontonummer
                </KnappBase>
            </FormKnapperWrapper>
        );
        const endreKontonummerRequestTilbakemelding = (
            <RequestTilbakemelding
                status={this.props.reducerStatus}
                onError={'Det skjedde en feil ved endring av kontonummer.'}
                onSuccess={`Kontonummer ble endret.`}
            />
        );

        const sistEndretInfo = <EtikettGrå>{hentEndringstekst(this.props.person.bankkonto)}</EtikettGrå>;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormFieldSet disabled={!veilederHarPåkrevdRolleForEndreKontonummer(this.props.veilederRoller)}>
                    <Undertittel>Kontonummer</Undertittel>
                    {sistEndretInfo}
                    <EndreKontonummerInfomeldingWrapper veilderRoller={this.props.veilederRoller}/>
                    {norskEllerUtenlandskKontoRadio}
                    {kontoInputs}
                    {knapper}
                    {endreKontonummerRequestTilbakemelding}
                </FormFieldSet>
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        reducerStatus: state.restEndepunkter.endreKontonummer.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        reloadPerson: (fødselsnummer: string) => dispatch(reloadPerson(fødselsnummer)),
        endreKontonummer: (fødselsnummer: string, request: EndreKontonummerRequest) =>
            dispatch(endreKontonummer(fødselsnummer, request)),
        resetEndreKontonummerReducer: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EndreKontonummerForm);
