import * as React from 'react';
import DescriptionList, { DescriptionListEntries } from '../../../../../../components/DescriptionList';
import { datoEllerNull, periodeEllerNull, prosentEllerNull } from '../../../../../../utils/stringFormatting';
import YtelserInfoGruppe from '../../felles-styling/YtelserInfoGruppe';
import { Sykmelding as ISykemelding } from '../../../../../../models/ytelse/sykepenger';
import { StyledTable } from '../../../../../../utils/tableUtils';

interface Props {
    sykmelding: ISykemelding;
}

function GraderingsTabell(props: Props) {
    const tittelRekke = ['Periode', 'Gradering'];
    const tableEntries = props.sykmelding.gradAvSykmeldingListe.map(graderingsElement => [
        periodeEllerNull(graderingsElement.gradert) || undefined,
        prosentEllerNull(graderingsElement.sykmeldingsgrad) || undefined
    ]);
    return <StyledTable tittelRekke={tittelRekke} rows={tableEntries} />;
}

function Sykemelding({ sykmelding }: Props) {
    const sykemeldingEntries: DescriptionListEntries = {
        Periode: periodeEllerNull(sykmelding.sykmeldt),
        Behandlingsdato: datoEllerNull(sykmelding.behandlet),
        Sykmelder: sykmelding.sykmelder
    };

    return (
        <YtelserInfoGruppe tittel="Sykmelding">
            <DescriptionList entries={sykemeldingEntries} />
            <GraderingsTabell sykmelding={sykmelding} />
        </YtelserInfoGruppe>
    );
}

export default Sykemelding;
