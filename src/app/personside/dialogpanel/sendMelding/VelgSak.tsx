// Denne komponentes slettes når komponent fra Journalføring er ferdig
import * as React from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { groupArray } from '../../../../utils/groupArray';
import { Undertittel } from 'nav-frontend-typografi';
import Tabs from 'nav-frontend-tabs';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
    saker: JournalforingsSak[];
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
}

enum Sakstype {
    Fagsak,
    Generell
}

const FagSakGruppeStyle = styled.li`
    h4 {
        padding: 0.5rem;
        background-color: cornflowerblue;
    }
`;

function FagSakGruppe(props: {
    kategori: string;
    saker: JournalforingsSak[];
    setValgtSak: (sak: JournalforingsSak) => void;
}) {
    return (
        <FagSakGruppeStyle>
            <Undertittel tag="h4">{props.kategori}</Undertittel>
            {props.saker.map(sak => (
                <div>
                    <p>{sak.saksId}</p>
                    <button onClick={() => props.setValgtSak(sak)}>Velg</button>
                </div>
            ))}
        </FagSakGruppeStyle>
    );
}

function VelgSak(props: Props) {
    const [tab, setTab] = useState<Sakstype>(Sakstype.Fagsak);
    const generelleSaker = props.saker.filter(sak => sak.sakstype === 'GEN');
    const fagSaker = props.saker.filter(sak => sak.sakstype !== 'GEN');

    const groupedGenerelleSaker = groupArray(generelleSaker, (sak: JournalforingsSak) => sak.temaNavn);
    const groupedFagsaker = groupArray(fagSaker, (sak: JournalforingsSak) => sak.temaNavn);
    return (
        <>
            <Tabs tabs={[{ label: 'Fagsaker' }, { label: 'Generelle saker' }]} onChange={(_, i) => setTab(i)} />
            <ul>
                {(tab === Sakstype.Fagsak ? groupedFagsaker : groupedGenerelleSaker).map(gruppe => (
                    <FagSakGruppe
                        key={gruppe.category}
                        kategori={gruppe.category}
                        saker={gruppe.array}
                        setValgtSak={props.setValgtSak}
                    />
                ))}
            </ul>
        </>
    );
}

export default VelgSak;
