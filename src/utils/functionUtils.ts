export function cancelIfHighlighting(func: () => void) {
    const selection = window.getSelection();
    if (selection.type !== 'Range') {
        func();
    }
}