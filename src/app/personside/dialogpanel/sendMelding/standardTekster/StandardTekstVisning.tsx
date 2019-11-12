import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Tekstomrade, {
    createDynamicHighligtingRule,
    LinkRule,
    ParagraphRule
} from '../../../../../components/tekstomrade/tekstomrade';
import { parseTekst } from '../../../../../components/tag-input/tag-input';
import { FieldState } from '../../../../../utils/hooks/use-field-state';
import * as StandardTekster from './domain';
import LocaleVelger from './LocaleVelger';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import useAlwaysInViewport from '../../../../../utils/hooks/use-always-in-viewport';
import { Rule } from '../../../../../components/tekstomrade/parser/domain';
import { erGyldigValg } from './sokUtils';

interface Props {
    tekster: Array<StandardTekster.Tekst>;
    sokefelt: FieldState;
    valgt: FieldState;
    valgtLocale: FieldState;
    valgtTekst?: StandardTekster.Tekst;
}

const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    b {
        font-weight: bolder !important;
    }
    em {
        font-style: normal;
        ${theme.highlight}
    }
`;
const Liste = styled.div`
    flex: 0;
    flex-basis: 35%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-right: 1px solid ${theme.color.navGra20};
    background-color: #f5f5f5;
`;
const ListeElement = styled.div`
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
const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const PreviewWrapper = styled.div`
    padding: 1rem;
    flex: 1;
    word-break: break-word;
    overflow-y: scroll;
    border-bottom: 1px solid ${theme.color.navGra20};
`;
const VelgTekst = styled.div`
    padding: 1rem;
`;
const VelgKnapp = styled(Hovedknapp)`
    float: right;
`;
const LocaleVelgerContainer = styled.div`
    float: left;
    .skjemaelement {
        margin: 0;
    }
`;

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

function TekstValg({
    tekst,
    valgt,
    highlightRule
}: {
    tekst: StandardTekster.Tekst;
    valgt: FieldState;
    highlightRule: Rule;
}) {
    const checked = tekst.id === valgt.input.value;
    const onChange = valgt.input.onChange;

    return (
        <ListeElement>
            <input type="radio" name="tekstvalg" id={tekst.id} value={tekst.id} onChange={onChange} checked={checked} />
            <label htmlFor={tekst.id}>
                <Tekstomrade as="span" rules={[highlightRule]}>
                    {tekst.overskrift}
                </Tekstomrade>
            </label>
        </ListeElement>
    );
}

function Tags({ valgtTekst, sokefelt }: { valgtTekst?: StandardTekster.Tekst; sokefelt: FieldState }) {
    if (!valgtTekst) {
        return null;
    }

    const { tags } = parseTekst(sokefelt.input.value);
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

interface PreviewProps {
    tekst: StandardTekster.Tekst | undefined;
    locale: string;
    sokefelt: FieldState;
    highlightRule: Rule;
}

function Preview({ tekst, locale, sokefelt, highlightRule }: PreviewProps) {
    if (!erGyldigValg(tekst, locale)) {
        return <PreviewWrapper />;
    }
    return (
        <PreviewWrapper>
            <h3 className="sr-only">Forhåndsvisning</h3>
            <Systemtittel className="blokk-xs">{tekst && tekst.overskrift}</Systemtittel>
            <Tekstomrade rules={[ParagraphRule, highlightRule, LinkRule]} className="typo-normal blokk-m">
                {tekst && tekst.innhold[locale]}
            </Tekstomrade>
            <Tags valgtTekst={tekst} sokefelt={sokefelt} />
        </PreviewWrapper>
    );
}

function StandardTekstVisning(props: Props) {
    const { valgt, valgtLocale, valgtTekst, sokefelt, tekster } = props;

    const { tags, text } = parseTekst(sokefelt.input.value);
    const highlightRule = createDynamicHighligtingRule(tags.concat(text.split(' ')));
    const tekstElementer = tekster.map(tekst => (
        <TekstValg key={tekst.id} tekst={tekst} valgt={valgt} highlightRule={highlightRule} />
    ));

    useAlwaysInViewport('.standardtekster__liste input:checked', [valgtTekst, props.tekster]);

    return (
        <Container>
            <h3 className="sr-only">Standardtekster</h3>
            <Liste className="standardtekster__liste">{tekstElementer}</Liste>
            <PreviewContainer>
                <Preview
                    tekst={valgtTekst}
                    locale={valgtLocale.input.value}
                    sokefelt={sokefelt}
                    highlightRule={highlightRule}
                />
                <VelgTekst>
                    <LocaleVelgerContainer>
                        <LocaleVelger tekst={valgtTekst} valgt={valgtLocale} />
                    </LocaleVelgerContainer>
                    <VelgKnapp>Velg</VelgKnapp>
                </VelgTekst>
            </PreviewContainer>
        </Container>
    );
}

export default StandardTekstVisning;
