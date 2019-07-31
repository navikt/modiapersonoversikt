import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { StyledTable } from '../../../../../../../utils/table/StyledTable';
import { JournalforingsSak } from './JournalforingPanel';
import { sakKategori } from './VelgSak';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { apiBaseUri } from '../../../../../../../api/config';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { post } from '../../../../../../../api/api';
import { loggError } from '../../../../../../../utils/frontendLogger';

export interface Props {
    sak: JournalforingsSak;
    traad: Traad;
    fnr: string;
    lukkPanel: () => void;
}

const PanelLayout = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

export function JournalforSak(props: Props) {
    const { sak, fnr, lukkPanel, traad } = props;
    const { traadId } = traad;
    const kategori = sakKategori(sak);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const journalfor = () => {
        setSubmitting(true);
        post(`${apiBaseUri}/journalforing/${fnr}/${traadId}`, sak).then(
            () => {
                setSubmitting(false);
                lukkPanel();
            },
            error => {
                setSubmitting(false);
                setError('Kunne ikke gjennomføre journalføring.');
                loggError(error, `Kunne ikke gjennomføre journalføring.`, { traadId, saksId: sak.saksId });
            }
        );
    };

    return (
        <PanelLayout>
            <Undertittel tag="h1">Journalføring</Undertittel>
            <Normaltekst className="blokk-xs">{kategori}</Normaltekst>

            <Ingress>{sak.temaNavn}</Ingress>
            <StyledTable
                tittelRekke={['Saksid', 'Opprettet', 'Fagsystem']}
                rows={[[sak.saksId, sak.opprettetDatoFormatert, sak.fagsystemNavn]]}
                className="blokk-m"
            />
            {error && <AlertStripeFeil className="blokk-xs">{error}</AlertStripeFeil>}
            <Hovedknapp className="blokk-xs" onClick={journalfor} spinner={submitting} autoDisableVedSpinner>
                Journalfør
            </Hovedknapp>
            <LenkeKnapp type="button" onClick={lukkPanel}>
                Avbryt
            </LenkeKnapp>
        </PanelLayout>
    );
}
