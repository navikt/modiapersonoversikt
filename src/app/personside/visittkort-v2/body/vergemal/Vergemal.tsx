import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element, Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { Fragment } from 'react';
import Personopplysninger from 'src/components/PersonLinje/Personopplysninger';
import styled from 'styled-components';
import EtikettGraa from '../../../../../components/EtikettGraa';
import VergemalLogo from '../../../../../svg/Utropstegn';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import { InformasjonElement, type Verge as VergeInterface } from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';
import GyldighetsPeriode from '../GyldighetsPeriode';
import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';

const Vergeinformasjon = styled.div`
  margin-bottom: 5px;
`;

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    vergemal: VergeInterface[];
}

function Verge(props: { feilendeSystemer: Array<InformasjonElement>; verge: VergeInterface }) {
    const { verge } = props;
    const harFeilendeSystemOgIngenNavn =
        harFeilendeSystemer(props.feilendeSystemer, InformasjonElement.PDL_TREDJEPARTSPERSONER) && !verge.navn ? (
            <Feilmelding>Feilet ved uthenting av navn på verge</Feilmelding>
        ) : (
            <Normaltekst>{hentNavn(verge.navn, 'Navn ikke tilgjengelig')}</Normaltekst>
        );

    return (
        <VisittkortElement beskrivelse="Verge">
            <Vergeinformasjon>
                <Personopplysninger skjulingsaarsak={verge.skjulingsaarsak} tekstKomponent={Normaltekst}>
                    {harFeilendeSystemOgIngenNavn}
                    <Normaltekst>{verge.ident}</Normaltekst>
                </Personopplysninger>
            </Vergeinformasjon>
            {verge.tjenesteOppgaver && verge.tjenesteOppgaver?.length > 0 ? (
                <Fragment>
                    <Element>
                        Område{' '}
                        <Hjelpetekst>
                            Viser områdene verge har innsynsrett i.
                            <br />
                            Viser kun tjenesteoppgaver knyttet til NAV.
                        </Hjelpetekst>
                    </Element>
                    <Normaltekst>{verge.tjenesteOppgaver.join(', ')}</Normaltekst>
                </Fragment>
            ) : (
                <Fragment>
                    <Element>Omfang</Element>
                    <Normaltekst>{verge.omfang}</Normaltekst>
                </Fragment>
            )}
            <EtikettGraa>{verge.embete}</EtikettGraa>
            <GyldighetsPeriode gyldighetsPeriode={verge.gyldighetsPeriode} />
        </VisittkortElement>
    );
}

function Vergesakstype(props: { vergemal: VergeInterface[] }) {
    const alleVergesakstyper = props.vergemal.map((verge) => verge.vergesakstype);
    const unikeVergessakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return <Normaltekst>Vergesakstyper: {unikeVergessakstyper}</Normaltekst>;
}

function Vergemal({ feilendeSystemer, vergemal }: Props) {
    if (vergemal.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe ikon={<VergemalLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype vergemal={vergemal} />
            {vergemal.map((verge, index) => (
                <Verge feilendeSystemer={feilendeSystemer} verge={verge} key={index} />
            ))}
        </VisittkortGruppe>
    );
}

export default Vergemal;
