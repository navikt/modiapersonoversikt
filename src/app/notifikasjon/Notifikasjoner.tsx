import React, { useEffect, useState } from 'react';
import useNotifikasjoner from './useNotifikasjoner';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import { AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import EnkeltNotifikasjon from './EnkeltNotifikasjon';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import styled from 'styled-components';
import Stegindikator from 'nav-frontend-stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';

const StyledDiv = styled.div`
    text-align: center;
`;

const StyledNesteknapp = styled(Nesteknapp)`
    float: right;
`;

const StyledTilbakeknapp = styled(Tilbakeknapp)`
    float: left;
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

function VisStegIndikator({ steg, onChange }: { steg: StegindikatorStegProps[]; onChange: (indeks: number) => void }) {
    return <Stegindikator steg={steg} onChange={onChange} kompakt={true} />;
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

    const notifikasjonArray = notifikasjoner.data.map(notifikasjon => {
        return notifikasjon;
    });

    const sortertNotifikasjonArray = notifikasjonArray.sort((a, b) => {
        return a.dato.localeCompare(b.dato);
    });

    sortertNotifikasjonArray.sort((a, b) => {
        return b.prioritet - a.prioritet;
    });

    const neste = () => {
        setIndeks(indeks + 1);
        setVisMer(false);
    };

    const forrige = () => {
        setIndeks(indeks - 1);
        setVisMer(false);
    };

    const currentNotifikasjon = sortertNotifikasjonArray[indeks];

    const [steg, setSteg] = useState<StegindikatorStegProps[]>([]);
    useEffect(() => {
        const stegListe = sortertNotifikasjonArray.map((notifikasjon, i) => {
            const erAktiv = indeks === i ? true : false;
            return { label: notifikasjon.tittel, index: i, aktiv: erAktiv };
        });
        setSteg(stegListe);
    }, [steg, indeks, sortertNotifikasjonArray]);

    return (
        <>
            <section>
                <EnkeltNotifikasjon notifikasjon={currentNotifikasjon} visMer={visMer} setVisMer={setVisMer} />
            </section>
            <StyledDiv>
                <ForrigeKnapp indeks={indeks} onClick={forrige} />
                <VisStegIndikator steg={steg} onChange={setIndeks} />
                <NesteKnapp indeks={indeks} lengde={sortertNotifikasjonArray.length} onClick={neste} />
            </StyledDiv>
        </>
    );
}

export default Notifikasjoner;
