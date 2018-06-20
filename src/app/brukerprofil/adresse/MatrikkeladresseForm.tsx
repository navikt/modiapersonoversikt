import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { Matrikkeladresse } from '../../../models/personadresse';
import { Kodeverk } from '../../../models/kodeverk';

interface Props {
    onChange: (matrikkeladresse: Matrikkeladresse) => void;
    matrikkeladresse: Matrikkeladresse;
    postnummerKodeverk: Kodeverk[];
}

export const InputLinje = styled.div`
  display: flex;
`;

function MatrikkeladresseForm(props: Props) {

    function onPostnummerInput(input: string) {
        const postnummer = input.trim();
        if (postnummer.length === 4) {
            const poststed = props.postnummerKodeverk.find((kodeverk) => kodeverk.kodeRef === postnummer);
            if (poststed) {
                props.onChange({...props.matrikkeladresse, poststed: poststed.beskrivelse});
            }
        }
    }

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                defaultValue={props.matrikkeladresse.tilleggsadresse}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.matrikkeladresse, tilleggsadresse: event.target.value})}
            />
            <Input
                bredde={'XXL'}
                label="Områdeadresse"
                defaultValue={props.matrikkeladresse.eiendomsnavn}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.matrikkeladresse, eiendomsnavn: event.target.value})}
            />
            <InputLinje>
                <Input
                    bredde={'S'}
                    label="Postnummer"
                    defaultValue={props.matrikkeladresse.postnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        props.onChange({...props.matrikkeladresse, postnummer: event.target.value});
                        onPostnummerInput(event.target.value);
                    }
                    }
                />
                <div style={{flex: 4, marginLeft: 15}} >
                    <Input
                        bredde={'XXL'}
                        label="Poststed"
                        disabled={true}
                        value={props.matrikkeladresse.poststed}
                    />
                </div>
            </InputLinje>
        </>
    );
}

export default MatrikkeladresseForm;