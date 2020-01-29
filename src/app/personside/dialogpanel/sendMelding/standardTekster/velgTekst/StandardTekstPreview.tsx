import { erGyldigValg } from '../sokUtils';
import { Systemtittel } from 'nav-frontend-typografi';
import Tekstomrade, { defaultRules } from '../../../../../../components/tekstomrade/tekstomrade';
import React, { useRef } from 'react';
import * as StandardTekster from '../domain';
import { FieldState } from '../../../../../../utils/hooks/use-field-state';
import { Rule } from '../../../../../../components/tekstomrade/parser/domain';
import { parseTekst } from '../../../../../../components/tag-input/tag-input';
import styled from 'styled-components';
import { Knapp } from 'nav-frontend-knapper';
import theme from '../../../../../../styles/personOversiktTheme';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    tekst: StandardTekster.Tekst | undefined;
    locale: string;
    sokefelt: FieldState;
    highlightRule: Rule;
}

const Tag = styled(({ highlight, ...rest }) => <Knapp {...rest} />)`
    padding: 0.25rem 0.5rem;
    margin-right: 0.25rem;
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
    const tittelId = useRef(guid());

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
                    {highlight ? <em>#{tag}</em> : `#${tag}`}
                    <span className="sr-only"> - klikk for å legge til tag i søkefelt</span>
                </Tag>
            );
        });
    return (
        <section className="tags" aria-labelledby={tittelId.current}>
            <h3 className="sr-only" id={tittelId.current}>
                Tags
            </h3>
            {tagElements}
        </section>
    );
}

function StandardTekstPreview({ tekst, locale, sokefelt, highlightRule }: Props) {
    const tittelId = useRef(guid());

    if (!erGyldigValg(tekst, locale)) {
        return <PreviewStyle />;
    }

    return (
        <PreviewStyle aria-hidden={'true'}>
            <article aria-labelledby={tittelId.current}>
                <h3 className="sr-only" id={tittelId.current}>
                    Forhåndsvisning
                </h3>
                <Systemtittel tag="h4" className="blokk-xs">
                    {tekst && tekst.overskrift}
                </Systemtittel>
                <Tekstomrade rules={[highlightRule, ...defaultRules]} className="typo-normal blokk-m">
                    {tekst && tekst.innhold[locale]}
                </Tekstomrade>
            </article>
            <Tags valgtTekst={tekst} sokefelt={sokefelt} />
        </PreviewStyle>
    );
}

export default StandardTekstPreview;
