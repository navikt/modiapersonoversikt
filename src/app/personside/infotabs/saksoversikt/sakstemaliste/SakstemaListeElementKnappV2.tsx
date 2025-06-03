import { Element, Normaltekst } from 'nav-frontend-typografi';
import { memo } from 'react';
import styled from 'styled-components';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { sakerTest } from '../../dyplenkeTest/utils-dyplenker-test';
import { useInfotabsDyplenker } from '../../dyplenker';
import { hentFormattertDatoForSisteHendelseV2 } from '../utils/saksoversiktUtilsV2';
import { SVGStyling, saksikon } from './SakstemaListeUtils';

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
    return (
        <li className={sakerTest.sakstema}>
            <VisMerKnapp
                valgt={props.erValgt}
                linkTo={dyplenker.saker.link(props.sakstema)}
                ariaDescription={`Vis ${props.sakstema.temanavn}`}
            >
                <Flex>
                    <div>
                        <UUcustomOrder>
                            <Element className={`order-second ${sakerTest.oversikt}`}>
                                {props.sakstema.temanavn}
                            </Element>
                            <Normaltekst className="order-first">
                                {hentFormattertDatoForSisteHendelseV2(props.sakstema)}
                            </Normaltekst>
                        </UUcustomOrder>
                    </div>
                    <SVGStyling>{saksikon(props.sakstema.harTilgang)}</SVGStyling>
                </Flex>
            </VisMerKnapp>
        </li>
    );
}

export default memo(SakstemaListeElementKnapp);
