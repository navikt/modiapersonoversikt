import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoSynkende } from '../../../../../utils/dateUtils';
import TraadListeElement from './TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { meldingstittel, saksbehandlerTekst, sisteSendteMelding } from '../utils/meldingerUtils';
import { Input } from 'nav-frontend-skjema';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import { useMemo } from 'react';
import { Element } from 'nav-frontend-typografi';
import EkspanderKnapp from '../../../../../components/EkspanderKnapp';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';
import KnappBase from 'nav-frontend-knapper';
import { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import BesvarFlere from './besvarflere/BesvarFlere';

interface Props {
    traader: Traad[];
    valgtTraad?: Traad;
    sokeord: string;
    setSokeord: (newSokeord: string) => void;
}

const PanelStyle = styled.nav`
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
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;
const InputStyle = styled.div`
    padding: ${theme.margin.layout} ${theme.margin.layout} 0;
`;

export function sokEtterMeldinger(traader: Traad[], query: string): Traad[] {
    const words = query.split(' ');
    return traader.filter(traad => {
        return traad.meldinger.some(melding => {
            const fritekst = melding.fritekst;
            const tittel = meldingstittel(melding);
            const saksbehandler = saksbehandlerTekst(melding.skrevetAv);

            const sokbarTekst = (fritekst + tittel + saksbehandler).toLowerCase();
            return words.every(word => sokbarTekst.includes(word.toLowerCase()));
        });
    });
}

function TraadListe(props: Props) {
    const debouncedSokeord = useDebounce(props.sokeord, 200);
    const traadKomponenter = useMemo(
        () =>
            sokEtterMeldinger(props.traader, debouncedSokeord)
                .sort(datoSynkende(traad => sisteSendteMelding(traad).opprettetDato))
                .map(traad => (
                    <TraadListeElement traad={traad} key={traad.traadId} erValgt={traad === props.valgtTraad} />
                )),
        [debouncedSokeord, props.traader]
    );

    if (props.traader.length === 0) {
        return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
    }

    return (
        <PanelStyle>
            <SlaaSammenTraaderKnapp traader={props.traader} />
            <InputStyle>
                <Input
                    value={props.sokeord}
                    onChange={event => props.setSokeord(event.target.value)}
                    label={'Søk etter melding'}
                    className={'move-input-label'}
                />
            </InputStyle>
            <SokVerktøyStyle>
                {traadKomponenter.length !== props.traader.length ? (
                    <Element>
                        Søket traff {traadKomponenter.length} av {props.traader.length} tråder
                    </Element>
                ) : (
                    <Element>Totalt {props.traader.length} tråder</Element>
                )}
                <EkspanderKnapp onClick={() => props.setSokeord('')} tittel={'Nullstill søk'} />
            </SokVerktøyStyle>
            <TraadListeStyle>{traadKomponenter}</TraadListeStyle>
        </PanelStyle>
    );
}

function SlaaSammenTraaderKnapp({ traader }: { traader: Traad[] }) {
    const [apen, settApen] = useState(false);
    const tildelteOppgaver = useTildelteOppgaver();

    const tildelteOppgaverIdListe = tildelteOppgaver.paaBruker.map(oppgave => oppgave.henvendelseid);

    const traaderMedTildelteOppgaver = traader.filter(traad => tildelteOppgaverIdListe.includes(traad.traadId));

    //const traaderSomHarDelsvar = traaderMedTildelteOppgaver.filter(traad => harDelsvar(traad)); TODO: Bruk denne når du er ferdig

    if (traaderMedTildelteOppgaver.length > 1) {
        return (
            <>
                <KnappBase type={'hoved'} onClick={() => settApen(true)}>
                    Besvar flere
                </KnappBase>
                <ModalWrapper contentLabel={'Besvar flere'} onRequestClose={() => settApen(false)} isOpen={apen}>
                    <BesvarFlere
                        traader={traaderMedTildelteOppgaver.sort(
                            datoSynkende(traad => sisteSendteMelding(traad).opprettetDato)
                        )}
                    />
                </ModalWrapper>
            </>
        );
    } else {
        return null;
    }
}

export default TraadListe;
