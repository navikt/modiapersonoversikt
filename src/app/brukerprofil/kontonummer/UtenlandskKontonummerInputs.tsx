import * as React from 'react';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import Input from 'nav-frontend-skjema/lib/input';
import Select from 'nav-frontend-skjema/lib/select';
import Innholdslaster from '../../../components/Innholdslaster';

import { EndreBankkontoState } from './kontonummerUtils';
import { hentValutaer } from '../../../redux/restReducers/kodeverk/valutaKodeverk';
import { AppState } from '../../../redux/reducers';
import { Kodeverk, KodeverkResponse } from '../../../models/kodeverk';
import { formaterStatsborgerskapMedRiktigCasing } from '../../personside/visittkort/header/status/Statsborgerskap';
import { ignoreEnter } from '../utils/formUtils';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';
import { alfabetiskKodeverkComparator } from '../../../utils/kodeverkUtils';
import { isNotStarted, Loaded, DeprecatedRestResource } from '../../../redux/restReducers/deprecatedRestResource';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';

interface OwnProps {
    bankkonto: EndreBankkontoState;
    bankkontoValidering: ValideringsResultat<EndreBankkontoState>;
    updateBankkontoInputsState: (property: Partial<EndreBankkontoState>) => void;
}

interface DispatchProps {
    hentValutaKodeverk: () => void;
}

interface StateProps {
    valutaKodeverkResource: DeprecatedRestResource<KodeverkResponse>;
}

interface LoadedProps {
    valutaKodeverkResource: Loaded<KodeverkResponse>;
}

type Props = OwnProps & DispatchProps;

class UtenlandskKontonrInputs extends React.Component<Props & StateProps> {
    constructor(props: Props & StateProps) {
        super(props);
        if (isNotStarted(this.props.valutaKodeverkResource)) {
            this.props.hentValutaKodeverk();
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.valutaKodeverkResource]}>
                <Inputs
                    {...this.props}
                    valutaKodeverkResource={this.props.valutaKodeverkResource as Loaded<KodeverkResponse>}
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
            <RestResourceConsumer<KodeverkResponse> getResource={restResources => restResources.land}>
                {land => <VelgLand {...props} land={land} />}
            </RestResourceConsumer>
            <Input
                label="Bankens navn"
                value={bankkonto.banknavn || ''}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ banknavn: event.target.value })}
                feil={validering.banknavn.skjemafeil}
            />
            <Input
                label="Bankens adresse"
                value={bankkonto.adresse.linje1}
                onKeyPress={ignoreEnter}
                onChange={event =>
                    props.updateBankkontoInputsState({
                        adresse: {
                            ...props.bankkonto.adresse,
                            linje1: event.target.value
                        }
                    })
                }
                feil={!validering.adresse.erGyldig ? { feilmelding: '' } : undefined}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje2}
                onKeyPress={ignoreEnter}
                onChange={event =>
                    props.updateBankkontoInputsState({
                        adresse: {
                            ...props.bankkonto.adresse,
                            linje2: event.target.value
                        }
                    })
                }
                feil={!validering.adresse.erGyldig ? { feilmelding: '' } : undefined}
            />
            <Input
                label=""
                value={bankkonto.adresse.linje3}
                onKeyPress={ignoreEnter}
                onChange={event =>
                    props.updateBankkontoInputsState({
                        adresse: {
                            ...props.bankkonto.adresse,
                            linje3: event.target.value
                        }
                    })
                }
                feil={validering.adresse.skjemafeil}
            />
            <Input
                label="BC/SWIFT-kode"
                value={bankkonto.swift}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ swift: event.target.value })}
                feil={validering.swift.skjemafeil}
            />
            <Input
                label="Kontonummer eller IBAN"
                value={bankkonto.utenlandskKontonummer}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ utenlandskKontonummer: event.target.value })}
                feil={validering.utenlandskKontonummer.skjemafeil}
            />
            <Input
                label="Bankkode"
                value={bankkonto.bankkode}
                onKeyPress={ignoreEnter}
                onChange={event => props.updateBankkontoInputsState({ bankkode: event.target.value })}
                feil={validering.bankkode.skjemafeil}
            />
            <VelgValuta {...props} />
        </>
    );
}

function VelgLand(props: Props & { land: KodeverkResponse }) {
    const options = props.land.kodeverk.sort(alfabetiskKodeverkComparator).map(landKodeverk => {
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
            <option key="default" disabled={true} value="">
                Velg Land
            </option>
            {options}
        </Select>
    );
}

function VelgValuta(props: Props & LoadedProps) {
    const options = props.valutaKodeverkResource.data.kodeverk
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
            <option key="default" disabled={true} value="">
                Velg valuta
            </option>
            {options}
        </Select>
    );
}

function handleLandChange(props: Props & { land: KodeverkResponse }, event: ChangeEvent<HTMLSelectElement>) {
    const valgtKodeverk: Kodeverk = props.land.kodeverk.find(kodeverk => kodeverk.kodeRef === event.target.value) || {
        kodeRef: '',
        beskrivelse: ''
    };

    props.updateBankkontoInputsState({ landkode: valgtKodeverk });
}

function handleValutaChange(props: Props & LoadedProps, event: ChangeEvent<HTMLSelectElement>) {
    const valgtKodeverk: Kodeverk = props.valutaKodeverkResource.data.kodeverk.find(
        kodeverk => kodeverk.kodeRef === event.target.value
    ) || { kodeRef: '', beskrivelse: '' };

    props.updateBankkontoInputsState({ valuta: valgtKodeverk });
}

const mapDispatchToProps = (dispatch: AsyncDispatch): DispatchProps => {
    return {
        hentValutaKodeverk: () => dispatch(hentValutaer())
    };
};

const mapStateToProps = (state: AppState): StateProps => {
    return {
        valutaKodeverkResource: state.restResources.valuta
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UtenlandskKontonrInputs);
