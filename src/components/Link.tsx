import { Link as AkselLink, type LinkProps } from '@navikt/ds-react';
import { type LinkComponent, createLink } from '@tanstack/react-router';
import { forwardRef } from 'react';

const BaseAkselLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    return <AkselLink ref={ref} {...props} />;
});

const AkselLinkComp = createLink(BaseAkselLink);

export const Link: LinkComponent<typeof AkselLinkComp> = (props) => {
    return <AkselLinkComp {...props} />;
};
