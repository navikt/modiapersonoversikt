import * as React from 'react';
import { ChangeEvent } from 'react';

import Select from 'nav-frontend-skjema/lib/select';
import GateadresseForm, { GateadresseSkjemainput } from './GateadresseForm';
import MatrikkeladresseForm, { MatrikkeladresseSkjemainput } from './MatrikkeladresseForm';

export enum MidlertidigeAdresserNorgeInputValg {
    GATEADRESSE, MATRIKKELADRESSE
}

export interface MidlertidigeAdresserNorgeInput {
    gateadresse: GateadresseSkjemainput;
    matrikkeladresse: MatrikkeladresseSkjemainput;
    valg: MidlertidigeAdresserNorgeInputValg;
}

interface Props {
    onChange: (adresser: MidlertidigeAdresserNorgeInput) => void;
    midlertidigAdresseNorge: MidlertidigeAdresserNorgeInput;
}

function getValgtAdressetype(value: string): MidlertidigeAdresserNorgeInputValg {
    switch (value) {
        case MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE.toString():
            return MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE;
        case MidlertidigeAdresserNorgeInputValg.GATEADRESSE.toString():
            return MidlertidigeAdresserNorgeInputValg.GATEADRESSE;
        default:
            return MidlertidigeAdresserNorgeInputValg.GATEADRESSE;
    }
}

class MidlertidigAdresseNorge extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.onAdresseTypeChange = this.onAdresseTypeChange.bind(this);
        this.onGateadresseInputChange = this.onGateadresseInputChange.bind(this);
        this.onMatrikkeladresseInputChange = this.onMatrikkeladresseInputChange.bind(this);
    }

    onAdresseTypeChange(event: ChangeEvent<HTMLSelectElement>) {
        const valg = getValgtAdressetype(event.target.value);
        this.props.onChange({
            ...this.props.midlertidigAdresseNorge,
            valg
        });
    }

    onGateadresseInputChange(partial: Partial<GateadresseSkjemainput> ) {
        this.props.onChange({
            ...this.props.midlertidigAdresseNorge,
            gateadresse: {
                ...this.props.midlertidigAdresseNorge.gateadresse,
                ...partial
            }
        });
    }

    onMatrikkeladresseInputChange(partial: Partial<MatrikkeladresseSkjemainput> ) {
        this.props.onChange({
            ...this.props.midlertidigAdresseNorge,
            matrikkeladresse: {
                ...this.props.midlertidigAdresseNorge.matrikkeladresse,
                ...partial
            }
        });
    }

    render() {

        const {valg, gateadresse, matrikkeladresse} = this.props.midlertidigAdresseNorge;

        return (
            <>
                <Select
                    label="Landkode"
                    bredde={'m'}
                    defaultValue={valg.toString()}
                    onChange={this.onAdresseTypeChange}
                >
                    <option
                        key={MidlertidigeAdresserNorgeInputValg.GATEADRESSE}
                        value={MidlertidigeAdresserNorgeInputValg.GATEADRESSE}
                    >
                        Gateadresse
                    </option>
                    <option
                        key={MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE}
                        value={MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE}
                    >
                        Områdeadresse (uten veinavn)
                    </option>
                </Select>
                {valg === MidlertidigeAdresserNorgeInputValg.GATEADRESSE &&
                <GateadresseForm
                    onChange={this.onGateadresseInputChange}
                    gateadresse={gateadresse}
                />}
                {valg === MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE &&
                <MatrikkeladresseForm
                    onChange={this.onMatrikkeladresseInputChange}
                    matrikkeladresse={matrikkeladresse}
                />}
            </>
        );
    }
}

export default MidlertidigAdresseNorge;