import { Alert } from '@navikt/ds-react';
import Panel from 'nav-frontend-paneler';
import { Element } from 'nav-frontend-typografi';
import { DittNavEventVarsel } from 'src/app/personside/infotabs/varsel/DittNavVarsler';
import type { Varsel } from 'src/generated/modiapersonoversikt-api';
import styled from 'styled-components';

interface Props {
    varsler: Array<Varsel>;
}

const HeaderStyle = styled(Panel)`
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 6rem 4rem 55% 1fr;
    grid-template-columns: 6rem 4rem minmax(35%, 55%) 1fr;
    > *:nth-child(1) {
        -ms-grid-column: 1;
    }
    > *:nth-child(2) {
        -ms-grid-column: 2;
    }
    > *:nth-child(3) {
        -ms-grid-column: 3;
    }
    > *:nth-child(4) {
        -ms-grid-column: 4;
    }
    > * {
        padding: 0.7rem;
    }
    padding: 0;
    margin-bottom: 1rem;
`;

const ListStyle = styled.ol`
    > * {
        margin-top: 0.5rem;
    }
    margin-bottom: 1rem;
`;

function Varsler(props: Props) {
    return (
        <>
            <HeaderStyle>
                <Element>Dato</Element>
                <Element>Status</Element>
                <Element>Type</Element>
                <Element>Kanal</Element>
            </HeaderStyle>
            <ListStyle aria-label="Brukerens varsler">
                {props.varsler.map((varsel) => (
                    <DittNavEventVarsel key={varsel.varselId} varsel={varsel} />
                ))}
            </ListStyle>
            <Alert variant="info">
                Varsler vises kun ett år tilbake i tid.
                <br />
                Dersom man trenger å se informasjon om eldre varsler kan man lage en sak i porten for manuell uthenting.
            </Alert>
        </>
    );
}

export default Varsler;
