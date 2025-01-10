import Tekstomrade, { LinebreakRule, ParagraphRule, type Rule } from 'nav-frontend-tekstomrade';
import * as React from 'react';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../../styles/personOversiktTheme';
import type * as StandardTekster from '../domain';

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
    locale: StandardTekster.Locale;
    index: number;
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
                <span className="sr-only">{props.index + 1}</span>
                <Tekstomrade as="span" rules={[props.highlightRule]}>
                    {props.tekst.overskrift}
                </Tekstomrade>
                <Tekstomrade className="sr-only" rules={[LinebreakRule, ParagraphRule]}>
                    {props.tekst?.innhold[props.locale] || ''}
                </Tekstomrade>
            </label>
        </StyledLi>
    );
}

export default React.memo(TekstListeElement);
