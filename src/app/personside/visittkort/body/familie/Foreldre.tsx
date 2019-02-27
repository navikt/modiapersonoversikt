import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

import VisittkortElement from '../VisittkortElement';

import { Familierelasjon, getMorOgFar, Relasjonstype } from '../../../../../models/person/person';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';

import { Diskresjonskode } from './common/Diskresjonskode';
import { getKjønnIkon } from './common/Kjønn';

interface Props {
    familierelasjoner: Familierelasjon[];
}

interface ForelderProps {
    relasjon: Familierelasjon;
}

export function Forelder({ relasjon }: ForelderProps) {
    const beskrivelse = relasjon.rolle === Relasjonstype.Mor ? 'Mor' : 'Far';
    const ikon = getKjønnIkon(relasjon.tilPerson.fødselsnummer);
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={ikon}>
            <Diskresjonskode diskresjonskode={relasjon.tilPerson.diskresjonskode} />
            <Normaltekst>
                <NavnOgAlder relasjon={relasjon} />
            </Normaltekst>
            <Normaltekst>{relasjon.tilPerson.fødselsnummer || ''}</Normaltekst>
            <Normaltekst>
                <BorMedBruker harSammeBosted={relasjon.harSammeBosted} />
            </Normaltekst>
        </VisittkortElement>
    );
}

function Foreldre({ familierelasjoner }: Props) {
    const foreldre = getMorOgFar(familierelasjoner);

    const listeAvForeldre = foreldre.map((relasjon, index) => (
        <Forelder
            relasjon={relasjon}
            key={relasjon.tilPerson.fødselsnummer ? relasjon.tilPerson.fødselsnummer : index}
        />
    ));
    return <>{listeAvForeldre}</>;
}

export default Foreldre;
