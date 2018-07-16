import * as React from 'react';
import { ChangeEvent } from 'react';

import Select from 'nav-frontend-skjema/lib/select';

import { Gateadresse, Matrikkeladresse, Postboksadresse } from '../../../../models/personadresse';
import GateadresseForm from './gateadresse/GateadresseForm';
import MatrikkeladresseForm from './matrikkeladresse/MatrikkeladresseForm';
import PostboksadresseForm from './postboksadresse/PostboksadresseForm';
import { ValideringsResultat } from '../../../../utils/forms/FormValidator';
import { getValidGateadresseForm } from './gateadresse/gateadresseValidator';
import { getValidMatrikkeladresseForm } from './matrikkeladresse/matrikkeladresseValidator';
import { getValidPostboksadresseForm } from './postboksadresse/postboksadresseValidator';

export enum MidlertidigeAdresserNorgeInputValg {
    GATEADRESSE, MATRIKKELADRESSE, POSTBOKSADRESSE
}

export interface AdresseFormInput<T> {
    value: T;
    validering: ValideringsResultat<T>;
}

export interface MidlertidigeAdresserNorgeInput {
    gateadresse: AdresseFormInput<Gateadresse>;
    matrikkeladresse: AdresseFormInput<Matrikkeladresse>;
    postboksadresse: AdresseFormInput<Postboksadresse>;
    valg: MidlertidigeAdresserNorgeInputValg;
}

interface Props {
    onChange: (adresse: Partial<MidlertidigeAdresserNorgeInput>) => void;
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

export function getInitialGateadresseInput(gateadresse?: Gateadresse) {
    let gateadresseInput = {} as Gateadresse;
    if (!gateadresse) {
        gateadresseInput = {
            gatenavn: '',
            husnummer: '',
            poststed: '',
            postnummer: '',
            periode: undefined
        };
    } else {
        gateadresseInput = gateadresse;
    }

    return {
        value: gateadresseInput,
        validering: getValidGateadresseForm(gateadresseInput)
    };
}

export function getInitialMatrikkeladresseInput(matrikkeladresse?: Matrikkeladresse) {
    let adresseInput = {} as Matrikkeladresse;

    if (!matrikkeladresse) {
        adresseInput = {
            poststed: '',
            postnummer: '',
            periode: undefined
        };
    } else {
        adresseInput = matrikkeladresse;
    }
    return {
        value: adresseInput,
        validering: getValidMatrikkeladresseForm(adresseInput)
    };
}

export function getInitialPostboksadresse(postboksadresse?: Postboksadresse) {
    let postboksadresseInput = {} as Postboksadresse;
    if (!postboksadresse) {
        postboksadresseInput = {
            postboksnummer: '',
            poststed: '',
            postnummer: ''
        };
    } else {
        postboksadresseInput = postboksadresse;
    }
    return {
        value: postboksadresseInput,
        validering: getValidPostboksadresseForm(postboksadresseInput)
    };
}

class MidlertidigAdresseNorge extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.onAdresseTypeChange = this.onAdresseTypeChange.bind(this);
    }

    onAdresseTypeChange(event: ChangeEvent<HTMLSelectElement>) {
        const valg = getValgtAdressetype(event.target.value);
        this.props.onChange({valg});
    }

    onGateadresseInputChange(gateadresse: Gateadresse ) {
        this.props.onChange({
            gateadresse: {
                value: gateadresse,
                validering: getValidGateadresseForm(gateadresse)
            }
        });
    }

    onMatrikkeladresseInputChange(matrikkeladresse: Matrikkeladresse) {
        this.props.onChange({
            matrikkeladresse: {
                value: matrikkeladresse,
                validering: getValidMatrikkeladresseForm(matrikkeladresse)
            }
        });
    }

    onPostboksadresseInputChange(postboksadresse: Postboksadresse) {
        this.props.onChange({
            postboksadresse : {
                value: postboksadresse,
                validering: getValidPostboksadresseForm(postboksadresse)
            }
        });
    }

    render() {

        const {valg, gateadresse, matrikkeladresse} = this.props.midlertidigAdresseNorge;

        return (
            <>
                <Select
                    label="Adressetype"
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
                {valg === MidlertidigeAdresserNorgeInputValg.GATEADRESSE &&
                <GateadresseForm
                    onChange={(gateadresseInput: Gateadresse) => this.onGateadresseInputChange(gateadresseInput)}
                    input={gateadresse}
                />}
                {valg === MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE &&
                <MatrikkeladresseForm
                    onChange={(matrikkeladresseInput: Matrikkeladresse) =>
                        this.onMatrikkeladresseInputChange(matrikkeladresseInput)}
                    matrikkeladresse={matrikkeladresse.value}
                    validering={matrikkeladresse.validering}
                />}
                {valg === MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE && <PostboksadresseForm
                    onChange={(postboksadresse: Postboksadresse) =>
                        this.onPostboksadresseInputChange(postboksadresse)}
                    input={this.props.midlertidigAdresseNorge.postboksadresse}
                />}
            </>
        );
    }
}

export default MidlertidigAdresseNorge;