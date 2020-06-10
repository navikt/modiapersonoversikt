import * as React from 'react';
import { DetaljertOppfolging, Saksbehandler } from '../../../../models/oppfolging';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList from '../../../../components/DescriptionList';
import { datoEllerNull } from '../../../../utils/stringFormatting';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';

const StyledPanel = styled(Panel)`
    padding: ${pxToRem(15)};
    > *:first-child {
        margin-bottom: 1rem;
    }
`;

interface Props {
    detaljertOppfølging: DetaljertOppfolging;
}

function VisOppfolgingDetaljer(props: Props) {
    const detaljer = props.detaljertOppfølging;
    const arbeidsrettetOppfølging = detaljer.oppfølging.erUnderOppfølging ? 'Ja' : 'Nei';
    const oppfølgingsenhet = detaljer.oppfølging.enhet
        ? `${detaljer.oppfølging.enhet.id} ${detaljer.oppfølging.enhet.navn}`
        : 'Ikke angitt';
    const meldeplikt = detaljer.meldeplikt ? 'Ja' : detaljer.meldeplikt === false ? 'Nei' : 'Meldeplikt Ukjent';
    const headerId = useRef(guid());

    const descriptionListProps = {
        'Er under oppfølging': arbeidsrettetOppfølging,
        Oppfølgingsenhet: oppfølgingsenhet,
        Rettighetsgruppe: detaljer.rettighetsgruppe,
        Innsatsgruppe: detaljer.innsatsgruppe,
        Veileder: getVeileder(detaljer.oppfølging.veileder),
        Meldeplikt: meldeplikt,
        Formidlingsgruppe: detaljer.formidlingsgruppe,
        Oppfølgingsvedtak: datoEllerNull(detaljer.vedtaksdato)
    };

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                <Undertittel id={headerId.current}>Arbeidsoppfølging</Undertittel>
                <DescriptionList entries={descriptionListProps} />
            </article>
        </StyledPanel>
    );
}

export function getVeileder(veileder: Saksbehandler | null) {
    return veileder && veileder.ident ? veileder.navn + ' (' + veileder.ident + ')' : null;
}

export default VisOppfolgingDetaljer;
