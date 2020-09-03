import React, { useState } from 'react';
import { FormStyle } from '../personside/dialogpanel/fellesStyling';
import useNotifikasjoner from './useNotifikasjoner';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import { AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import EnkeltNotifikasjon from './Notifikasjon';
import { Nesteknapp } from 'nav-frontend-ikonknapper';
import styled from 'styled-components';

const StyledNesteknapp = styled(Nesteknapp)`
    float: right;
`;

function Notifikasjoner() {
    const notifikasjoner = useNotifikasjoner();

    const [indeks, setIndeks] = useState(0);

    const neste = () => {
        setIndeks(indeks + 1);
    };

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

    const notifikasjonArray = notifikasjoner.data.map(notifikasjon => {
        return notifikasjon;
    });

    const sortertNotifikasjonArray = notifikasjonArray.sort((a, b) => {
        return a.dato.localeCompare(b.dato);
    });

    sortertNotifikasjonArray.sort((a, b) => {
        return b.prioritet - a.prioritet;
    });

    const currentNotifikasjon = sortertNotifikasjonArray[indeks];

    return (
        <form>
            <FormStyle>
                <section>
                    <EnkeltNotifikasjon notifikasjon={currentNotifikasjon} />
                </section>
                <StyledNesteknapp onClick={neste} />
            </FormStyle>
        </form>
    );
}

export default Notifikasjoner;
