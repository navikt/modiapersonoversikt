import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Traad } from '../../../../../models/meldinger/meldinger';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import styled from 'styled-components';
import { theme } from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { erDelvisBesvart, erMonolog, meldingstittel, nyesteMelding } from '../utils/meldingerUtils';
import Meldingsikon from '../utils/Meldingsikon';
import { EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import { useAppState, useOnMount } from '../../../../../utils/customHooks';
import { UnmountClosed } from 'react-collapse';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';
import { useInfotabsDyplenker } from '../../dyplenker';
import { meldingerTest } from '../../dyplenkeTest/utils';
import { ReactNode } from 'react';
import { delAvStringMedDots } from '../../../../../utils/string-utils';

interface Props {
    traad: Traad;
    erValgt: boolean;
    taFokusOnMount?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    tillegskomponent?: ReactNode;
}

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

const PanelStyle = styled.div`
    display: flex;
    > *:not(:last-child) {
        padding-right: ${theme.margin.layout};
    }
`;

const ListElementStyle = styled.li`
    &:focus {
        ${theme.focusOverlay}
    }
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

const ContentStyle = styled.div`
    flex-grow: 1;
    width: 0px;
`;

function TraadListeElement(props: Props) {
    const underArbeid = useAppState(state => state.oppgaver.dialogpanelTraad === props.traad);
    const sisteMelding = nyesteMelding(props.traad);
    const datoTekst = formatterDatoTid(sisteMelding.opprettetDato);
    const tittel = meldingstittel(sisteMelding);
    const ref = React.createRef<HTMLLIElement>();
    const dyplenker = useInfotabsDyplenker();

    useOnMount(() => {
        if (props.taFokusOnMount) {
            ref.current && ref.current.focus();
        }
    });

    return (
        <ListElementStyle tabIndex={-1} ref={ref} className={meldingerTest.melding}>
            <VisMerKnapp
                valgt={props.erValgt}
                onClick={props.onClick}
                // Ønsker ulik oppførsel i ulike panel, så derfor har vi en optional onclick for å overstyre linkTo
                linkTo={!props.onClick ? dyplenker.meldinger.link(props.traad) : undefined}
                ariaDescription={'Vis meldinger for ' + tittel}
            >
                <PanelStyle>
                    {props.tillegskomponent}
                    <Meldingsikon
                        type={sisteMelding.meldingstype}
                        erFerdigstiltUtenSvar={sisteMelding.erFerdigstiltUtenSvar}
                        erMonolog={erMonolog(props.traad)}
                        antallMeldinger={props.traad.meldinger.length}
                    />
                    <ContentStyle>
                        <UUcustomOrder>
                            <Element className="order-second">{tittel}</Element>
                            <Normaltekst className="order-first">{datoTekst}</Normaltekst>
                        </UUcustomOrder>
                        <Normaltekst>{delAvStringMedDots(sisteMelding.fritekst, 35)}</Normaltekst>
                        <EtikettStyling>
                            <UnmountClosed isOpened={underArbeid}>
                                <EtikettFokus>Under arbeid</EtikettFokus>
                            </UnmountClosed>
                            {erDelvisBesvart(props.traad) && <EtikettInfo>Delvis besvart</EtikettInfo>}
                            <TildeltSaksbehandlerEtikett traadId={props.traad.traadId} />
                        </EtikettStyling>
                    </ContentStyle>
                </PanelStyle>
            </VisMerKnapp>
        </ListElementStyle>
    );
}

function TildeltSaksbehandlerEtikett({ traadId }: { traadId: string }) {
    const tildelteOppgaver = useTildelteOppgaver();

    if (tildelteOppgaver.paaBruker.map(oppgave => oppgave.henvendelseid).includes(traadId)) {
        return <EtikettSuksess>Tildelt meg</EtikettSuksess>;
    }

    return null;
}

export default React.memo(TraadListeElement);
