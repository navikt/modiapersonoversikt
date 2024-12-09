import { matchPathname } from '@tanstack/react-router';
import { paths } from '../../../../routes/routing';

export function erSakerFullscreen(pathname: string): boolean {
    return !!matchPathname(paths.sakerFullscreen, pathname, { to: pathname });
}
