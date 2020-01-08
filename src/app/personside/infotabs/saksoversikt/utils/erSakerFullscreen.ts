import { paths } from '../../../../routes/routing';

export function erSakerFullscreen() {
    return document.location.pathname.includes(paths.sakerFullscreen);
}
