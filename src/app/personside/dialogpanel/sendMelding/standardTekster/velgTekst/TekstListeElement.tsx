import * as StandardTekster from '../domain';
import { Rule } from '../../../../../../components/tekstomrade/parser/domain';
import Tekstomrade from '../../../../../../components/tekstomrade/tekstomrade';
import React from 'react';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../../styles/personOversiktTheme';

const StyledLi = styled.li`
    position: relative;
    border-bottom: 1px solid ${theme.color.navGra20};

    input {
        ${theme.visuallyHidden}
    }
    input + label {
        display: flex;
        padding: ${pxToRem(10)} ${pxToRem(15)};
        border-radius: ${theme.borderRadius.layout};
    }
    input:checked + label {
        background-color: ${theme.color.kategori};
    }
    input:focus + label {
        outline: none;
        box-shadow: inset 0 0 0 0.1875rem #254b6d;
    }
`;

interface Props {
    tekst: StandardTekster.Tekst;
    valgt: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    highlightRule: Rule;
    locale: string;
}

function TekstListeElement(props: Props) {
    return (
        <StyledLi>
            <input
                type="radio"
                name="tekstvalg"
                id={props.tekst.id}
                value={props.tekst.id}
                onChange={props.onChange}
                checked={props.valgt}
            />
            <label htmlFor={props.tekst.id}>
                <Tekstomrade as="span" rules={[props.highlightRule]}>
                    {props.tekst.overskrift}
                </Tekstomrade>
            </label>
            <Tekstomrade className="sr-only">{props.tekst && props.tekst.innhold[props.locale]}</Tekstomrade>
        </StyledLi>
    );
}

export default React.memo(TekstListeElement);
