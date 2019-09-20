import * as React from 'react';
import { createRef, useState } from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import { formatterDatoMedMaanedsnavn } from '../../../../utils/dateUtils';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { UnmountClosed } from 'react-collapse';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { NedChevron, OppChevron } from 'nav-frontend-chevron';

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
    visFeilmelding: boolean;
}

const Style = styled.div`
    background-color: white;
    border-radius: ${theme.borderRadius.layout};
    border: 1px solid #78706a;
`;

const Knapp = styled.button`
    ${theme.resetButtonStyle};
    padding: ${pxToRem(8)};
    border-radius: ${theme.borderRadius.layout};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Padding = styled.div`
    padding: ${pxToRem(8)};
`;

function getTittel(sak: JournalforingsSak) {
    return `${sak.opprettetDato && formatterDatoMedMaanedsnavn(sak.opprettetDato) + ' | '}${sak.temaNavn} | ${
        sak.saksId
    }`;
}

function DialogpanelVelgSak(props: Props) {
    const [visSaker, setVisSaker] = useState(false);
    const ref = createRef<HTMLButtonElement>();

    const handleVelgSak = (sak: JournalforingsSak) => {
        setVisSaker(false);
        props.setValgtSak(sak);
        ref.current && ref.current.focus();
    };

    const tittel = props.valgtSak ? getTittel(props.valgtSak) : 'Velg sak';

    return (
        <SkjemaGruppe feil={props.visFeilmelding ? { feilmelding: 'Du må velge en sak' } : undefined}>
            <Style>
                <Knapp ref={ref} type="button" onClick={() => setVisSaker(!visSaker)} aria-expanded={visSaker}>
                    <Normaltekst>{tittel}</Normaltekst>
                    {visSaker ? <OppChevron /> : <NedChevron />}
                </Knapp>
                <UnmountClosed isOpened={visSaker} hasNestedCollapse={true}>
                    <Padding>
                        <VelgSak velgSak={handleVelgSak} valgtSak={props.valgtSak} />
                    </Padding>
                </UnmountClosed>
            </Style>
        </SkjemaGruppe>
    );
}

export default DialogpanelVelgSak;
