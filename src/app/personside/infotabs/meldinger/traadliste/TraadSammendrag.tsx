import { Melding, Traad } from '../../../../../models/meldinger/meldinger';
import {
    erDelvisBesvart,
    erFeilsendt,
    getFormattertMeldingsDato,
    meldingstittel,
    nyesteMelding
} from '../utils/meldingerUtils';
import { useAppState } from '../../../../../utils/customHooks';
import Meldingsikon from '../utils/Meldingsikon';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { UnmountClosed } from 'react-collapse';
import { EtikettAdvarsel, EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import * as React from 'react';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';
import { Temagruppe } from '../../../../../models/Temagrupper';
import styled from 'styled-components/macro';

const ContentStyle = styled.div`
    /* IE11-fix*/
    flex-grow: 1;
    width: 0;
    margin-left: 0.8rem;
    overflow-wrap: break-word;
`;

const EtikettStyling = styled.div`
    > *:not(:last-child) {
        margin-bottom: 0.2rem;
        margin-right: 0.2rem;
    }
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 0.2rem;
`;

const UUcustomOrder = styled.div`
    display: flex;
    flex-direction: column;
    .order-first {
        order: 0;
    }
    .order-second {
        order: 1;
    }
`;

const Style = styled.div`
    display: flex;
    > *:last-child {
        flex-grow: 1;
    }
`;

const PreviewStyle = styled(Normaltekst)`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

function TraadSammendrag(props: { traad: Traad }) {
    const sisteMelding = nyesteMelding(props.traad);
    const underArbeid = useAppState(state => state.oppgaver.dialogpanelTraad === props.traad);
    const datoTekst = getFormattertMeldingsDato(sisteMelding);
    const tittel = meldingstittel(sisteMelding);
    return (
        <Style>
            <Meldingsikon traad={props.traad} />
            <ContentStyle>
                <UUcustomOrder>
                    <Element aria-hidden={true} className="order-second">
                        {tittel}
                    </Element>
                    <Normaltekst className="order-first">{datoTekst}</Normaltekst>
                </UUcustomOrder>
                <PreviewStyle>{sisteMelding.fritekst}</PreviewStyle>
                <EtikettStyling>
                    <UnmountClosed isOpened={underArbeid}>
                        <EtikettFokus>Under arbeid</EtikettFokus>
                    </UnmountClosed>
                    {erDelvisBesvart(props.traad) && <EtikettInfo>Delvis besvart</EtikettInfo>}
                    <TildeltSaksbehandlerEtikett traadId={props.traad.traadId} />
                    <SlettetEtikett melding={sisteMelding} />
                    <FeilsendtEtikett traad={props.traad} />
                </EtikettStyling>
            </ContentStyle>
        </Style>
    );
}

function TildeltSaksbehandlerEtikett({ traadId }: { traadId: string }) {
    const tildelteOppgaver = useTildelteOppgaver();

    if (tildelteOppgaver.paaBruker.map(oppgave => oppgave.traadId).includes(traadId)) {
        return <EtikettSuksess>Tildelt meg</EtikettSuksess>;
    }

    return null;
}

function FeilsendtEtikett({ traad }: { traad: Traad }) {
    if (erFeilsendt(traad)) {
        return <EtikettAdvarsel>Feilsendt</EtikettAdvarsel>;
    }
    return null;
}

function SlettetEtikett({ melding }: { melding: Melding }) {
    if (melding.temagruppe === Temagruppe.InnholdSlettet) {
        return <EtikettAdvarsel>Slettet</EtikettAdvarsel>;
    }

    return null;
}

export default TraadSammendrag;
