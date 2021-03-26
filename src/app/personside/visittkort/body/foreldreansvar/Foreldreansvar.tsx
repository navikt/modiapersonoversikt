import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Utropstegn from '../../../../../svg/Utropstegn';
import { Foreldreansvar } from '../../../../../models/foreldreansvar/foreldreansvar';
import { Element } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';

function ForeldreansvarElement(props: { foreldreansvar: Foreldreansvar }) {
    return (
        <VisittkortElement>
            <Element>
                {props.foreldreansvar.ansvarlig?.sammensatt ?? 'Navn ikke tilgjengelig'}({props.foreldreansvar.ansvar})
            </Element>
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
