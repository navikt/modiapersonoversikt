import * as React from 'react';
import VisittkortElement from '../VisittkortElement';
import { Feilmelding, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import {
    DigitalKontaktinformasjonTredjepartsperson,
    Fullmakt as FullmaktInterface,
    InformasjonElement,
    KodeBeskrivelse
} from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';
import GyldighetsPeriode from '../GyldighetsPeriode';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import { formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    fullmakter: FullmaktInterface[];
}

const GraTekst = styled.div`
    color: ${theme.color.graaSkrift};
    margin-top: -0.275rem;
    .typo-etikett-liten {
        line-height: 1rem;
    }
`;

function getOmrade(omrader: KodeBeskrivelse<string>[]): string {
    if (omrader.map((omrade) => omrade.kode).includes('*')) {
        return 'alle ytelser';
    }
    return omrader.map((omrade) => omrade.beskrivelse).join(', ');
}

function KontaktinformasjonFullmakt(props: { kontaktinformasjon: DigitalKontaktinformasjonTredjepartsperson | null }) {
    if (!props.kontaktinformasjon) {
        return null;
    }

    const erReservert = props.kontaktinformasjon.reservasjon === 'true';
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

function Fullmakt(props: { fullmakt: FullmaktInterface; harFeilendeSystem: boolean }) {
    const motpartsPersonNavn = hentNavn(props.fullmakt.motpartsPersonNavn);
    const beskrivelse = props.fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver';
    const harFeilendeSystem = props.harFeilendeSystem ? <Feilmelding>Feilet ved uthenting av navn</Feilmelding> : null;

    return (
        <VisittkortElement beskrivelse={beskrivelse}>
            {harFeilendeSystem}
            <Normaltekst>
                {motpartsPersonNavn} {`(${props.fullmakt.motpartsPersonident})`}
            </Normaltekst>
            <Normaltekst>Gjelder {getOmrade(props.fullmakt.omrade)}</Normaltekst>
            <KontaktinformasjonFullmakt
                kontaktinformasjon={props.fullmakt.digitalKontaktinformasjonTredjepartsperson}
            />
            <GyldighetsPeriode gyldighetsPeriode={props.fullmakt.gyldighetsPeriode} />
        </VisittkortElement>
    );
}

function Fullmakter({ feilendeSystemer, fullmakter }: Props) {
    if (fullmakter.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter.map((fullmakt, index) => (
                <Fullmakt
                    key={index}
                    fullmakt={fullmakt}
                    harFeilendeSystem={harFeilendeSystemer(
                        feilendeSystemer,
                        InformasjonElement.PDL_TREDJEPARTSPERSONER
                    )}
                />
            ))}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
