import * as React from 'react';
import OppfolgingVisning from './OppfolgingVisningKomponent';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import oppfolging from '../../../../rest/resources/oppfolging';
import AlertStripe from 'nav-frontend-alertstriper';
import { hasError, isPending } from '@nutgaard/use-fetch';
import { useOnMount } from '../../../../utils/customHooks';

function OppfolgingContainer() {
    const oppfolgingResource = oppfolging.useLazyFetch();
    useOnMount(() => {
        oppfolgingResource.rerun();
    });

    if (isPending(oppfolgingResource)) {
        return BigCenteredLazySpinner;
    } else if (hasError(oppfolgingResource)) {
        return <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>;
    } else {
        return <OppfolgingVisning detaljertOppfolging={oppfolgingResource} />;
    }
}

export default OppfolgingContainer;
