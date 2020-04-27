export default function freeze<T extends { [key: string]: any }>(t: T): T {
    const propNames = Object.getOwnPropertyNames(t);
    for (let name of propNames) {
        let value = t[name];
        if (value && typeof value === 'object') {
            freeze(value);
        }
    }
    return Object.freeze(t);
}
