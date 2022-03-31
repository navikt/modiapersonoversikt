import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import Infotegn from '../../../../../svg/Info';
import { Foreldreansvar, NavnOgIdent } from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';
import FeilendeSystemAdvarsel from '../../FeilendeSystemAdvarsel';

interface Props {
    feilendeSystem: boolean;
    foreldreansvar: Foreldreansvar[];
}

function kombinerNavnOgIdent(personInfo: NavnOgIdent | null): string | null {
    if (!personInfo) {
        return null;
    }
    const navn = hentNavn(personInfo.navn);
    return personInfo.navn ? `${navn} (${personInfo.ident})` : navn;
}

function ForeldreansvarElement(props: { feilendeSystem: boolean; foreldreansvar: Foreldreansvar }) {
    const { foreldreansvar } = props;

    if (props.feilendeSystem) {
        return (
            <VisittkortElement>
                <Normaltekst>Ansvar: {foreldreansvar.ansvar}</Normaltekst>
                <FeilendeSystemAdvarsel>Feilet ved uthenting av informasjon om barn</FeilendeSystemAdvarsel>
            </VisittkortElement>
        );
    }
    const ansvarlig = kombinerNavnOgIdent(foreldreansvar.ansvarlig);
    const ansvarsubject = kombinerNavnOgIdent(foreldreansvar.ansvarsubject);

    return (
        <VisittkortElement>
            <Normaltekst>Ansvar: {foreldreansvar.ansvar}</Normaltekst>
            {ansvarlig && <Normaltekst>Ansvarlig: {ansvarlig}</Normaltekst>}
            {ansvarsubject && <Normaltekst>Gjelder for: {ansvarsubject}</Normaltekst>}
        </VisittkortElement>
    );
}

function ForendreansvarWrapper({ feilendeSystem, foreldreansvar }: Props) {
    if (foreldreansvar.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe ikon={<Infotegn />} tittel="Foreldreansvar">
            {foreldreansvar.map((foreldreansvar, index) => (
                <ForeldreansvarElement key={index} feilendeSystem={feilendeSystem} foreldreansvar={foreldreansvar} />
            ))}
        </VisittkortGruppe>
    );
}
export default ForendreansvarWrapper;
