import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import TraadListeElement from './TraadListeElement';
import { LenkeKnapp } from '../../../../../components/common-styled-components';
import SlaaSammenOppgaverKnapp from './besvarflere/SlåSammenOppgaverKnapp';
import usePaginering from '../../../../../utils/hooks/usePaginering';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import { guid } from 'nav-frontend-js-utils';
import usePrinter from '../../../../../utils/UsePrinter';
import PrintKnapp from '../../../../../components/PrintKnapp';
import MeldingerPrintMarkup from '../../../../../utils/MeldingerPrintMarkup';
import Panel from 'nav-frontend-paneler';

interface Props {
    traader: Traad[];
    traaderEtterSokOgFiltrering: Traad[];
    valgtTraad: Traad;
    sokeord: string;
    setSokeord: (newSokeord: string) => void;
    skjulVarsler: boolean;
    setSkjulVarsler: (skjul: boolean) => void;
}

const StyledPanel = styled(Panel)`
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
    padding: ${theme.margin.layout} ${theme.margin.layout} 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    padding: 0 ${theme.margin.layout};
    label {
        ${theme.visuallyHidden};
    }
`;

const PrevNextButtonsStyling = styled.div`
    padding: ${theme.margin.layout};
    border-top: ${theme.border.skilleSvak};
`;

const StyledCheckbox = styled(Checkbox)`
    padding: ${theme.margin.layout};
    margin-bottom: 0 !important;
`;

export const valgtMeldingKlasse = 'valgt_melding';

function PrintAlle({ traader }: { traader: Traad[] }) {
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;

    return (
        <>
            <PrintKnapp tittel={'Skriv ut alle meldinger'} onClick={() => printer?.triggerPrint()} />
            <PrinterWrapper>
                {traader.map(traad => (
                    <MeldingerPrintMarkup key={traad.traadId} valgtTraad={traad} />
                ))}
            </PrinterWrapper>
        </>
    );
}
function TraadListe(props: Props) {
    const inputRef = React.useRef<HTMLInputElement>();
    const paginering = usePaginering(props.traaderEtterSokOgFiltrering, 50, 'melding', props.valgtTraad);
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

    const visAlleMeldingerKnapp = props.sokeord !== '' && (
        <LenkeKnapp
            onClick={() => {
                props.setSokeord('');
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }}
        >
            Vis alle meldinger
        </LenkeKnapp>
    );

    const meldingTekst = props.traader.length === 1 ? 'melding' : 'meldinger';
    const soketreffTekst =
        props.traaderEtterSokOgFiltrering.length !== props.traader.length
            ? `Søket traff ${props.traaderEtterSokOgFiltrering.length} av ${props.traader.length} ${meldingTekst}`
            : `Totalt ${props.traader.length} ${meldingTekst}`;

    const onMeldingerSok = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sokeOrd = event.target.value;
        const brukerStarterEtNyttSøk = props.sokeord === '' && sokeOrd.length > 0;
        if (brukerStarterEtNyttSøk) {
            loggEvent('SøkIMeldinger', 'Meldinger');
        }
        props.setSokeord(sokeOrd);
    };

    const handleSkjulVarsler = () => {
        !props.skjulVarsler && loggEvent('SkjulVarsler', 'Meldinger');
        props.setSkjulVarsler(!props.skjulVarsler);
    };

    return (
        <nav aria-label="Velg melding">
            <StyledPanel>
                <SlaaSammenOppgaverKnapp traader={props.traader} />
                <article aria-labelledby={sokTittelId.current}>
                    <h3 id={sokTittelId.current} className="sr-only">
                        Filtrer meldinger
                    </h3>
                    <InputStyle>
                        <Input
                            inputRef={
                                ((ref: HTMLInputElement) => {
                                    inputRef.current = ref;
                                }) as any
                            }
                            value={props.sokeord}
                            onChange={onMeldingerSok}
                            label={'Søk etter melding'}
                            placeholder={'Søk etter melding'}
                            className={'move-input-label'}
                        />
                    </InputStyle>
                    <SpaceBetween>
                        <StyledCheckbox
                            label="Skjul varsler"
                            checked={props.skjulVarsler}
                            onChange={handleSkjulVarsler}
                        />
                        <PrintAlle traader={props.traader} />
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
                    {paginering.currentPage.map(traad => (
                        <TraadListeElement
                            traad={traad}
                            key={traad.traadId}
                            erValgt={traad === props.valgtTraad}
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
