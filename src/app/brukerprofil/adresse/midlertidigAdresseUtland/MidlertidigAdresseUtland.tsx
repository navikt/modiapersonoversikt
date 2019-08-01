import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import BrukerProfilDatovelger, { tilPeriode } from '../../../../components/forms/BrukerProfilDatovelger';
import Input from 'nav-frontend-skjema/lib/input';
import { Endringsinfo, Utlandsadresse } from '../../../../models/personadresse';
import { Kodeverk } from '../../../../models/kodeverk';
import VelgLandContainer from './VelgLandContainer';
import { ValideringsResultat } from '../../../../utils/forms/FormValidator';
import { visEndringsinfo } from '../../utils/formUtils';

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

interface Props {
    endringsinfo?: Endringsinfo;
    onChange: (adresser: Partial<Utlandsadresse>) => void;
    midlertidigAdresseUtland: MidlertidigAdresseUtlandInputs;
    visFeilmeldinger: boolean;
}

const InputLinje = styled.div`
    display: flex;
`;

function onGyldigTilChange(props: Props) {
    return (gyldigTil: Date) => {
        const periode = tilPeriode(gyldigTil);
        props.onChange({
            periode: periode
        });
    };
}

function onAdresselinjeChange(event: ChangeEvent<HTMLInputElement>, props: Props, index: number) {
    let adresselinjer = props.midlertidigAdresseUtland.value.adresselinjer.slice();
    adresselinjer[index] = event.target.value;
    props.onChange({
        adresselinjer: adresselinjer
    });
}

function onLandChanged(input: Kodeverk, props: Props) {
    props.onChange({
        landkode: input
    });
}

class MidlertidigAdresseUtland extends React.Component<Props> {
    render() {
        const utlandsadresseState = this.props.midlertidigAdresseUtland.value;
        const utlandsadresseValidering = this.props.midlertidigAdresseUtland.validering;

        const gyldigTil =
            utlandsadresseState.periode && utlandsadresseState.periode.til
                ? new Date(utlandsadresseState.periode.til)
                : undefined;

        return (
            <>
                {visEndringsinfo(this.props.endringsinfo)}
                <VelgLandContainer
                    landChanged={(input: Kodeverk) => onLandChanged(input, this.props)}
                    midlertidigAdresseUtlandInput={this.props.midlertidigAdresseUtland}
                />
                <InputLinje>
                    <div style={{ flex: 4, marginRight: 15 }}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje 1"
                            value={utlandsadresseState.adresselinjer[0] || ''}
                            feil={utlandsadresseValidering.felter.adresselinjer.skjemafeil}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 0);
                            }}
                        />
                    </div>
                </InputLinje>
                <InputLinje>
                    <div style={{ flex: 4, marginRight: 15 }}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje 2"
                            value={utlandsadresseState.adresselinjer[1] || ''}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 1);
                            }}
                        />
                    </div>
                </InputLinje>
                <InputLinje>
                    <div style={{ flex: 4, marginRight: 15 }}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje 3"
                            value={utlandsadresseState.adresselinjer[2] || ''}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 2);
                            }}
                        />
                    </div>
                </InputLinje>
                <BrukerProfilDatovelger
                    dato={gyldigTil}
                    innenEtÅr={true}
                    id={'utlandsadresse-datovelger'}
                    feil={
                        utlandsadresseValidering.felter.periode
                            ? utlandsadresseValidering.felter.periode.skjemafeil
                            : undefined
                    }
                    onChange={onGyldigTilChange(this.props)}
                >
                    Gyldig til
                </BrukerProfilDatovelger>
            </>
        );
    }
}

export default MidlertidigAdresseUtland;
