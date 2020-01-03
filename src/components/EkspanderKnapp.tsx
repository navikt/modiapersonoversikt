import * as React from 'react';
import { LenkeKnapp } from './common-styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import NavFrontendChevron from 'nav-frontend-chevron';

const Luft = styled.span`
    margin-right: 0.5rem;
`;

interface KnappProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open?: boolean;
    tittel?: string;
    className?: string;
}

function EkspanderKnapp(props: KnappProps) {
    return (
        <LenkeKnapp onClick={props.onClick} aria-expanded={props.open} className={props.className}>
            <Luft>
                <Normaltekst tag="span">{props.tittel || (props.open ? 'Skjul detaljer' : 'Vis detaljer')}</Normaltekst>
            </Luft>
            {props.open === undefined ? null : <NavFrontendChevron type={props.open ? 'opp' : 'ned'} />}
        </LenkeKnapp>
    );
}

export default EkspanderKnapp;
