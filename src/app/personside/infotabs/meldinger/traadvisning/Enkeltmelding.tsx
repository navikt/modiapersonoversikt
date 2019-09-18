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

const SnakkebobleWrapper = styled.div`
    text-align: left;
`;

function meldingstittel(melding: Melding) {
    const lestTekst = melding.status === LestStatus.Lest ? 'Lest,' : 'Ulest,';
    return `${meldingstypeTekst(melding.meldingstype)} - ${lestTekst} ${temagruppeTekst(melding.temagruppe)}`;
}

function journalfortMelding(melding: Melding) {
    const navn = melding.journalfortAv && saksbehandlerTekst(melding.journalfortAv);
    const dato = melding.journalfortDato && formaterDato(melding.journalfortDato);
    return `Journalført av ${navn} ${dato} på tema ${melding.journalfortTemanavn} med saksid ${melding.journalfortSaksid}`;
}

function Journalforing({ melding }: { melding: Melding }) {
    return melding.journalfortAv && melding.journalfortDato ? (
        <JournalforingStyle>
            <EtikettGrå>{journalfortMelding(melding)}</EtikettGrå>
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
                <SnakkebobleWrapper>
                    <Element>{topptekst}</Element>
                    <Normaltekst>{datoTekst}</Normaltekst>
                    <Normaltekst>Skrevet av: {skrevetAv}</Normaltekst>
                    <hr />
                    <Tekstomrade>{props.melding.fritekst}</Tekstomrade>
                    <Journalforing melding={props.melding} />
                </SnakkebobleWrapper>
            </Snakkeboble>
        </div>
    );
}

export default EnkeltMelding;
