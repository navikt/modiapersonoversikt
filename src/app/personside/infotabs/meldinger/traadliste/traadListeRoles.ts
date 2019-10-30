import { Traad } from '../../../../../models/meldinger/meldinger';

export const traadListeRoles = {
    ariaControls: 'traad-visning',
    ariaLabeledBy: (traad: Traad) => 'traadliste-' + traad.traadId
};
