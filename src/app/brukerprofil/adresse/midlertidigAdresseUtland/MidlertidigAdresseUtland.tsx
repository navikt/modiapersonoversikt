import * as React from 'react';
import { Utlandsadresse } from '../../../../models/personadresse';
import Datovelger from 'nav-datovelger';
import Input from 'nav-frontend-skjema/lib/input';
import styled from 'styled-components';
import { ChangeEvent } from 'react';
import { Kodeverk, KodeverkResponse } from '../../../../models/kodeverk';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import { hentLandKodeverk } from '../../../../redux/kodeverk/landKodeverk';
import { AppState, RestReducer } from '../../../../redux/reducer';
import LandContainer from '../LandContainer';

interface OwnProps {
    onChange: (adresser: Utlandsadresse) => void;
    midlertidigAdresseUtland: Utlandsadresse;
    visFeilmeldinger: boolean;
    land?: Kodeverk;
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
        const periode = {fra: new Date().toISOString(), til: gyldigTil.toISOString()};
        props.onChange({...props.midlertidigAdresseUtland, periode});
    };
}

function onAdresselinjeChange(event: ChangeEvent<HTMLInputElement>, props: Props, index: number) {
    props.midlertidigAdresseUtland.adresselinjer[index] = event.target.value;
    props.onChange({...props.midlertidigAdresseUtland, adresselinjer: props.midlertidigAdresseUtland.adresselinjer});
}

function onLandChanged(input: Kodeverk, props: Props) {
    props.midlertidigAdresseUtland.landkode = input;
    props.onChange({...props.midlertidigAdresseUtland, landkode: props.midlertidigAdresseUtland.landkode});
}

class MidlertidigAdresseUtland extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    onInputChange(utlandsadressePartial: Partial<Utlandsadresse>) {
        this.props.onChange({...this.props.midlertidigAdresseUtland, ...utlandsadressePartial});
    }

    render() {
        const midl = this.props.midlertidigAdresseUtland;

        const gyldigTil = midl.periode && midl.periode.til ?
            new Date(midl.periode.til)
            : new Date();

        return (
            <>
                <LandContainer
                    landChanged={input => onLandChanged(input, this.props)}
                    midlertidigAdresseUtland={this.props.midlertidigAdresseUtland}
                />
                <InputLinje>
                    <div style={{flex: 4, marginRight: 15}}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje 1"
                            defaultValue={this.props.midlertidigAdresseUtland.adresselinjer[0]}
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
                            defaultValue={this.props.midlertidigAdresseUtland.adresselinjer[1]}
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
                            defaultValue={this.props.midlertidigAdresseUtland.adresselinjer[2]}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 2);
                            }}
                        />
                    </div>
                </InputLinje>
                <InputLinje>
                    <div style={{flex: 4, marginRight: 15}}>
                        <Input
                            bredde={'XXL'}
                            label="Adresselinje4 "
                            defaultValue={this.props.midlertidigAdresseUtland.adresselinjer[3]}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onAdresselinjeChange(event, this.props, 3);
                            }}
                        />
                    </div>
                </InputLinje>

                <label className={'skjemaelement__label'}>Gyldig til</label>
                <Datovelger
                    dato={gyldigTil}
                    id={'utlandsadresse-datovelger'}
                    onChange={onGyldigTilChange(this.props)}
                />
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