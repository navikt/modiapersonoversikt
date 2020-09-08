import { Notifikasjon } from './NotifikasjonsContainer';
import { NotifikasjonerProd } from './config/config';
import { getNotifikasjon } from '../../mock/notifikasjon/notifikasjon-mock';

function useNotifikasjoner(): Notifikasjon[] {
    if (process.env.REACT_APP_MOCK_ENABLED === 'false') {
        return getNotifikasjon();
    }

    return NotifikasjonerProd;
}

export default useNotifikasjoner;
