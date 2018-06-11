import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Ingress from 'nav-frontend-typografi/lib/ingress';
import Input from 'nav-frontend-skjema/lib/input';

import { KodeverkResponse } from '../../../models/kodeverk';
import { TelefonInput } from './KontaktinformasjonForm';
import { Telefon } from '../../../models/person/NAVKontaktinformasjon';
import EtikettMini from '../../../components/EtikettMini';
import { formaterDato } from '../../../utils/dateUtils';
import { endretAvTekst } from '../../../utils/endretAvUtil';
import { Retningsnummer } from './RetningsnummerInput';

const TelefonnummerWrapper = styled.div`
  flex: auto;
`;

const TelefonInputWrapper = styled.div`
  display: flex;
`;

interface TelefonInputProps {
    children: string;
    retningsnummerKodeverk: KodeverkResponse;
    inputValue: TelefonInput;
    retningsnummerInputChange: (input: string) => void;
    telfonnummerInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function TelefonMetadata(props: {telefon: Telefon | undefined}) {
    if (! props.telefon) {
        return null;
    }

    const formatertDato = formaterDato(props.telefon.sistEndret);
    const endretAv = endretAvTekst(props.telefon.sistEndretAv);
    return (
        <EtikettMini>Endret {formatertDato} {endretAv}</EtikettMini>
    );
}

export function TelefonInput(props: TelefonInputProps) {

    return (
        <>
            <Ingress>{props.children}</Ingress>
            <TelefonInputWrapper>
                <Retningsnummer
                    retningsnummerKodeverk={props.retningsnummerKodeverk}
                    state={props.inputValue.retningsnummer}
                    onChange={props.retningsnummerInputChange}
                />
                <TelefonnummerWrapper>
                    <Input
                        bredde={'XXL'}
                        label="Telefonnummer"
                        value={props.inputValue.identifikator.input}
                        onChange={props.telfonnummerInputChange}
                    />
                </TelefonnummerWrapper>
            </TelefonInputWrapper>
        </>
    );
}