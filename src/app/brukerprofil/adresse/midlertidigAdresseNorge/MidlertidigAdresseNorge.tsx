import * as React from 'react';
import { ChangeEvent } from 'react';

import Select from 'nav-frontend-skjema/lib/select';

import { Gateadresse, Matrikkeladresse, Postboksadresse } from '../../../../models/personadresse';
import GateadresseForm from './gateadresse/GateadresseForm';
import MatrikkeladresseForm from './matrikkeladresse/MatrikkeladresseForm';
import PostboksadresseForm from './PostboksadresseForm';
import { ValideringsResultat } from '../../../../utils/forms/FormValidator';
import { formaterTilISO8601Date } from '../../../../utils/dateUtils';
import { getValidGateadresseForm } from './gateadresse/gateadresseValidator';
import { getValidMatrikkeladresseForm } from './matrikkeladresse/matrikkeladresseValidator';

export enum MidlertidigeAdresserNorgeInputValg {
    GATEADRESSE, MATRIKKELADRESSE, POSTBOKSADRESSE
}

export interface MidlertidigeAdresserNorgeInput {
    gateadresse: {
        input: Gateadresse;
        validering: ValideringsResultat<Gateadresse>;
    };
    matrikkeladresse: {
        input: Matrikkeladresse;
        validering: ValideringsResultat<Matrikkeladresse>;
    };
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

export function getGateadresseInput(gateadresse?: Gateadresse) {
    let gateadresseInput = {} as Gateadresse;
    if (!gateadresse) {
        gateadresseInput = {
            gatenavn: '',
            poststed: '',
            postnummer: '',
            periode: {
                fra: formaterTilISO8601Date(new Date()),
                til: formaterTilISO8601Date(new Date())
            }
        };
    } else {
        gateadresseInput = gateadresse;
    }

    return {
        input: gateadresseInput,
        validering: getValidGateadresseForm(gateadresseInput)
    };
}

export function getMatrikkeladresseInput(matrikkeladresse?: Matrikkeladresse) {
    let adresseInput = {} as Matrikkeladresse;

    if (!matrikkeladresse) {
        adresseInput = {
            poststed: '',
            postnummer: ''
        };
    } else {
        adresseInput = matrikkeladresse;
    }
    return {
        input: adresseInput,
        validering: getValidMatrikkeladresseForm(adresseInput)
    };
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
        this.props.onChange({
            ...this.props.midlertidigAdresseNorge,
            gateadresse: {
                input: gateadresse,
                validering: getValidGateadresseForm(gateadresse)
            }
        });
    }

    onMatrikkeladresseInputChange(matrikkeladresse: Matrikkeladresse) {
        this.props.onChange({
            ...this.props.midlertidigAdresseNorge,
            matrikkeladresse: {
                input: matrikkeladresse,
                validering: getValidMatrikkeladresseForm(matrikkeladresse)
            }
        });
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
                    gateadresse={gateadresse.input}
                    validering={this.props.midlertidigAdresseNorge.gateadresse.validering}
                />}
                {valg === MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE && <MatrikkeladresseForm
                    onChange={(matrikkeladresseInput: Matrikkeladresse) =>
                        this.onMatrikkeladresseInputChange(matrikkeladresseInput)}
                    matrikkeladresse={matrikkeladresse.input}
                    validering={matrikkeladresse.validering}
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