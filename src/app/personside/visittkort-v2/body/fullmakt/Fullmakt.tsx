import { ReadMore } from '@navikt/ds-react';
import { Feilmelding, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import { formaterRettighetstemaer } from '../../../../../utils/fullmakt-utils';
import { formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import { InformasjonElement, type Person } from '../../PersondataDomain';
import { hentNavn, hentPeriodeTekst } from '../../visittkort-utils';
import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';

type Fullmektig = Person['fullmektige'][number];
type FullmaktRepresentasjon = Fullmektig['fullmakt'];

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    fullmektige: Fullmektig[];
}

const GraTekst = styled.div`
    color: ${theme.color.graaSkrift};
    margin-top: -0.275rem;
    .typo-etikett-liten {
        line-height: 1rem;
    }
`;

function KontaktinformasjonFullmakt(props: {
    kontaktinformasjon: Fullmektig['digitalKontaktinformasjonTredjepartsperson'];
}) {
    if (!props.kontaktinformasjon) {
        return null;
    }

    const erReservert = props.kontaktinformasjon.reservasjon === true;
    const mobilnummer = formaterMobiltelefonnummer(
        props.kontaktinformasjon.mobiltelefonnummer ?? 'Fant ikke telefonnummer'
    );

    return (
        <>
            <Normaltekst>Telefon: {erReservert ? 'Reservert' : mobilnummer}</Normaltekst>
            <GraTekst>
                <Undertekst>I Kontakt- og reservasjonsregisteret</Undertekst>
            </GraTekst>
        </>
    );
}
const FullmaktTilganger = ({ fullmakt }: { fullmakt: FullmaktRepresentasjon }) => {
    const leserettigheter = formaterRettighetstemaer(fullmakt.leserettigheter);
    const skriverettigheter = formaterRettighetstemaer(fullmakt.skriverettigheter);
    return (
        <>
            {leserettigheter && <Normaltekst>Leserettigheter: {leserettigheter}</Normaltekst>}
            {skriverettigheter && <Normaltekst>Skriverettigheter: {skriverettigheter}</Normaltekst>}
        </>
    );
};

function Fullmektig(props: { fullmektig: Fullmektig; harFeilendeSystem: boolean }) {
    const fullmektigNavn = props.fullmektig.navn
        ? hentNavn({
              ...props.fullmektig.navn,
              mellomnavn: props.fullmektig.navn.mellomnavn ?? null
          })
        : hentNavn();
    const harFeilendeSystem =
        props.harFeilendeSystem && !props.fullmektig.navn ? (
            <Feilmelding>Feilet ved uthenting av navn</Feilmelding>
        ) : null;

    return (
        <VisittkortElement beskrivelse="Fullmektig">
            {harFeilendeSystem}
            <Normaltekst>
                {fullmektigNavn} {`(${props.fullmektig.ident})`}
            </Normaltekst>
            <KontaktinformasjonFullmakt
                kontaktinformasjon={props.fullmektig.digitalKontaktinformasjonTredjepartsperson}
            />
            <Normaltekst>
                Gyldig:{' '}
                {hentPeriodeTekst(props.fullmektig.fullmakt.gyldigFraOgMed, props.fullmektig.fullmakt.gyldigTilOgMed)}
            </Normaltekst>
            <ReadMore header="Detaljer" size="small">
                <FullmaktTilganger fullmakt={props.fullmektig.fullmakt} />
            </ReadMore>
        </VisittkortElement>
    );
}

function Fullmakter({ feilendeSystemer, fullmektige }: Props) {
    if (fullmektige.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel="Fullmakter" ikon={<Fullmaktlogo />}>
            {fullmektige.map((fullmektig) => (
                <Fullmektig
                    key={fullmektig.fullmakt.fullmaktId}
                    fullmektig={fullmektig}
                    harFeilendeSystem={
                        harFeilendeSystemer(feilendeSystemer, InformasjonElement.PDL_TREDJEPARTSPERSONER) ||
                        harFeilendeSystemer(feilendeSystemer, InformasjonElement.REPR_API)
                    }
                />
            ))}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
