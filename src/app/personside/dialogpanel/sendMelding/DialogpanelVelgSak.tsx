import * as React from 'react';
import { useState } from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import styled from 'styled-components';
import { formatterDatoMedMaanedsnavn } from '../../../../utils/dateUtils';
import { SkjemaGruppe } from 'nav-frontend-skjema';

const StyledEkspanderbartPanelPure = styled(EkspanderbartpanelPure)`
    .ekspanderbartPanel__hode {
        padding: 0.6rem;
    }
`;

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
    visFeilmelding: boolean;
}

function getTittel(sak: JournalforingsSak) {
    return `${sak.opprettetDato && formatterDatoMedMaanedsnavn(sak.opprettetDato) + ' | '}${sak.temaNavn} | ${
        sak.saksId
    }`;
}

function DialogpanelVelgSak(props: Props) {
    const [visSaker, setVisSaker] = useState(false);

    const handleVelgSak = (sak: JournalforingsSak) => {
        setVisSaker(false);
        props.setValgtSak(sak);
    };

    const tittel = props.valgtSak ? getTittel(props.valgtSak) : 'Velg sak';

    return (
        <SkjemaGruppe feil={props.visFeilmelding ? { feilmelding: 'Du må velge en sak' } : undefined}>
            <StyledEkspanderbartPanelPure
                onClick={() => setVisSaker(!visSaker)}
                apen={visSaker}
                tittel={tittel}
                border={true}
                tittelProps="normaltekst"
            >
                <VelgSak velgSak={handleVelgSak} valgtSak={props.valgtSak} />
            </StyledEkspanderbartPanelPure>
        </SkjemaGruppe>
    );
}

export default DialogpanelVelgSak;
