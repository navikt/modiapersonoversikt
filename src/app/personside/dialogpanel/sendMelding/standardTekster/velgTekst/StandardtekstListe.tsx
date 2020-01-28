import * as React from 'react';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../../../../styles/personOversiktTheme';
import * as StandardTekster from '../domain';
import TekstListeElement from './TekstListeElement';
import { FieldState } from '../../../../../../utils/hooks/use-field-state';
import { Rule } from '../../../../../../components/tekstomrade/parser/domain';
import { LenkeKnapp } from '../../../../../../components/common-styled-components';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    tekster: Array<StandardTekster.Tekst>;
    valgt: FieldState;
    highlightRule: Rule;
    locale: string;
}

const TreffStyle = styled(Element)`
    padding: ${pxToRem(7)} ${pxToRem(15)};
    border-bottom: ${theme.border.skilleSvak};
`;

const StyledNav = styled.nav`
    flex: 0;
    flex-basis: 35%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-right: 1px solid ${theme.color.navGra20};
    background-color: #f5f5f5;
`;

const StyledLenkeknapp = styled(LenkeKnapp)`
    padding: ${pxToRem(7)};
    float: right;
`;

function StandardtekstListe(props: Props) {
    const [visAntall, setVisAntall] = useState(50);
    const tittelId = useRef(guid());

    const tekstElementer = props.tekster
        .slice(0, visAntall)
        .map((tekst, index) => (
            <TekstListeElement
                locale={props.locale}
                key={tekst.id}
                tekst={tekst}
                onChange={props.valgt.input.onChange}
                valgt={tekst.id === props.valgt.input.value}
                highlightRule={props.highlightRule}
                index={index}
            />
        ));

    const visFlereTeksterKnapp = (
        <StyledLenkeknapp type="button" onClick={() => setVisAntall(visAntall + 50)}>
            Vis flere tekster
        </StyledLenkeknapp>
    );

    return (
        <StyledNav aria-labelledby={tittelId.current}>
            <h3 className="sr-only" id={tittelId.current}>
                Velg samtalemal
            </h3>
            <TreffStyle aria-live="polite">{props.tekster.length} samtalemaler traff søket</TreffStyle>
            <ul className="standardtekster__liste">{tekstElementer}</ul>
            {props.tekster.length > tekstElementer.length && visFlereTeksterKnapp}
        </StyledNav>
    );
}

export default StandardtekstListe;
