import { paths } from '../../../../routes/routing';
import { matchPath } from 'react-router';

export function erSakerFullscreen(pathname: string): boolean {
    return !!matchPath(pathname, paths.sakerFullscreen);
}
