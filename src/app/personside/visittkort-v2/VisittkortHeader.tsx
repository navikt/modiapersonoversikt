import * as React from 'react';
import { Data as Persondata } from './PersondataDomain';

interface Props {
    persondata: Persondata;
    erApen: boolean;
    toggleApen: () => void;
}

function VisittkortHeader(props: Props) {
    return <h1>Hello header</h1>;
}

export default VisittkortHeader;
