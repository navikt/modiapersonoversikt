import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';
import Infotegn from '../../../../../svg/Info';
import { DeltBosted } from '../../PersondataDomain';
import Adresseinfo from '../AdresseInfo';
import GyldighetsPeriode from '../GyldighetsPeriode';

interface Props {
    deltBosted: DeltBosted[];
}

function DeltBostedElement(props: { deltBosted: DeltBosted }) {
    if (!props.deltBosted.adresse) {
        return null;
    }

    return (
        <VisittkortElement>
            <GyldighetsPeriode gyldighetsPeriode={props.deltBosted.gyldighetsPeriode} />
            <Adresseinfo adresse={props.deltBosted.adresse} />
        </VisittkortElement>
    );
}

function DeltBostedWrapper({ deltBosted }: Props) {
    if (deltBosted.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Delt Bosted'} ikon={<Infotegn />}>
            {deltBosted.map((deltBosted, index) => (
                <DeltBostedElement key={index} deltBosted={deltBosted} />
            ))}
        </VisittkortGruppe>
    );
}

export default DeltBostedWrapper;
