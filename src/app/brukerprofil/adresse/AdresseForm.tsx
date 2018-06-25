import * as React from 'react';
import { FormEvent } from 'react';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';

import { Person } from '../../../models/person/person';
import { Gateadresse, Personadresse, Postboksadresse } from '../../../models/personadresse';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { STATUS } from '../../../redux/utils';
import { RestReducer } from '../../../redux/reducer';
import RequestTilbakemelding from '../RequestTilbakemelding';
import MidlertidigAdresseNorge, {
    getOrDefaultGateadresse,
    getOrDefaultMatrikkeladresse,
    MidlertidigeAdresserNorgeInput,
    MidlertidigeAdresserNorgeInputValg
} from './MidlertidigAdresseNorge';
import FolkeregistrertAdresse from './FolkeregistrertAdresse';
import { AdresseValg } from './AdresseValg';
import FormValidator, { Valideringsregel } from './FormValidator';
import { removeWhitespace } from '../../../utils/string-utils';

function Tilbakemelding(props: {formErEndret: boolean, status: STATUS}) {
    if (!props.formErEndret) {
        return null;
    }

    return (
        <RequestTilbakemelding
            status={props.status}
            onSuccess={'Adressen ble endret'}
            onError={'Det skjedde en feil ved endring av adresse'}
        />
    );
}

interface Props {
    person: Person;
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) => void;
    endreAdresseReducer: RestReducer<{}>;
}

export enum Valg {
    FOLKEREGISTRERT, MIDLERTIDIG_NORGE, MIDLERTIDIG_UTLAND
}

interface State {
    midlertidigAdresseNorge: MidlertidigeAdresserNorgeInput;
    selectedRadio: Valg;
    formErEndret: boolean;
}

function erIkkeTomStreng(input: string) {
    return removeWhitespace(input).length !== 0;
}

const rule: Valideringsregel<Gateadresse> = {
    felt: 'gatenavn',
    feilmelding: 'Gatenavn kan ikke være tom',
    validator: (gateadresse: Gateadresse) => erIkkeTomStreng(gateadresse.gatenavn)
};

function getInitialAdresseTypeValg(alternativAdresse: Personadresse) {
    if (alternativAdresse.gateadresse) {
        return MidlertidigeAdresserNorgeInputValg.GATEADRESSE;
    } else if (alternativAdresse.matrikkeladresse) {
        return MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE;
    } else if (alternativAdresse.postboksadresse) {
        return MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE;
    } else {
        return MidlertidigeAdresserNorgeInputValg.GATEADRESSE;
    }
}

class AdresseForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.initialState = this.initialState.bind(this);
        this.onAdresseValgChange = this.onAdresseValgChange.bind(this);
        this.onMidlertidigAdresseNorgeInput = this.onMidlertidigAdresseNorgeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAvbryt = this.onAvbryt.bind(this);

        this.state = this.initialState(props);
    }

    initialState(props: Props) {
        return {
            midlertidigAdresseNorge: this.intialMidlertidigAdresseNorge(props.person.alternativAdresse),
            selectedRadio: this.initialRadioValg(),
            formErEndret: false
        };
    }

    initialRadioValg() {
        const {alternativAdresse} = this.props.person;

        if (alternativAdresse && alternativAdresse.utlandsadresse) {
            return Valg.MIDLERTIDIG_UTLAND;
        } else if (alternativAdresse) {
            return Valg.MIDLERTIDIG_NORGE;
        } else {
            return Valg.FOLKEREGISTRERT;
        }
    }

    intialMidlertidigAdresseNorge(alternativAdresse: Personadresse | undefined) {
        if (!alternativAdresse) {
            return {
                gateadresse: getOrDefaultGateadresse(undefined),
                matrikkeladresse: getOrDefaultMatrikkeladresse(undefined),
                postboksadresse: this.initialPostboksadresse(undefined),
                valg: MidlertidigeAdresserNorgeInputValg.GATEADRESSE
            };
        }
        return {
            gateadresse: getOrDefaultGateadresse(alternativAdresse.gateadresse),
            matrikkeladresse: getOrDefaultMatrikkeladresse(alternativAdresse.matrikkeladresse),
            postboksadresse: this.initialPostboksadresse(alternativAdresse.postboksadresse),
            valg: getInitialAdresseTypeValg(alternativAdresse)
        };
    }

    initialPostboksadresse(postboksadresse: Postboksadresse | undefined): Postboksadresse {
        if (!postboksadresse) {
            return {
                postboksnummer: '',
                poststed: '',
                postnummer: ''
            };
        }
        return postboksadresse;
    }

    onMidlertidigAdresseNorgeInput(adresser: MidlertidigeAdresserNorgeInput) {
        this.setState({
            midlertidigAdresseNorge: {
                ...adresser,
                gateadresseValidering: undefined
            },
            formErEndret: true
        });
    }

    onAdresseValgChange(valg: Valg) {
        this.setState({selectedRadio: valg});
    }

    onAvbryt(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.initialState(this.props));
        event.preventDefault();
    }

    onSubmit(event: FormEvent<HTMLFormElement>) {
        if (this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE) {
            this.submitMidlertidigNorskAdresse(this.state.midlertidigAdresseNorge);
        } else {
            console.error('Not implemented');
        }
        event.preventDefault();
    }

    submitMidlertidigNorskAdresse(input: MidlertidigeAdresserNorgeInput) {
        if (input.valg === MidlertidigeAdresserNorgeInputValg.GATEADRESSE) {
            this.submitGateadresse(input);
        } else {
            console.error('Not implemented');
        }
    }

    submitGateadresse(input: MidlertidigeAdresserNorgeInput) {
        const valideringsresultat = new FormValidator<Gateadresse>([rule]).valider(input.gateadresse);
        if (!valideringsresultat.formErGyldig) {
            this.setState({
                midlertidigAdresseNorge: {
                    ...this.state.midlertidigAdresseNorge,
                    gateadresseValidering: valideringsresultat
                }
            });
            return;
        }

        this.props.endreNorskGateadresse(this.props.person.fødselsnummer, input.gateadresse);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Undertittel>Adresse</Undertittel>
                <AdresseValg
                    label={'Bostedsadresse fra folkeregisteret'}
                    onAdresseValgChange={this.onAdresseValgChange}
                    checked={this.state.selectedRadio === Valg.FOLKEREGISTRERT}
                    valg={Valg.FOLKEREGISTRERT}
                />
                <FolkeregistrertAdresse person={this.props.person}/>
                <AdresseValg
                    label={'Midlertidig adresse i Norge'}
                    onAdresseValgChange={this.onAdresseValgChange}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE}
                    valg={Valg.MIDLERTIDIG_NORGE}
                >
                    <MidlertidigAdresseNorge
                        midlertidigAdresseNorge={this.state.midlertidigAdresseNorge}
                        onChange={this.onMidlertidigAdresseNorgeInput}
                    />
                </AdresseValg>
                <AdresseValg
                    label="Midlertidig adresse i utlandet"
                    valg={Valg.MIDLERTIDIG_UTLAND}
                    onAdresseValgChange={this.onAdresseValgChange}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_UTLAND}
                >
                    <span>Utenlandsk adresseform</span>
                </AdresseValg>
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        onClick={this.onAvbryt}
                        disabled={!this.state.formErEndret}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        spinner={this.props.endreAdresseReducer.status === STATUS.PENDING}
                        autoDisableVedSpinner={true}
                        disabled={!this.state.formErEndret}
                    >
                        Endre adresse
                    </KnappBase>
                </FormKnapperWrapper>
                <Tilbakemelding formErEndret={this.state.formErEndret} status={this.props.endreAdresseReducer.status}/>
            </form>
        );
    }

}

export default AdresseForm;
