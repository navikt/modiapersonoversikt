import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import TraadListeElement from 'src/app/personside/infotabs/meldinger/traadliste/TraadListeElement';
import PrintKnapp from 'src/components/PrintKnapp';
import { LenkeKnapp } from 'src/components/common-styled-components';
import { useMeldingsok } from 'src/context/meldingsok';
import type { Traad } from 'src/models/meldinger/meldinger';
import theme from 'src/styles/personOversiktTheme';
import { filterType, trackFilterEndret } from 'src/utils/analytics';
import usePaginering from 'src/utils/hooks/usePaginering';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import MeldingerPrintMarkup from 'src/utils/print/MeldingerPrintMarkup';
import usePrinter from 'src/utils/print/usePrinter';
import styled from 'styled-components';

interface Props {
    traader: Traad[];
    traaderEtterSokOgFiltrering: Traad[];
    valgtTraad: Traad;
}

const StyledPanel = styled(Panel)`
  padding: 0rem;
  ol {
    list-style: none;
  }
`;

const SokVerktøyStyle = styled.div`
  padding: 0 ${theme.margin.layout} ${theme.margin.layout};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SpaceBetween = styled.div`
  padding: 0.5rem;
  button {
    padding: 0;
  }
`;
const StyledOl = styled.ol`
  > * {
    border-top: ${theme.border.skille};
  }
  &:focus {
    ${theme.focus};
  }
`;

const InputStyle = styled.div`
  padding: ${theme.margin.layout} ${theme.margin.layout} 0;
  .skjemaelement {
    margin-bottom: 0.2rem;
  }
  .skjemaelement__label {
    ${theme.visuallyHidden};
  }
`;

const PagineringStyling = styled.div`
  padding: ${theme.margin.layout};
  label {
    ${theme.visuallyHidden};
  }
`;

const PrevNextButtonsStyling = styled.div`
  padding: ${theme.margin.layout};
  border-top: ${theme.border.skilleSvak};
`;

export const valgtMeldingKlasse = 'valgt_melding';

function PrintAlleMeldinger({ traader }: { traader: Traad[] }) {
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;

    return (
        <>
            <PrintKnapp tittel={'Skriv ut all kommunikasjon'} onClick={() => printer?.triggerPrint()} />
            <PrinterWrapper>
                {traader.map((traad) => (
                    <MeldingerPrintMarkup key={traad.traadId} valgtTraad={traad} />
                ))}
            </PrinterWrapper>
        </>
    );
}
const MemoizedPrintAlleMeldinger = React.memo(PrintAlleMeldinger);

const fieldCompareTrad = (traad: Traad) => traad.traadId;

function TraadListe(props: Props) {
    const meldingsok = useMeldingsok();
    const inputRef = React.useRef<HTMLInputElement>(undefined);
    const paginering = usePaginering(
        props.traaderEtterSokOgFiltrering,
        50,
        'melding',
        props.valgtTraad,
        fieldCompareTrad
    );
    const sokTittelId = useRef(guid());
    const listeId = useRef(guid());
    const traadListeRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        const valgtMelding = traadListeRef.current?.getElementsByClassName(valgtMeldingKlasse)[0] as HTMLInputElement;
        valgtMelding?.focus();
    }, [props.valgtTraad]);

    if (props.traader.length === 0) {
        return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
    }

    const visAlleMeldingerKnapp = meldingsok.query !== '' && (
        <LenkeKnapp
            onClick={() => {
                meldingsok.setQuery('');
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }}
        >
            Vis alle meldinger
        </LenkeKnapp>
    );

    const meldingTekst = props.traader.length === 1 ? 'kommunikasjon' : 'kommunikasjoner';
    const soketreffTekst =
        props.traaderEtterSokOgFiltrering.length !== props.traader.length
            ? `Søket traff ${props.traaderEtterSokOgFiltrering.length} av ${props.traader.length} ${meldingTekst}`
            : `Totalt ${props.traader.length} ${meldingTekst}`;

    const onMeldingerSok = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const brukerStarterEtNyttSøk = meldingsok.query === '' && value.length > 0;
        if (brukerStarterEtNyttSøk) {
            loggEvent('SøkIMeldinger', 'Meldinger');
            trackFilterEndret('meldinger', filterType.SOK);
        }
        meldingsok.setQuery(value);
    };

    return (
        <nav aria-label="Velg melding">
            <StyledPanel>
                <article aria-labelledby={sokTittelId.current}>
                    <h3 id={sokTittelId.current} className="sr-only">
                        Filtrer meldinger
                    </h3>
                    <InputStyle>
                        <Input
                            inputRef={
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                ((ref: HTMLInputElement) => {
                                    inputRef.current = ref;
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    //biome-ignore lint/suspicious/noExplicitAny: biome migration
                                }) as any
                            }
                            value={meldingsok.query}
                            onChange={onMeldingerSok}
                            label={'Søk etter kommunikasjon'}
                            placeholder={'Søk etter kommunikasjon'}
                            className={'move-input-label'}
                        />
                    </InputStyle>
                    <SpaceBetween>
                        <MemoizedPrintAlleMeldinger traader={props.traader} />
                    </SpaceBetween>
                    <SokVerktøyStyle>
                        <Normaltekst aria-live="assertive">{soketreffTekst}</Normaltekst>
                        {visAlleMeldingerKnapp}
                    </SokVerktøyStyle>
                </article>
                <h3 className="sr-only" id={listeId.current}>
                    Meldingsliste - {soketreffTekst}
                </h3>
                {paginering.pageSelect && <PagineringStyling>{paginering.pageSelect}</PagineringStyling>}
                <StyledOl aria-labelledby={listeId.current} tabIndex={-1} ref={traadListeRef}>
                    {paginering.currentPage.map((traad) => (
                        <TraadListeElement
                            traad={traad}
                            key={traad.traadId}
                            erValgt={traad.traadId === props.valgtTraad.traadId}
                            listeId="traadliste-meldinger"
                        />
                    ))}
                </StyledOl>
                {paginering.prevNextButtons && (
                    <PrevNextButtonsStyling>{paginering.prevNextButtons}</PrevNextButtonsStyling>
                )}
            </StyledPanel>
        </nav>
    );
}

export default TraadListe;
