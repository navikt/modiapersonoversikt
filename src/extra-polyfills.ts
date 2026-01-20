import './utils/array-utils';

if (!Element.prototype.matches) {
    // @ts-expect-error
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
