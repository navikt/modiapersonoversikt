import * as React from 'react';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../../../../styles/personOversiktTheme';
import * as StandardTekster from '../domain';
import TekstListeElement from './TekstListeElement';
import { FieldState } from '../../../../../../utils/hooks/use-field-state';
import { Rule } from '../../../../../../components/tekstomrade/parser/domain';

interface Props {
    tekster: Array<StandardTekster.Tekst>;
    valgt: FieldState;
    highlightRule: Rule;
}

const TreffStyle = styled(Element)`
    padding: ${pxToRem(7)} ${pxToRem(15)};
    border-bottom: ${theme.border.skilleSvak};
`;

const ListeStyle = styled.div`
    flex: 0;
    flex-basis: 35%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-right: 1px solid ${theme.color.navGra20};
    background-color: #f5f5f5;
`;

function StandardtekstListe(props: Props) {
    const tekstElementer = props.tekster
        .slice(0, 50)
        .map(tekst => (
            <TekstListeElement
                key={tekst.id}
                tekst={tekst}
                onChange={props.valgt.input.onChange}
                valgt={tekst.id === props.valgt.input.value}
                highlightRule={props.highlightRule}
            />
        ));

    return (
        <ListeStyle>
            <TreffStyle tag="h3" aria-live="polite">
                Samtalemaler ({props.tekster.length})
            </TreffStyle>
            <ul className="standardtekster__liste">{tekstElementer}</ul>
        </ListeStyle>
    );
}

export default StandardtekstListe;
