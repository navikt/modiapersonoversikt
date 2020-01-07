import * as React from 'react';
import { OppfolgingsVedtak } from '../../../../models/oppfolging';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components/macro';
import { Element, Undertittel } from 'nav-frontend-typografi';
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
            <Element tag="h4" className="second">
                {vedtak.vedtakstype}
            </Element>
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
