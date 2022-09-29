export interface Trie {
    [key: string]: Trie | true;
}

export function createTrie(data: string[], delimiter: string | RegExp): Trie {
    const trie: Trie = {};
    for (const element of data) {
        let current: Trie = trie;
        const path = element.split(delimiter).filter((it) => it !== '');
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            if (current[part] === undefined || typeof current[part] === 'boolean') {
                const isLast = i === path.length - 1;
                if (isLast) {
                    current[part] = true;
                    break;
                } else {
                    current[part] = {};
                }
            }
            current = current[part] as Trie;
        }
    }
    return trie;
}

export function searchTrie(trie: Trie, needle: string, delimiter: string | RegExp): boolean {
    const path: string[] = needle.split(delimiter).filter((it) => it !== '');
    let current: Trie | boolean | undefined = trie;

    for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
        if (current === true) {
            return true;
        }
        if (current === undefined) {
            return false;
        }
    }
    return true;
}
