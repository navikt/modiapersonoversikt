import * as React from 'react';
import { Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import Element from 'nav-frontend-typografi/lib/element';
import styled from 'styled-components';
import { meldingstypeTekst, temagruppeTekst } from '../utils/meldingstekster';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { theme } from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { erMonolog, sisteSendteMelding } from '../utils/meldingerUtils';
import OppmoteIkon from '../../../../../svg/OppmoteIkon';
import TelefonIkon from '../../../../../svg/TelefonIkon';
import OppgaveIkon from '../../../../../svg/OppgaveIkon';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import MonologIkon from '../../../../../svg/MonologIkon';
import DialogIkon from '../../../../../svg/DialogIkon';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { settValgtTraad } from '../../../../../redux/meldinger/actions';

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

interface MeldingsikonProps {
    type: Meldingstype;
    erFerdigstiltUtenSvar: boolean;
    erMonolog: boolean;
}

const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
    }
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

const PanelStyle = styled.div`
    display: flex;
    > *:first-child {
        padding-right: ${theme.margin.layout};
    }
`;

function Meldingsikon(props: MeldingsikonProps) {
    switch (props.type) {
        case Meldingstype.SAMTALEREFERAT_OPPMOTE:
            return <OppmoteIkon />;
        case Meldingstype.SAMTALEREFERAT_TELEFON:
            return <TelefonIkon />;
        case Meldingstype.OPPGAVE_VARSEL:
            return <OppgaveIkon />;
        case Meldingstype.DOKUMENT_VARSEL:
            return <DokumentIkon />;
        default: {
            // TODO Vi må legge på et ekstra besvart / ubesvart ikon...
            if (props.erMonolog) {
                return <MonologIkon />;
            } else {
                return <DialogIkon />;
            }
        }
    }
}

function TraadListeElement(props: Props) {
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
                    <SVGStyling>
                        <Meldingsikon
                            type={nyesteMelding.meldingstype}
                            erFerdigstiltUtenSvar={nyesteMelding.erFerdigstiltUtenSvar}
                            erMonolog={erMonolog(props.traad)}
                        />
                    </SVGStyling>
                    <div>
                        <UUcustomOrder>
                            <Element className="order-second">{tittel}</Element>
                            <Normaltekst className="order-first">{datoTekst}</Normaltekst>
                        </UUcustomOrder>
                    </div>
                </PanelStyle>
            </VisMerKnapp>
        </li>
    );
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        erValgt: state.meldinger.valgtTraad === ownProps.traad
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        settValgtTraad: (traad: Traad) => dispatch(settValgtTraad(traad))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TraadListeElement);
