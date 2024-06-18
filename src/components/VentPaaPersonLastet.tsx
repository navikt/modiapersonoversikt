import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGjeldendeBrukerLastet } from '../redux/gjeldendeBruker/types';
import useTimeout from '../utils/hooks/use-timeout';
import { erGyldigishFnr } from '../utils/fnr-utils';
import { loggInfo } from '../utils/logger/frontendLogger';
import { paths } from '../app/routes/routing';
import { CenteredLazySpinner } from './LazySpinner';

type Props = {
    fnr: string;
};

// Timeout 1 sekund for å laste fra context
const TIMEOUT_MILLIS = 1000;

const VentPaaPersonLastet = ({ fnr, children }: PropsWithChildren<Props>) => {
    const [loadTimeout, setLoadTimeout] = useState(false);
    const history = useHistory();
    const gjeldendeBrukerHasLoaded = useGjeldendeBrukerLastet();
    useTimeout(() => setLoadTimeout(true), TIMEOUT_MILLIS);

    useEffect(() => {
        if (!erGyldigishFnr(fnr) && (gjeldendeBrukerHasLoaded || loadTimeout)) {
            loggInfo('Ugyldig fnr, redirecter til startside');
            history.push(`${paths.basePath}`);
        }
    }, [fnr, gjeldendeBrukerHasLoaded, loadTimeout]);

    if (!gjeldendeBrukerHasLoaded) {
        return <CenteredLazySpinner />;
    }

    return <>{children}</>;
};

export default VentPaaPersonLastet;
