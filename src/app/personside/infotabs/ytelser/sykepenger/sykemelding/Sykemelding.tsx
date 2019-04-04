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
    table {
        text-align: right;
        thead {
            border-bottom: 0.2rem solid ${theme.color.kategori};
            font-weight: bold;
        }
        th,
        td {
            padding: 0.7rem 0;
            &:not(:first-child) {
                padding-left: 1rem;
            }
        }
        td {
            font-weight: normal;
        }
        tbody tr {
            border-bottom: 0.2rem solid ${theme.color.bakgrunn};
        }
    }
`;

function GraderingsTabell(props: Props) {
    const tittelRekke = ['Periode', 'Gradering'];
    const tableEntries = props.sykmeldinger.map(sykmelding => [
        periodeEllerNull(sykmelding.sykmeldt) || undefined,
        prosentEllerNull(sykmelding.sykmeldingsgrad) || undefined
    ]);
    return <GraderingsTableStyle>{createTable(tittelRekke, tableEntries)}</GraderingsTableStyle>;
}

function Sykemelding(props: Props) {
    const sykemeldingPeriode: Periode = getSykemeldingPeriode(props.sykmeldinger);
    const aktuellSykemelding = props.sykmeldinger[0];
    const sykemeldingEntries: DescriptionListEntries = {
        Periode: periodeEllerNull(sykemeldingPeriode),
        Behandlingsdato: datoEllerNull(aktuellSykemelding.behandlet),
        Sykmelder: aktuellSykemelding.sykmelder,
        Gradering: <GraderingsTabell {...props} />
    };

    return (
        <YtelserInfoGruppe tittel="Sykemelding">
            <DescriptionList entries={sykemeldingEntries} />
        </YtelserInfoGruppe>
    );
}

export default Sykemelding;
