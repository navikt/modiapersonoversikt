import * as React from 'react';
import { useState } from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import useFetch from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../api/config';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
}

const credentials: RequestInit = { credentials: 'include' };

function DialogpanelVelgSak(props: Props) {
    const [visSaker, setVisSaker] = useState(false);
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const gsakSaker = useFetch<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/sammensatte`,
        credentials
    );
    const psakSaker = useFetch<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/pensjon`,
        credentials
    );

    const handleVelgSak = (sak: JournalforingsSak) => {
        setVisSaker(false);
        props.setValgtSak(sak);
    };

    return (
        <EkspanderbartpanelPure
            onClick={() => setVisSaker(!visSaker)}
            apen={visSaker}
            tittel={props.valgtSak ? `Valgt sak: ${props.valgtSak.temaNavn}(${props.valgtSak.saksId})` : 'Velg sak'}
            border={true}
            tittelProps="normaltekst"
        >
            <VelgSak gsakSaker={gsakSaker} psakSaker={psakSaker} velgSak={handleVelgSak} lukkPanel={() => null} />
        </EkspanderbartpanelPure>
    );
}

export default DialogpanelVelgSak;
