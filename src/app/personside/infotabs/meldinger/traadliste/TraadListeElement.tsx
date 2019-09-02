import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Traad } from '../../../../../models/meldinger/meldinger';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import styled from 'styled-components';
import { meldingstypeTekst, temagruppeTekst } from '../utils/meldingstekster';
import { theme } from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { erMonolog, sisteSendteMelding } from '../utils/meldingerUtils';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { setValgtTraadMeldingspanel } from '../../../../../redux/meldinger/actions';
import Meldingsikon from '../utils/Meldingsikon';
import { EtikettFokus, EtikettSuksess } from 'nav-frontend-etiketter';
import { useAppState } from '../../../../../utils/customHooks';
import { UnmountClosed } from 'react-collapse';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';

interface OwnProps {
    traad: Traad;
}

interface StateProps {
    erValgt: boolean;
}

interface DispatchProps {
    settValgtTraad: (traad: Traad) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

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

    return (
        <li>
            <VisMerKnapp
                valgt={props.erValgt}
                onClick={() => props.settValgtTraad(props.traad)}
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
        </li>
    );
}

function TildeltSaksbehandlerEtikett({ traadId }: { traadId: string }) {
    const tildelteOppgaver = useTildelteOppgaver();

    if (tildelteOppgaver.paaBruker.map(oppgave => oppgave.henvendelseid).includes(traadId)) {
        return <EtikettSuksess>Tildelt meg</EtikettSuksess>;
    }

    return null;
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        erValgt: state.meldinger.valgtTraad === ownProps.traad
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        settValgtTraad: (traad: Traad) => dispatch(setValgtTraadMeldingspanel(traad))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TraadListeElement);
