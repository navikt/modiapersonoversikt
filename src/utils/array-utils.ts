export {};
declare global {
    interface Array<T> {
        firstOrNull(): T | null;
        isEmpty(): boolean;
        isNotEmpty(): boolean;
        lastOrNull(): T | null;
        unique(): Array<T>;
    }
}

Array.prototype.firstOrNull = function <T>(this: T[]) {
    return this.isEmpty() ? null : this[0];
};

Array.prototype.isEmpty = function <T>(this: T[]) {
    return this.length === 0;
};

Array.prototype.isNotEmpty = function <T>(this: T[]) {
    return this.length > 0;
};

Array.prototype.lastOrNull = function <T>(this: T[]) {
    return this.isEmpty() ? null : this[this.length - 1];
};

Array.prototype.unique = function <T>(this: T[]) {
    return Array.from(new Set(this));
};
