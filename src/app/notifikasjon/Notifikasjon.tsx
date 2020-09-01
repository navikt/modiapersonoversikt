import React from 'react';
import { FormStyle } from '../personside/dialogpanel/fellesStyling';
import { Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Tekstomrade from 'nav-frontend-tekstomrade';
import useNotifikasjoner from './useNotifikasjoner';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import { AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';

function Notifikasjon() {
    const notifikasjoner = useNotifikasjoner();
    console.log(notifikasjoner);

    if (notifikasjoner.error) {
        return <AlertStripeFeil>Notifikasjoner er nede, vennligst prøv igjen senere.</AlertStripeFeil>;
    }
    if (notifikasjoner.data.length === 0) {
        return <AlertStripeInfo>Fant ingen notifikasjoner</AlertStripeInfo>;
    }
    if (notifikasjoner.pending) {
        return <CenteredLazySpinner />;
    }
    const alleNotifikasjoner = notifikasjoner.data.map(notifikasjon => (
        <Panel border>
            <Systemtittel>{notifikasjon.tittel}</Systemtittel>
            <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
        </Panel>
    ));

    return (
        <form>
            <FormStyle>
                <section>{alleNotifikasjoner}</section>
            </FormStyle>
        </form>
    );
}

export default Notifikasjon;
