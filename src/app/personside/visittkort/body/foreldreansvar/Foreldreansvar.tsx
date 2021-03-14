import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Utropstegn from '../../../../../svg/Utropstegn';
import { Foreldreansvar } from '../../../../../models/foreldreansvar/foreldreansvar';
import { Element, Normaltekst } from 'nav-frontend-typografi';

function ForeldreansvarVisittkort(props: { foreldreansvar: Foreldreansvar }) {
    return (
        <VisittkortGruppe ikon={<Utropstegn />} tittel="Foreldreansvar">
            <Element>
                {props.foreldreansvar.ansvarlig ? props.foreldreansvar.ansvarlig.sammensatt : 'Navn ikke tilgjengelig'}
            </Element>
            <Normaltekst>Ansvar: {props.foreldreansvar.ansvar}</Normaltekst>
            <Normaltekst>
                {props.foreldreansvar.ansvarligUtenIdentifikator.navn} (
                {props.foreldreansvar.ansvarligUtenIdentifikator.foedselsdato})
            </Normaltekst>
            <Normaltekst>{props.foreldreansvar.ansvarligUtenIdentifikator.statsborgerskap}</Normaltekst>
        </VisittkortGruppe>
    );
}

function ForendreansvarWrapper(props: { foreldreansvar?: Foreldreansvar }) {
    if (!props.foreldreansvar) {
        return null;
    }

    return <ForeldreansvarVisittkort foreldreansvar={props.foreldreansvar} />;
}
export default ForendreansvarWrapper;
