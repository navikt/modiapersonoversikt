export const normalizeMessageText = (text: string): string =>
    text.replace(/\\n|\r?\n/g, '\n').replace(/\n{5,}/g, '\n\n\n\n');
