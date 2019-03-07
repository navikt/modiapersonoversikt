import * as React from 'react';
import { OppfolgingsVedtak } from '../../../../models/oppfolging';
import { genericDescendingDateComparator } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import DescriptionList from '../../../../components/DescriptionList';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

interface Props {
    ytelseVedtak: OppfolgingsVedtak[];
}

const ListePanelStyle = styled.div`
    border: ${theme.border.skille};
    border-radius: ${theme.borderRadius.layout};
`;

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

const ElementStyle = styled.div`
    padding: ${theme.margin.layout};
`;

const HeaderStyle = styled.div`
    background-color: ${theme.color.bakgrunn};
    text-align: center;
    padding: ${theme.margin.layout};
`;

function VedtakElement(props: { vedtak: OppfolgingsVedtak }) {
    const datoInterval = props.vedtak.aktivFra + ' - ' + (props.vedtak.aktivTil || '');

    const descriptionListItems = {
        [datoInterval]: props.vedtak.vedtakstype,
        status: props.vedtak.vedtakstatus,
        aktivitetsfase: props.vedtak.aktivitetsfase,
        vedtaksdato: props.vedtak.vedtaksdato
    };

    return (
        <ElementStyle>
            <DescriptionList entries={descriptionListItems} />
        </ElementStyle>
    );
}

function OppfolgingsVedtakListe(props: Props) {
    const sortertPåDato = props.ytelseVedtak.sort(genericDescendingDateComparator(vedtak => vedtak.aktivFra));

    const listekomponenter = sortertPåDato.map(vedtak => <VedtakElement vedtak={vedtak} />);

    return (
        <ListePanelStyle>
            <HeaderStyle>
                <Undertittel>Vedtak</Undertittel>
            </HeaderStyle>
            <ListeStyle>{listekomponenter}</ListeStyle>
        </ListePanelStyle>
    );
}

export default OppfolgingsVedtakListe;
