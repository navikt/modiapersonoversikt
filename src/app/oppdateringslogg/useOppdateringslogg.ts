import { EnOppdateringslogg } from './OppdateringsloggContainer';
import { OppdateringsloggProd } from './config/config';
import { getOppdateringsloggMock } from '../../mock/oppdateringslogg/oppdateringslogg-mock';

function useOppdateringslogg(): EnOppdateringslogg[] {
    if (process.env.REACT_APP_MOCK_ENABLED === 'false') {
        return getOppdateringsloggMock();
    }

    return OppdateringsloggProd;
}

export default useOppdateringslogg;
