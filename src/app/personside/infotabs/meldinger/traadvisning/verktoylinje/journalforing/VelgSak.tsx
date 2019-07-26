import React from 'react';
import { FetchContainer } from '../../../../../../../utils/hooks/use-fetch';
import { JournalforingsSak, SakKategori } from './JournalforingPanel';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { Radio } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeProps } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { StyledTable } from '../../../../../../../utils/table/StyledTable';
import { TableRow } from '../../../../../../../utils/table/Table';
import { Undertittel } from 'nav-frontend-typografi';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../../../../styles/personOversiktTheme';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';

interface Props {
    gsakSaker: FetchContainer<Array<JournalforingsSak>>;
    psakSaker: FetchContainer<Array<JournalforingsSak>>;
    alleSaker: FetchContainer<Array<JournalforingsSak>>;
    velgSak: (sak: JournalforingsSak) => void;
    lukkPanel: () => void;
}

type Tema = { tema: string; saker: Array<JournalforingsSak> };
type Kategorier = { [key in SakKategori]: Tema[] };

function getSaker(
    alle: FetchContainer<Array<JournalforingsSak>>,
    gsak: FetchContainer<Array<JournalforingsSak>>,
    psak: FetchContainer<Array<JournalforingsSak>>
): JournalforingsSak[] {
    if (alle.isLoading || alle.isError) {
        return [];
    }

    const psakData = psak.data || [];
    const gsakData = gsak.data || [];

    const psakIder = psakData.map(sak => sak.fagsystemSaksId);
    const gsakSaker = gsakData.filter(sak => !psakIder.includes(sak.fagsystemSaksId));

    return [...gsakSaker, ...psakData];
}

const Form = styled.form`
    display: flex;
    > * {
        margin: 0;
    }
    > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

function SakgruppeRadio(props: FieldState & { label: SakKategori }) {
    return (
        <Radio
            label={props.label}
            name="journalforing-sakgruppe"
            value={props.label}
            onChange={props.onChange}
            checked={props.value === props.label}
        />
    );
}

function ConditionalFeilmelding(props: AlertStripeProps & { vis: boolean }) {
    const { vis, ...rest } = props;
    if (!vis) {
        return null;
    }
    return <AlertStripeAdvarsel {...rest} />;
}

function fordelSaker(saker: JournalforingsSak[]): Kategorier {
    return saker.reduce(
        (kategorier: Kategorier, sak: JournalforingsSak) => {
            const kategori = sakKategori(sak);

            if (!temaFinnes(kategorier, kategori, sak.temaNavn)) {
                return lagTema(kategorier, kategori, sak);
            } else {
                return leggTilSak(kategorier, kategori, sak);
            }
        },
        { Fagsaker: [], 'Generelle saker': [] }
    );
}

export function sakKategori(sak: JournalforingsSak): SakKategori {
    return sak.sakstype === 'GEN' ? SakKategori.GEN : SakKategori.FAG;
}

function temaFinnes(acc: Kategorier, kategori: SakKategori, temaNavn: string): boolean {
    return acc[kategori].some(tema => tema.tema === temaNavn);
}

function lagTema(kategorier: Kategorier, sakKategori: SakKategori, sak: JournalforingsSak) {
    kategorier[sakKategori].push({ tema: sak.temaNavn, saker: [sak] });
    return kategorier;
}

function leggTilSak(kategorier: Kategorier, kategori: SakKategori, sak: JournalforingsSak) {
    kategorier[kategori] = kategorier[kategori].map(tema => {
        if (tema.tema !== sak.temaNavn) {
            return tema;
        }
        return {
            ...tema,
            saker: tema.saker.concat(sak)
        };
    });

    return kategorier;
}

const TableStyle = styled.div`
    border: ${theme.border.skille};
`;

function TemaTable({ tema, saker, velgSak }: Tema & { velgSak: (sak: JournalforingsSak) => void }) {
    const tittelRekke = ['Saks id', 'Opprettet dato', 'Fagsystem'];
    return (
        <TableStyle>
            <EkspanderbartpanelBase heading={<Undertittel tag="h4">{tema}</Undertittel>} apen={true}>
                <StyledTable
                    tittelRekke={tittelRekke}
                    rows={saker.map(sak => rad(sak))}
                    rowsOnClickHandlers={saker.map(sak => () => velgSak(sak))}
                />
            </EkspanderbartpanelBase>
        </TableStyle>
    );
}

function rad(sak: JournalforingsSak): TableRow {
    return [sak.saksId, sak.opprettetDatoFormatert, sak.fagsystemNavn];
}

function VelgSak(props: Props) {
    const valgtKategori = useFieldState(SakKategori.FAG);
    const { gsakSaker, psakSaker, alleSaker } = props;
    const saker = getSaker(alleSaker, gsakSaker, psakSaker);
    const fordelteSaker = fordelSaker(saker);

    const temaTable = fordelteSaker[valgtKategori.value].map((tema: Tema) => (
        <TemaTable key={tema.tema} tema={tema.tema} saker={tema.saker} velgSak={props.velgSak} />
    ));

    return (
        <>
            <Form className="blokk-xxs">
                <SakgruppeRadio label={SakKategori.FAG} {...valgtKategori} />
                <SakgruppeRadio label={SakKategori.GEN} {...valgtKategori} />
            </Form>
            <div className="blokk-xxs">
                <ConditionalFeilmelding vis={!gsakSaker.isError} className="blokk-xxxs">
                    Feil ved uthenting av saker fra GSAK
                </ConditionalFeilmelding>
                <ConditionalFeilmelding vis={!psakSaker.isError}>
                    Feil ved uthenting av saker fra PSAK
                </ConditionalFeilmelding>
            </div>
            {temaTable}
            <LenkeKnapp type="button" onClick={props.lukkPanel}>
                Avbryt
            </LenkeKnapp>
        </>
    );
}

export default VelgSak;
