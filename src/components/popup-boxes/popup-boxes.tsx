import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdvarselIkon from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import ErrorIkon from 'nav-frontend-ikoner-assets/assets/feil-sirkel-fyll.svg';
import HelpIkon from 'nav-frontend-ikoner-assets/assets/help-circle_hover.svg';
import InfoIkon from 'nav-frontend-ikoner-assets/assets/info-sirkel-fyll.svg';
import OkIkon from 'nav-frontend-ikoner-assets/assets/ok-sirkel-fyll.svg';
import KnappBase from 'nav-frontend-knapper';
import RawModal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import type * as React from 'react';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { focusOnFirstFocusable } from '../../utils/hooks/use-focus-on-first-focusable';

type IconChoice = 'none' | 'ok' | 'warning' | 'error' | 'help' | 'info';
type CommonPopupComponentProps = {
    icon: IconChoice;
    header: string;
    message: string;
};
export type PopupComponentProps<RESULT, PROPS> = { close(result: RESULT): void } & PROPS;
type PopupComponent<RESULT, PROPS> = React.ComponentType<PopupComponentProps<RESULT, PROPS>>;

const Modal = styled(RawModal)`
    text-align: center;
    max-width: 30rem;
    width: 100%;
`;
const Knapp = styled(KnappBase)`
    display: block;
    width: 100%;
`;

function getIcon(choice: IconChoice): React.ReactNode {
    switch (choice) {
        case 'ok':
            return <OkIkon width="2rem" className="blokk-xs" />;
        case 'warning':
            return <AdvarselIkon width="2rem" className="blokk-xs" />;
        case 'error':
            return <ErrorIkon width="2rem" className="blokk-xs" />;
        case 'help':
            return <HelpIkon width="2rem" className="blokk-xs" />;
        case 'info':
            return <InfoIkon width="2rem" className="blokk-xs" />;
        default:
            return null;
    }
}

export function renderPopup<RESULT, PROPS>(
    queryClient: QueryClient | null,
    componentType: PopupComponent<RESULT, PROPS>,
    props: PROPS
): Promise<RESULT> {
    return new Promise((resolve) => {
        const tmp = document.createElement('div');
        document.body.appendChild(tmp);
        const root = createRoot(tmp);

        const close: (result: RESULT) => void = (result: RESULT) => {
            root.unmount();
            document.body.removeChild(tmp);
            resolve(result);
        };
        const component = createElement(componentType, { ...props, close });
        if (queryClient) {
            root.render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
        } else {
            root.render(component);
        }
    });
}

type ConfirmProps = CommonPopupComponentProps;

function Confirm(props: PopupComponentProps<boolean, ConfirmProps>) {
    return (
        <Modal
            contentLabel="Bekreft popup"
            onRequestClose={() => {}}
            closeButton={false}
            isOpen={true}
            contentRef={(el) => focusOnFirstFocusable(el)}
        >
            {getIcon(props.icon)}
            <Systemtittel tag="h1" className="blokk-xxxs">
                {props.header}
            </Systemtittel>
            <Normaltekst className="blokk-m">{props.message}</Normaltekst>
            <Knapp type="hoved" className="blokk-xxxs" onClick={() => props.close(true)}>
                OK
            </Knapp>
            <Knapp type="flat" onClick={() => props.close(false)}>
                Avbryt
            </Knapp>
        </Modal>
    );
}

export function confirm(props: CommonPopupComponentProps): Promise<boolean> {
    return renderPopup(null, Confirm, props);
}
