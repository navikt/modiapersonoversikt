import * as React from 'react';
import { ChangeEvent } from 'react';

import Select from 'nav-frontend-skjema/lib/select';

import { Gateadresse, Matrikkeladresse } from '../../../models/personadresse';
import { Kodeverk } from '../../../models/kodeverk';
import GateadresseForm from './GateadresseForm';
import MatrikkeladresseForm from './MatrikkeladresseForm';

enum Valg {
    GATEADRESSE, MATRIKKELADRESSE
}

export interface MidlertidigeAdresserNorge {
    gateadresse: Gateadresse;
    matrikkeladresse: Matrikkeladresse;
}

interface Props {
    onChange: (adresser: MidlertidigeAdresserNorge) => void;
    midlertidigAdresseNorge: MidlertidigeAdresserNorge;
    postnummerKodeverk: Kodeverk[];
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
        default:
            return Valg.GATEADRESSE;
    }
}

class MidlertidigAdresseNorge extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.onAdresseTypeChange = this.onAdresseTypeChange.bind(this);
        this.state = {
            valg: Valg.GATEADRESSE
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
                </Select>
                {this.state.valg === Valg.GATEADRESSE && <GateadresseForm
                    onChange={(gateadresse: Gateadresse) => this.onGateadresseInputChange(gateadresse)}
                    gateadresse={this.props.midlertidigAdresseNorge.gateadresse as Gateadresse}
                    postnummerKodeverk={this.props.postnummerKodeverk}
                />}
                {this.state.valg === Valg.MATRIKKELADRESSE && <MatrikkeladresseForm
                    onChange={(matrikkeladresse: Matrikkeladresse) =>
                        this.onMatrikkeladresseInputChange(matrikkeladresse)}
                    matrikkeladresse={this.props.midlertidigAdresseNorge.matrikkeladresse as Matrikkeladresse}
                    postnummerKodeverk={this.props.postnummerKodeverk}
                />}
            </>
        );
    }
}

export default MidlertidigAdresseNorge;