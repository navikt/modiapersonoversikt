import React, { useMemo } from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
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
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import useAlwaysInViewport from '../../../../../utils/hooks/use-always-in-viewport';
import { Rule } from '../../../../../components/tekstomrade/parser/domain';
import { erGyldigValg } from './sokUtils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import TekstListeElement from './TekstListeElement';

interface Props {
    tekster: Array<StandardTekster.Tekst>;
    sokefelt: FieldState;
    valgt: FieldState;
    valgtLocale: FieldState;
    valgtTekst?: StandardTekster.Tekst;
    harAutofullførData: boolean;
}

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    height: 0; // hack for å få flex til å funke som vi vil her, bør skrives om til grid
    b {
        font-weight: bolder !important;
    }
    em {
        font-style: normal;
        ${theme.highlight}
    }
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

const StyledAlertstripeAdvarsel = styled(AlertStripeAdvarsel)`
    margin-bottom: 0.5rem;
`;

const TreffStyle = styled(Element)`
    padding: ${pxToRem(7)} ${pxToRem(15)};
    border-bottom: ${theme.border.skilleSvak};
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
            <Systemtittel tag="h3" className="blokk-xs">
                {tekst && tekst.overskrift}
            </Systemtittel>
            <Tekstomrade rules={[ParagraphRule, highlightRule, LinkRule]} className="typo-normal blokk-m">
                {tekst && tekst.innhold[locale]}
            </Tekstomrade>
            <Tags valgtTekst={tekst} sokefelt={sokefelt} />
        </PreviewWrapper>
    );
}

function StandardTekstVisning(props: Props) {
    const { valgt, valgtLocale, valgtTekst, sokefelt, tekster } = props;

    const { tags, text } = useMemo(() => parseTekst(sokefelt.input.value), [sokefelt.input.value]);
    const highlightRule = useMemo(() => createDynamicHighligtingRule(tags.concat(text.split(' '))), [tags, text]);

    const tekstElementer = tekster.map(tekst => (
        <TekstListeElement
            key={tekst.id}
            tekst={tekst}
            onChange={valgt.input.onChange}
            valgt={tekst.id === valgt.input.value}
            highlightRule={highlightRule}
        />
    ));

    useAlwaysInViewport('.standardtekster__liste input:checked', [valgtTekst, props.tekster]);

    return (
        <Container>
            <ListeStyle>
                <TreffStyle tag="h3" aria-live="polite">
                    Samtalemaler ({tekstElementer.length})
                </TreffStyle>
                <ul className="standardtekster__liste">{tekstElementer}</ul>
            </ListeStyle>
            <PreviewContainer>
                <Preview
                    tekst={valgtTekst}
                    locale={valgtLocale.input.value}
                    sokefelt={sokefelt}
                    highlightRule={highlightRule}
                />
                <VelgTekst>
                    {!props.harAutofullførData && (
                        <StyledAlertstripeAdvarsel>
                            Kunne ikke laste autofullfør-data. Du må gå over teksten og fylle inn manuelt (feks:
                            [bruker.navn]).
                        </StyledAlertstripeAdvarsel>
                    )}
                    <div>
                        <LocaleVelgerContainer>
                            <LocaleVelger tekst={valgtTekst} valgt={valgtLocale} />
                        </LocaleVelgerContainer>
                        <VelgKnapp>Velg</VelgKnapp>
                    </div>
                </VelgTekst>
            </PreviewContainer>
        </Container>
    );
}

export default StandardTekstVisning;
