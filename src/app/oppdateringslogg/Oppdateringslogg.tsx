import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import Stegindikator from 'nav-frontend-stegindikator';
import type { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { useState } from 'react';
import styled from 'styled-components';
import { datoSynkende } from '../../utils/date-utils';
import EnkeltOppdateringslogg from './EnkeltOppdateringslogg';
import type { OppdateringsloggInnslag } from './OppdateringsloggContainer';

const StyledSection = styled.section`
    display: flex;
    height: 100%;
    width: 40rem;
    min-height: 20rem;
    max-height: 40rem;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledFooter = styled.footer`
    display: flex;
`;
const StyledNesteknapp = styled(Nesteknapp)`
    float: right;
`;
const HiddenNesteknapp = styled(Nesteknapp)`
    float: right;
    visibility: hidden;
`;
const StyledTilbakeknapp = styled(Tilbakeknapp)`
    float: left;
`;

const HiddenTilbakeknapp = styled(Tilbakeknapp)`
    float: left;
    visibility: hidden;
`;
const StyledStegindikator = styled.div`
    margin: 0 auto;
    align-self: center;
`;

function ForrigeKnapp({ indeks, onClick }: { indeks: number; onClick: () => void }) {
    if (indeks < 1) {
        return <HiddenTilbakeknapp aria-hidden={true} />;
    }
    return <StyledTilbakeknapp onClick={onClick} />;
}

function NesteKnapp({ indeks, lengde, onClick }: { indeks: number; lengde: number; onClick: () => void }) {
    if (indeks >= lengde - 1) {
        return <HiddenNesteknapp aria-hidden={true} />;
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
    return (
        <StyledStegindikator>
            <Stegindikator steg={steg} aktivtSteg={indeks} onChange={onChange} visLabel={false} kompakt={true} />
        </StyledStegindikator>
    );
}

function Oppdateringslogg(props: { oppdateringslogg: OppdateringsloggInnslag[] }) {
    const { oppdateringslogg } = props;

    const [indeks, setIndeks] = useState(0);
    const [visMer, setVisMer] = useState(false);

    if (oppdateringslogg.length === 0) {
        return <AlertStripeInfo>Fant ingen oppdateringer</AlertStripeInfo>;
    }

    const sortertOppdateringslogg = oppdateringslogg.sort(
        datoSynkende((enOppdateringslogg) => enOppdateringslogg.dato)
    );

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
        const erAktiv = indeks === i;
        return { label: enOppdateringslogg.tittel, index: i, aktiv: erAktiv, key: enOppdateringslogg.id };
    });

    return (
        <StyledSection>
            <EnkeltOppdateringslogg
                enOppdateringslogg={currentOppdateringslogg}
                visMer={visMer}
                setVisMer={setVisMer}
            />
            <StyledFooter>
                <ForrigeKnapp indeks={indeks} onClick={forrige} />
                <VisStegindikator steg={stegListe} indeks={indeks} onChange={setIndeks} />
                <NesteKnapp indeks={indeks} lengde={sortertOppdateringslogg.length} onClick={neste} />
            </StyledFooter>
        </StyledSection>
    );
}

export default Oppdateringslogg;
