import React, { useState } from 'react';
import useNotifikasjoner from './useNotifikasjoner';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import { AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import EnkeltNotifikasjon from './Notifikasjon';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import styled from 'styled-components';

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

function Notifikasjoner() {
    const notifikasjoner = useNotifikasjoner();

    const [indeks, setIndeks] = useState(0);

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
    };

    const forrige = () => {
        return setIndeks(indeks - 1);
    };

    const currentNotifikasjon = sortertNotifikasjonArray[indeks];

    return (
        <>
            <section>
                <EnkeltNotifikasjon notifikasjon={currentNotifikasjon} />
            </section>
            <StyledDiv>
                <ForrigeKnapp indeks={indeks} onClick={forrige} />
                <NesteKnapp indeks={indeks} lengde={sortertNotifikasjonArray.length} onClick={neste} />
            </StyledDiv>
        </>
    );
}

export default Notifikasjoner;
