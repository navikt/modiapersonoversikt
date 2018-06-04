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

class MidlertidigAdresseNorge extends React.Component<MidlertidigAdresseNorgeProps> {

    constructor(props: MidlertidigAdresseNorgeProps) {
        super(props);
    }

    render() {
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
                    onChange={this.props.onChange}
                    gateadresse={this.props.midlertidigAdresseNorge.gateadresse as Gateadresse}
                    postnummerKodeverk={this.props.postnummerKodeverk}
                />
            </>
        );
    }

}

interface OwnProps {
    person: Person;
    postnummer: KodeverkResponse;
}

interface State {
    midlertidigAdresseNorge: Personadresse;
}

type Props = OwnProps;

class AdresseForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            midlertidigAdresseNorge: this.intialMidlertidigAdresseNorge(props.person.alternativAdresse)
        };

        this.onGateadresseInput = this.onGateadresseInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.erEndret = this.erEndret.bind(this);
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
        console.log(this.state);
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
            console.log(this.props.person.alternativAdresse.gateadresse);
            console.log(this.state.midlertidigAdresseNorge.gateadresse);
            return JSON.stringify(this.state.midlertidigAdresseNorge.gateadresse) ===
                JSON.stringify(this.props.person.alternativAdresse.gateadresse);
        }
        return true;
    }

    render() {
        const {person} = this.props;
        const adresse = person.folkeregistrertAdresse ?
            formatterRiktigAdresse(person.folkeregistrertAdresse)
            : 'Ikke registrert';

        return (
            <form onSubmit={this.onSubmit}>
                <Undertittel>Adresse</Undertittel>
                <Radio label="Bostedsadresse fra folkeregisteret" name="someRadioBtn" />
                {adresse}
                <Radio label="Midlertidig adresse i Norge" name="someRadioBtn" />
                <MidlertidigAdresseNorge
                    midlertidigAdresseNorge={this.state.midlertidigAdresseNorge}
                    onChange={this.onGateadresseInput}
                    postnummerKodeverk={this.props.postnummer.kodeverk}
                />
                <Radio label="Midlertidig adresse i utlandet" name="someRadioBtn" />
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