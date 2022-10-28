import React, { useState } from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import styled from 'styled-components/macro';
import { StyledTable } from '../../../../../../../utils/table/StyledTable';
import { JournalforingsSak } from './JournalforingPanel';
import { sakKategori } from './VelgSak';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { apiBaseUri } from '../../../../../../../api/config';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { post } from '../../../../../../../api/api';
import { loggError } from '../../../../../../../utils/logger/frontendLogger';
import { useFodselsnummer } from '../../../../../../../utils/customHooks';
import { formatterDatoMedMaanedsnavnOrNull } from '../../../../../../../utils/date-utils';
import { ENDASH } from '../../../../../../../utils/string-utils';
import dialogResource from '../../../../../../../rest/resources/dialogResource';
import { useValgtenhet } from '../../../../../../../context/valgtenhet-state';
import { useQueryClient } from '@tanstack/react-query';
import journalsakResource from '../../../../../../../rest/resources/journalsakResource';

interface Props {
    sak: JournalforingsSak;
    traad: Traad;
    tilbake: () => void;
    lukkPanel: () => void;
}

const PanelLayout = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const CustomStyledTable = styled(StyledTable)`
    th {
        font-weight: normal;
    }

    td {
        font-weight: bold;
    }
`;
const SuksessStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;
export function JournalforSak(props: Props) {
    const queryClient = useQueryClient();
    const valgtEnhet = useValgtenhet().enhetId;
    const kategori = sakKategori(props.sak);
    const fnr = useFodselsnummer();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [journalforingSuksess, setJournalforingSuksess] = useState(false);

    const journalfor = () => {
        if (submitting) {
            return;
        }

        setSubmitting(true);
        const enhetheader = valgtEnhet ? `?enhet=${valgtEnhet}` : '';
        post(`${apiBaseUri}/journalforing/${fnr}/${props.traad.traadId}${enhetheader}`, props.sak, 'Journalføring')
            .then(() => {
                setSubmitting(false);
                setJournalforingSuksess(true);
                queryClient.invalidateQueries(journalsakResource.queryKey(fnr));
                queryClient.invalidateQueries(dialogResource.queryKey(fnr, valgtEnhet));
            })
            .catch((error) => {
                setSubmitting(false);
                setError('Kunne ikke gjennomføre journalføring');
                loggError(error, `Kunne ikke gjennomføre journalføring`, {
                    traadId: props.traad.traadId,
                    saksId: props.sak.saksId
                });
            });
    };

    if (journalforingSuksess) {
        return (
            <SuksessStyling>
                <AlertStripeSuksess>Tråden ble journalført</AlertStripeSuksess>
                <Hovedknapp autoFocus={true} onClick={props.lukkPanel}>
                    Lukk
                </Hovedknapp>
            </SuksessStyling>
        );
    }

    return (
        <PanelLayout>
            <Undertittel tag="h1">Journalføring</Undertittel>
            <Normaltekst className="blokk-xs">{kategori}</Normaltekst>

            <Ingress className="blokk-xxxs">{props.sak.temaNavn}</Ingress>
            <CustomStyledTable
                tittelRekke={['Saksid', 'Opprettet', 'Fagsystem']}
                rows={[
                    [
                        props.sak.saksIdVisning,
                        formatterDatoMedMaanedsnavnOrNull(props.sak.opprettetDato) ?? ENDASH,
                        props.sak.fagsystemNavn
                    ]
                ]}
                className="blokk-m"
            />
            {error && <AlertStripeFeil className="blokk-xs">{error}</AlertStripeFeil>}
            <Hovedknapp
                autoFocus={true}
                className="blokk-xs"
                onClick={journalfor}
                spinner={submitting}
                autoDisableVedSpinner
            >
                Journalfør
            </Hovedknapp>
            <Flatknapp htmlType="button" onClick={props.tilbake}>
                Tilbake
            </Flatknapp>
        </PanelLayout>
    );
}
