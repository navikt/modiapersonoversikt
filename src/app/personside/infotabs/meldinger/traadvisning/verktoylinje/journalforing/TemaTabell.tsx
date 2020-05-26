import { JournalforingsSak, Tema } from './JournalforingPanel';
import React, { useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import SaksTabell from './SaksTabell';
import styled from 'styled-components/macro';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

const MiniEkspanderbartpanelBase = styled(EkspanderbartpanelBase)`
    .ekspanderbartPanel {
        position: relative;
    }
    .ekspanderbartPanel__hode {
        padding: 0.35rem 0.5rem;
        position: sticky;
        top: 0;
    }
    .ekspanderbartPanel__innhold {
        padding: 0.3rem;
    }
`;

function TemaTable({
    tema,
    saker,
    velgSak,
    valgtSak
}: Tema & { velgSak: (sak: JournalforingsSak) => void; valgtSak?: JournalforingsSak }) {
    const apenByDefault = (valgtSak && saker.some(sak => sak.saksId === valgtSak.saksId)) || false;
    const [apen, settApen] = useState(apenByDefault);
    return (
        <MiniEkspanderbartpanelBase
            tittel={<Element tag="h4">{tema}</Element>}
            apen={apen}
            onClick={() => settApen(!apen)}
            className="blokk-xxxs"
            border
        >
            <SaksTabell saker={saker} velgSak={velgSak} />
        </MiniEkspanderbartpanelBase>
    );
}

export default TemaTable;
