import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Utropstegn from '../../../../../svg/Utropstegn';
import { Foreldreansvar } from '../../../../../models/foreldreansvar/foreldreansvar';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';

function ForeldreansvarElement(props: { foreldreansvar: Foreldreansvar }) {
    return (
        <VisittkortElement>
            <Element>{props.foreldreansvar.ansvarlig?.sammensatt ?? 'Navn ikke tilgjengelig'}</Element>
            <Normaltekst>Ansvar: {props.foreldreansvar.ansvar}</Normaltekst>
        </VisittkortElement>
    );
}

function ForendreansvarWrapper(props: { foreldreansvar?: Foreldreansvar[] }) {
    if (!props.foreldreansvar) {
        return null;
    }
    const foreldreansvarElementer = props.foreldreansvar.map((foreldreansvar, index) => (
        <ForeldreansvarElement key={index} foreldreansvar={foreldreansvar} />
    ));

    return (
        <VisittkortGruppe ikon={<Utropstegn />} tittel="Foreldreansvar">
            {foreldreansvarElementer}
        </VisittkortGruppe>
    );
}
export default ForendreansvarWrapper;
