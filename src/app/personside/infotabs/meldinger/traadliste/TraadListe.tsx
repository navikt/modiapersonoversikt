import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { sisteSendteMelding, useSokEtterMeldinger } from '../utils/meldingerUtils';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import TraadListeElement from './TraadListeElement';
import { LenkeKnapp } from '../../../../../components/common-styled-components';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';
import KnappBase from 'nav-frontend-knapper';
import { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import BesvarFlere from './besvarflere/BesvarFlere';
import { datoSynkende } from '../../../../../utils/dateUtils';

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

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        padding: 0;
    }
`;

const InputStyle = styled.div`
    padding: ${theme.margin.layout} ${theme.margin.layout} 0;
`;

const KnappWrapperStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: ${theme.margin.layout} ${theme.margin.layout} 0;
`;

function TraadListe(props: Props) {
    const traaderEtterSok = useSokEtterMeldinger(props.traader, props.sokeord);

    if (props.traader.length === 0) {
        return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
    }

    const meldingTekst = props.traader.length === 1 ? 'melding' : 'meldinger';

    const soketreffTekst =
        props.sokeord.length > 0
            ? `Søket traff ${traaderEtterSok.length} av ${props.traader.length} ${meldingTekst}`
            : `Totalt ${props.traader.length} ${meldingTekst}`;

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
                <Normaltekst>{soketreffTekst}</Normaltekst>
                {props.sokeord !== '' && <LenkeKnapp onClick={() => props.setSokeord('')}>Alle meldinger</LenkeKnapp>}
            </SokVerktøyStyle>
            <TraadListeStyle>
                {traaderEtterSok.map(traad => (
                    <TraadListeElement
                        sokeord={props.sokeord}
                        traad={traad}
                        key={traad.traadId}
                        erValgt={traad === props.valgtTraad}
                    />
                ))}
            </TraadListeStyle>
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
            <KnappWrapperStyle>
                <KnappBase type={'hoved'} onClick={() => settApen(true)}>
                    Besvar flere
                </KnappBase>
                <StyledModalWrapper contentLabel={'Besvar flere'} onRequestClose={() => settApen(false)} isOpen={apen}>
                    <BesvarFlere
                        traader={traaderMedTildelteOppgaver.sort(
                            datoSynkende(traad => sisteSendteMelding(traad).opprettetDato)
                        )}
                    />
                </StyledModalWrapper>
            </KnappWrapperStyle>
        );
    } else {
        return null;
    }
}

export default TraadListe;
