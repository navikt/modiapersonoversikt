import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { DATOFORMAT_TRAADER, formatDate } from '../../../../../utils/dateUtils';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import Element from 'nav-frontend-typografi/lib/element';
import styled from 'styled-components';
import { meldingstypeTekst, temagruppeTekst } from '../utils/meldingstekster';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { theme } from '../../../../../styles/personOversiktTheme';
import SakIkkeTilgangIkon from '../../../../../svg/SakIkkeTilgangIkon';

interface Props {
    traad: Traad;
    erValgtTraad: boolean;
    settValgtTraad: (traad: Traad) => void;
}

const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px20};
        width: ${theme.margin.px20};
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

function sisteSendteMelding(traad: Traad) {
    return traad.meldinger[0];
}

function TraadListeElement(props: Props) {
    const datoTekst = formatDate(props.traad.dato, DATOFORMAT_TRAADER);
    const tittel = `${meldingstypeTekst(sisteSendteMelding(props.traad).meldingstype)} - ${temagruppeTekst(
        props.traad.temagruppe
    )}`;
    return (
        <li>
            <VisMerKnapp
                valgt={props.erValgtTraad}
                onClick={() => props.settValgtTraad(props.traad)}
                ariaDescription={'Vis meldinger for ' + tittel}
            >
                <PanelStyle>
                    <SVGStyling>
                        <SakIkkeTilgangIkon />
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
