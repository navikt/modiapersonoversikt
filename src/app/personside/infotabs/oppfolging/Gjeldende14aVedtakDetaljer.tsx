import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import { Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import type { Gjeldende14aVedtakResponse } from 'src/models/oppfolging';
import gjeldende14aVedtakResource from 'src/rest/resources/gjeldende14aVedtakResource';
import { datoEllerNull } from 'src/utils/string-utils';
import DescriptionList from '../../../../components/DescriptionList';

function Gjeldende14aVedtakDetaljer() {
    const gjeldende14aVedtakResponse = gjeldende14aVedtakResource.useFetch();
    const gjeldende14aVedtakData = gjeldende14aVedtakResponse.data as Gjeldende14aVedtakResponse;

    const headerId = useRef(guid());
    const detaljer = gjeldende14aVedtakData?.gjeldende14aVedtak;
    const responsePlaceholder = {
        returnOnError: 'Kunne ikke laste gjeldende 14a vedtak',
        returnOnNotFound: 'Kunne ikke finne gjeldende 14a vedtak',
        returnOnForbidden: 'Du har ikke tilgang til gjeldende 14a vedtak'
    };

    const gjeldende14aVedtakDetailElement = () => {
        if (!gjeldende14aVedtakResponse.isError) {
            return <DescriptionList entries={gjeldende14aVedtakEntries} />;
        }
        if (gjeldende14aVedtakResponse.error.response.status === 404) {
            return <AlertStripeAdvarsel>{responsePlaceholder.returnOnNotFound}</AlertStripeAdvarsel>;
        }
        if (gjeldende14aVedtakResponse.error.response.status === 403) {
            return <AlertStripeAdvarsel>{responsePlaceholder.returnOnForbidden}</AlertStripeAdvarsel>;
        }
        return <AlertStripeAdvarsel>{responsePlaceholder.returnOnError}</AlertStripeAdvarsel>;
    };

    const gjeldende14aVedtakEntries = {
        'Har 14a vedtak': detaljer ? 'Ja' : 'Nei',
        Innsatsgruppe: detaljer?.innsatsgruppe.beskrivelse,
        Hovedmål: detaljer?.hovedmal?.beskrivelse,
        Vedtaksdato: datoEllerNull(detaljer?.fattetDato)
    };

    return (
        <article>
            <Undertittel id={headerId.current}>14a vedtak</Undertittel>
            {gjeldende14aVedtakDetailElement()}
        </article>
    );
}

export default Gjeldende14aVedtakDetaljer;
