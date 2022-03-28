import * as React from 'react';
import { Behandlingsstatus, Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components/macro';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentFormattertDatoForSisteHendelse } from '../utils/saksoversiktUtils';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import { sakerTest } from '../../dyplenkeTest/utils-dyplenker-test';
import { useInfotabsDyplenker } from '../../dyplenker';
import { saksikon, SVGStyling, visAntallSakerSomHarBehandlingsstatus } from './SakstemaListeUtils';

interface Props {
    sakstema: Sakstema;
    erValgt: boolean;
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

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function SakstemaListeElementKnapp(props: Props) {
    const dyplenker = useInfotabsDyplenker();

    const sakerUnderBehandling = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema,
        Behandlingsstatus.UnderBehandling,
        'under behandling'
    );

    const sakerFerdigBehandlet = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema,
        Behandlingsstatus.FerdigBehandlet,
        'ferdig behandlet'
    );

    return (
        <li className={sakerTest.sakstema}>
            <VisMerKnapp
                valgt={props.erValgt}
                linkTo={dyplenker.saker.link(props.sakstema)}
                ariaDescription={'Vis ' + props.sakstema.temanavn}
            >
                <Flex>
                    <div>
                        <UUcustomOrder>
                            <Element className={'order-second ' + sakerTest.oversikt}>
                                {props.sakstema.temanavn}
                            </Element>
                            <Normaltekst className="order-first">
                                {hentFormattertDatoForSisteHendelse(props.sakstema)}
                            </Normaltekst>
                        </UUcustomOrder>
                        {sakerUnderBehandling}
                        {sakerFerdigBehandlet}
                    </div>
                    <SVGStyling>{saksikon(props.sakstema.harTilgang)}</SVGStyling>
                </Flex>
            </VisMerKnapp>
        </li>
    );
}

export default React.memo(SakstemaListeElementKnapp);
