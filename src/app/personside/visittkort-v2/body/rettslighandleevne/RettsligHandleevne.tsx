import { Normaltekst } from 'nav-frontend-typografi';
import type { RettsligHandleevne } from 'src/app/personside/visittkort-v2/PersondataDomain';
import Utropstegn from 'src/svg/Utropstegn';
import GyldighetsPeriode from '../GyldighetsPeriode';
import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';

interface Props {
    rettsligHandleevne: RettsligHandleevne[];
}

function RettsligHandleevne({ rettsligHandleevne }: Props) {
    if (rettsligHandleevne.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel="Rettslig handleevne" ikon={<Utropstegn />}>
            <VisittkortElement>
                {rettsligHandleevne.map((evne, index) => {
                    return (
                        <div key={`${evne.omfang}-${index}`}>
                            <Normaltekst>Omfang: {evne.omfang}</Normaltekst>
                            <GyldighetsPeriode gyldighetsPeriode={evne.gyldighetsPeriode} />
                        </div>
                    );
                })}
            </VisittkortElement>
        </VisittkortGruppe>
    );
}

export default RettsligHandleevne;
