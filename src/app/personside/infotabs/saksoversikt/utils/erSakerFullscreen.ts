import { paths } from 'src/utils/paths';

export function erSakerFullscreen(pathname: string): boolean {
    return pathname === paths.sakerFullscreen || pathname === `${paths.sakerFullscreen}/`;
}
