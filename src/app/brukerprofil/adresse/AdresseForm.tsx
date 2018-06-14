import * as React from 'react';
import { FormEvent } from 'react';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Select from 'nav-frontend-skjema/lib/select';
import Radio from 'nav-frontend-skjema/lib/radio';
import KnappBase from 'nav-frontend-knapper';

import { Person } from '../../../models/person/person';
import { Kodeverk, KodeverkResponse } from '../../../models/kodeverk';
import { Gateadresse, Personadresse } from '../../../models/personadresse';
import { formatterRiktigAdresse } from '../../personside/visittkort/body/kontaktinformasjon/adresse/Adresse';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import GateadresseForm from './GateadresseForm';

interface MidlertidigAdresseNorgeProps {
    onChange: (gateadresse: Gateadresse) => void;
    midlertidigAdresseNorge: Personadresse;
    postnummerKodeverk: Kodeverk[];
}

function MidlertidigAdresseNorge(props: MidlertidigAdresseNorgeProps) {

    const options = [<option key={'Gateadresse'}>Gateadresse</option>,
        <option key={'Matrikkeladresse'}>Matrikkeladresse</option>];
    return (
        <>
            <Select
                label="Landkode"
                bredde={'m'}
                defaultValue={'Gateadresse'}
            >
                {options}
            </Select>
            <GateadresseForm
                onChange={props.onChange}
                gateadresse={props.midlertidigAdresseNorge.gateadresse as Gateadresse}
                postnummerKodeverk={props.postnummerKodeverk}
            />
        </>
    );
}

interface Props {
    person: Person;
    postnummer: KodeverkResponse;
}

enum Valg {
    FOLKEREGISTRERT, MIDLERTIDIG_NORGE, MIDLERTIDIG_UTLAND
}

interface State {
    midlertidigAdresseNorge: Personadresse;
    selectedRadio: Valg;
}

class AdresseForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            midlertidigAdresseNorge: this.intialMidlertidigAdresseNorge(props.person.alternativAdresse),
            selectedRadio: this.initialRadioValg()
        };

        this.onGateadresseInput = this.onGateadresseInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.erEndret = this.erEndret.bind(this);
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
                gateadresse: this.initialGateadresse(undefined)
            };
        }
        return {
            gateadresse: this.initialGateadresse(alternativAdresse.gateadresse)
        };
    }

    initialGateadresse(gateadresse: Gateadresse | undefined) {
        if (!gateadresse) {
            return {
                gatenavn: '',
                poststed: '',
                postnummer: ''
            };
        }

        return gateadresse;
    }

    onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    onGateadresseInput(gateadresse: Gateadresse) {
        this.setState({
            midlertidigAdresseNorge: {
                gateadresse: gateadresse
            }
        });
    }

    erEndret() {
        if (this.props.person.alternativAdresse && this.props.person.alternativAdresse.gateadresse) {
            return JSON.stringify(this.state.midlertidigAdresseNorge.gateadresse) ===
                JSON.stringify(this.props.person.alternativAdresse.gateadresse);
        }
        return false;
    }

    render() {
        const {person} = this.props;
        const adresse = person.folkeregistrertAdresse ?
            formatterRiktigAdresse(person.folkeregistrertAdresse)
            : 'Ikke registrert';

        return (
            <form onSubmit={this.onSubmit}>
                <Undertittel>Adresse</Undertittel>
                <Radio
                    label="Bostedsadresse fra folkeregisteret"
                    name="folkeregistrertRadio"
                    onChange={() => this.setState({selectedRadio: Valg.FOLKEREGISTRERT})}
                    checked={this.state.selectedRadio === Valg.FOLKEREGISTRERT}
                />
                {adresse}
                <Radio
                    label="Midlertidig adresse i Norge"
                    name="midlertidigAdresseRadio"
                    onChange={() => this.setState({selectedRadio: Valg.MIDLERTIDIG_NORGE})}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE}
                />
                {this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE &&
                <MidlertidigAdresseNorge
                    midlertidigAdresseNorge={this.state.midlertidigAdresseNorge}
                    onChange={this.onGateadresseInput}
                    postnummerKodeverk={this.props.postnummer.kodeverk}
                />
                }
                <Radio
                    label="Midlertidig adresse i utlandet"
                    name="midlertidigAdresseUtlandRadio"
                    onChange={() => this.setState({selectedRadio: Valg.MIDLERTIDIG_UTLAND})}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_UTLAND}
                />
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        disabled={this.erEndret()}
                    >
                        Endre adresse
                    </KnappBase>
                </FormKnapperWrapper>
            </form>
        );
    }

}

export default AdresseForm;
