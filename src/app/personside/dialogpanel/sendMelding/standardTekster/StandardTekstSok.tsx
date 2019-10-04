import React, { ReactNode, useEffect, useState } from 'react';
import useFetch, { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import NavFrontendSpinner from 'nav-frontend-spinner';
import styled from 'styled-components';
import { Feilmelding } from '../../../../../utils/Feilmelding';
import useFieldState, { FieldState } from '../../../../../utils/hooks/use-field-state';
import { autofullfor, byggAutofullforMap, erGyldigValg, sokEtterTekster } from './sokUtils';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import StandardTekstVisning from './StandardTekstVisning';
import * as StandardTekster from './domain';
import theme from '../../../../../styles/personOversiktTheme';
import TagInput from '../../../../../components/tag-input/tag-input';
import { captitalize } from '../../../../../utils/stringFormatting';
import MultiRestResourceConsumer from '../../../../../rest/consumer/MultiRestResourceConsumer';
import useHotkey from '../../../../../utils/hooks/use-hotkey';
import { cyclicClamp } from '../../../../../utils/math';

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
    }, [valgtTekst, valgtLocale.input.value]);
}

function velgTekst(
    settTekst: (tekst: string) => void,
    tekst: StandardTekster.Tekst | undefined,
    locale: string,
    data: StandardTekster.AutofullforData
) {
    return () => {
        if (erGyldigValg(tekst, locale)) {
            const localeTekst = tekst.innhold[locale];
            const nokler = byggAutofullforMap(data.person, data.kontor, data.saksbehandler, locale);
            const ferdigTekst = captitalize(autofullfor(localeTekst, nokler));

            settTekst(ferdigTekst);
        }
    };
}

function StandardTekstSok(props: Props) {
    const inputRef = React.useRef<HTMLInputElement>();
    const data = useFetch<StandardTekster.Tekster>('/modiapersonoversikt-skrivestotte/skrivestotte');
    const sokefelt = useFieldState('');
    const debouncedSokefelt = useDebounce(sokefelt.input.value, 100);
    const [filtrerteTekster, settFiltrerteTekster] = useState(() => sokEtterTekster(data, debouncedSokefelt));
    const valgt = useFieldState('');
    const valgtLocale = useFieldState('');
    const valgtTekst = filtrerteTekster.find(tekst => tekst.id === valgt.input.value);

    useDefaultValgtLocale(valgtTekst, valgtLocale);
    useDefaultValgtTekst(filtrerteTekster, valgt);

    useEffect(() => {
        settFiltrerteTekster(sokEtterTekster(data, debouncedSokefelt));
    }, [settFiltrerteTekster, data, debouncedSokefelt]);

    const velg = (offset: number) => () => {
        const index = filtrerteTekster.findIndex(tekst => tekst.id === valgt.input.value);
        if (index !== -1) {
            const nextIndex = cyclicClamp(index + offset, filtrerteTekster.length);
            const nextTekst = filtrerteTekster[nextIndex];
            valgt.setValue(nextTekst.id);
        }
    };

    useHotkey('arrowup', velg(-1), [filtrerteTekster, valgt.input.value, valgt.setValue], inputRef.current);
    useHotkey('arrowdown', velg(1), [filtrerteTekster, valgt.input.value, valgt.setValue], inputRef.current);

    let content: ReactNode = null;
    if (isPending(data)) {
        content = <Spinner type="XL" />;
    } else if (hasError(data)) {
        content = <Feilmelding feil={{ feilmelding: 'Kunne ikke laste inn standardtekster' }} />;
    } else if (hasData(data)) {
        content = (
            <StandardTekstVisning
                tekster={filtrerteTekster}
                sokefelt={sokefelt}
                valgt={valgt}
                valgtLocale={valgtLocale}
                valgtTekst={valgtTekst}
            />
        );
    }

    return (
        <>
            <MultiRestResourceConsumer<StandardTekster.AutofullforData>
                getResource={restResources => ({
                    person: restResources.personinformasjon,
                    saksbehandler: restResources.innloggetSaksbehandler,
                    kontor: restResources.brukersNavKontor
                })}
            >
                {(data: StandardTekster.AutofullforData) => (
                    <FormContainer onSubmit={velgTekst(props.appendTekst, valgtTekst, valgtLocale.input.value, data)}>
                        <Sokefelt>
                            <TagInput
                                {...sokefelt.input}
                                inputRef={inputRef}
                                name="standardtekstsok"
                                label="Søk etter standardtekster"
                                autoFocus={true}
                            />
                        </Sokefelt>
                        {content}
                    </FormContainer>
                )}
            </MultiRestResourceConsumer>
        </>
    );
}

export default StandardTekstSok;
