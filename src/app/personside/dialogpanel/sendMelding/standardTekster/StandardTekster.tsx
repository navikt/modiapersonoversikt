import React, { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import styled from 'styled-components/macro';
import { Feilmelding } from '../../../../../utils/Feilmelding';
import useFieldState, { FieldState } from '../../../../../utils/hooks/use-field-state';
import { erGyldigValg, sokEtterTekster } from './sokUtils';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import StandardTekstValg from './velgTekst/StandardTekstValg';
import * as StandardTeksterModels from './domain';
import theme from '../../../../../styles/personOversiktTheme';
import TagInput from '../../../../../components/tag-input/tag-input';
import { captitalize } from '../../../../../utils/stringFormatting';
import useHotkey from '../../../../../utils/hooks/use-hotkey';
import { cyclicClamp } from '../../../../../utils/math';
import { autofullfor, AutofullforData, byggAutofullforMap, useAutoFullførData } from '../autofullforUtils';
import { useFetchWithLog } from '../../../../../utils/hooks/useFetchWithLog';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { useErKontaktsenter } from '../../../../../utils/enheterUtils';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';
import LazySpinner from '../../../../../components/LazySpinner';
import { guid } from 'nav-frontend-js-utils';

interface Props {
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
    border-bottom: 1px solid ${theme.color.navGra20};
    background-color: #f5f5f5;

    .skjemaelement {
        max-width: calc(100% - 3rem);
        margin: 0;
    }
    .skjemaelement__label {
        ${theme.visuallyHidden}
    }
`;

function useDefaultValgtTekst(tekster: Array<StandardTeksterModels.Tekst>, valgt: FieldState) {
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
            loggEvent('Velg tekst', 'Standardtekster');
            const localeTekst = tekst.innhold[locale];
            if (autofullforData) {
                const nokler = byggAutofullforMap(
                    locale,
                    autofullforData.person,
                    autofullforData.kontor,
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
    const inputRef = React.useRef<HTMLInputElement>();
    const standardTekster = useFetchWithLog<StandardTeksterModels.Tekster>(
        '/modiapersonoversikt-skrivestotte/skrivestotte',
        'Standardtekster'
    );
    const erKontaktSenter = useErKontaktsenter();
    const sokefelt = useFieldState(erKontaktSenter ? '#ks ' : '');
    const debouncedSokefelt = useDebounce(sokefelt.input.value, 250);
    const [filtrerteTekster, settFiltrerteTekster] = useState(() =>
        sokEtterTekster(standardTekster, debouncedSokefelt)
    );
    const valgt = useFieldState('');
    const valgtLocale = useFieldState('');
    const valgtTekst = filtrerteTekster.find(tekst => tekst.id === valgt.input.value);
    const personResource = useRestResource(resources => resources.personinformasjon);
    const autofullforData = useAutoFullførData();
    const sokeFeltId = useRef(guid());

    useDefaultValgtLocale(valgtTekst, valgtLocale);
    useDefaultValgtTekst(filtrerteTekster, valgt);

    useEffect(() => {
        settFiltrerteTekster(sokEtterTekster(standardTekster, debouncedSokefelt));
    }, [settFiltrerteTekster, standardTekster, debouncedSokefelt]);

    const velg = (offset: number) => () => {
        const index = filtrerteTekster.findIndex(tekst => tekst.id === valgt.input.value);
        if (index !== -1) {
            const nextIndex = cyclicClamp(index + offset, filtrerteTekster.length);
            const nextTekst = filtrerteTekster[nextIndex];
            valgt.setValue(nextTekst.id);
        }
    };

    useHotkey('arrowup', velg(-1), [filtrerteTekster, valgt], 'ForrigeStandardtekst', inputRef.current);
    useHotkey('arrowdown', velg(1), [filtrerteTekster, valgt], 'NesteStandardtekst', inputRef.current);

    let content: ReactNode = null;
    if (isPending(standardTekster)) {
        content = <Spinner type="XL" />;
    } else if (hasError(standardTekster)) {
        content = <Feilmelding feil={{ feilmelding: 'Kunne ikke laste inn standardtekster' }} />;
    } else if (hasData(standardTekster)) {
        content = (
            <StandardTekstValg
                tekster={filtrerteTekster}
                sokefelt={sokefelt}
                valgt={valgt}
                valgtLocale={valgtLocale}
                valgtTekst={valgtTekst}
                harAutofullførData={!!autofullforData}
            />
        );
    }

    if (!personResource.data) {
        return personResource.placeholder;
    }

    return (
        <StyledForm onSubmit={velgTekst(props.appendTekst, valgtTekst, valgtLocale.input.value, autofullforData)}>
            <h2 className="sr-only">Standardtekster</h2>
            <SokefeltStyledNav aria-describedby={sokeFeltId.current}>
                <TagInput
                    {...sokefelt.input}
                    inputRef={inputRef}
                    name="standardtekstsok"
                    label="Søk etter standardtekster"
                    autoFocus={true}
                    id={sokeFeltId.current}
                />
            </SokefeltStyledNav>
            {content}
        </StyledForm>
    );
}

export default StandardTekster;
