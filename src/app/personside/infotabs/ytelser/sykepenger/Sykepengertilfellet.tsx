import DescriptionList, {
    DescriptionListEntries,
    fjernEntriesUtenVerdi
} from '../../../../../components/DescriptionList';
import {
    convertBoolTilJaNei,
    datoEllerNull,
    NOKellerNull,
    periodeEllerNull
} from '../../../../../utils/stringFormatting';
import * as React from 'react';
import { Forsikring, Sykepenger } from '../../../../../models/ytelse/sykepenger';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';

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

function getYrkesskadeEntries(): DescriptionListEntries {
    return {
        Yrkesskade: '',
        Yrkesskadedato: '',
        Vedtaksdato: ''
    };
}

function Sykepengertilfellet({ sykepenger }: Props) {
    const sykepengeTilfelletEntries: DescriptionListEntries = {
        'Sykemeldt fra og med': datoEllerNull(sykepenger.sykmeldtFom),
        'Forbrukte dager': sykepenger.forbrukteDager,
        Maksdato: 'Ikke implementert',
        'Untatt aktivitet': sykepenger.unntakAktivitet,
        'Midlertidig stans': sykepenger.midlertidigStanset,
        ...fjernEntriesUtenVerdi({
            Stansårsak: sykepenger.stansårsak,
            Sanksjonperiode: periodeEllerNull(sykepenger.sanksjon)
        }),
        Ferieperioder: periodeEllerNull(sykepenger.ferie1),
        Ferieperioder2: periodeEllerNull(sykepenger.ferie2),
        ...getForsikringEntries(sykepenger.forsikring),
        ...getYrkesskadeEntries()
    };

    return (
        <YtelserInfoGruppe tittel="Sykepengetilfellet">
            <DescriptionList entries={sykepengeTilfelletEntries} />
        </YtelserInfoGruppe>
    );
}

export default Sykepengertilfellet;
