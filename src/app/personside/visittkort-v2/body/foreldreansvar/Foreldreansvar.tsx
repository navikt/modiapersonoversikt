import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import Infotegn from '../../../../../svg/Info';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import { type Foreldreansvar, InformasjonElement, type NavnOgIdent } from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';
import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    foreldreansvar: Foreldreansvar[];
}

function kombinerNavnOgIdent(personInfo: NavnOgIdent | null): string | null {
    if (!personInfo) {
        return null;
    }

    const navn = hentNavn(personInfo.navn);
    const ident = personInfo.ident ? personInfo.ident : 'Ukjent fnr/dnr';

    return personInfo.navn ? `${navn} (${ident})` : navn;
}

function ForeldreansvarElement(props: { harFeilendeSystem: boolean; foreldreansvar: Foreldreansvar }) {
    const { foreldreansvar } = props;

    if (props.harFeilendeSystem) {
        return (
            <VisittkortElement>
                <Normaltekst>Ansvar: {foreldreansvar.ansvar}</Normaltekst>
                <Feilmelding>Feilet ved uthenting av informasjon om barn</Feilmelding>
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

function ForendreansvarWrapper({ feilendeSystemer, foreldreansvar }: Props) {
    if (foreldreansvar.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe ikon={<Infotegn />} tittel="Foreldreansvar">
            {foreldreansvar.map((foreldreansvar, index) => (
                <ForeldreansvarElement
                    key={index}
                    harFeilendeSystem={harFeilendeSystemer(
                        feilendeSystemer,
                        InformasjonElement.PDL_TREDJEPARTSPERSONER
                    )}
                    foreldreansvar={foreldreansvar}
                />
            ))}
        </VisittkortGruppe>
    );
}
export default ForendreansvarWrapper;
