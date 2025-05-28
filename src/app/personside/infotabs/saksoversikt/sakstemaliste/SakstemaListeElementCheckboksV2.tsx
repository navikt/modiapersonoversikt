import { Element, Normaltekst } from 'nav-frontend-typografi';
import { memo } from 'react';
import styled from 'styled-components';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { hentFormattertDatoForSisteHendelseV2 } from '../utils/saksoversiktUtilsV2';
import { SVGStyling, saksikon } from './SakstemaListeUtils';

const CheckboksElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .checkbox {
        label {
            font-weight: bold;
        }
    }
`;

interface CheckboksProps {
    sakstema: Sakstema;
}

function SakstemaListeElementCheckboks(props: CheckboksProps) {
    return (
        <CheckboksElement>
            <div>
                <Normaltekst>{hentFormattertDatoForSisteHendelseV2(props.sakstema)}</Normaltekst>
                <Element>{props.sakstema.temanavn}</Element>
            </div>
            <SVGStyling>{saksikon(props.sakstema.harTilgang)}</SVGStyling>
        </CheckboksElement>
    );
}

export default memo(SakstemaListeElementCheckboks);
