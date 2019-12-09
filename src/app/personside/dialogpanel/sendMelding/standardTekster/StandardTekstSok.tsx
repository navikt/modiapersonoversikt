import React, { FormEvent, ReactNode, useEffect, useState } from 'react';
import { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import NavFrontendSpinner from 'nav-frontend-spinner';
import styled from 'styled-components';
import { Feilmelding } from '../../../../../utils/Feilmelding';
import useFieldState, { FieldState } from '../../../../../utils/hooks/use-field-state';
import { erGyldigValg, sokEtterTekster } from './sokUtils';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import StandardTekstVisning from './StandardTekstVisning';
import * as StandardTekster from './domain';
import theme from '../../../../../styles/personOversiktTheme';
import TagInput from '../../../../../components/tag-input/tag-input';
import { captitalize } from '../../../../../utils/stringFormatting';
import useHotkey from '../../../../../utils/hooks/use-hotkey';
import { cyclicClamp } from '../../../../../utils/math';
import { autofullfor, AutofullforData, byggAutofullforMap, useAutoFullførData } from '../autofullforUtils';
import { useRestResource } from '../../../../../utils/customHooks';
import { hasData as restResourceHasData } from '../../../../../rest/utils/restResource';
import { useFetchWithLog } from '../../../../../utils/hooks/useFetchWithLog';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { useErKontaktsenter } from '../../../../../utils/enheterUtils';

interface Props {
    appendTekst(tekst: string): void;
}

const FormContainer = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const Spinner = styled(NavFrontendSpinner)`
    display: block;
    margin: 0 auto;
`;
const Sokefelt = styled.div`
    padding: 1rem;
    border-bottom: 1px solid ${theme.color.navGra20}
    background-color: #f5f5f5;
    
    .skjemaelement {
        max-width: calc(100% - 3rem);
        margin: 0;
    }
    .skjemaelement__label {
        ${theme.visuallyHidden}
    }
`;

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
    }, [valgtTekst, valgtLocale]);
}

function velgTekst(
    settTekst: (tekst: string) => void,
    tekst: StandardTekster.Tekst | undefined,
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
                    autofullforData.person,
                    autofullforData.kontor,
                    autofullforData.saksbehandler,
                    locale
                );
                const ferdigTekst = captitalize(autofullfor(localeTekst, nokler));
                settTekst(ferdigTekst);
            } else {
                settTekst(localeTekst);
            }
        }
    };
}

function StandardTekstSok(props: Props) {
    const inputRef = React.useRef<HTMLInputElement>();
    const standardTekster = useFetchWithLog<StandardTekster.Tekster>(
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

    useHotkey('arrowup', velg(-1), [filtrerteTekster, valgt], inputRef.current);
    useHotkey('arrowdown', velg(1), [filtrerteTekster, valgt], inputRef.current);

    let content: ReactNode = null;
    if (isPending(standardTekster)) {
        content = <Spinner type="XL" />;
    } else if (hasError(standardTekster)) {
        content = <Feilmelding feil={{ feilmelding: 'Kunne ikke laste inn standardtekster' }} />;
    } else if (hasData(standardTekster)) {
        content = (
            <StandardTekstVisning
                tekster={filtrerteTekster}
                sokefelt={sokefelt}
                valgt={valgt}
                valgtLocale={valgtLocale}
                valgtTekst={valgtTekst}
                harAutofullførData={!!autofullforData}
            />
        );
    }

    if (!restResourceHasData(personResource)) {
        return null;
    }

    return (
        <FormContainer onSubmit={velgTekst(props.appendTekst, valgtTekst, valgtLocale.input.value, autofullforData)}>
            <Sokefelt>
                <TagInput
                    {...sokefelt.input}
                    inputRef={inputRef}
                    name="standardtekstsok"
                    label="Søk etter standardtekster"
                    autoFocus={true}
                />
            </Sokefelt>
            <h3 className="sr-only" aria-live="polite">
                {filtrerteTekster.length} tekster traff søket
            </h3>
            {content}
        </FormContainer>
    );
}

export default StandardTekstSok;
