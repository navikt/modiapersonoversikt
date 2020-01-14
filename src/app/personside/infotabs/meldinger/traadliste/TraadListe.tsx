import * as React from 'react';
import { useRef } from 'react';
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
import { loggEvent } from '../../../../../utils/frontendLogger';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    traader: Traad[];
    traaderEtterSokOgFiltrering: Traad[];
    valgtTraad?: Traad;
    sokeord: string;
    setSokeord: (newSokeord: string) => void;
    skjulVarsler: boolean;
    setSkjulVarsler: (skjul: boolean) => void;
}

const StyledNav = styled.nav`
    ${theme.hvittPanel};
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

const TraadListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
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

function TraadListe(props: Props) {
    const inputRef = React.useRef<HTMLInputElement>();
    const paginering = usePaginering(props.traaderEtterSokOgFiltrering, 50, 'melding', props.valgtTraad);
    const sokTittelId = useRef(guid());
    const listeId = useRef(guid());

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
        <StyledNav aria-label="Velg melding">
            <SlaaSammenOppgaverKnapp traader={props.traader} />
            <article aria-describedby={sokTittelId.current}>
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
                <StyledCheckbox label="Skjul varsler" checked={props.skjulVarsler} onChange={handleSkjulVarsler} />
                <SokVerktøyStyle>
                    <Normaltekst aria-live="assertive">{soketreffTekst}</Normaltekst>
                    {visAlleMeldingerKnapp}
                </SokVerktøyStyle>
            </article>
            <h3 className="sr-only" id={listeId.current}>
                Meldingsliste - {soketreffTekst}
            </h3>
            {paginering.pageSelect && <PagineringStyling>{paginering.pageSelect}</PagineringStyling>}
            <TraadListeStyle aria-describedby={listeId.current}>
                {paginering.currentPage.map(traad => (
                    <TraadListeElement
                        traad={traad}
                        key={traad.traadId}
                        erValgt={traad === props.valgtTraad}
                        listeId="traadliste-meldinger"
                    />
                ))}
            </TraadListeStyle>
            {paginering.prevNextButtons && (
                <PrevNextButtonsStyling>{paginering.prevNextButtons}</PrevNextButtonsStyling>
            )}
        </StyledNav>
    );
}

export default TraadListe;
