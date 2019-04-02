import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Ingress from 'nav-frontend-typografi/lib/ingress';
import Input from 'nav-frontend-skjema/lib/input';

import { KodeverkResponse } from '../../../models/kodeverk';
import { TelefonInput as TelefonInputState } from './KontaktinformasjonForm';
import { Telefon } from '../../../models/person/NAVKontaktinformasjon';
import EtikettGrå from '../../../components/EtikettGrå';
import { formaterDato } from '../../../utils/stringFormatting';
import { endretAvTekst } from '../../../utils/endretAvUtil';
import { Retningsnummer } from './RetningsnummerInput';
import { ignoreEnter } from '../utils/formUtils';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';

const TelefonnummerWrapper = styled.div`
    flex: auto;
`;

const TelefonInputWrapper = styled.div`
    display: flex;
`;

interface TelefonInputProps {
    children: string;
    retningsnummerKodeverk: KodeverkResponse;
    inputValue: TelefonInputState;
    valideringsresultat: ValideringsResultat<TelefonInputState>;
    retningsnummerInputChange: (input: string) => void;
    telfonnummerInputChange: (input: string) => void;
}

export function TelefonMetadata(props: { telefon: Telefon | undefined }) {
    if (!props.telefon) {
        return null;
    }

    const formatertDato = formaterDato(props.telefon.sistEndret);
    const endretAv = endretAvTekst(props.telefon.sistEndretAv);
    return (
        <EtikettGrå>
            Endret {formatertDato} {endretAv}
        </EtikettGrå>
    );
}

export function TelefonInput(props: TelefonInputProps) {
    return (
        <>
            <Ingress>{props.children}</Ingress>
            <TelefonInputWrapper>
                <Retningsnummer
                    retningsnummerKodeverk={props.retningsnummerKodeverk}
                    retningsnummer={props.inputValue.retningsnummer}
                    valideringsresultat={props.valideringsresultat}
                    onChange={props.retningsnummerInputChange}
                />
                <TelefonnummerWrapper>
                    <Input
                        bredde={'XXL'}
                        label="Telefonnummer"
                        value={props.inputValue.identifikator}
                        feil={props.valideringsresultat.felter.identifikator.skjemafeil}
                        onKeyPress={ignoreEnter}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.telfonnummerInputChange(event.target.value)
                        }
                    />
                </TelefonnummerWrapper>
            </TelefonInputWrapper>
        </>
    );
}
