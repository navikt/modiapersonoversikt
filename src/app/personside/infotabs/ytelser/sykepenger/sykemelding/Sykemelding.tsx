import * as React from 'react';
import { Periode } from '../../../../../../models/periode';
import { getSykemeldingPeriode } from '../utils/sykepengerUtils';
import DescriptionList, { DescriptionListEntries } from '../../../../../../components/DescriptionList';
import { datoEllerNull, periodeEllerNull, prosentEllerNull } from '../../../../../../utils/stringFormatting';
import YtelserInfoGruppe from '../../felles-styling/YtelserInfoGruppe';
import { Sykmelding as ISykemelding } from '../../../../../../models/ytelse/sykepenger';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { createTable } from '../../../../../../utils/tableUtils';

interface Props {
    sykmeldinger: ISykemelding[];
}

const GraderingsTableStyle = styled.div`
    ${theme.table}
`;

function GraderingsTabell(props: Props) {
    const tittelRekke = ['Periode', 'Gradering'];
    const tableEntries = props.sykmeldinger.map(sykmelding => [
        periodeEllerNull(sykmelding.sykmeldt) || undefined,
        prosentEllerNull(sykmelding.sykmeldingsgrad) || undefined
    ]);
    return (
        <GraderingsTableStyle aria-label="Sykmeldingsperioder">
            {createTable(tittelRekke, tableEntries)}
        </GraderingsTableStyle>
    );
}

function Sykemelding(props: Props) {
    const sykemeldingPeriode: Periode = getSykemeldingPeriode(props.sykmeldinger);
    const aktuellSykemelding = props.sykmeldinger[0];
    const sykemeldingEntries: DescriptionListEntries = {
        Periode: periodeEllerNull(sykemeldingPeriode),
        Behandlingsdato: datoEllerNull(aktuellSykemelding.behandlet),
        Sykmelder: aktuellSykemelding.sykmelder
    };

    return (
        <YtelserInfoGruppe tittel="Sykmelding">
            <DescriptionList entries={sykemeldingEntries} />
            <GraderingsTabell {...props} />
        </YtelserInfoGruppe>
    );
}

export default Sykemelding;
