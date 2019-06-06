import * as React from 'react';
import { Varsel } from '../../../../models/varsel';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import EkspanderbartVarselPanel from './EkspanderbartVarselPanel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Bold } from '../../../../components/common-styled-components';
import { datoSynkende } from '../../../../utils/dateUtils';

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
        :nth-child(2) {
            flex-grow: 4;
        }
    }
    padding: 0px 1rem;
`;

function VarselListe(props: { varsler: Varsel[] }) {
    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt));

    const listeKomponenter = sortertPåDato.map(varsel => <EkspanderbartVarselPanel varsel={varsel} />);

    return <ListeStyle>{listeKomponenter}</ListeStyle>;
}

function VarselVisning(props: VisningProps) {
    return (
        <ArticleStyle>
            <HeadingStyle>
                <Normaltekst>
                    <Bold>DATO</Bold>
                </Normaltekst>
                <Normaltekst>
                    <Bold>TYPE</Bold>
                </Normaltekst>
                <Normaltekst>
                    <Bold>SENDT I KANAL</Bold>
                </Normaltekst>
            </HeadingStyle>
            <VarselListe varsler={props.varsler} />
        </ArticleStyle>
    );
}

export default VarselVisning;
