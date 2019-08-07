import * as React from 'react';
import { useState } from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
}

function DialogpanelVelgSak(props: Props) {
    const [visSaker, setVisSaker] = useState(false);

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
            <VelgSak velgSak={handleVelgSak} valgtSak={props.valgtSak} />
        </EkspanderbartpanelPure>
    );
}

export default DialogpanelVelgSak;
