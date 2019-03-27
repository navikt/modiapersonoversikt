import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { datoVerbose } from '../../../../../utils/dateUtils';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import Element from 'nav-frontend-typografi/lib/element';
import styled from 'styled-components';
import { statusKlasseTekst, temagruppeTekst } from '../utils/meldingstekster';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { theme } from '../../../../../styles/personOversiktTheme';
import SakIkkeTilgangIkon from '../../../../../svg/SakIkkeTilgangIkon';

interface Props {
    traad: Traad;
    erValgtTraad: boolean;
    oppdaterValgtTraad: (traad: Traad) => void;
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

function TraadListeElement(props: Props) {
    const datoTekst = datoVerbose(props.traad.dato).meldingerFormat;
    const tittel = `${statusKlasseTekst(props.traad.statusKlasse)} - ${temagruppeTekst(props.traad.temagruppe)}`;
    return (
        <li>
            <VisMerKnapp
                valgt={props.erValgtTraad}
                onClick={() => props.oppdaterValgtTraad(props.traad)}
                ariaDescription={'Vis meldinger for ' + tittel}
            >
                <SVGStyling>
                    <SakIkkeTilgangIkon />
                </SVGStyling>
                <div>
                    <UUcustomOrder>
                        <Element className="order-second">{tittel}</Element>
                        <Normaltekst className="order-first">{datoTekst}</Normaltekst>
                    </UUcustomOrder>
                </div>
            </VisMerKnapp>
        </li>
    );
}

export default TraadListeElement;
