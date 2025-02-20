import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import { Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import type { Siste14aVedtakResponse } from 'src/models/oppfolging';
import siste14aVedtakResource from 'src/rest/resources/siste14aVedtakResource';
import { datoEllerNull } from 'src/utils/string-utils';
import DescriptionList from '../../../../components/DescriptionList';

function Siste14aVedtakDetaljer() {
    const siste14aVedtakResponse = siste14aVedtakResource.useFetch();
    const siste14aVedtakData = siste14aVedtakResponse.data as Siste14aVedtakResponse;

    const headerId = useRef(guid());
    const detaljer = siste14aVedtakData?.siste14aVedtak;
    const responsePlaceholder = {
        returnOnError: 'Kunne ikke laste siste 14a vedtak',
        returnOnNotFound: 'Kunne ikke finne siste 14a vedtak',
        returnOnForbidden: 'Du har ikke tilgang til siste 14a vedtak'
    };

    const siste14aVedtakDetailElement = () => {
        if (!siste14aVedtakResponse.isError) {
            return <DescriptionList entries={siste14aVedtakEntries} />;
        }
        if (siste14aVedtakResponse.error.response.status === 404) {
            return <AlertStripeAdvarsel>{responsePlaceholder.returnOnNotFound}</AlertStripeAdvarsel>;
        }
        if (siste14aVedtakResponse.error.response.status === 403) {
            return <AlertStripeAdvarsel>{responsePlaceholder.returnOnForbidden}</AlertStripeAdvarsel>;
        }
        return <AlertStripeAdvarsel>{responsePlaceholder.returnOnError}</AlertStripeAdvarsel>;
    };

    const siste14aVedtakEntries = {
        'Har 14a vedtak': detaljer ? 'Ja' : 'Nei',
        Innsatsgruppe: detaljer?.innsatsgruppe.beskrivelse,
        Hovedmål: detaljer?.hovedmal?.beskrivelse,
        Vedtaksdato: datoEllerNull(detaljer?.fattetDato)
    };

    return (
        <article>
            <Undertittel id={headerId.current}>14a vedtak</Undertittel>
            {siste14aVedtakDetailElement()}
        </article>
    );
}

export default Siste14aVedtakDetaljer;
