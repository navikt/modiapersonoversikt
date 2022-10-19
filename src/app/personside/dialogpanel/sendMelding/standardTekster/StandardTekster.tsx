import React, { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import useFetch, { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import styled from 'styled-components/macro';
import TagInput from '@navikt/tag-input';
import { guid } from 'nav-frontend-js-utils';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { PopoverOrientering } from 'nav-frontend-popover';
import useFieldState, { FieldState } from '../../../../../utils/hooks/use-field-state';
import { erGyldigValg, sokEtterTekster, rapporterBruk } from './sokUtils';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import StandardTekstValg from './velgTekst/StandardTekstValg';
import * as StandardTeksterModels from './domain';
import theme from '../../../../../styles/personOversiktTheme';
import { captitalize } from '../../../../../utils/string-utils';
import useHotkey from '../../../../../utils/hooks/use-hotkey';
import { cyclicClamp } from '../../../../../utils/math';
import { autofullfor, AutofullforData, byggAutofullforMap, useAutoFullforData } from '../autofullforUtils';
import LazySpinner from '../../../../../components/LazySpinner';
import AriaNotification from '../../../../../components/AriaNotification';
import { usePrevious } from '../../../../../utils/customHooks';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import saksbehandlersEnheter from '../../../../../rest/resources/saksbehandlersEnheterResource';
import persondataResource from '../../../../../rest/resources/persondataResource';

interface Props {
    sokefelt: FieldState;
    appendTekst(tekst: string): void;
}

const StyledForm = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Spinner = styled(LazySpinner)`
    display: block;
    margin: 0 auto;
`;

const SokefeltStyledNav = styled.nav`
    padding: 1rem;
    padding-right: 4rem;
    border-bottom: 1px solid ${theme.color.navGra20};
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    > *:first-child {
        flex-grow: 1;
    }
    .skjemaelement {
        max-width: calc(100% - 3rem);
        margin: 0;
    }
    .skjemaelement__label {
        ${theme.visuallyHidden}
    }
    .hjelpetekst {
        margin-left: 1.25rem;
    }
`;

function useDefaultValgtTekst(tekster: Array<StandardTeksterModels.Tekst>, valgt: FieldState) {
    useEffect(() => {
        if (valgt.input.value === '' && tekster.length > 0) {
            valgt.setValue(tekster[0].id);
        } else {
            const harValgtTekst = tekster.map((tekst) => tekst.id).includes(valgt.input.value);
            if (!harValgtTekst && tekster.length > 0) {
                valgt.setValue(tekster[0].id);
            }
        }
    }, [valgt, tekster]);
}

function useDefaultValgtLocale(valgtTekst: StandardTeksterModels.Tekst | undefined, valgtLocale: FieldState) {
    useEffect(() => {
        if (valgtTekst) {
            const locales = Object.keys(valgtTekst.innhold);
            if (!locales.includes(valgtLocale.input.value)) {
                valgtLocale.setValue(locales[0]);
            }
        }
    }, [valgtTekst, valgtLocale]);
}

function velgTekst(
    settTekst: (tekst: string) => void,
    tekst: StandardTeksterModels.Tekst | undefined,
    locale: string,
    autofullforData?: AutofullforData
) {
    return (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (erGyldigValg(tekst, locale)) {
            rapporterBruk(tekst);
            const localeTekst: string = tekst.innhold[locale]?.trim();
            if (autofullforData) {
                const nokler = byggAutofullforMap(
                    locale,
                    autofullforData.enhet,
                    autofullforData.person,
                    autofullforData.saksbehandler
                );
                const ferdigTekst = captitalize(autofullfor(localeTekst, nokler));
                settTekst(ferdigTekst);
            } else {
                settTekst(localeTekst);
            }
        }
    };
}

function StandardTekster(props: Props) {
    const sokRef = React.useRef<HTMLElement>(null);
    const standardTekster = useFetch<StandardTeksterModels.Tekster>(
        '/modiapersonoversikt/proxy/modia-skrivestotte/skrivestotte'
    );
    const debouncedSokefelt = useDebounce(props.sokefelt.input.value, 250);
    const [filtrerteTekster, settFiltrerteTekster] = useState(() =>
        sokEtterTekster(standardTekster, debouncedSokefelt)
    );
    const valgt = useFieldState('');
    const valgtLocale = useFieldState('');
    const valgtTekst = filtrerteTekster.find((tekst) => tekst.id === valgt.input.value);
    const persondata = persondataResource.useFetch();
    const enheterResource = saksbehandlersEnheter.useFetch();
    const autofullforData = useAutoFullforData();
    const sokeFeltId = useRef(guid());
    const [ariaNotification, setAriaNotification] = useState('');
    const hjelpetekstID = useRef(guid());

    useDefaultValgtLocale(valgtTekst, valgtLocale);
    useDefaultValgtTekst(filtrerteTekster, valgt);

    useEffect(() => {
        settFiltrerteTekster(sokEtterTekster(standardTekster, debouncedSokefelt));
    }, [settFiltrerteTekster, standardTekster, debouncedSokefelt]);

    const prevFiltreteTekster = usePrevious(filtrerteTekster);
    useEffect(() => {
        if (prevFiltreteTekster !== filtrerteTekster) {
            valgt.setValue(filtrerteTekster[0]?.id || '');
        }
    }, [filtrerteTekster, valgt, prevFiltreteTekster]);

    useEffect(() => {
        if (sokRef.current?.contains(document.activeElement)) {
            const index = filtrerteTekster.findIndex((tekst) => tekst.id === valgt.input.value);
            const ariaTekst = `${index + 1} ${valgtTekst?.overskrift}: ${valgtTekst?.innhold[valgtLocale.input.value]}`;
            valgtTekst && setAriaNotification(ariaTekst);
        }
    }, [valgtLocale, valgtTekst, filtrerteTekster, valgt]);

    const velg = (offset: number) => () => {
        const index = filtrerteTekster.findIndex((tekst) => tekst.id === valgt.input.value);
        if (index !== -1) {
            const nextIndex = cyclicClamp(index + offset, filtrerteTekster.length);
            const nextTekst = filtrerteTekster[nextIndex];
            valgt.setValue(nextTekst.id);
        }
    };

    useHotkey('arrowup', velg(-1), [filtrerteTekster, valgt], 'ForrigeStandardtekst', sokRef.current || undefined);
    useHotkey('arrowdown', velg(1), [filtrerteTekster, valgt], 'NesteStandardtekst', sokRef.current || undefined);

    let content: ReactNode = null;
    if (isPending(standardTekster)) {
        content = <Spinner type="XL" />;
    } else if (hasError(standardTekster)) {
        content = <SkjemaelementFeilmelding>Kunne ikke laste inn standardtekster</SkjemaelementFeilmelding>;
    } else if (hasData(standardTekster)) {
        content = (
            <StandardTekstValg
                tekster={filtrerteTekster}
                sokefelt={props.sokefelt}
                valgt={valgt}
                valgtLocale={valgtLocale}
                valgtTekst={valgtTekst}
                harAutofullforData={!!autofullforData}
            />
        );
    }

    if (persondata.isLoading || enheterResource.isLoading) {
        return <LazySpinner type={'M'} />;
    } else if (persondata.isError || enheterResource.isError) {
        return <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>;
    }

    return (
        <StyledForm onSubmit={velgTekst(props.appendTekst, valgtTekst, valgtLocale.input.value, autofullforData)}>
            <h2 className="sr-only">Standardtekster</h2>
            <SokefeltStyledNav aria-labelledby={sokeFeltId.current} ref={sokRef}>
                <TagInput
                    {...props.sokefelt.input}
                    name="standardtekstsok"
                    label="Søk etter standardtekster"
                    autoFocus={true}
                    id={sokeFeltId.current}
                    autoComplete="off"
                />
                <Hjelpetekst id={hjelpetekstID.current} type={PopoverOrientering.UnderHoyre}>
                    Filtrer på tags ved å skrive "#eksempel" + mellomrom
                </Hjelpetekst>
            </SokefeltStyledNav>
            {content}
            <AriaNotification ariaLive={'assertive'} beskjed={ariaNotification} />
        </StyledForm>
    );
}

export default StandardTekster;
