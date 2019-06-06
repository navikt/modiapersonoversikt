import * as React from 'react';
import { OppfolgingsVedtak } from '../../../../models/oppfolging';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { datoEllerTomString } from '../../../../utils/stringFormatting';
import EtikettGrå from '../../../../components/EtikettGrå';
import { StyledTable } from '../../../../utils/table/StyledTable';

interface Props {
    ytelseVedtak: OppfolgingsVedtak[];
}

const UUOrder = styled.div`
    display: flex;
    flex-direction: column;
    .first {
        order: 1;
    }
    .second {
        order: 2;
        font-weight: bold;
    }
`;

function formaterPeriode(vedtak: OppfolgingsVedtak) {
    return datoEllerTomString(vedtak.aktivFra) + ' - ' + datoEllerTomString(vedtak.aktivTil);
}

function OppfolgingsVedtakTabell(props: Props) {
    const sortertPåDato = props.ytelseVedtak.sort(datoSynkende(vedtak => vedtak.aktivFra));
    const tittelrekke = ['Vedtak', 'Status', 'Aktivitetsfase'];
    const rows = sortertPåDato.map((vedtak, index) => [
        <UUOrder key={index}>
            <h4 className="second">{vedtak.vedtakstype}</h4>
            <EtikettGrå className="first">{formaterPeriode(vedtak)}</EtikettGrå>
        </UUOrder>,
        vedtak.vedtakstatus,
        vedtak.aktivitetsfase
    ]);

    return (
        <section>
            <Undertittel className="visually-hidden">Vedtak</Undertittel>
            <StyledTable tittelRekke={tittelrekke} rows={rows} />
        </section>
    );
}

export default OppfolgingsVedtakTabell;
