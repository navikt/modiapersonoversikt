export function cancelIfHighlighting(func: () => void) {
    const selection = window.getSelection();
    if (selection && selection.type !== 'Range') {
        func();
    }
}
