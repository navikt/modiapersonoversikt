import { Element, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import EtikettGraa from '../../../../components/EtikettGraa';
import type { OppfolgingsVedtak } from '../../../../models/oppfolging';
import { datoSynkende } from '../../../../utils/date-utils';
import { datoEllerTomString } from '../../../../utils/string-utils';
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
    return `${datoEllerTomString(vedtak.aktivFra)} - ${datoEllerTomString(vedtak.aktivTil)}`;
}

function OppfolgingsVedtakTabell(props: Props) {
    const sortertPåDato = props.ytelseVedtak.sort(datoSynkende((vedtak) => vedtak.aktivFra));
    const tittelrekke = ['Vedtak', 'Status', 'Aktivitetsfase'];
    const rows = sortertPåDato.map((vedtak, index) => [
        <UUOrder key={index}>
            <Element tag="h4" className="second">
                {vedtak.vedtakstype}
            </Element>
            <EtikettGraa className="first">{formaterPeriode(vedtak)}</EtikettGraa>
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
