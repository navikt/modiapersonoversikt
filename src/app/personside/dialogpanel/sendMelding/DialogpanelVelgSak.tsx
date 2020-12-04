import * as React from 'react';
import { createRef, useState } from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import { formatterDatoMedMaanedsnavn } from '../../../../utils/date-utils';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { NedChevron, OppChevron } from 'nav-frontend-chevron';
import { useFødselsnummer, useOnMount } from '../../../../utils/customHooks';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import * as JournalforingUtils from '../../journalforings-use-fetch-utils';

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
    visFeilmelding: boolean;
}

const Style = styled.div`
    background-color: white;
    border-radius: ${theme.borderRadius.layout};
    border: 1px solid #78706a;
    position: relative;
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

const Dropdown = styled.div`
    padding: ${theme.margin.layout};
    position: absolute;
    z-index: 1000;
    background-color: white;
    border: ${theme.border.skille};
    border-radius: ${theme.borderRadius.layout};
    width: 100%;
    max-height: 50vh;
    overflow: auto;
`;

function getTittel(sak: JournalforingsSak) {
    return [sak.opprettetDato && formatterDatoMedMaanedsnavn(sak.opprettetDato), sak.temaNavn, sak.saksIdVisning]
        .map(element => (element ? element : '-'))
        .join(' | ');
}

function usePreFetchJournalforingsSaker() {
    const fnr = useFødselsnummer();
    useOnMount(() => {
        JournalforingUtils.prefetchSammensatteSaker(fnr);
        JournalforingUtils.prefetchPensjonsaker(fnr);
    });
}

function DialogpanelVelgSak(props: Props) {
    const [visSaker, setVisSaker] = useState(false);
    const knappRef = createRef<HTMLButtonElement>();
    usePreFetchJournalforingsSaker();

    const handleVelgSak = (sak: JournalforingsSak) => {
        setVisSaker(false);
        props.setValgtSak(sak);
        knappRef.current && knappRef.current.focus();
    };

    const tittel = props.valgtSak ? getTittel(props.valgtSak) : 'Velg sak';

    return (
        <SkjemaGruppe
            feil={
                props.visFeilmelding ? <SkjemaelementFeilmelding>Du må velge sak </SkjemaelementFeilmelding> : undefined
            }
        >
            <Style>
                <Knapp ref={knappRef} type="button" onClick={() => setVisSaker(!visSaker)} aria-expanded={visSaker}>
                    <Normaltekst>{tittel}</Normaltekst>
                    {visSaker ? <OppChevron /> : <NedChevron />}
                </Knapp>
                {visSaker && (
                    <Dropdown>
                        <VelgSak velgSak={handleVelgSak} valgtSak={props.valgtSak} />
                    </Dropdown>
                )}
            </Style>
        </SkjemaGruppe>
    );
}

export default DialogpanelVelgSak;
