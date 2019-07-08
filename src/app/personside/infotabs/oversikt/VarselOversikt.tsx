import * as React from 'react';
import { Varsel as VarselModell, Varseltype } from '../../../../models/varsel';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { datoSynkende, formatterDatoMedMaanedsnavn } from '../../../../utils/dateUtils';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import styled from 'styled-components';
import { Bold } from '../../../../components/common-styled-components';
import theme from '../../../../styles/personOversiktTheme';

const ListStyle = styled.ol`
    > * {
        margin-top: 1px;
    }
`;

const VarselStyle = styled.div`
    display: grid;
    grid-template-columns: 70% auto;
    background-color: white;
    padding: ${theme.margin.px10};
`;

const Kommaliste = styled.ul`
    li {
        display: inline-block;
    }
    li:not(:last-child) {
        &:after {
            content: ',';
            margin-right: 0.5em;
        }
    }
`;

interface Props {
    varsler: VarselModell[];
}

function VarselOversikt() {
    return (
        <RestResourceConsumer<VarselModell[]> getResource={restResources => restResources.brukersVarsler}>
            {data => <VarselVisning varsler={data} />}
        </RestResourceConsumer>
    );
}

function VarselVisning(props: Props) {
    if (props.varsler.length === 0) {
        return <Normaltekst>Ingen varsler</Normaltekst>;
    }

    const sortertPåDato = props.varsler
        .sort(datoSynkende(varsel => varsel.mottattTidspunkt))
        .slice(0, Math.max(2, props.varsler.length));

    return (
        <ListStyle>
            {sortertPåDato.map((varsel, index) => (
                <Varsel key={index} varsel={varsel} />
            ))}
        </ListStyle>
    );
}

function Varsel({ varsel }: { varsel: VarselModell }) {
    const distinkteKommunikasjonsKanaler = new Set(varsel.meldingListe.map(melding => melding.kanal));
    const kommunikasjonskanaler = (
        <Kommaliste aria-label="Kommunikasjonskanaler">
            {Array.from(distinkteKommunikasjonsKanaler).map(kanal => (
                <Normaltekst tag="li" key={kanal}>
                    {kanal}
                </Normaltekst>
            ))}
        </Kommaliste>
    );
    const varselTekst = Varseltype[varsel.varselType] || 'Ukjent nøkkel: ' + varsel.varselType;

    return (
        <VarselStyle>
            <Normaltekst>{formatterDatoMedMaanedsnavn(varsel.mottattTidspunkt)}</Normaltekst>
            {kommunikasjonskanaler}
            <Normaltekst>
                <Bold>{varselTekst}</Bold>
            </Normaltekst>
        </VarselStyle>
    );
}

export default VarselOversikt;
