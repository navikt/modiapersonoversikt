import { Navigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { type JSX, useState } from 'react';
import { CenteredLazySpinner } from 'src/components/LazySpinner';
import { aktivBrukerAtom, aktivBrukerLastetAtom } from 'src/lib/state/context';
import { erGyldigishFnr } from 'src/utils/fnr-utils';
import useTimeout from 'src/utils/hooks/use-timeout';

const WaitForUserLoaded = ({ children }: { children: ({ fnr }: { fnr: string }) => JSX.Element }) => {
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    const aktivBrukerLastet = useAtomValue(aktivBrukerLastetAtom);

    const [loadTimeout, setLoadTimeout] = useState(false);
    useTimeout(() => setLoadTimeout(true), 2000);

    const validFnr = aktivBruker && erGyldigishFnr(aktivBruker);

    if (loadTimeout && !validFnr) return <Navigate to="/" replace />;
    if (!aktivBrukerLastet) return <CenteredLazySpinner />;

    if (!aktivBruker) return <Navigate to="/" replace />;

    return children({ fnr: aktivBruker });
};

export default WaitForUserLoaded;
