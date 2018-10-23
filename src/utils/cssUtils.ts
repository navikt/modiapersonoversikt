export function copyStyles(sourceDoc: Document, targetDoc: Document) {

    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
        if (styleSheet instanceof CSSStyleSheet && styleSheet.cssRules) {
            const newStyleEl = sourceDoc.createElement('style');

            Array.from(styleSheet.cssRules).forEach(cssRule => {
                let csstext = '';
                try {
                    csstext = cssRule.cssText;

                } catch (err) {
                    console.log(err);
                }
                const newChild = sourceDoc.createTextNode(csstext);
                newStyleEl.appendChild(newChild);
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) {
            const newLinkEl = sourceDoc.createElement('link');

            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
}