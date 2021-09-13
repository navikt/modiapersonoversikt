import * as React from 'react';
import { Foreldreansvar } from '../../../../../models/personPdl/foreldreansvar';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Infotegn from '../../../../../svg/Info';

function ForeldreansvarElement(props: { foreldreansvar: Foreldreansvar }) {
    const ansvarlig =
        (props.foreldreansvar.ansvarlig?.fornavn && props.foreldreansvar.ansvarlig?.etternavn) ??
        'Navn ikke tilgjengelig';
    const ansvar = props.foreldreansvar.ansvar ?? 'Kunne ikke finne type ansvar';
    const gjelder =
        props.foreldreansvar.ansvarsubject?.fornavn &&
        props.foreldreansvar.ansvarsubject?.etternavn &&
        `Gjelder for: ${props.foreldreansvar.ansvarsubject?.fornavn && props.foreldreansvar.ansvarsubject?.etternavn}`;
    return (
        <VisittkortElement>
            <Normaltekst>
                {ansvarlig}({ansvar})
            </Normaltekst>
            <Normaltekst>{gjelder}</Normaltekst>
        </VisittkortElement>
    );
}

function ForeldreansvarWrapper(props: { foreldreansvar?: Foreldreansvar[] }) {
    if (!props.foreldreansvar || props.foreldreansvar.length === 0) {
        return null;
    }
    const foreldreansvarElement = props.foreldreansvar.map((foreldreansvar, index) => (
        <ForeldreansvarElement key={index} foreldreansvar={foreldreansvar} />
    ));

    return (
        <VisittkortGruppe ikon={<Infotegn />} tittel="Foreldreansvar">
            {foreldreansvarElement}
        </VisittkortGruppe>
    );
}

export default ForeldreansvarWrapper;
