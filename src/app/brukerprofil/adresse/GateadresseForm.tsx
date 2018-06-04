import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { Gateadresse } from '../../../models/personadresse';
import { Kodeverk } from '../../../models/kodeverk';

interface GateadresseFormProps {
    onChange: (gateadresse: Gateadresse) => void;
    gateadresse: Gateadresse;
    postnummerKodeverk: Kodeverk[];
}

export const InputLinje = styled.div`
  display: flex;
`;

class GateadresseForm extends React.Component<GateadresseFormProps> {

    constructor(props: GateadresseFormProps) {
        super(props);
        this.onPostnummerInput = this.onPostnummerInput.bind(this);
    }

    onPostnummerInput(input: string) {
        let postnummer = input.trim();
        if (postnummer.length === 4) {
            const poststed = this.props.postnummerKodeverk.find((kodeverk) => kodeverk.kodeRef === postnummer);
            if (poststed) {
                this.props.onChange({...this.props.gateadresse, poststed: poststed.value});
            }
        }
    }

    render () {
        return (
            <>
                <Input
                    bredde={'XXL'}
                    label="Merkes med C/O"
                    defaultValue={this.props.gateadresse.tilleggsadresse}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        this.props.onChange({...this.props.gateadresse, tilleggsadresse: event.target.value})}
                />
                <InputLinje>
                    <div style={{flex: 4, marginRight: 15}} >
                        <Input
                            bredde={'XXL'}
                            label="Gateadresse"
                            defaultValue={this.props.gateadresse.gatenavn}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                this.props.onChange({...this.props.gateadresse, gatenavn: event.target.value})}
                        />
                    </div>
                    <Input
                        bredde={'S'}
                        label="Husnummer"
                        defaultValue={this.props.gateadresse.husnummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            this.props.onChange({...this.props.gateadresse, husnummer: event.target.value})}
                    />
                    <Input
                        bredde={'S'}
                        label="Husbokstav"
                        defaultValue={this.props.gateadresse.husbokstav}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            this.props.onChange({...this.props.gateadresse, husbokstav: event.target.value})}
                    />
                    <Input
                        bredde={'S'}
                        label="Bolignummer"
                        defaultValue={this.props.gateadresse.bolignummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            this.props.onChange({...this.props.gateadresse, bolignummer: event.target.value})}
                    />
                </InputLinje>
                <InputLinje>
                    <Input
                        bredde={'S'}
                        label="Postnummer"
                        defaultValue={this.props.gateadresse.postnummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            this.props.onChange({...this.props.gateadresse, postnummer: event.target.value});
                            this.onPostnummerInput(event.target.value);
                        }
                        }
                    />
                    <div style={{flex: 4, marginLeft: 15}} >
                        <Input
                            bredde={'XXL'}
                            label="Poststed"
                            disabled={true}
                            value={this.props.gateadresse.poststed}
                        />
                    </div>
                </InputLinje>
            </>
        );
    }
}

export default GateadresseForm;