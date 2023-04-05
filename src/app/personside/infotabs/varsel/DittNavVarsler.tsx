import React from 'react';
import { VarselRow } from './VarselRow';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { emptyReplacement } from './varsel-utils';
import { ENDASH, formaterDato } from '../../../../utils/string-utils';
import { DittNavEvent } from '../../../../models/varsel';

const GraattDefinisjonsListe = styled.dl`
    ${theme.graattPanel}
    dt {
        float: left;
        clear: left;
        font-weight: bold;
        margin-bottom: 0.5rem;
        width: 7rem;
    }
    dd {
        margin-bottom: 0.5rem;
        margin-left: 7.125rem;
    }
`;

function DittNavInformasjonsLinje({ tittel, tekst }: { tittel: string; tekst: string }) {
    return (
        <>
            <dt>{tittel}</dt>
            <dd>{tekst}</dd>
        </>
    );
}

function DittNavInformasjonsLinjer(varsel: { produsent: string; tekst: string; link: string }) {
    return (
        <>
            <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Tekst:" tekst={emptyReplacement(varsel.tekst, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Link:" tekst={emptyReplacement(varsel.link, ENDASH)} />
        </>
    );
}

export function DittNavEventVarsel({ varsel }: { varsel: DittNavEvent }) {
    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const datoer = [formaterDato(varsel.forstBehandlet)];
    const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;
    const kanaler = ['DITT_NAV', ...varsel.eksternVarslingKanaler];

    return (
        <VarselRow datoer={datoer} tittel={tittel} kanaler={kanaler} varsel={varsel}>
            <GraattDefinisjonsListe>
                <DittNavInformasjonsLinjer produsent={varsel.produsent} tekst={varsel.tekst} link={varsel.link} />
            </GraattDefinisjonsListe>
        </VarselRow>
    );
}
