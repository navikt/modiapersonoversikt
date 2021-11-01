/* eslint-disable no-extend-native */
export {};
declare global {
    interface Array<T> {
        firstOrNull(): T | null;
        isEmpty(): boolean;
        isNotEmpty(): boolean;
    }
}

Array.prototype.firstOrNull = function() {
    return this.isEmpty() ? null : this[0];
};

Array.prototype.isEmpty = function() {
    return this.length === 0;
};

Array.prototype.isNotEmpty = function() {
    return this.length > 0;
};
