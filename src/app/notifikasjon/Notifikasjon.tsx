import React from 'react';
import { FormStyle } from '../personside/dialogpanel/fellesStyling';
import { Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Tekstomrade from 'nav-frontend-tekstomrade';

function Notifikasjon() {
    return (
        <form>
            <FormStyle>
                <section>
                    <Panel border>
                        <Systemtittel>Ny oppdatering</Systemtittel>
                        <Tekstomrade>{`Vi har lagd en ny print-knapp.`}</Tekstomrade>
                    </Panel>
                </section>
                <section>
                    <Panel border>
                        <Systemtittel>Ny beskjed</Systemtittel>
                        <Tekstomrade>{`Nå kan man skrive ut forskudd på dagpenger.`}</Tekstomrade>
                    </Panel>
                </section>
                <section>
                    <Panel border>
                        <Systemtittel>Ny oppdatering</Systemtittel>
                        <Tekstomrade>{`Tester`}</Tekstomrade>
                    </Panel>
                </section>
            </FormStyle>
        </form>
    );
}

export default Notifikasjon;
