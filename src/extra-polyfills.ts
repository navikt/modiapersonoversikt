if (!Element.prototype.matches) {
    // @ts-ignore
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

export default {}; // Bare for å gjøre TS happy
