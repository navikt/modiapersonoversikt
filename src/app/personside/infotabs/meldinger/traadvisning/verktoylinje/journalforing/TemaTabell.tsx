import { JournalforingsSak, Tema } from './JournalforingPanel';
import React, { useState } from 'react';
import { UndertekstBold } from 'nav-frontend-typografi';
import SaksTabell from './SaksTabell';
import styled from 'styled-components';
import { EkspanderbartpanelBasePure } from 'nav-frontend-ekspanderbartpanel';

const MiniEkspanderbartpanelBasePure = styled(EkspanderbartpanelBasePure)`
    .ekspanderbartPanel__hode {
        padding: 0.25rem 0.5rem;
    }
    .ekspanderbartPanel__innhold {
        padding: 0.5rem;
    }
`;

function TemaTable({
    tema,
    saker,
    velgSak,
    valgtSak
}: Tema & { velgSak: (sak: JournalforingsSak) => void; valgtSak?: JournalforingsSak }) {
    const apenByDefault = (valgtSak && saker.findIndex(sak => sak.saksId === valgtSak.saksId) >= 0) || false;
    const [apen, settApen] = useState(apenByDefault);
    return (
        <MiniEkspanderbartpanelBasePure
            heading={<UndertekstBold tag="h4">{tema}</UndertekstBold>}
            apen={apen}
            onClick={() => settApen(!apen)}
            className="blokk-xxxs"
            border
        >
            <SaksTabell saker={saker} velgSak={velgSak} />
        </MiniEkspanderbartpanelBasePure>
    );
}

export default TemaTable;
