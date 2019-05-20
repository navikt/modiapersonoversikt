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
import Oppmote from '../../../../../svg/Oppmote';
import Telefon from '../../../../../svg/Telefon';
import Oppgave from '../../../../../svg/Oppgave';
import Dokument from '../../../../../svg/Dokument';
import Monolog from '../../../../../svg/Monolog';
import Dialog from '../../../../../svg/Dialog';

interface Props {
    traad: Traad;
    erValgtTraad: boolean;
    settValgtTraad: (traad: Traad) => void;
}

interface Meldingsprops {
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

function Meldingsikon(props: Meldingsprops) {
    switch (props.type) {
        case Meldingstype.SamtalereferatOppmøte:
            return <Oppmote />;
        case Meldingstype.SamtalereferatTelefon:
            return <Telefon />;
        case Meldingstype.OppgaveVarsel:
            return <Oppgave />;
        case Meldingstype.DokumentVarsel:
            return <Dokument />;
        default: {
            // TODO Vi må legge på et ekstra besvart / ubesvart ikon...
            if (props.erMonolog) {
                return <Monolog />;
            } else {
                return <Dialog />;
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
                valgt={props.erValgtTraad}
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

export default TraadListeElement;
