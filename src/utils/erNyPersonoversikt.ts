export function erNyePersonoversikten(): boolean {
    const url = window.location.href;
    return url.includes('/modiapersonoversikt/');
}
