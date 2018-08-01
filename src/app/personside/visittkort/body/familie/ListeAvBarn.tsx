import * as React from 'react';

import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import { Familierelasjon, getBarnUnder21 } from '../../../../../models/person/person';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';
import { Diskresjonskode } from './common/Diskresjonskode';
import { getKjønnBeskrivelseForBarn, getKjønnIkon } from './common/Kjønn';

interface Props {
    relasjoner: Familierelasjon[];
}

interface BarnProps {
    barn: Familierelasjon;
}

function Barn({barn}: BarnProps) {
    const ikon = getKjønnIkon(barn.tilPerson.fødselsnummer);
    const beskrivelse = getKjønnBeskrivelseForBarn(barn.tilPerson.fødselsnummer);
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={ikon}>
            <Diskresjonskode diskresjonskode={barn.tilPerson.diskresjonskode}/>
            <Undertekst><NavnOgAlder relasjon={barn}/></Undertekst>
            <Undertekst>{barn.tilPerson.fødselsnummer || ''}</Undertekst>
            <Undertekst><BorMedBruker harSammeBosted={barn.harSammeBosted}/></Undertekst>
        </VisittkortElement>
    );
}

function getAlderOrDefault(familierelasjon: Familierelasjon) {
    return familierelasjon.tilPerson.alder ? familierelasjon.tilPerson.alder : 0;
}

function ListeAvBarn({relasjoner}: Props) {
    const barnUnder21 = getBarnUnder21(relasjoner);
    barnUnder21.sort((a, b) => getAlderOrDefault(b) - getAlderOrDefault(b));

    const barn = barnUnder21.map((barnet, index) => (
            <Barn
                key={barnet.tilPerson.fødselsnummer ? barnet.tilPerson.fødselsnummer : index}
                barn={barnet}
            />
        )
    );
    return <>{barn}</>;
}

export default ListeAvBarn;