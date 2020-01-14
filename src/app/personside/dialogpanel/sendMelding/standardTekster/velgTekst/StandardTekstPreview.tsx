import { erGyldigValg } from '../sokUtils';
import { Systemtittel } from 'nav-frontend-typografi';
import Tekstomrade, { LinkRule, ParagraphRule } from '../../../../../../components/tekstomrade/tekstomrade';
import React from 'react';
import * as StandardTekster from '../domain';
import { FieldState } from '../../../../../../utils/hooks/use-field-state';
import { Rule } from '../../../../../../components/tekstomrade/parser/domain';
import { parseTekst } from '../../../../../../components/tag-input/tag-input';
import styled from 'styled-components';
import { Knapp } from 'nav-frontend-knapper';
import theme from '../../../../../../styles/personOversiktTheme';

interface Props {
    tekst: StandardTekster.Tekst | undefined;
    locale: string;
    sokefelt: FieldState;
    highlightRule: Rule;
}

const Tag = styled(({ highlight, ...rest }) => <Knapp {...rest} />)`
    padding: 0.25rem 0.5rem;
    margin-right: 0.25rem;

    em {
        margin: 0 -0.3125rem;
    }
    &:hover {
        color: ${props => (props.highlight ? theme.color.lenke : '#ffffff')};
    }
`;

const PreviewStyle = styled.div`
    padding: 1rem;
    flex: 1;
    word-break: break-word;
    overflow-y: scroll;
    border-bottom: 1px solid ${theme.color.navGra20};
`;

function Tags({ valgtTekst, sokefelt }: { valgtTekst?: StandardTekster.Tekst; sokefelt: FieldState }) {
    if (!valgtTekst) {
        return null;
    }

    const { tags: queryTags } = parseTekst(sokefelt.input.value);
    const tags = queryTags.map(tag => tag.toLowerCase());

    const tagElements = valgtTekst.tags
        .filter(tag => tag.length > 0)
        .filter((tag, index, list) => list.indexOf(tag) === index)
        .map(tag => {
            const highlight = tags.includes(tag);
            return (
                <Tag
                    mini
                    htmlType="button"
                    key={tag}
                    className="tag blokk-xxxs"
                    onClick={() => sokefelt.setValue(`#${tag} ${sokefelt.input.value}`)}
                    highlight={highlight}
                >
                    {highlight ? <em>{tag}</em> : tag}
                </Tag>
            );
        });
    return <div className="tags">{tagElements}</div>;
}

function StandardTekstPreview({ tekst, locale, sokefelt, highlightRule }: Props) {
    if (!erGyldigValg(tekst, locale)) {
        return <PreviewStyle />;
    }

    return (
        <PreviewStyle>
            <Systemtittel tag="h3" className="blokk-xs">
                {tekst && tekst.overskrift}
            </Systemtittel>
            <Tekstomrade rules={[ParagraphRule, highlightRule, LinkRule]} className="typo-normal blokk-m">
                {tekst && tekst.innhold[locale]}
            </Tekstomrade>
            <Tags valgtTekst={tekst} sokefelt={sokefelt} />
        </PreviewStyle>
    );
}

export default StandardTekstPreview;
