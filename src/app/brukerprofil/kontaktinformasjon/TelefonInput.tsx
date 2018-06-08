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

function DefaultRetningsnummer() {
    return (
        <option
            disabled={true}
            value={''}
            key={''}
        >
            Velg retningsnummer
        </option>
    );
}

export function TelefonInput(props: TelefonInputProps) {

    function getValgtRetningsnummer(retningsnummerInput: string) {
        const retningsnummer = props.retningsnummerKodeverk.kodeverk
            .find(retningsnummerKodeverk => retningsnummerKodeverk.kodeRef === retningsnummerInput);

        if (!retningsnummer) {
            return '';
        }
        return retningsnummer.kodeRef;
    }

    function getRetningsnummerSelectValg() {
        let retningsnummere = props.retningsnummerKodeverk.kodeverk.map(kodeverk =>
            (
                <option value={kodeverk.kodeRef} key={kodeverk.kodeRef}>
                    {kodeverk.beskrivelse} (+{kodeverk.kodeRef})
                </option>
            )
        );
        return [DefaultRetningsnummer()].concat(retningsnummere);

    }

    const retningsnummerSelectValg = getRetningsnummerSelectValg();
    const valgtRetningsnummer = getValgtRetningsnummer(props.inputValue.retningsnummer);
    return (
        <>
            <Ingress>{props.children}</Ingress>
            <TelefonInputWrapper>
                <RetningsnummerWrapper>
                    <Select
                        label="Landkode"
                        bredde={'m'}
                        value={valgtRetningsnummer}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                            props.retningsnummerInputChange(event.target.value)}
                    >
                        {retningsnummerSelectValg}
                    </Select>
                </RetningsnummerWrapper>
                <TelefonnummerWrapper>
                    <Input
                        bredde={'XXL'}
                        label="Telefonnummer"
                        value={props.inputValue.identifikator}
                        onChange={props.telfonnummerInputChange}
                    />
                </TelefonnummerWrapper>
            </TelefonInputWrapper>
        </>
    );
}