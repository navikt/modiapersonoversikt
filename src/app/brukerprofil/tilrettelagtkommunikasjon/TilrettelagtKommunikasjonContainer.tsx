import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import TilrettelagtKommunikasjonsForm from './TilrettelagtKommunikasjonForm';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';

interface Props {
    person: Person;
}

const onError = (
    <AlertStripe type="advarsel">
        Det skjedde en feil ved lasting av kodeverk for tilrettelagt kommunikasjon.
    </AlertStripe>
);

function TilrettelagtKommunikasjonsContainer(props: Props) {
    return (
        <div>
            <Undertittel>Tilrettelagt Kommunikasjon</Undertittel>
            <RestResourceConsumer<KodeverkResponse>
                getResource={restResources => restResources.tilrettelagtKommunikasjonKodeverk}
                returnOnError={onError}
            >
                {tilrettelagtKommunikasjonKodeverk => (
                    <TilrettelagtKommunikasjonsForm
                        person={props.person}
                        tilrettelagtKommunikasjonKodeverk={tilrettelagtKommunikasjonKodeverk}
                    />
                )}
            </RestResourceConsumer>
        </div>
    );
}

export default TilrettelagtKommunikasjonsContainer;
