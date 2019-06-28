import React from 'react';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components';
import { StyledTable } from '../../../../../../../utils/table/StyledTable';
import { JournalforingsSak } from './JournalforingPanel';
import { sakKategori } from './VelgSak';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';

export interface Props {
    sak: JournalforingsSak;
    tilbake: () => void;
    lukkPanel: () => void;
}

const PanelLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export function JournalforSak({ sak, tilbake, lukkPanel }: Props) {
    const kategori = sakKategori(sak);

    return (
        <PanelLayout>
            <LenkeKnapp onClick={tilbake}>Tilbake</LenkeKnapp>
            <Undertittel tag="h1">Journalføring</Undertittel>
            <Normaltekst tag="h2">{kategori}</Normaltekst>
            <StyledTable
                tittelRekke={['Saksid', 'Opprettet', 'Fagsystem']}
                rows={[[sak.saksId, sak.opprettetDatoFormatert, sak.fagsystemNavn]]}
            />
            <KnappBase id="hentoppgaveknapp" type="hoved">
                Journalfør
            </KnappBase>
            <LenkeKnapp type="button" onClick={lukkPanel}>
                Avbryt
            </LenkeKnapp>
        </PanelLayout>
    );
}
