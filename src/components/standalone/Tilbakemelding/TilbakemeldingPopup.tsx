import React, { useState, FormEvent, useRef } from 'react';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';
import TilbakemeldingValg from './TilbakemeldingValg';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { smilies } from './TilbakemeldingIkoner';
import { useFocusOnMount } from '../../../utils/customHooks';
import { LenkeKnapp } from '../../common-styled-components';

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
const KnappWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TakkForTilbakemeldingenContainer = styled(TilbakemeldingPopupContainer)`
    background-color: #98d0b0;
    text-align: center;
`;

interface Props {
    sporsmal: string;
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

function Kommentar(props: InternalProps) {
    return (
        <>
            <Textarea
                value={props.kommentar}
                onChange={e => props.settKommentar((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                label="Si gjerne litt mer om opplevelsen av endringer."
                maxLength={750}
            />
            <KnappWrapper>
                <Hovedknapp htmlType="submit">Send</Hovedknapp>
                <LenkeKnapp type="button" onClick={() => props.settBesvart(-1, '')}>
                    Ikke vis denne igjen
                </LenkeKnapp>
            </KnappWrapper>
        </>
    );
}

function TilbakemeldingSkjema(props: InternalProps) {
    const popup = useRef(null);
    useFocusOnMount(popup);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.settBesvart(props.valgt, props.kommentar);
    };

    return (
        <TilbakemeldingPopupContainer ref={popup} tabIndex={-1}>
            <Innholdstittel className="blokk-xs">Tilbakemelding</Innholdstittel>
            <Normaltekst className="blokk-m">{props.sporsmal}</Normaltekst>
            <form onSubmit={submitHandler}>
                <TilbakemeldingValg {...props} />
                <Kommentar {...props} />
            </form>
        </TilbakemeldingPopupContainer>
    );
}

function TakkForTilbakemeldingen() {
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
    const [valgt, settValgt] = useState(-1);
    const [kommentar, settKommentar] = useState('');

    if (!props.erApen) {
        return null;
    }

    const internalProps: InternalProps = { valgt, settValgt, kommentar, settKommentar, ...props };

    if (props.besvart) {
        return <TakkForTilbakemeldingen />;
    }

    return <TilbakemeldingSkjema {...internalProps} />;
}

export default TilbakemeldingPopup;
