import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { useSokEtterMeldinger } from '../utils/meldingerUtils';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import TraadListeElement from './TraadListeElement';
import { LenkeKnapp } from '../../../../../components/common-styled-components';
import { useState } from 'react';
import { useOnMount } from '../../../../../utils/customHooks';

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

function TraadListe(props: Props) {
    const traaderEtterSok = useSokEtterMeldinger(props.traader, props.sokeord);
    const [erForsteRender, setErForsteRender] = useState(true);
    const inputRef = React.useRef<HTMLInputElement>();

    const visAlleMeldinger = props.sokeord !== '' && (
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

    useOnMount(() => {
        setErForsteRender(false);
    });

    if (props.traader.length === 0) {
        return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
    }

    const meldingTekst = props.traader.length === 1 ? 'melding' : 'meldinger';

    const soketreffTekst =
        props.sokeord.length > 0
            ? `Viser ${traaderEtterSok.length} av ${props.traader.length} ${meldingTekst}`
            : `${props.traader.length} ${meldingTekst} totalt`;

    return (
        <PanelStyle>
            <InputStyle>
                <Input
                    inputRef={
                        ((ref: HTMLInputElement) => {
                            inputRef.current = ref;
                        }) as any
                    }
                    value={props.sokeord}
                    onChange={event => props.setSokeord(event.target.value)}
                    label={'Søk etter melding'}
                    className={'move-input-label'}
                />
            </InputStyle>
            <SokVerktøyStyle>
                <Normaltekst aria-live="polite">{soketreffTekst}</Normaltekst>
                {visAlleMeldinger}
            </SokVerktøyStyle>
            <TraadListeStyle>
                {traaderEtterSok.map(traad => (
                    <TraadListeElement
                        taFokusOnMount={erForsteRender && traad === props.valgtTraad}
                        traad={traad}
                        key={traad.traadId}
                        erValgt={traad === props.valgtTraad}
                    />
                ))}
            </TraadListeStyle>
        </PanelStyle>
    );
}

export default TraadListe;
