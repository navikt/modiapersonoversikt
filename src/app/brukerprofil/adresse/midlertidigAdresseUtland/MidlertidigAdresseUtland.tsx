import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import Datovelger, { tilPeriode } from '../../../../components/forms/Datovelger';
import Input from 'nav-frontend-skjema/lib/input';

import { Utlandsadresse } from '../../../../models/personadresse';
import { Kodeverk, KodeverkResponse } from '../../../../models/kodeverk';
import { hentLandKodeverk } from '../../../../redux/kodeverk/landKodeverk';
import { AppState, RestReducer } from '../../../../redux/reducer';
import VelgLandContainer from './VelgLandContainer';
import { ValideringsResultat } from '../../../../utils/forms/FormValidator';

export interface MidlertidigAdresseUtlandInputs {
    value: Utlandsadresse;
    validering: ValideringsResultat<Utlandsadresse>;
}

export const tomUtlandsadresse = {
    landkode: {
        kodeRef: '',
        beskrivelse: ''
    },
    adresselinjer: [''],
    periode: {
        fra: '',
        til: ''
    }
};

interface OwnProps {
    onChange: (adresser: Partial<Utlandsadresse>) => void;
    midlertidigAdresseUtland: MidlertidigAdresseUtlandInputs;
    visFeilmeldinger: boolean;
}

interface DispatchProps {
    hentLandKodeverk: () => void;
}

interface StateProps {
    landReducer: RestReducer<KodeverkResponse>;
}

type Props = OwnProps & DispatchProps & StateProps;

const InputLinje = styled.div`
  display: flex;
`;

function onGyldigTilChange(props: Props) {
    return (gyldigTil: Date) => {
        const periode = tilPeriode(gyldigTil);
        props.onChange({...props.midlertidigAdresseUtland.value, periode});
    };
}

function onAdresselinjeChange(event: ChangeEvent<HTMLInputElement>, props: Props, index: number) {
    props.midlertidigAdresseUtland.value.adresselinjer[index] = event.target.value;
    props.onChange({
        ...props.midlertidigAdresseUtland.value,
        adresselinjer: props.midlertidigAdresseUtland.value.adresselinjer
    });
}

function onLandChanged(input: Kodeverk, props: Props) {
    props.midlertidigAdresseUtland.value.landkode = input;
    props.onChange({...props.midlertidigAdresseUtland.value, landkode: props.midlertidigAdresseUtland.value.landkode});
}

class MidlertidigAdresseUtland extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const utlandsadresseState = this.props.midlertidigAdresseUtland.value;
        const utlandsadresseValidering = this.props.midlertidigAdresseUtland.validering;

        const gyldigTil = utlandsadresseState.periode && utlandsadresseState.periode.til ?
            new Date(utlandsadresseState.periode.til) : undefined;

        return (
            <>
                <VelgLandContainer
                    landChanged={input => onLandChanged(input, this.props)}
                    midlertidigAdresseUtlandInput={this.props.midlertidigAdresseUtland}
                />
                <InputLinje>
                    <div style={{flex: 4, marginRight: 15}}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje 1"
                            defaultValue={utlandsadresseState.adresselinjer[0]}
                            feil={utlandsadresseValidering.felter.adresselinjer.skjemafeil}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 0);
                            }}
                        />
                    </div>
                </InputLinje>
                <InputLinje>
                    <div style={{flex: 4, marginRight: 15}}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje 2"
                            defaultValue={utlandsadresseState.adresselinjer[1]}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 1);
                            }}
                        />
                    </div>
                </InputLinje>
                <InputLinje>
                    <div style={{flex: 4, marginRight: 15}}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje 3"
                            defaultValue={utlandsadresseState.adresselinjer[2]}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 2);
                            }}
                        />
                    </div>
                </InputLinje>
                <Datovelger
                    dato={gyldigTil}
                    innenEtÅr={true}
                    id={'utlandsadresse-datovelger'}
                    feil={utlandsadresseValidering.felter.periode ?
                        utlandsadresseValidering.felter.periode.skjemafeil : undefined}
                    onChange={onGyldigTilChange(this.props)}
                >
                    Gyldig til
                </Datovelger>
            </>);
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        landReducer: state.landReducer
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentLandKodeverk: () => dispatch(hentLandKodeverk())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MidlertidigAdresseUtland);