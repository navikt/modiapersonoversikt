import * as React from 'react';
import { FormEvent } from 'react';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';

import { Person } from '../../../models/person/person';
import { Gateadresse, Matrikkeladresse, Personadresse, Postboksadresse } from '../../../models/personadresse';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { STATUS } from '../../../redux/utils';
import { RestReducer } from '../../../redux/reducer';
import MidlertidigAdresseNorge, {
    getInitialGateadresseInput,
    getInitialMatrikkeladresseInput,
    getInitialPostboksadresse,
    MidlertidigeAdresserNorgeInput,
    MidlertidigeAdresserNorgeInputValg
} from './midlertidigAdresseNorge/MidlertidigAdresseNorge';
import FolkeregistrertAdresse from './FolkeregistrertAdresse';
import { AdresseValg } from './AdresseValg';
import { validerGateadresse } from './midlertidigAdresseNorge/gateadresse/gateadresseValidator';
import { validerMatrikkeladresse } from './midlertidigAdresseNorge/matrikkeladresse/matrikkeladresseValidator';
import { validerPostboksadresse } from './midlertidigAdresseNorge/postboksadresse/postboksadresseValidator';
import SubmitFeedback from './common/SubmitFeedback';

interface Props {
    person: Person;
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) => void;
    endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) => void;
    endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) => void;
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
        this.updateMidlertidigAdresseNorgeInputState = this.updateMidlertidigAdresseNorgeInputState.bind(this);
        this.onFormChanged = this.onFormChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAvbryt = this.onAvbryt.bind(this);

        this.state = this.initialState(props);
    }

    initialState(props: Props): State {
        const alternativAdresse = props.person.alternativAdresse ? props.person.alternativAdresse : {};
        return {
            midlertidigAdresseNorge: this.intialMidlertidigAdresseNorgeInput(alternativAdresse),
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

    intialMidlertidigAdresseNorgeInput(alternativAdresse: Personadresse): MidlertidigeAdresserNorgeInput {
        return {
            gateadresse: getInitialGateadresseInput(alternativAdresse.gateadresse),
            matrikkeladresse: getInitialMatrikkeladresseInput(alternativAdresse.matrikkeladresse),
            postboksadresse: getInitialPostboksadresse(alternativAdresse.postboksadresse),
            valg: getInitialAdresseTypeValg(alternativAdresse)
        };
    }

    updateMidlertidigAdresseNorgeInputState(adresse: Partial<MidlertidigeAdresserNorgeInput>) {
        this.setState({
            midlertidigAdresseNorge: {
                ...this.state.midlertidigAdresseNorge,
                ...adresse
            }
        });
    }

    onFormChanged(adresse: Partial<MidlertidigeAdresserNorgeInput>) {
        this.updateMidlertidigAdresseNorgeInputState(adresse);
        this.setState({formErEndret: true});
    }

    onAdresseValgChange(valg: Valg) {
        this.setState({selectedRadio: valg});
    }

    onAvbryt(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.initialState(this.props));
        event.preventDefault();
    }

    onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE) {
            this.setState({formErEndret: false});
            this.submitMidlertidigNorskAdresse(this.state.midlertidigAdresseNorge);
        } else {
            console.error('Not implemented');
        }
    }

    submitMidlertidigNorskAdresse(input: MidlertidigeAdresserNorgeInput) {
        if (input.valg === MidlertidigeAdresserNorgeInputValg.GATEADRESSE) {
            this.submitGateadresse(input.gateadresse.value);
        } else if (input.valg === MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE) {
            this.submitMatrikkeladresse(input.matrikkeladresse.value);
        } else if (input.valg === MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE) {
            this.submitPostboksadresse(input.postboksadresse.value);
        } else {
            console.error('Not implemented');
        }
    }

    submitGateadresse(gateadresse: Gateadresse) {
        const validering = validerGateadresse(gateadresse);
        if (!validering.formErGyldig) {
            this.updateMidlertidigAdresseNorgeInputState({
                gateadresse: {
                    value: gateadresse,
                    validering
                }
            });
            return;
        }

        this.props.endreNorskGateadresse(this.props.person.fødselsnummer, gateadresse);
    }

    submitMatrikkeladresse(matrikkeladresse: Matrikkeladresse) {
        const validering = validerMatrikkeladresse(matrikkeladresse);
        if (!validering.formErGyldig) {
            this.updateMidlertidigAdresseNorgeInputState({
                matrikkeladresse: {
                    value: matrikkeladresse,
                    validering
                }
            });
            return;
        }

        this.props.endreMatrikkeladresse(this.props.person.fødselsnummer, matrikkeladresse);
    }

    submitPostboksadresse(postboksadresse: Postboksadresse) {
        const validering = validerPostboksadresse(postboksadresse);
        if (!validering.formErGyldig) {
            this.updateMidlertidigAdresseNorgeInputState({
                postboksadresse: {
                    value: postboksadresse,
                    validering
                }
            });
            return;
        }
        this.props.endrePostboksadresse(this.props.person.fødselsnummer, postboksadresse);
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
                        onChange={this.onFormChanged}
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
                <SubmitFeedback visFeedback={!this.state.formErEndret} status={this.props.endreAdresseReducer.status}/>
            </form>
        );
    }

}

export default AdresseForm;
