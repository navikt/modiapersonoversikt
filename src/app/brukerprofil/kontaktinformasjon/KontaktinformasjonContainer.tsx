import * as React from 'react';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import KontaktinformasjonForm from './KontaktinformasjonForm';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';

interface Props {
    person: Person;
}

const NavKontaktinformasjonWrapper = styled.div`
    margin-top: 2em;
`;

function KontaktinformasjonFormContainer(props: Props) {
    return (
        <div>
            <Undertittel>Kontaktinformasjon</Undertittel>
            <RestResourceConsumer<KodeverkResponse> getResource={restResources => restResources.retningsnummer}>
                {retningsnummer => (
                    <NavKontaktinformasjonWrapper>
                        <KontaktinformasjonForm person={props.person} retningsnummerKodeverk={retningsnummer} />
                    </NavKontaktinformasjonWrapper>
                )}
            </RestResourceConsumer>
        </div>
    );
}

export default KontaktinformasjonFormContainer;
