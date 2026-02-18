import { Box } from '@navikt/ds-react';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

type Props = Omit<ComponentPropsWithRef<typeof Box.New>, 'as'> & {
    as?: ComponentPropsWithRef<typeof Box.New>['as'];
};

const Card = ({ children, as, ...rest }: PropsWithChildren<Props>) => {
    return (
        <Box.New background="raised" borderRadius="small" flexGrow="1" as={as ?? 'div'} {...rest}>
            {children}
        </Box.New>
    );
};

export default Card;
