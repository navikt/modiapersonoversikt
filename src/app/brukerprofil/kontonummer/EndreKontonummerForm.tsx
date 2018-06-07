///<reference path="kontonummerUtils.ts"/>
import * as React from 'react';
import { FormEvent } from 'react';
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
import RadioPanelGruppe, { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { ChangeEvent } from 'react';
import RequestTilbakemelding from '../kontaktinformasjon/RequestTilbakemelding';
import { removeWhitespaceAndDot, formaterNorskKontonummer, validerKontonummer } from './kontonummerUtils';
import UtenlandskKontonrInputs from './UtenlandskKontonummerInputs';

enum bankEnum {
    erNorsk = 'Kontonummer i Norge',
    erUtenlandsk = 'Kontonummer i utlandet'
}

interface State {
    kontonummerInput: string | number;
    norskKontoRadio: boolean;
    ugydligKontonummerWarning: boolean;
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.tilbakestill = this.tilbakestill.bind(this);
    }

    getInitialState(): State {
        return {
            kontonummerInput: this.brukersKontonummer()
                ? formaterNorskKontonummer(this.brukersKontonummer())
                : this.brukersKontonummer(),
            norskKontoRadio: this.erBrukersKontonummerNorsk(),
            ugydligKontonummerWarning: false
        };
    }

    brukersKontonummer() {
        if (this.props.person.bankkonto === undefined) {
            return '';
        }
        return this.props.person.bankkonto.kontonummer;
    }

    erBrukersKontonummerNorsk() {
        return this.props.person.bankkonto ? this.props.person.bankkonto.erNorskKonto : true;
    }

    erKontonummerValid(kontonummer?: string) {
        return !this.state.norskKontoRadio
            || validerKontonummer(kontonummer || this.state.kontonummerInput);
    }

    getRadioKnappProps(): RadioProps[] {
        return [
            {
                label: bankEnum.erNorsk,
                value: bankEnum.erNorsk
            },
            {
                label: bankEnum.erUtenlandsk,
                value: bankEnum.erUtenlandsk
            }
        ];
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    valgtKontoOpphav() {
        if (!this.state.norskKontoRadio) {
            return bankEnum.erUtenlandsk;
        }
        return bankEnum.erNorsk;
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const input = event.target.value;
        this.setState({
            kontonummerInput: this.state.norskKontoRadio ? formaterNorskKontonummer(input) : input,
            ugydligKontonummerWarning:
                removeWhitespaceAndDot(input).length >= 11 ? !this.erKontonummerValid(input) : false
        });
    }

    handleRadioChange(event: React.SyntheticEvent<EventTarget>, value: string) {
        this.setState({
            norskKontoRadio: value === bankEnum.erNorsk,
            ugydligKontonummerWarning: false
        });
    }

    tilbakestill() {
        this.setState(this.getInitialState());
    }

    kontonummerErEndret() {
        return this.brukersKontonummer() !== this.state.kontonummerInput
            || this.erBrukersKontonummerNorsk() !== this.state.norskKontoRadio;
    }

    getNorskKontonrInputs() {
        return (
            <Input
                label="Kontonummer"
                value={this.state.kontonummerInput}
                onChange={this.handleInputChange}
                feil={this.state.ugydligKontonummerWarning ? { feilmelding: 'Kontonummer er ugyldig' } : undefined}
            />
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Undertittel>Kontonummer</Undertittel>
                <RadioPanelGruppe
                    radios={this.getRadioKnappProps()}
                    legend={''}
                    name={'Velg norsk eller utenlandsk konto'}
                    checked={this.valgtKontoOpphav()}
                    onChange={this.handleRadioChange}
                />
                {this.state.norskKontoRadio ? this.getNorskKontonrInputs() : <UtenlandskKontonrInputs/>}
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        onClick={this.tilbakestill}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        spinner={this.props.status === STATUS.PENDING}
                        autoDisableVedSpinner={true}
                        disabled={!this.kontonummerErEndret() || !this.erKontonummerValid()}
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
        status: state.endreNavn.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EndreKontonummerForm);
