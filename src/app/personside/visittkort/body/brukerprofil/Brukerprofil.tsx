import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { EndreNavnRequest } from '../../../../../redux/brukerprofil/endreNavnRequest';
import { Person } from '../../../../../models/person/person';
import { STATUS } from '../../../../../redux/utils';
import { paths } from '../../../../routes/routing';
import BrukerprofilForm from './BrukerprofilForm';

interface BrukerprofilProps {
    person: Person;
    endreNavn: (requst: EndreNavnRequest) => void;
    resetEndreNavnReducer: () => void;
    status: STATUS;
}

const BrukerprofilWrapper = styled.div`
  margin-top: 2em;
  max-width: 640px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const LinkWrapper = styled.div`
  display: flex;
`;

function BrukerprofilSide(props: BrukerprofilProps) {
    return (
        <BrukerprofilWrapper>
            <LinkWrapper>
                <Filler/>
                <Link
                    className={'lenke'}
                    to={`${paths.personUri}/${props.person.fødselsnummer}`}
                    onClick={props.resetEndreNavnReducer}
                >
                    Tilbake
                </Link>
            </LinkWrapper>
            <BrukerprofilForm {...props}/>
        </BrukerprofilWrapper>
    );
}

export default BrukerprofilSide;
