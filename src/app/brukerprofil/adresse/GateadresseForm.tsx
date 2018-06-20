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

function GateadresseForm(props: GateadresseFormProps) {

    function onPostnummerInput(input: string) {
        const postnummer = input.trim();
        if (postnummer.length === 4) {
            const poststed = props.postnummerKodeverk.find((kodeverk) => kodeverk.kodeRef === postnummer);
            if (poststed) {
                props.onChange({...props.gateadresse, poststed: poststed.beskrivelse});
            }
        }
    }

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                defaultValue={props.gateadresse.tilleggsadresse}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.gateadresse, tilleggsadresse: event.target.value})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}} >
                    <Input
                        bredde={'XXL'}
                        label="Gateadresse"
                        defaultValue={props.gateadresse.gatenavn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.onChange({...props.gateadresse, gatenavn: event.target.value})}
                    />
                </div>
                <Input
                    bredde={'S'}
                    label="Husnummer"
                    defaultValue={props.gateadresse.husnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...props.gateadresse, husnummer: event.target.value})}
                />
                <Input
                    bredde={'S'}
                    label="Husbokstav"
                    defaultValue={props.gateadresse.husbokstav}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...props.gateadresse, husbokstav: event.target.value})}
                />
                <Input
                    bredde={'S'}
                    label="Bolignummer"
                    defaultValue={props.gateadresse.bolignummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...props.gateadresse, bolignummer: event.target.value})}
                />
            </InputLinje>
            <InputLinje>
                <Input
                    bredde={'S'}
                    label="Postnummer"
                    defaultValue={props.gateadresse.postnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        props.onChange({...props.gateadresse, postnummer: event.target.value});
                        onPostnummerInput(event.target.value);
                    }
                    }
                />
                <div style={{flex: 4, marginLeft: 15}} >
                    <Input
                        bredde={'XXL'}
                        label="Poststed"
                        disabled={true}
                        value={props.gateadresse.poststed}
                    />
                </div>
            </InputLinje>
        </>
    );
}

export default GateadresseForm;