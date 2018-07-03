import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
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
import { endreKontonummer, reset } from '../../../redux/brukerprofil/endreKontonummer';
import { EndreKontonummerRequest } from '../../../redux/brukerprofil/endreKontonummerRequest';
import { ignoreEnter } from '../utils/formUtils';
import { validerNorskBankKonto } from './norskKontoValidator';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';
import { validerUtenlandskKonto } from './utenlandskKontoValidator';
import EtikettMini from '../../../components/EtikettMini';
import { FormFieldSet } from '../../personside/visittkort/body/VisittkortStyles';
import { veilederHarPåkrevdRolleForEndreKontonummer } from '../utils/RollerUtils';
import { EndreKontonummerInfomeldingWrapper } from '../Infomelding';

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
        const brukersBankkonto = this.getBrukersBankkonto();
        return {
            bankkontoInput: brukersBankkonto,
            norskKontoRadio: !erBrukersKontonummerUtenlandsk(this.props.person),
            bankkontoValidering: validerNorskBankKonto(brukersBankkonto)
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
            ...this.getInitialState(),
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
        return (
            <Input
                label="Kontonummer"
                id="Kontonummer"
                value={this.state.bankkontoInput.kontonummer}
                onChange={this.handleNorskKontonummerInputChange}
                onKeyPress={ignoreEnter}
                feil={this.state.bankkontoValidering.felter.kontonummer.skjemafeil}
            />
        );
    }

    radioKnappProps() {
        return [
            { label: bankEnum.erNorsk, id: bankEnum.erNorsk, value: bankEnum.erNorsk },
            { label: bankEnum.erUtenlandsk, id: bankEnum.erUtenlandsk, value: bankEnum.erUtenlandsk }
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
                bankkontoValidering={this.state.bankkontoValidering}
                updateBankkontoInputsState={this.updateBankkontoInputsState}
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
                    disabled={!this.kontoErEndret() ||
                    !veilederHarPåkrevdRolleForEndreKontonummer(this.props.veilederRoller)}
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

        const sistEndretInfo = <EtikettMini>{hentEndringstekst(this.props.person.bankkonto)}</EtikettMini>;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormFieldSet disabled={!veilederHarPåkrevdRolleForEndreKontonummer(this.props.veilederRoller)}>
                    <Undertittel>Kontonummer</Undertittel>
                    <EndreKontonummerInfomeldingWrapper veilderRoller={this.props.veilederRoller}/>
                    {norskEllerUtenlandskKontoRadio}
                    {sistEndretInfo}
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
