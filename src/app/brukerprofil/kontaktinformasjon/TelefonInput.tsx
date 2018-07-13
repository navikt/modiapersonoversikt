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
import { getSkjemafeil, ignoreEnter } from '../utils/formUtils';

const TelefonnummerWrapper = styled.div`
  flex: auto;
`;

const TelefonInputWrapper = styled.div`
  display: flex;
`;

interface TelefonInputProps {
    id: string;
    children: string;
    retningsnummerKodeverk: KodeverkResponse;
    inputValue: TelefonInput;
    retningsnummerInputChange: (input: string) => void;
    telfonnummerInputChange: (input: string) => void;
    visFeilmeldinger: boolean;
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

    const skjemafeil = props.visFeilmeldinger ? getSkjemafeil(props.inputValue.identifikator) : undefined;

    return (
        <>
            <Ingress>{props.children}</Ingress>
            <TelefonInputWrapper>
                <Retningsnummer
                    id={'Retningsnummer ' + props.id}
                    retningsnummerKodeverk={props.retningsnummerKodeverk}
                    state={props.inputValue.retningsnummer}
                    onChange={props.retningsnummerInputChange}
                    visFeilmeldinger={props.visFeilmeldinger}
                />
                <TelefonnummerWrapper>
                    <Input
                        id={props.id}
                        bredde={'XXL'}
                        label="Telefonnummer"
                        value={props.inputValue.identifikator.input}
                        feil={skjemafeil}
                        onKeyPress={ignoreEnter}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.telfonnummerInputChange(event.target.value)}
                    />
                </TelefonnummerWrapper>
            </TelefonInputWrapper>
        </>
    );
}