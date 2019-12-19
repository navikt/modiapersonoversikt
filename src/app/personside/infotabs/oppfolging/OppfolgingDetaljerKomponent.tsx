import * as React from 'react';
import { DetaljertOppfolging, Saksbehandler } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList from '../../../../components/DescriptionList';
import { datoEllerNull } from '../../../../utils/stringFormatting';

const Wrapper = styled.div`
    ${theme.hvittPanel};
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
        <Wrapper>
            <Undertittel>Arbeidsoppfølging</Undertittel>
            <DescriptionList entries={descriptionListProps} />
        </Wrapper>
    );
}

export function getVeileder(veileder: Saksbehandler | null) {
    return veileder && veileder.ident ? veileder.navn + ' (' + veileder.ident + ')' : null;
}

export default VisOppfolgingDetaljer;
