import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import DescriptionList from '../../../../components/DescriptionList';
import { datoEllerNull } from '../../../../utils/stringFormatting';

const Wrapper = styled.div`
    ${theme.hvittPanel};
    padding: ${theme.margin.px20};
    > *:first-child {
        margin-bottom: 1rem;
    }
`;

const VisningWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > *:first-child {
        margin-right: 5rem;
    }
`;

interface Props {
    detaljertOppfølging: DetaljertOppfolging;
}

function VisOppfolgingDetaljer(props: Props) {
    const detaljer = props.detaljertOppfølging;
    const arbeidsrettetOppfølging = detaljer.oppfølging.erUnderOppfølging ? 'Ja' : 'Nei';
    const oppfølgingsenhet = `${detaljer.oppfølging.enhet.id} ${detaljer.oppfølging.enhet.navn}`;
    const meldeplikt = detaljer.meldeplikt ? 'Ja' : detaljer.meldeplikt === false ? 'Nei' : 'Meldeplikt Ukjent';
    const descriptionListProps = {
        'Er under oppfølging': arbeidsrettetOppfølging,
        Oppfølgingsenhet: oppfølgingsenhet,
        Rettighetsgruppe: detaljer.rettighetsgruppe,
        Innsatsgruppe: detaljer.innsatsgruppe,
        Veileder: detaljer.oppfølging.veileder ? detaljer.oppfølging.veileder.ident : null,
        Meldeplikt: meldeplikt,
        Formidlingsgruppe: detaljer.formidlingsgruppe,
        Oppfølgingsvedtak: datoEllerNull(detaljer.vedtaksdato)
    };

    return (
        <Wrapper>
            <Undertittel>Arbeidsoppfølging</Undertittel>
            <VisningWrapper>
                <DescriptionList entries={descriptionListProps} />
            </VisningWrapper>
        </Wrapper>
    );
}

export default VisOppfolgingDetaljer;
