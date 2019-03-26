import * as React from 'react';
import { Periode } from '../../../../../../models/periode';
import { getSykemeldingPeriode } from '../utils/sykepengerUtils';
import DescriptionList, { DescriptionListEntries } from '../../../../../../components/DescriptionList';
import { datoEllerNull, periodeEllerNull, prosentEllerNull } from '../../../../../../utils/stringFormatting';
import YtelserInfoGruppe from '../../felles-styling/YtelserInfoGruppe';
import { Sykmelding as ISykemelding } from '../../../../../../models/ytelse/sykepenger';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';

interface Props {
    sykmeldinger: ISykemelding[];
}

const ListeElementStyle = styled.li`
    ${theme.gråttPanel};
    padding: ${theme.margin.px20};
`;

function GraderingsListeElement({ sykmelding }: { sykmelding: ISykemelding }) {
    const entries: DescriptionListEntries = {
        Periode: periodeEllerNull(sykmelding.sykmeldt),
        Gradering: prosentEllerNull(sykmelding.sykmeldingsgrad)
    };
    return (
        <ListeElementStyle>
            <DescriptionList entries={entries} />
        </ListeElementStyle>
    );
}

function GraderingsListe(props: Props) {
    return (
        <ol>
            {props.sykmeldinger.map((sykmelding, index) => (
                <GraderingsListeElement key={index} sykmelding={sykmelding} />
            ))}
        </ol>
    );
}

function Sykemelding(props: Props) {
    const sykemeldingPeriode: Periode = getSykemeldingPeriode(props.sykmeldinger);
    const aktuellSykemelding = props.sykmeldinger[0];
    const sykemeldingEntries: DescriptionListEntries = {
        Periode: periodeEllerNull(sykemeldingPeriode),
        Behandlingsdato: datoEllerNull(aktuellSykemelding.behandlet),
        Sykmelder: aktuellSykemelding.sykmelder,
        Gradering: <GraderingsListe {...props} />
    };

    return (
        <YtelserInfoGruppe tittel="Sykemelding">
            <DescriptionList entries={sykemeldingEntries} />
        </YtelserInfoGruppe>
    );
}

export default Sykemelding;
