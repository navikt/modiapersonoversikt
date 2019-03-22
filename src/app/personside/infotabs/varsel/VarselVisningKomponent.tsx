import * as React from 'react';
import { Varsel } from '../../../../models/varsel';
import { genericDescendingDateComparator } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import EkspanderbartVarselPanel from './EkspanderbartVarselPanel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface VisningProps {
    varsler: Varsel[];
}

const ArticleStyle = styled.article`
    padding-left: ${theme.margin.layout};
`;

const ListeStyle = styled.ol`
    > * {
        margin-top: ${theme.margin.px10};
    }
`;

const HeadingStyle = styled.div`
    display: flex;
    > * {
        flex-grow: 1;
        &:nth-child(2) {
            flex-grow: 2;
        }
    }
`;

function VarselListe(props: { varsler: Varsel[] }) {
    const sortertPåDato = props.varsler.sort(genericDescendingDateComparator(varsel => varsel.mottattTidspunkt));

    const listeKomponenter = sortertPåDato.map(varsel => <EkspanderbartVarselPanel varsel={varsel} />);

    return <ListeStyle>{listeKomponenter}</ListeStyle>;
}

function VarselVisning(props: VisningProps) {
    return (
        <ArticleStyle>
            <HeadingStyle>
                <Normaltekst>DATO</Normaltekst>
                <Normaltekst>TYPE</Normaltekst>
                <Normaltekst>SENDT I KANAL</Normaltekst>
            </HeadingStyle>
            <VarselListe varsler={props.varsler} />
        </ArticleStyle>
    );
}

export default VarselVisning;
