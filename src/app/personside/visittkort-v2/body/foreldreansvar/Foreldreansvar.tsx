import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import Infotegn from '../../../../../svg/Info';
import { Foreldreansvar } from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';

interface Props {
    foreldreansvar: Foreldreansvar[];
}

function ForeldreansvarElement(props: { foreldreansvar: Foreldreansvar }) {
    const ansvarlig = hentNavn(props.foreldreansvar.ansvarlig);
    const ansvar = props.foreldreansvar.ansvar;
    const gjelder =
        props.foreldreansvar.ansvarsubject && `Gjelder for: ${hentNavn(props.foreldreansvar.ansvarsubject)}`;
    return (
        <VisittkortElement>
            <Normaltekst>
                {ansvarlig}({ansvar})
            </Normaltekst>
            <Normaltekst>{gjelder}</Normaltekst>
        </VisittkortElement>
    );
}

function ForendreansvarWrapper({ foreldreansvar }: Props) {
    if (foreldreansvar.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe ikon={<Infotegn />} tittel="Foreldreansvar">
            {foreldreansvar.map((foreldreansvar, index) => (
                <ForeldreansvarElement key={index} foreldreansvar={foreldreansvar} />
            ))}
        </VisittkortGruppe>
    );
}
export default ForendreansvarWrapper;
