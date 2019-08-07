import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';

import { Input } from 'nav-frontend-skjema';
import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducers';
import { VeilederRoller } from '../../../models/veilederRoller';
import { Undertittel, Undertekst } from 'nav-frontend-typografi';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import KnappBase from 'nav-frontend-knapper';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
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
import { EndreKontonummerRequest } from '../../../redux/restReducers/brukerprofil/endreKontonummerRequest';
import { ignoreEnter } from '../utils/formUtils';
import { getValidNorskBankKontoForm, validerNorskBankKonto } from './norskKontoValidator';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';
import { getValidUtenlandskKontoForm, validerUtenlandskKonto } from './utenlandskKontoValidator';
import EtikettGrå from '../../../components/EtikettGrå';
import { FormFieldSet } from '../../personside/visittkort/body/VisittkortStyles';
import { veilederHarPåkrevdRolleForEndreKontonummer } from '../utils/RollerUtils';
import { EndreKontonummerInfomeldingWrapper } from '../Infomelding';
import { loggEvent } from '../../../utils/frontendLogger';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { FormatertKontonummer } from '../../../utils/FormatertKontonummer';
import { erNyePersonoversikten } from '../../../utils/erNyPersonoversikt';
import KnappMedBekreftPopup from '../../../components/KnappMedBekreftPopup';
import { PostStatus } from '../../../rest/utils/postResource';

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
    resetEndreKontonummerResource: () => void;
}

interface StateProps {
    resourceStatus: PostStatus;
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
        this.resetResource();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.kontonummerBleEndret(prevProps)) {
            this.props.reloadPerson(this.props.person.fødselsnummer);
        }
        const nyeDataPåPerson = prevProps.person !== this.props.person;
        if (nyeDataPåPerson) {
            this.setState(this.getInitialState());
        }
    }

    kontonummerBleEndret(prevProps: Props) {
        return prevProps.resourceStatus !== PostStatus.SUCCESS && this.props.resourceStatus === PostStatus.SUCCESS;
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
            norskKontonummer: erBrukersKontonummerUtenlandsk(person)
                ? ''
                : formaterNorskKontonummer(person.bankkonto.kontonummer),
            utenlandskKontonummer: erBrukersKontonummerUtenlandsk(person) ? person.bankkonto.kontonummer : ''
        };
    }

    slettKontonummer() {
        this.props.endreKontonummer(this.props.person.fødselsnummer, { kontonummer: '' });
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
                kontonummer: removeWhitespaceAndDot(kontoInput.norskKontonummer)
            });
        } else {
            this.props.endreKontonummer(fnr, {
                kontonummer: removeWhitespaceAndDot(kontoInput.utenlandskKontonummer),
                landkode: kontoInput.landkode.kodeRef,
                valuta: kontoInput.valuta.kodeRef,
                swift: kontoInput.swift,
                banknavn: kontoInput.banknavn,
                bankkode: kontoInput.bankkode,
                bankadresse: kontoInput.adresse
            });
        }
        loggEvent('Endre kontonummer', 'Brukerprofil');
    }

    handleNorskKontonummerInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.updateBankkontoInputsState({
            norskKontonummer: formaterNorskKontonummer(event.target.value)
        });
    }

    updateBankkontoInputsState(partial: Partial<EndreBankkontoState>) {
        const gyldigValidering = this.state.norskKontoRadio
            ? getValidNorskBankKontoForm()
            : getValidUtenlandskKontoForm();
        this.setState({
            bankkontoValidering: gyldigValidering,
            bankkontoInput: {
                ...this.state.bankkontoInput,
                ...partial
            }
        });
        this.resetResource();
    }

    handleRadioChange(event: React.SyntheticEvent<EventTarget>, value: string) {
        this.setState({
            norskKontoRadio: value === bankEnum.erNorsk
        });
    }

    tilbakestill() {
        this.props.resetEndreKontonummerResource();
        this.setState({
            ...this.getInitialState()
        });
    }

    formErEndret() {
        return JSON.stringify(this.getBrukersBankkonto()) !== JSON.stringify(this.state.bankkontoInput);
    }

    getNorskKontonrInputs() {
        return (
            <Input
                label="Kontonummer"
                value={this.state.bankkontoInput.norskKontonummer}
                onChange={this.handleNorskKontonummerInputChange}
                onKeyPress={ignoreEnter}
                feil={this.state.bankkontoValidering.felter.norskKontonummer.skjemafeil}
            />
        );
    }

    radioKnappProps() {
        return [
            { label: bankEnum.erNorsk, id: bankEnum.erNorsk, value: bankEnum.erNorsk },
            { label: bankEnum.erUtenlandsk, id: bankEnum.erUtenlandsk, value: bankEnum.erUtenlandsk }
        ];
    }

    resetResource() {
        if (this.props.resourceStatus !== PostStatus.NOT_STARTED) {
            this.props.resetEndreKontonummerResource();
        }
    }

    kontonummerBleLagret() {
        return this.props.resourceStatus === PostStatus.SUCCESS;
    }

    requestIsPending() {
        return this.props.resourceStatus === PostStatus.POSTING;
    }

    render() {
        const sletteKnapp = this.props.person.bankkonto &&
            this.props.person.bankkonto.kontonummer &&
            !this.requestIsPending() && (
                <FormKnapperWrapper>
                    <KnappMedBekreftPopup
                        onBekreft={this.slettKontonummer}
                        popUpTekst="Sikker på at du vil slette kontonummer?"
                    >
                        Slett kontonummer
                    </KnappMedBekreftPopup>
                </FormKnapperWrapper>
            );
        const norskEllerUtenlandskKontoRadio = (
            <RadioPanelGruppe
                radios={this.radioKnappProps()}
                legend={''}
                name={'Velg norsk eller utenlandsk konto'}
                checked={this.state.norskKontoRadio ? bankEnum.erNorsk : bankEnum.erUtenlandsk}
                onChange={this.handleRadioChange}
            />
        );
        const kontoInputs = this.state.norskKontoRadio ? (
            this.getNorskKontonrInputs()
        ) : (
            <UtenlandskKontonrInputs
                bankkonto={this.state.bankkontoInput}
                bankkontoValidering={this.state.bankkontoValidering}
                updateBankkontoInputsState={this.updateBankkontoInputsState}
            />
        );
        const knapper = (
            <FormKnapperWrapper>
                <KnappBase
                    type="standard"
                    onClick={this.tilbakestill}
                    disabled={!this.formErEndret() || this.kontonummerBleLagret() || this.requestIsPending()}
                >
                    Avbryt
                </KnappBase>
                <KnappBase
                    type="hoved"
                    spinner={this.props.resourceStatus === PostStatus.POSTING}
                    autoDisableVedSpinner={true}
                    disabled={
                        !this.formErEndret() ||
                        !veilederHarPåkrevdRolleForEndreKontonummer(this.props.veilederRoller) ||
                        this.kontonummerBleLagret()
                    }
                >
                    Endre kontonummer
                </KnappBase>
            </FormKnapperWrapper>
        );
        const endreKontonummerRequestTilbakemelding = (
            <RequestTilbakemelding
                status={this.props.resourceStatus}
                onError={'Det skjedde en feil ved endring av kontonummer.'}
                onSuccess={`Kontonummer ble endret.`}
            />
        );
        const konto = (
            <Undertekst>
                Gjeldende kontonummer:
                <FormatertKontonummer
                    kontonummer={(this.props.person.bankkonto && this.props.person.bankkonto.kontonummer) || ''}
                />
            </Undertekst>
        );

        const sistEndretInfo = <EtikettGrå>{hentEndringstekst(this.props.person.bankkonto)}</EtikettGrå>;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormFieldSet disabled={!veilederHarPåkrevdRolleForEndreKontonummer(this.props.veilederRoller)}>
                    <Undertittel>Kontonummer</Undertittel>
                    {!erNyePersonoversikten() && konto}
                    {sistEndretInfo}
                    <EndreKontonummerInfomeldingWrapper veilderRoller={this.props.veilederRoller} />
                    {norskEllerUtenlandskKontoRadio}
                    {kontoInputs}
                    {knapper}
                    {sletteKnapp}
                    {endreKontonummerRequestTilbakemelding}
                </FormFieldSet>
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        resourceStatus: state.restResources.endreKontonummer.status
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        reloadPerson: () => dispatch((d, getState) => d(getState().restResources.personinformasjon.actions.reload)),
        endreKontonummer: (fødselsnummer: string, request: EndreKontonummerRequest) =>
            dispatch((d, getState) => d(getState().restResources.endreKontonummer.actions.post(request))),
        resetEndreKontonummerResource: () =>
            dispatch((d, getState) => d(getState().restResources.endreKontonummer.actions.reset))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EndreKontonummerForm);
