import { detect } from 'detect-browser';

export function erNyePersonoversikten(): boolean {
    const url = window.location.href;
    return url.includes('/modiapersonoversikt/');
}

export function erModiabrukerdialog(): boolean {
    const url = window.location.href;
    return url.includes('/modiabrukerdialog/');
}
export function erIE11(): boolean | undefined {
    const browser = detect();
    return (browser && browser.name && browser.name.toLowerCase().includes('ie')) || undefined;
}
