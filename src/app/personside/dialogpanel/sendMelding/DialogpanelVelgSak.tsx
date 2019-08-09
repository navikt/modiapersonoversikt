import * as React from 'react';
import { useState } from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components';
import { formatterDatoMedMaanedsnavn } from '../../../../utils/dateUtils';

const StyledEkspanderbartPanelPure = styled(EkspanderbartpanelPure)`
    .ekspanderbartPanel__hode,
    .ekspanderbartPanel__innhold {
        padding: 0.6rem;
    }
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    margin-bottom: 0.8rem;
`;

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
    visFeilmelding: boolean;
}

function DialogpanelVelgSak(props: Props) {
    const [visSaker, setVisSaker] = useState(false);

    const handleVelgSak = (sak: JournalforingsSak) => {
        setVisSaker(false);
        props.setValgtSak(sak);
    };

    const tittel = props.valgtSak
        ? `${props.valgtSak.opprettetDato && formatterDatoMedMaanedsnavn(props.valgtSak.opprettetDato) + ' | '}${
              props.valgtSak.temaNavn
          } | ${props.valgtSak.saksId}`
        : 'Velg sak';
    return (
        <StyledSkjemaGruppe feil={props.visFeilmelding ? { feilmelding: 'Du må velge en sak' } : undefined}>
            <StyledEkspanderbartPanelPure
                onClick={() => setVisSaker(!visSaker)}
                apen={visSaker}
                tittel={tittel}
                border={true}
                tittelProps="normaltekst"
            >
                <VelgSak velgSak={handleVelgSak} valgtSak={props.valgtSak} />
            </StyledEkspanderbartPanelPure>
        </StyledSkjemaGruppe>
    );
}

export default DialogpanelVelgSak;
