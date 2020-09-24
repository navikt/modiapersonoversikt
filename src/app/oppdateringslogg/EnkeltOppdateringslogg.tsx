import * as React from 'react';
import { EnOppdateringslogg } from './OppdateringsloggContainer';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { formatterDatoTidMedMaanedsnavn } from '../../utils/date-utils';

interface Props {
    enOppdateringslogg: EnOppdateringslogg;
    visMer: boolean;
    setVisMer: (visMer: boolean) => void;
}

const StyledArticle = styled.article`
    text-align: center;
    flex: 1;
`;

const StyledDiv = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 3px 3px #ccc;
    align-content: center;
`;

const StyledUndertittel = styled(Undertittel)`
    align-self: center;
    margin: 0 auto;
`;

function OppdateringsloggBilde({ src }: { src?: string }) {
    if (!src) {
        return null;
    }
    return (
        <StyledDiv>
            <img src={src} alt={''} width="100%" height="100%" />
        </StyledDiv>
    );
}

export default function EnkeltOppdateringslogg(props: Props) {
    return (
        <article>
            <OppdateringsloggBilde src={props.enOppdateringslogg.src} />
            <StyledArticle>
                <StyledUndertittel tag="h3">{props.enOppdateringslogg.tittel}</StyledUndertittel>
                <Undertekst className="blokk-xxs">
                    {formatterDatoTidMedMaanedsnavn(props.enOppdateringslogg.dato)}
                </Undertekst>
                <Normaltekst>{props.enOppdateringslogg.ingress}</Normaltekst>
                <Normaltekst tag="div">{props.enOppdateringslogg.beskrivelse}</Normaltekst>
            </StyledArticle>
        </article>
    );
}
