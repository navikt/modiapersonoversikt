import React, { useState } from 'react';
import { AsyncResult, isPending, hasError } from '@nutgaard/use-fetch';
import { JournalforingsSak, SakKategori } from './JournalforingPanel';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { Radio } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeProps } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import { EkspanderbartpanelBasePure } from 'nav-frontend-ekspanderbartpanel';
import SaksTabell from './SaksTabell';

interface Props {
    gsakSaker: AsyncResult<Array<JournalforingsSak>>;
    psakSaker: AsyncResult<Array<JournalforingsSak>>;
    velgSak: (sak: JournalforingsSak) => void;
    lukkPanel: () => void;
}

type Tema = { tema: string; saker: Array<JournalforingsSak> };
type Kategorier = { [key in SakKategori]: Tema[] };

function getSaker(
    gsak: AsyncResult<Array<JournalforingsSak>>,
    psak: AsyncResult<Array<JournalforingsSak>>
): JournalforingsSak[] {
    if (isPending(gsak) || hasError(gsak) || isPending(psak) || hasError(psak)) {
        return [];
    }

    const psakData = psak.data;
    const gsakData = gsak.data;

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

function TemaTable({ tema, saker, velgSak }: Tema & { velgSak: (sak: JournalforingsSak) => void }) {
    const [apen, settApen] = useState(false);
    return (
        <EkspanderbartpanelBasePure
            heading={<Undertittel tag="h4">{tema}</Undertittel>}
            apen={apen}
            onClick={() => settApen(!apen)}
            className="blokk-xxxs"
            border
        >
            <SaksTabell saker={saker} velgSak={velgSak} />
        </EkspanderbartpanelBasePure>
    );
}

function VelgSak(props: Props) {
    const valgtKategori = useFieldState(SakKategori.FAG);
    const { gsakSaker, psakSaker } = props;
    const saker = getSaker(gsakSaker, psakSaker);
    const fordelteSaker = fordelSaker(saker);

    const temaTable = fordelteSaker[valgtKategori.value].map((tema: Tema) => (
        <TemaTable key={tema.tema} tema={tema.tema} saker={tema.saker} velgSak={props.velgSak} />
    ));

    return (
        <>
            <Form className="blokk-xs">
                <SakgruppeRadio label={SakKategori.FAG} {...valgtKategori} />
                <SakgruppeRadio label={SakKategori.GEN} {...valgtKategori} />
            </Form>
            <div className="blokk-xs">
                <ConditionalFeilmelding vis={hasError(gsakSaker)} className="blokk-xxxs">
                    Feil ved uthenting av saker fra GSAK
                </ConditionalFeilmelding>
                <ConditionalFeilmelding vis={hasError(psakSaker)}>
                    Feil ved uthenting av saker fra PSAK
                </ConditionalFeilmelding>
            </div>
            {temaTable}
        </>
    );
}

export default VelgSak;
