import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import DescriptionList from '../../../../components/DescriptionList';

const Wrapper = styled.div`
    ${theme.hvittPanel};
    padding: ${theme.margin.px10} ${theme.margin.px10};
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
        oppfølging: arbeidsrettetOppfølging,
        oppfølgingsenhet: oppfølgingsenhet,
        rettighetsgruppe: detaljer.rettighetsgruppe,
        innsatsgruppe: detaljer.innsatsgruppe,
        veileder: detaljer.oppfølging.veileder.ident,
        meldeplikt: meldeplikt,
        formidlingsgruppe: detaljer.formidlingsgruppe,
        oppfølgingsvedtak: detaljer.vedtaksdato
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
