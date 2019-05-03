import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';
import TilbakemeldingValg from './TilbakemeldingValg';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { smilies } from './TilbakemeldingIkoner';
import { useFocusOnMount } from '../../../utils/customHooks';

const TilbakemeldingPopupContainer = styled.div`
    ${theme.hvittPanel}
    width: ${pxToRem(350)};
    position: fixed;
    right: ${pxToRem(25)};
    bottom: ${pxToRem(100)};
    z-index: 998;
    padding: ${pxToRem(20)};
    
    &:focus {
        ${theme.focus}
    }
`;
const IkkeVis = styled.button`
    background: none;
    border: none;
`;
const TakkForTilbakemeldingenContainer = styled(TilbakemeldingPopupContainer)`
    background-color: #98d0b0;
    text-align: center;
`;

interface Props {
    erApen: boolean;
    besvart: boolean;
    settBesvart(tilfredshet: number, besvart: string): void;
}

interface InternalProps extends Props {
    valgt: number;
    kommentar: string;
    settValgt(valgt: number): void;
    settKommentar(kommentar: string): void;
}

function IkkeVisKnapp(props: InternalProps) {
    if (props.valgt >= 0) {
        return null;
    }

    return (
        <IkkeVis
            role="button"
            className="lenke"
            onClick={event => {
                event.preventDefault();
                props.settBesvart(-1, '');
            }}
        >
            Ikke vis denne igjen
        </IkkeVis>
    );
}

function Kommentar(props: InternalProps) {
    if (props.valgt < 0) {
        return null;
    }

    return (
        <>
            <Textarea
                value={props.kommentar}
                onChange={e => props.settKommentar((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                label="Si gjerne litt mer om opplevelsen av endringer."
                maxLength={750}
            />
            <Hovedknapp role="submit">Send</Hovedknapp>
        </>
    );
}

function TilbakemeldingSkjema(props: InternalProps) {
    if (props.besvart) {
        return null;
    }
    const popup = React.createRef<HTMLDivElement>();
    useFocusOnMount(popup);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.settBesvart(props.valgt, props.kommentar);
    };

    return (
        <TilbakemeldingPopupContainer ref={popup} tabIndex={-1}>
            <Innholdstittel className="blokk-xs">Tilbakemelding</Innholdstittel>
            <Normaltekst className="blokk-m">
                Her kan vi skrive spørsmålet... lorem ipsum etc, bare for å få litt tekst her
            </Normaltekst>
            <form onSubmit={submitHandler}>
                <TilbakemeldingValg {...props} />
                <IkkeVisKnapp {...props} />
                <Kommentar {...props} />
            </form>
        </TilbakemeldingPopupContainer>
    );
}

function TakkForTilbakemeldingen(props: InternalProps) {
    if (!props.besvart) {
        return null;
    }

    return (
        <TakkForTilbakemeldingenContainer>
            <img src={smilies.veldigFornoyd} alt="Smiley" className="blokk-xs" />
            <Element>
                Takk for at du tok deg tid til å gi tilbakemelding. Vi bruker innspillene til å forbedre løsningen.
            </Element>
        </TakkForTilbakemeldingenContainer>
    );
}

function TilbakemeldingPopup(props: Props) {
    if (!props.erApen) {
        return null;
    }

    const [valgt, settValgt] = useState(-1);
    const [kommentar, settKommentar] = useState('');
    const internalProps = { valgt, settValgt, kommentar, settKommentar };

    return (
        <>
            <TilbakemeldingSkjema {...internalProps} {...props} />
            <TakkForTilbakemeldingen {...internalProps} {...props} />
        </>
    );
}

export default TilbakemeldingPopup;
