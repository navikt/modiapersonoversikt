import { paths } from '../../../../routes/routing';
import { matchPathname } from '@tanstack/react-router';

export function erSakerFullscreen(pathname: string): boolean {
    return !!matchPathname(paths.sakerFullscreen, pathname, { to: pathname });
}
