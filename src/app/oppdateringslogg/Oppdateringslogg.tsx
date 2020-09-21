import React, { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import EnkeltOppdateringslogg from './EnkeltOppdateringslogg';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import styled from 'styled-components/macro';
import Stegindikator from 'nav-frontend-stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { datoSynkende } from '../../utils/date-utils';
import { EnOppdateringslogg } from './OppdateringsloggContainer';
import Panel from 'nav-frontend-paneler';

const StyledPanel = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
    width: 100%;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-content: flex-end;
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

function VisStegindikator({
    steg,
    onChange,
    indeks
}: {
    steg: StegindikatorStegProps[];
    onChange: (indeks: number) => void;
    indeks: number;
}) {
    return <Stegindikator steg={steg} aktivtSteg={indeks} onChange={onChange} visLabel={false} kompakt={true} />;
}

function Oppdateringslogg(props: { oppdateringslogg: EnOppdateringslogg[] }) {
    const { oppdateringslogg } = props;

    const [indeks, setIndeks] = useState(0);
    const [visMer, setVisMer] = useState(false);

    if (oppdateringslogg.length === 0) {
        return <AlertStripeInfo>Fant ingen oppdateringer</AlertStripeInfo>;
    }

    const sortertOppdateringslogg = oppdateringslogg
        .sort(datoSynkende(enOppdateringslogg => enOppdateringslogg.dato))
        .sort((a, b) => {
            return a.prioritet === b.prioritet ? 0 : a.prioritet ? -1 : 1;
        });

    const neste = () => {
        setIndeks(indeks + 1);
        setVisMer(false);
    };

    const forrige = () => {
        setIndeks(indeks - 1);
        setVisMer(false);
    };

    const currentOppdateringslogg = sortertOppdateringslogg[indeks];

    const stegListe = sortertOppdateringslogg.map((enOppdateringslogg, i) => {
        const erAktiv = indeks === i ? true : false;
        return { label: enOppdateringslogg.tittel, index: i, aktiv: erAktiv, key: enOppdateringslogg.id };
    });

    return (
        <StyledPanel>
            <section>
                <EnkeltOppdateringslogg
                    enOppdateringslogg={currentOppdateringslogg}
                    visMer={visMer}
                    setVisMer={setVisMer}
                />
            </section>
            <StyledDiv>
                <ForrigeKnapp indeks={indeks} onClick={forrige} />
                <VisStegindikator steg={stegListe} indeks={indeks} onChange={setIndeks} />
                <NesteKnapp indeks={indeks} lengde={sortertOppdateringslogg.length} onClick={neste} />
            </StyledDiv>
        </StyledPanel>
    );
}

export default Oppdateringslogg;
