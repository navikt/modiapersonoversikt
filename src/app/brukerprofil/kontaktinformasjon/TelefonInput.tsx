import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Ingress from 'nav-frontend-typografi/lib/ingress';
import Select from 'nav-frontend-skjema/lib/select';
import Input from 'nav-frontend-skjema/lib/input';

import { KodeverkResponse } from '../../../models/kodeverk';
import { TelefonInput } from './KontaktinformasjonForm';
import { Telefon } from '../../../models/person/NAVKontaktinformasjon';
import EtikettMini from '../../../components/EtikettMini';
import { formaterDato } from '../../../utils/dateUtils';
import { endretAvTekst } from '../../../utils/endretAvUtil';

const RetningsnummerWrapper = styled.div`
  margin-right: 2em;
`;

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
    retningsnummerInputChange: (event: ChangeEvent<HTMLSelectElement>) => void;
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

    function getSelectedRetningsnummerValue(retningsnummer: string) {
        const retningsnummerValue = props.retningsnummerKodeverk.kodeverk
            .find(retningsnummerKodeverk => retningsnummerKodeverk.value === retningsnummer);
        return retningsnummerValue ? retningsnummerValue.value : '';
    }

    function getRetningsnummerSelectOptions() {
        return props.retningsnummerKodeverk.kodeverk.map(kodeverk =>
            (
                <option
                    value={kodeverk.value}
                    key={kodeverk.kodeRef}
                >
                    {kodeverk.beskrivelse} (+{kodeverk.kodeRef})
                </option>
            )
        );
    }

    const retningsnummerSelectOptions = getRetningsnummerSelectOptions();

    return (
        <>
            <Ingress>{props.children}</Ingress>
            <TelefonInputWrapper>
                <RetningsnummerWrapper>
                    <Select
                        label="Landkode"
                        bredde={'m'}
                        value={getSelectedRetningsnummerValue(props.inputValue.retningsnummer)}
                        onChange={props.retningsnummerInputChange}
                    >
                        {retningsnummerSelectOptions}
                    </Select>
                </RetningsnummerWrapper>
                <TelefonnummerWrapper>
                    <Input
                        bredde={'XXL'}
                        label="Telefonnummer"
                        value={props.inputValue.telefonnummer}
                        onChange={props.telfonnummerInputChange}
                    />
                </TelefonnummerWrapper>
            </TelefonInputWrapper>
        </>
    );
}