import {
    mount as enzymeMount,
    MountRendererProps,
    ReactWrapper,
    shallow as enzymeShallow,
    ShallowRendererProps,
    ShallowWrapper
} from 'enzyme';
import { Component, ReactElement } from 'react';
export { ReactWrapper } from 'enzyme';

/**
 * Nyere versjoner av jsdom krever at HTMLElement er tilknyttet `document` for at visse funksjoner skal
 * ha effekt, f.eks `element.focus()`.
 *
 * I de tilfellene man skal teste om focus endrer på seg, må man derfor passe på å bruke `mount`/`shallow` herifra
 *
 */
const containerId = 'enzymeContainer';

export function mount<C extends Component, P = C['props'], S = C['state']>(
    node: ReactElement<P>,
    options?: MountRendererProps
): ReactWrapper<P, S, C>;
export function mount<P>(node: ReactElement<P>, options?: MountRendererProps): ReactWrapper<P, any>;
export function mount<P, S>(node: ReactElement<P>, options?: MountRendererProps): ReactWrapper<P, S> {
    return enzymeMount(node, { ...options, attachTo: document.getElementById(containerId) });
}

export function shallow<C extends Component, P = C['props'], S = C['state']>(
    node: ReactElement<P>,
    options?: ShallowRendererProps
): ShallowWrapper<P, S, C>;
export function shallow<P>(node: ReactElement<P>, options?: ShallowRendererProps): ShallowWrapper<P, any>;
export function shallow<P, S>(node: ReactElement<P>, options?: ShallowRendererProps): ShallowWrapper<P, S> {
    return enzymeShallow(node, { ...options, attachTo: document.getElementById(containerId) });
}

export function beforeEachHandler() {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
}
export function afterEachHandler() {
    document.body.innerHTML = '';
}
