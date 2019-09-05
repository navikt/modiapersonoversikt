import * as React from 'react';
import { LestStatus, Melding } from '../../../../../models/meldinger/meldinger';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { erMeldingFraNav, saksbehandlerTekst } from '../utils/meldingerUtils';
import { meldingstypeTekst, temagruppeTekst } from '../utils/meldingstekster';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { formaterDato } from '../../../../../utils/stringFormatting';
import styled from 'styled-components';
import EtikettGrå from '../../../../../components/EtikettGrå';

const JournalforingStyle = styled.div`
    margin-top: 2rem;
`;

interface Props {
    melding: Melding;
}

function meldingstittel(melding: Melding) {
    const lestTekst = melding.status === LestStatus.Lest ? 'Lest, ' : 'Ulest, ';
    return `${meldingstypeTekst(melding.meldingstype)} - ${lestTekst} ${temagruppeTekst(melding.temagruppe)}`;
}

function Journalforing({ melding }: { melding: Melding }) {
    return melding.journalfortAv && melding.journalfortDato ? (
        <JournalforingStyle>
            <EtikettGrå>
                Journalført av {saksbehandlerTekst(melding.journalfortAv)} {formaterDato(melding.journalfortDato)}
            </EtikettGrå>
        </JournalforingStyle>
    ) : null;
}

function EnkeltMelding(props: Props) {
    const fraNav = erMeldingFraNav(props.melding.meldingstype);
    const topptekst = meldingstittel(props.melding);
    const datoTekst = formatterDatoTid(props.melding.opprettetDato);
    const skrevetAv = saksbehandlerTekst(props.melding.skrevetAv);

    return (
        <div className="snakkeboble_ikoner">
            <Snakkeboble pilHoyre={fraNav} ikonClass={fraNav ? 'nav-ikon' : 'bruker-ikon'}>
                <Element>{topptekst}</Element>
                <Normaltekst>{datoTekst}</Normaltekst>
                <Normaltekst>Skrevet av: {skrevetAv}</Normaltekst>
                <hr />
                <Tekstomrade>{props.melding.fritekst}</Tekstomrade>
                <Journalforing melding={props.melding} />
            </Snakkeboble>
        </div>
    );
}

export default EnkeltMelding;
