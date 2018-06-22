import * as React from 'react';
import { ChangeEvent } from 'react';

import Select from 'nav-frontend-skjema/lib/select';

import { Gateadresse, Matrikkeladresse, Postboksadresse } from '../../../models/personadresse';
import GateadresseForm from './GateadresseForm';
import MatrikkeladresseForm from './MatrikkeladresseForm';
import PostboksadresseForm from './PostboksadresseForm';

enum Valg {
    GATEADRESSE, MATRIKKELADRESSE, POSTBOKSADRESSE
}

export interface MidlertidigeAdresserNorge {
    gateadresse: Gateadresse;
    matrikkeladresse: Matrikkeladresse;
    postboksadresse: Postboksadresse;
}

interface Props {
    onChange: (adresser: MidlertidigeAdresserNorge) => void;
    midlertidigAdresseNorge: MidlertidigeAdresserNorge;
}

interface State {
    valg: Valg;
}

function getValgtAdressetype(value: string): Valg {
    switch (value) {
        case Valg.MATRIKKELADRESSE.toString():
            return Valg.MATRIKKELADRESSE;
        case Valg.GATEADRESSE.toString():
            return Valg.GATEADRESSE;
        case Valg.POSTBOKSADRESSE.toString():
            return Valg.POSTBOKSADRESSE;
        default:
            return Valg.GATEADRESSE;
    }
}

function getInitialAdresseTypeValg(midlertidigAdresseNorge: MidlertidigeAdresserNorge) {
    if (midlertidigAdresseNorge.gateadresse.postnummer !== '') {
        return Valg.GATEADRESSE;
    } else if (midlertidigAdresseNorge.matrikkeladresse.postnummer !== '') {
        return Valg.MATRIKKELADRESSE;
    } else if (midlertidigAdresseNorge.postboksadresse.postnummer !== '') {
        return Valg.POSTBOKSADRESSE;
    } else {
        return Valg.GATEADRESSE;
    }
}

class MidlertidigAdresseNorge extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.onAdresseTypeChange = this.onAdresseTypeChange.bind(this);
        this.state = {
            valg: getInitialAdresseTypeValg(props.midlertidigAdresseNorge)
        };
    }

    onAdresseTypeChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({valg: getValgtAdressetype(event.target.value)});
    }

    onGateadresseInputChange(gateadresse: Gateadresse) {
        this.props.onChange({...this.props.midlertidigAdresseNorge, gateadresse});
    }

    onMatrikkeladresseInputChange(matrikkeladresse: Matrikkeladresse) {
        this.props.onChange({...this.props.midlertidigAdresseNorge, matrikkeladresse});
    }

    onPostboksadresseInputChange(postboksadresse: Postboksadresse) {
        this.props.onChange({...this.props.midlertidigAdresseNorge, postboksadresse});
    }

    render() {
        return (
            <>
                <Select
                    label="Landkode"
                    bredde={'m'}
                    defaultValue={this.state.valg.toString()}
                    onChange={this.onAdresseTypeChange}
                >
                    <option key={Valg.GATEADRESSE} value={Valg.GATEADRESSE}>Gateadresse</option>
                    <option
                        key={Valg.MATRIKKELADRESSE}
                        value={Valg.MATRIKKELADRESSE}
                    >
                        Områdeadresse (uten veinavn)
                    </option>
                    <option key={Valg.POSTBOKSADRESSE} value={Valg.POSTBOKSADRESSE}>Postboksadresse</option>
                </Select>
                {this.state.valg === Valg.GATEADRESSE && <GateadresseForm
                    onChange={(gateadresse: Gateadresse) => this.onGateadresseInputChange(gateadresse)}
                    gateadresse={this.props.midlertidigAdresseNorge.gateadresse as Gateadresse}
                />}
                {this.state.valg === Valg.MATRIKKELADRESSE && <MatrikkeladresseForm
                    onChange={(matrikkeladresse: Matrikkeladresse) =>
                        this.onMatrikkeladresseInputChange(matrikkeladresse)}
                    matrikkeladresse={this.props.midlertidigAdresseNorge.matrikkeladresse as Matrikkeladresse}
                />}
                {this.state.valg === Valg.POSTBOKSADRESSE && <PostboksadresseForm
                    onChange={(postboksadresse: Postboksadresse) =>
                        this.onPostboksadresseInputChange(postboksadresse)}
                    postboksadresse={this.props.midlertidigAdresseNorge.postboksadresse as Postboksadresse}

                />}
            </>
        );
    }
}

export default MidlertidigAdresseNorge;