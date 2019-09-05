import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Traad } from '../../../../../models/meldinger/meldinger';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import styled from 'styled-components';
import { meldingstypeTekst, temagruppeTekst } from '../utils/meldingstekster';
import { theme } from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { erMonolog, sisteSendteMelding } from '../utils/meldingerUtils';
import Meldingsikon from '../utils/Meldingsikon';
import { EtikettFokus, EtikettSuksess } from 'nav-frontend-etiketter';
import { useAppState, useOnMount } from '../../../../../utils/customHooks';
import { UnmountClosed } from 'react-collapse';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';
import { erValgtIDyplenke, MeldingerDyplenkeRouteComponentProps, useInfotabsDyplenker } from '../../dyplenker';
import { withRouter } from 'react-router';

interface OwnProps {
    traad: Traad;
}

type Props = OwnProps & MeldingerDyplenkeRouteComponentProps;

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
        ${theme.focus}
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
    const tittel = `${meldingstypeTekst(nyesteMelding.meldingstype)} - ${temagruppeTekst(nyesteMelding.temagruppe)}`;
    const ref = React.createRef<HTMLLIElement>();
    const dyplenker = useInfotabsDyplenker();
    const erValgt = erValgtIDyplenke.meldinger(props.traad, props);

    useOnMount(() => {
        if (erValgt) {
            ref.current && ref.current.focus();
        }
    });

    return (
        <ListElement tabIndex={-1} ref={ref}>
            <VisMerKnapp
                valgt={erValgt}
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

export default withRouter(TraadListeElement);
