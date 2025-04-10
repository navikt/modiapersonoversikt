import DescriptionList, {
    type DescriptionListEntries,
    fjernEntriesUtenVerdi
} from '../../../../../../components/DescriptionList';
import type { Forsikring, Sykepenger, Sykmelding } from '../../../../../../models/ytelse/sykepenger';
import {
    NOKellerNull,
    convertBoolTilJaNei,
    datoEllerNull,
    periodeEllerNull
} from '../../../../../../utils/string-utils';
import YtelserInfoGruppe from '../../felles-styling/YtelserInfoGruppe';

interface Props {
    sykepenger: Sykepenger;
}

function getForsikringEntries(forsikring: Forsikring | null): DescriptionListEntries {
    if (!forsikring) {
        return {};
    }
    return {
        Forsikring: NOKellerNull(forsikring.premiegrunnlag),
        'Gyldig forsikring': convertBoolTilJaNei(forsikring.erGyldig),
        Forsikringsperiode: periodeEllerNull(forsikring.forsikret)
    };
}

function getYrkesskadeEntries(sykeMeldinger: Sykmelding[]): DescriptionListEntries {
    const sisteSykemelding = sykeMeldinger[0];
    if (!sisteSykemelding || !sisteSykemelding.gjelderYrkesskade) {
        return {};
    }
    const yrkesSkade = sisteSykemelding.gjelderYrkesskade;
    return {
        Yrkesskade: yrkesSkade.yrkesskadeart,
        Yrkesskadedato: datoEllerNull(yrkesSkade.skadet),
        Vedtaksdato: datoEllerNull(yrkesSkade.vedtatt)
    };
}

function Sykepengertilfellet({ sykepenger }: Props) {
    const sykepengeTilfelletEntries: DescriptionListEntries = {
        'Sykemeldt fra og med': datoEllerNull(sykepenger.sykmeldtFom),
        'Forbrukte dager': sykepenger.forbrukteDager,
        'Untatt aktivitet': sykepenger.unntakAktivitet,
        'Midlertidig stans': sykepenger.midlertidigStanset,
        ...fjernEntriesUtenVerdi({
            Stansårsak: sykepenger.stansaarsak,
            Sanksjonperiode: periodeEllerNull(sykepenger.sanksjon)
        }),
        Ferieperioder: periodeEllerNull(sykepenger.ferie1),
        ...fjernEntriesUtenVerdi({
            Ferieperioder2: periodeEllerNull(sykepenger.ferie2)
        }),
        ...getForsikringEntries(sykepenger.forsikring),
        ...getYrkesskadeEntries(sykepenger.sykmeldinger)
    };

    return (
        <YtelserInfoGruppe tittel="Sykepengetilfellet">
            <DescriptionList entries={sykepengeTilfelletEntries} />
        </YtelserInfoGruppe>
    );
}

export default Sykepengertilfellet;
