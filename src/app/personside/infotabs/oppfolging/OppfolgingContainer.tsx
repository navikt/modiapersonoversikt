import * as React from 'react';
import OppfolgingVisning from './OppfolgingVisningKomponent';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import oppfolgingResource from '../../../../rest/resources/oppfolgingResource';
import AlertStripe from 'nav-frontend-alertstriper';

function OppfolgingContainer() {
    const oppfolging = oppfolgingResource.useFetch();

    if (oppfolging.isLoading) {
        return BigCenteredLazySpinner;
    } else if (oppfolging.isError) {
        return <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>;
    } else {
        return <OppfolgingVisning detaljertOppfolging={oppfolging.data} />;
    }
}

export default OppfolgingContainer;
