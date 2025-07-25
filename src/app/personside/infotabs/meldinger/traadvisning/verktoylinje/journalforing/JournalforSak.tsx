import { useQueryClient } from '@tanstack/react-query';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import { usePersonAtomValue } from 'src/lib/state/context';
import styled from 'styled-components';
import { post } from '../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../api/config';
import { useValgtenhet } from '../../../../../../../context/valgtenhet-state';
import type { Traad } from '../../../../../../../models/meldinger/meldinger';
import dialogResource from '../../../../../../../rest/resources/dialogResource';
import journalsakResource from '../../../../../../../rest/resources/journalsakResource';
import { formatterDatoMedMaanedsnavnOrNull } from '../../../../../../../utils/date-utils';
import { loggError } from '../../../../../../../utils/logger/frontendLogger';
import { ENDASH } from '../../../../../../../utils/string-utils';
import { StyledTable } from '../../../../../../../utils/table/StyledTable';
import type { JournalforingsSak } from './JournalforingPanel';
import { sakKategori } from './VelgSak';

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
    const fnr = usePersonAtomValue();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [journalforingSuksess, setJournalforingSuksess] = useState(false);

    const journalfor = () => {
        if (submitting) {
            return;
        }

        setSubmitting(true);
        const enhetheader = valgtEnhet ? `?enhet=${valgtEnhet}` : '';
        const url = `${apiBaseUri}/journalforing/${props.traad.traadId}${enhetheader}`;
        const body = { ...props.sak, fnr };

        post(url, body, 'Journalføring')
            .then(() => {
                setSubmitting(false);
                setJournalforingSuksess(true);
                queryClient.invalidateQueries({
                    queryKey: journalsakResource.queryKey(fnr)
                });
                queryClient.invalidateQueries({
                    queryKey: dialogResource.queryKey(fnr, valgtEnhet)
                });
            })
            .catch((error) => {
                setSubmitting(false);
                setError('Kunne ikke gjennomføre journalføring');
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                loggError(error, 'Kunne ikke gjennomføre journalføring', {
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
