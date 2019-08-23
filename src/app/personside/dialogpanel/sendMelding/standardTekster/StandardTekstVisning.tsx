import React, { useEffect } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Tekstomrade, {
    createDynamicHighligtingRule,
    LinkRule,
    ParagraphRule
} from '../../../../../components/tekstomrade/tekstomrade';
import { parseTekst } from '../../../../../components/tag-input/tag-input';
import useFieldState, { FieldState } from '../../../../../utils/hooks/use-field-state';
import * as StandardTekster from './domain';
import LocaleVelger from './LocaleVelger';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import useAlwaysInViewport from '../../../../../utils/hooks/use-always-in-viewport';
import { Rule } from '../../../../../components/tekstomrade/parser/domain';

interface Props {
    tekster: Array<StandardTekster.Tekst>;
    sokefelt: FieldState;
    appendTekst(tekst: string, locale: string): void;
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
        background-color: #eed28c;
        border-radius: 10px;
        padding: 0 5px;
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

const Tag = styled(Knapp)`
    padding: 0.25rem 0.5rem;
    margin-right: 0.25rem;
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

function useDefaultValgtTekst(tekster: Array<StandardTekster.Tekst>, valgt: FieldState) {
    useEffect(() => {
        if (valgt.input.value === '' && tekster.length > 0) {
            valgt.setValue(tekster[0].id);
        } else {
            const harValgtTekst = tekster.map(tekst => tekst.id).includes(valgt.input.value);
            if (!harValgtTekst && tekster.length > 0) {
                valgt.setValue(tekster[0].id);
            }
        }
    }, [valgt, tekster]);
}

function useDefaultValgtLocale(valgtTekst: StandardTekster.Tekst | undefined, valgtLocale: FieldState) {
    useEffect(() => {
        if (valgtTekst) {
            const locales = Object.keys(valgtTekst.innhold);
            if (!locales.includes(valgtLocale.input.value)) {
                valgtLocale.setValue(locales[0]);
            }
        }
    }, [valgtTekst]);
}

function Tags({ valgtTekst, sokefelt }: { valgtTekst?: StandardTekster.Tekst; sokefelt: FieldState }) {
    if (!valgtTekst) {
        return null;
    }

    const tagElements = valgtTekst.tags
        .filter(tag => tag.length > 0)
        .filter((tag, index, list) => list.indexOf(tag) === index)
        .map(tag => (
            <Tag
                mini
                key={tag}
                className="tag blokk-xxxs"
                onClick={() => sokefelt.setValue(`#${tag} ${sokefelt.input.value}`)}
            >
                {tag}
            </Tag>
        ));
    return <div className="tags">{tagElements}</div>;
}

function kanVises(tekst: StandardTekster.Tekst | undefined, locale: string): tekst is StandardTekster.Tekst {
    if (!tekst) {
        return false;
    }
    const locales = Object.keys(tekst.innhold);
    return locales.includes(locale);
}

interface PreviewProps {
    tekst: StandardTekster.Tekst | undefined;
    locale: string;
    sokefelt: FieldState;
    highlightRule: Rule;
}

function Preview({ tekst, locale, sokefelt, highlightRule }: PreviewProps) {
    if (!kanVises(tekst, locale)) {
        return <PreviewWrapper />;
    }
    return (
        <PreviewWrapper>
            <Systemtittel className="blokk-xs">{tekst && tekst.overskrift}</Systemtittel>
            <Tekstomrade rules={[ParagraphRule, highlightRule, LinkRule]} className="typo-normal blokk-m">
                {tekst && tekst.innhold[locale]}
            </Tekstomrade>
            <Tags valgtTekst={tekst} sokefelt={sokefelt} />
        </PreviewWrapper>
    );
}

function velgTekst(
    settTekst: (tekst: string, locale: string) => void,
    tekst: StandardTekster.Tekst | undefined,
    locale: string
) {
    return () => {
        if (kanVises(tekst, locale)) {
            settTekst(tekst.innhold[locale], locale);
        }
    };
}

function StandardTekstVisning(props: Props) {
    const valgt = useFieldState((props.tekster[0] && props.tekster[0].id) || '');
    const valgtLocale = useFieldState((props.tekster[0] && Object.keys(props.tekster[0].innhold)[0]) || '');
    const valgtTekst = props.tekster.find(tekst => tekst.id === valgt.input.value);
    const { tags, text } = parseTekst(props.sokefelt.input.value);
    const highlightRule = createDynamicHighligtingRule(tags.concat(text.split(' ')));
    const tekster = props.tekster.map(tekst => (
        <TekstValg key={tekst.id} tekst={tekst} valgt={valgt} highlightRule={highlightRule} />
    ));

    useDefaultValgtTekst(props.tekster, valgt);
    useDefaultValgtLocale(valgtTekst, valgtLocale);
    useAlwaysInViewport('.standardtekster__liste input:checked', [valgtTekst, props.tekster]);

    return (
        <Container>
            <Liste className="standardtekster__liste">{tekster}</Liste>
            <PreviewContainer>
                <Preview
                    tekst={valgtTekst}
                    locale={valgtLocale.input.value}
                    sokefelt={props.sokefelt}
                    highlightRule={highlightRule}
                />
                <VelgTekst>
                    <LocaleVelgerContainer>
                        <LocaleVelger tekst={valgtTekst} valgt={valgtLocale} />
                    </LocaleVelgerContainer>
                    <VelgKnapp onClick={velgTekst(props.appendTekst, valgtTekst, valgtLocale.input.value)}>
                        Velg
                    </VelgKnapp>
                </VelgTekst>
            </PreviewContainer>
        </Container>
    );
}

export default StandardTekstVisning;
