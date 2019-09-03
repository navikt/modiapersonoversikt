export function erNyePersonoversikten(): boolean {
    const url = window.location.href;
    return url.includes('/modiapersonoversikt/');
}

export function erModiabrukerdialog(): boolean {
    const url = window.location.href;
    return url.includes('/modiabrukerdialog/');
}
