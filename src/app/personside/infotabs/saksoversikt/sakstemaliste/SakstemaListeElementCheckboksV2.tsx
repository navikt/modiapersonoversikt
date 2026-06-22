import { Element, Normaltekst } from 'nav-frontend-typografi';
import { memo } from 'react';
import { SVGStyling, saksikon } from 'src/app/personside/infotabs/saksoversikt/sakstemaliste/SakstemaListeUtils';
import type { Sakstema } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import styled from 'styled-components';

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
                <Normaltekst>
                    {props.sakstema.nyesteDokumentDato ? formaterDato(props.sakstema.nyesteDokumentDato) : ''}
                </Normaltekst>
                <Element>{props.sakstema.temanavn}</Element>
            </div>
            <SVGStyling>{saksikon(props.sakstema.harTilgang ?? false)}</SVGStyling>
        </CheckboksElement>
    );
}

export default memo(SakstemaListeElementCheckboks);
