import * as React from 'react';
import { useState } from 'react';
import { RadioPanelGruppe, Textarea } from 'nav-frontend-skjema';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { Kodeverk } from '../../../../models/kodeverk';
import { UnmountClosed } from 'react-collapse';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components';
import Temavelger from '../component/Temavelger';

interface Props {}

const Style = styled.article`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    > * {
        margin-bottom: 1rem;
    }
`;

function SendNyMelding(props: Props) {
    const initialDialogType = Meldingstype.SamtalereferatTelefon;
    const [dialogType, setDialogType] = useState(initialDialogType);
    const [tekst, setTekst] = useState('');
    const [tema, setTema] = useState<Kodeverk | undefined>(undefined);

    const erReferat = dialogType != Meldingstype.SpørsmålSkriftlig;

    const handleAvbryt = () => {
        setDialogType(initialDialogType);
        setTekst('');
        setTema(undefined);
    };

    return (
        <Style>
            <h3 className="sr-only">Send ny melding</h3>
            <RadioPanelGruppe
                name="Dialogtype"
                legend="Velg dialogtype"
                radios={[
                    { label: 'Samtalereferat telefon', value: Meldingstype.SamtalereferatTelefon },
                    { label: 'Samtalereferat oppmøte', value: Meldingstype.SamtalereferatOppmøte },
                    { label: 'Spørsmål til bruker', value: Meldingstype.SpørsmålSkriftlig }
                ]}
                checked={dialogType}
                onChange={(_, value) => setDialogType(value as Meldingstype)}
            />
            <UnmountClosed isOpened={erReferat}>
                <Temavelger setTema={setTema} tema={tema} />
            </UnmountClosed>
            <Textarea
                value={tekst}
                onChange={e => setTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                label={'Melding'}
                maxLength={5000}
            />
            <KnappBase type="hoved">Del med Navn her</KnappBase>
            <KnappBase type="flat" onClick={handleAvbryt}>
                Avbryt
            </KnappBase>
        </Style>
    );
}

export default SendNyMelding;
