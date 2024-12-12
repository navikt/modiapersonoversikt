import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element } from 'nav-frontend-typografi';
import { useState } from 'react';
import styled from 'styled-components';
import type { JournalforingsSak, Tema } from './JournalforingPanel';
import SaksTabell from './SaksTabell';

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

interface Props extends Tema {
    velgSak: (sak: JournalforingsSak) => void;
    valgtSak?: JournalforingsSak;
}

function TemaTable(props: Props) {
    const { tema, saker, velgSak, valgtSak } = props;
    const apenByDefault = (valgtSak && saker.some((sak) => sak.saksId === valgtSak.saksId)) || false;
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
