declare module 'nav-frontend-ekspanderbartpanel' {
    import * as React from "react";

    export interface EkspanderbartpanelBaseProps {
        apen: boolean;
        heading: React.ReactChildren | React.ReactChild;
        ariaTittel: string;
    }
    export class EkspanderbartpanelBase extends React.Component<EkspanderbartpanelBaseProps, {}>{

    }
}