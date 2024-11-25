import NAVSPA from '@navikt/navspa';
import { DecoratorPropsV3 } from './decoratorprops';

import { useDecoratorConfig } from './useDecoratorConfig';

const InternflateDecoratorV3LandingPage = NAVSPA.importer<DecoratorPropsV3>(
    'internarbeidsflate-decorator-v3-fullscreen'
);

export function LandingPage() {
    const { configV3 } = useDecoratorConfig();

    return <InternflateDecoratorV3LandingPage {...configV3} />;
}
