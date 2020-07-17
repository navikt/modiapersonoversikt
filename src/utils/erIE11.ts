import { detect } from 'detect-browser';

export function erIE11(): boolean | undefined {
    const browser = detect();
    return (browser && browser.name && browser.name.toLowerCase().includes('ie')) || undefined;
}
