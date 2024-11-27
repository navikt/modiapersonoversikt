import DescriptionList, { DescriptionListEntries } from '../../../../../components/DescriptionList';
import { convertBoolTilJaNei } from 'src/utils/string-utils';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import { Sykepenger } from 'src/models/ytelse/sykepenger';
import ArbeidsForholdListe from './ArbeidsforholdListe';

interface Props {
    sykepenger: Sykepenger;
}

function Arbeidssituasjon(props: Props) {
    const sykemeldingEntries: DescriptionListEntries = {
        Arbeidsgiverperiode: convertBoolTilJaNei(props.sykepenger.erArbeidsgiverperiode),
        Arbeidskategori: props.sykepenger.arbeidskategori
    };

    return (
        <YtelserInfoGruppe tittel="Arbeidssituasjon">
            <DescriptionList entries={sykemeldingEntries} />
            <ArbeidsForholdListe arbeidsForhold={props.sykepenger.arbeidsforholdListe} />
        </YtelserInfoGruppe>
    );
}

export default Arbeidssituasjon;
