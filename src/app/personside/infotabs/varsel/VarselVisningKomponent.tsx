import * as React from 'react';
import { Varsel } from '../../../../models/varsel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { genericDescendingDateComparator } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

interface VisningProps {
    varsler: Varsel[];
}

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

function VarselListe(props: { varsler: Varsel[] }) {
    const sortertPåDato = props.varsler.sort(genericDescendingDateComparator(varsel => varsel.mottattTidspunkt));

    const listeKomponenter = sortertPåDato.map(varsel => <VarselElement varsel={varsel} />);

    return <ListeStyle>{listeKomponenter}</ListeStyle>;
}

function VarselElement(props: { varsel: Varsel }) {
    return <Normaltekst>{props.varsel.varselType}</Normaltekst>;
}

function VarselVisning(props: VisningProps) {
    return (
        <article>
            <VarselListe varsler={props.varsler} />
        </article>
    );
}

export default VarselVisning;
