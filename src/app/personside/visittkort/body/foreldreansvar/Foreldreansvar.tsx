import * as React from 'react';
import { VisittkortGruppe } from '../VisittkortStyles';
import Utropstegn from '../../../../../svg/Utropstegn';
import { Foreldreansvar } from '../../../../../models/foreldreansvar/foreldreansvar';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';

import styled from 'styled-components/macro';

const Margin = styled.div`
    margin-bottom: 5px;
`;
function Foreldreansvar(props: { foreldreansvar: Foreldreansvar }) {
    return (
        <VisittkortGruppe ikon={<Utropstegn />} tittel="Bruker har foreldreansvar">
            <VisittkortElement beskrivelse={'Foreldreansvar'}>
                <Margin>
                    <Normaltekst>
                        {props.foreldreansvar.ansvarlig
                            ? props.foreldreansvar.ansvarlig.sammensatt
                            : 'Navn ikke tilgjengelig'}
                    </Normaltekst>
                    <Normaltekst>Ansvar: {props.foreldreansvar.ansvar}</Normaltekst>
                </Margin>
            </VisittkortElement>
        </VisittkortGruppe>
    );
}

function ForendreansvarWrapper(props: { foreldreansvar: Foreldreansvar }) {
    if (!props.foreldreansvar) {
        return null;
    }

    return <Foreldreansvar foreldreansvar={props.foreldreansvar} />;
}
export default ForendreansvarWrapper;
