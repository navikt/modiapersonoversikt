import * as React from 'react';
import styled from 'styled-components';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Input from 'nav-frontend-skjema/lib/input';
import Select from 'nav-frontend-skjema/lib/select';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';
import Ingress from 'nav-frontend-typografi/lib/ingress';

import { Kontaktinformasjon } from '../../../models/kontaktinformasjon';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import DigitalKontaktinformasjon from './DigitalKontaktinformasjon';

interface Props {
    kontaktinformasjon: Kontaktinformasjon;
    person: Person;
    retningsnummerKodeverk: KodeverkResponse;
}

const NavKontaktinformasjonWrapper = styled.div`
  margin-top: 2em;
`;

const TelefonWrapper = styled.div`
  margin-top: 1em;
`;

const RetningsnummerWrapper = styled.div`
  margin-right: 2em;
`;

const TelefonnummerWrapper = styled.div`
  flex: auto;
`;

function Kontaktinformasjon({kontaktinformasjon, person, retningsnummerKodeverk}: Props) {
    const retningsnummerOptions = retningsnummerKodeverk.kodeverk.map(kodeverk =>
        (
            <option
                value={kodeverk.value}
                key={kodeverk.kodeRef}
            >
                {kodeverk.beskrivelse} (+{kodeverk.kodeRef})
            </option>
        )
    );

    return (
        <>
            <Undertittel>Kontaktinformasjon</Undertittel>
            <DigitalKontaktinformasjon kontaktinformasjon={kontaktinformasjon}/>
            <NavKontaktinformasjonWrapper>
                <UndertekstBold>Telefonnummer bruker ønsker å bli oppringt på</UndertekstBold>
                <TelefonWrapper>
                    <Ingress>Mobiltelefon</Ingress>
                    <div style={{display: 'flex'}}>
                        <RetningsnummerWrapper>
                            <Select label="Landkode" bredde={'m'}>
                                {retningsnummerOptions}
                            </Select>
                        </RetningsnummerWrapper>
                        <TelefonnummerWrapper>
                            <Input
                                bredde={'XXL'}
                                label="Telefonnummer"
                            />
                        </TelefonnummerWrapper>
                    </div>
                </TelefonWrapper>
            </NavKontaktinformasjonWrapper>
        </>);
}

export default Kontaktinformasjon;