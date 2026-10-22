import { paths } from '../../../../routes/routing';

export function erSakerFullscreen(pathname: string): boolean {
    return pathname === paths.sakerFullscreen || pathname === `${paths.sakerFullscreen}/`;
}
