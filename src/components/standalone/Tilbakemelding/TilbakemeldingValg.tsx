import React from 'react';
import styled from 'styled-components';
import { smilies } from './TilbakemeldingIkoner';
import theme from '../../../styles/personOversiktTheme';

const TilbakemeldingValgWrapper = styled.article`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    input + img {
        opacity: ${(props: Props) => (props.valgt >= 0 ? '0.6' : '1')};
    }
`;
const Label = styled.label`
    input + img {
        transition: transform 300ms;
        border-radius: 50%;
    }
    input:checked + img {
        transform: scale(1.4);
        opacity: 1;
    }
    input:focus + img {
        ${theme.focus}
    }
    img {
        width: 40px;
        height: 40px;

        &:hover {
            transform: scale(1.4);
        }
    }
`;

interface Props {
    valgt: number;
    settValgt(valgt: number): void;
}

function Valg(props: Props & { value: number; src: string; alt: string }) {
    return (
        <Label>
            <input
                type="radio"
                name="tilfredshet"
                className="sr-only"
                value={props.value}
                checked={props.valgt === props.value}
                onChange={() => props.settValgt(props.value)}
            />
            <img src={props.src} alt={props.alt} />
        </Label>
    );
}

function TilbakemeldingValg(props: Props) {
    return (
        <TilbakemeldingValgWrapper {...props}>
            <Valg value={1} src={smilies.veldigMisfornoyd} alt="Veldig misfornøyd" {...props} />
            <Valg value={2} src={smilies.misfornoyd} alt="Misfornøyd" {...props} />
            <Valg value={3} src={smilies.noytral} alt="Nøytral" {...props} />
            <Valg value={4} src={smilies.fornoyd} alt="Fornøyd" {...props} />
            <Valg value={5} src={smilies.veldigFornoyd} alt="Veldig fornøyd" {...props} />
        </TilbakemeldingValgWrapper>
    );
}

export default TilbakemeldingValg;
