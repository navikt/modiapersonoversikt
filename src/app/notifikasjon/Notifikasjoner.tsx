import React, { useState } from 'react';
import useNotifikasjoner from './useNotifikasjoner';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import { AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import EnkeltNotifikasjon from './EnkeltNotifikasjon';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import styled from 'styled-components';
import Stegindikator from 'nav-frontend-stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

const StyledNesteknapp = styled(Nesteknapp)`
    display: flex;
    align-content: flex-start;
    margin-left: auto;
`;

const StyledTilbakeknapp = styled(Tilbakeknapp)`
    display: flex;
    align-content: flex-start;
`;

function ForrigeKnapp({ indeks, onClick }: { indeks: number; onClick: () => void }) {
    if (indeks < 1) {
        return null;
    }
    return <StyledTilbakeknapp onClick={onClick} />;
}

function NesteKnapp({ indeks, lengde, onClick }: { indeks: number; lengde: number; onClick: () => void }) {
    if (indeks >= lengde - 1) {
        return null;
    }
    return <StyledNesteknapp onClick={onClick} />;
}

function VisStegIndikator({
    steg,
    onChange,
    indeks
}: {
    steg: StegindikatorStegProps[];
    onChange: (indeks: number) => void;
    indeks: number;
}) {
    return <Stegindikator steg={steg} aktivtSteg={indeks} onChange={onChange} kompakt={true} />;
}

function Notifikasjoner() {
    const notifikasjoner = useNotifikasjoner();

    const [indeks, setIndeks] = useState(0);

    const [visMer, setVisMer] = useState(false);

    if (notifikasjoner.error) {
        return <AlertStripeFeil>Notifikasjoner er nede, vennligst prøv igjen senere.</AlertStripeFeil>;
    }
    if (notifikasjoner.data.length === 0) {
        return <AlertStripeInfo>Fant ingen notifikasjoner</AlertStripeInfo>;
    }
    if (notifikasjoner.pending) {
        return <CenteredLazySpinner />;
    }

    const sortertNotifikasjoner = notifikasjoner.data.sort((a, b) => {
        return b.prioritet - a.prioritet || a.dato.localeCompare(b.dato);
    });

    const neste = () => {
        setIndeks(indeks + 1);
        setVisMer(false);
    };

    const forrige = () => {
        setIndeks(indeks - 1);
        setVisMer(false);
    };

    const currentNotifikasjon = sortertNotifikasjoner[indeks];

    const stegListe = sortertNotifikasjoner.map((notifikasjon, i) => {
        const erAktiv = indeks === i ? true : false;
        return { label: notifikasjon.tittel, index: i, aktiv: erAktiv, key: notifikasjon.id };
    });

    return (
        <>
            <section>
                <EnkeltNotifikasjon notifikasjon={currentNotifikasjon} visMer={visMer} setVisMer={setVisMer} />
            </section>
            <VisStegIndikator steg={stegListe} indeks={indeks} onChange={setIndeks} />
            <StyledDiv>
                <ForrigeKnapp indeks={indeks} onClick={forrige} />
                <NesteKnapp indeks={indeks} lengde={sortertNotifikasjoner.length} onClick={neste} />
            </StyledDiv>
        </>
    );
}

export default Notifikasjoner;
