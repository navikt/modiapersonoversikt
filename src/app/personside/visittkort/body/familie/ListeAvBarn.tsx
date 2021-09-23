import * as React from 'react';

import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { Familierelasjon, getBarnUnder21 } from '../../../../../models/person/person';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';
import { Diskresjonskode } from './common/Diskresjonskode';
import { getKjonnBarnIkon, getKjonnBeskrivelseForBarn } from './common/Kjonn';

interface Props {
    relasjoner: Familierelasjon[];
}

interface BarnProps {
    barn: Familierelasjon;
}

function Barn({ barn }: BarnProps) {
    const ikon = getKjonnBarnIkon(barn.tilPerson.fødselsnummer);
    const beskrivelse = getKjonnBeskrivelseForBarn(barn.tilPerson.fødselsnummer);
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={ikon}>
            <Diskresjonskode diskresjonskode={barn.tilPerson.diskresjonskode} />
            <Normaltekst>
                <NavnOgAlder relasjon={barn} />
            </Normaltekst>
            <Normaltekst>{barn.tilPerson.fødselsnummer || ''}</Normaltekst>
            <Normaltekst>
                <BorMedBruker relasjon={barn} />
            </Normaltekst>
        </VisittkortElement>
    );
}

function getAlderOrDefault(familierelasjon: Familierelasjon) {
    return familierelasjon.tilPerson.alder ? familierelasjon.tilPerson.alder : 0;
}

function ListeAvBarn({ relasjoner }: Props) {
    const barnUnder21 = getBarnUnder21(relasjoner);
    barnUnder21.sort((a, b) => getAlderOrDefault(b) - getAlderOrDefault(b));

    const barn = barnUnder21.map((barnet, index) => (
        <Barn key={barnet.tilPerson.fødselsnummer ? barnet.tilPerson.fødselsnummer : index} barn={barnet} />
    ));
    return <>{barn}</>;
}

export default ListeAvBarn;
