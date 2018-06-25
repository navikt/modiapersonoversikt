import * as React from 'react';
import { ChangeEvent } from 'react';

import Select from 'nav-frontend-skjema/lib/select';

import { Gateadresse, Matrikkeladresse, Postboksadresse } from '../../../models/personadresse';
import GateadresseForm from './GateadresseForm';
import MatrikkeladresseForm from './MatrikkeladresseForm';
import PostboksadresseForm from './PostboksadresseForm';
import { ValideringsResultat } from './FormValidator';

export enum MidlertidigeAdresserNorgeInputValg {
    GATEADRESSE, MATRIKKELADRESSE, POSTBOKSADRESSE
}

export interface MidlertidigeAdresserNorgeInput {
    gateadresse: Gateadresse;
    gateadresseValidering?: ValideringsResultat<Gateadresse>;
    matrikkeladresse: Matrikkeladresse;
    postboksadresse: Postboksadresse;
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
        case MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE.toString():
            return MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE;
        default:
            return MidlertidigeAdresserNorgeInputValg.GATEADRESSE;
    }
}

export function getOrDefaultGateadresse(gateadresse?: Gateadresse): Gateadresse {
    if (!gateadresse) {
        return {
            gatenavn: '',
            poststed: '',
            postnummer: ''
        };
    }
    return gateadresse;
}

export function getOrDefaultMatrikkeladresse(matrikkeladresse?: Matrikkeladresse): Matrikkeladresse {
    if (!matrikkeladresse) {
        return {
            poststed: '',
            postnummer: ''
        };
    }
    return matrikkeladresse;
}

class MidlertidigAdresseNorge extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.onAdresseTypeChange = this.onAdresseTypeChange.bind(this);
    }

    onAdresseTypeChange(event: ChangeEvent<HTMLSelectElement>) {
        const valg = getValgtAdressetype(event.target.value);
        this.props.onChange({
            ...this.props.midlertidigAdresseNorge,
            valg
        });
    }

    onGateadresseInputChange(gateadresse: Gateadresse ) {
        this.props.onChange({...this.props.midlertidigAdresseNorge, gateadresse});
    }

    onMatrikkeladresseInputChange(matrikkeladresse: Matrikkeladresse) {
        this.props.onChange({...this.props.midlertidigAdresseNorge, matrikkeladresse});
    }

    onPostboksadresseInputChange(postboksadresse: Postboksadresse) {
        this.props.onChange({...this.props.midlertidigAdresseNorge, postboksadresse});
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
                    <option
                        key={MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE}
                        value={MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE}
                    >
                        Postboksadresse
                    </option>
                </Select>
                {valg === MidlertidigeAdresserNorgeInputValg.GATEADRESSE && <GateadresseForm
                    onChange={(gateadresseInput: Gateadresse) => this.onGateadresseInputChange(gateadresseInput)}
                    gateadresse={gateadresse}
                    validering={this.props.midlertidigAdresseNorge.gateadresseValidering}
                />}
                {valg === MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE && <MatrikkeladresseForm
                    onChange={(matrikkeladresseInput: Matrikkeladresse) =>
                        this.onMatrikkeladresseInputChange(matrikkeladresseInput)}
                    matrikkeladresse={getOrDefaultMatrikkeladresse(matrikkeladresse)}
                />}
                {valg === MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE && <PostboksadresseForm
                    onChange={(postboksadresse: Postboksadresse) =>
                        this.onPostboksadresseInputChange(postboksadresse)}
                    postboksadresse={this.props.midlertidigAdresseNorge.postboksadresse}
                />}
            </>
        );
    }
}

export default MidlertidigAdresseNorge;