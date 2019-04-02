export function copyCSSStyles(sourceDoc: Document, targetDoc: Document) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
        copySheet(styleSheet, sourceDoc, targetDoc);
    });
}

function copySheet(styleSheet: StyleSheet, sourceDoc: Document, targetDoc: Document) {
    if (styleSheet instanceof CSSStyleSheet && styleSheet.cssRules) {
        copyCSSStyleSheet(sourceDoc, styleSheet, targetDoc);
    } else if (styleSheet.href) {
        copyLinkedStyleSheet(sourceDoc, styleSheet.href, targetDoc);
    }
}

function copyCSSStyleSheet(sourceDoc: Document, styleSheet: CSSStyleSheet, targetDoc: Document) {
    const newStyle = sourceDoc.createElement('style');

    Array.from(styleSheet.cssRules).forEach(cssRule => {
        appendCSSRule(cssRule, sourceDoc, newStyle);
    });

    if (targetDoc.head) {
        targetDoc.head.appendChild(newStyle);
    }
}

function appendCSSRule(cssRule: CSSRule, sourceDoc: Document, newStyleEl: HTMLElement) {
    let csstext = '';
    try {
        csstext = cssRule.cssText;
    } catch (err) {
        console.log(err);
    }
    const cssTextNode = sourceDoc.createTextNode(csstext);
    newStyleEl.appendChild(cssTextNode);
}

function copyLinkedStyleSheet(sourceDoc: Document, styleSheetRef: string, targetDoc: Document) {
    const newLinkEl = sourceDoc.createElement('link');

    newLinkEl.rel = 'stylesheet';
    newLinkEl.href = styleSheetRef;
    if (targetDoc.head) {
        targetDoc.head.appendChild(newLinkEl);
    }
}
