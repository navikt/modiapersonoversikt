import { useSelector } from 'react-redux';
import type { AppState } from './reducers';

export function useAppState<T>(selector: (state: AppState) => T) {
    return useSelector((state: AppState) => selector(state));
}
