import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Traad } from '../../../../../models/meldinger/meldinger';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import styled from 'styled-components';
import { theme } from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { erMonolog, meldingstittel, sisteSendteMelding } from '../utils/meldingerUtils';
import Meldingsikon from '../utils/Meldingsikon';
import { EtikettFokus, EtikettSuksess } from 'nav-frontend-etiketter';
import { useAppState, useOnMount } from '../../../../../utils/customHooks';
import { UnmountClosed } from 'react-collapse';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';
import { useInfotabsDyplenker } from '../../dyplenker';
import { meldingerTest } from '../../dyplenkeTest/utils';

interface Props {
    traad: Traad;
    erValgt: boolean;
    sokeord: string;
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
    > *:first-child {
        padding-right: ${theme.margin.layout};
    }
`;

const ListElement = styled.li`
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

function TraadListeElement(props: Props) {
    const traadDialogpanel = useAppState(state => state.oppgaver.dialogpanelTraad);
    const nyesteMelding = sisteSendteMelding(props.traad);
    const datoTekst = formatterDatoTid(nyesteMelding.opprettetDato);
    const tittel = meldingstittel(nyesteMelding);
    const ref = React.createRef<HTMLLIElement>();
    const dyplenker = useInfotabsDyplenker();

    useOnMount(() => {
        const beholdeFokusPåSokefelt = props.sokeord.length > 0;
        if (props.erValgt && !beholdeFokusPåSokefelt) {
            ref.current && ref.current.focus();
        }
    });

    return (
        <ListElement tabIndex={-1} ref={ref} className={meldingerTest.melding}>
            <VisMerKnapp
                valgt={props.erValgt}
                linkTo={dyplenker.meldinger.link(props.traad)}
                ariaDescription={'Vis meldinger for ' + tittel}
            >
                <PanelStyle>
                    <Meldingsikon
                        type={nyesteMelding.meldingstype}
                        erFerdigstiltUtenSvar={nyesteMelding.erFerdigstiltUtenSvar}
                        erMonolog={erMonolog(props.traad)}
                        antallMeldinger={props.traad.meldinger.length}
                    />
                    <div>
                        <UUcustomOrder>
                            <Element className="order-second">{tittel}</Element>
                            <Normaltekst className="order-first">{datoTekst}</Normaltekst>
                        </UUcustomOrder>
                        <EtikettStyling>
                            <UnmountClosed isOpened={traadDialogpanel === props.traad}>
                                <EtikettFokus>Under arbeid</EtikettFokus>
                            </UnmountClosed>
                            <TildeltSaksbehandlerEtikett traadId={props.traad.traadId} />
                        </EtikettStyling>
                    </div>
                </PanelStyle>
            </VisMerKnapp>
        </ListElement>
    );
}

function TildeltSaksbehandlerEtikett({ traadId }: { traadId: string }) {
    const tildelteOppgaver = useTildelteOppgaver();

    if (tildelteOppgaver.paaBruker.map(oppgave => oppgave.henvendelseid).includes(traadId)) {
        return <EtikettSuksess>Tildelt meg</EtikettSuksess>;
    }

    return null;
}

export default TraadListeElement;
