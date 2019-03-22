import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import DescriptionList from '../../../../components/DescriptionList';

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
    const meldeplikt = detaljer.meldeplikt ? 'Ja' : 'Nei';
    const descriptionListProps = {
        'Er under oppfølging': arbeidsrettetOppfølging,
        Oppfølgingsenhet: oppfølgingsenhet,
        Rettighetsgruppe: detaljer.rettighetsgruppe,
        Innsatsgruppe: detaljer.innsatsgruppe,
        Veileder: detaljer.oppfølging.veileder.ident,
        Meldeplikt: meldeplikt,
        Formidlingsgruppe: detaljer.formidlingsgruppe,
        Oppfølgingsvedtak: detaljer.vedtaksdato
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
