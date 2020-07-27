import { isTest } from './environment';

export function isSelectingText(): boolean {
    if (isTest()) {
        return false;
    }
    const selection = window.getSelection();
    if (!selection) {
        return false;
    }
    return selection.type === 'Range';
}

export function cancelIfHighlighting(func: () => void) {
    if (!isSelectingText()) {
        func();
    }
}
