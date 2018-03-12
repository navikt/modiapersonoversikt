import * as React from 'react';
import styled from 'styled-components';

interface ComponentPlaceholderProps {
    name: string;
    height?: string;
}

interface ComponentPlaceholderState {
    componentNumber: number;
}

class ComponentPlaceholder extends React.Component<ComponentPlaceholderProps, ComponentPlaceholderState> {

    static componentCount: number = 0;

    static bgColors = [
        '#878',
        '#788',
        '#887',
        '#9b9',
        '#e99',
        '#99b'
    ];

    constructor(props: ComponentPlaceholderProps, state: ComponentPlaceholderState) {
        super(props, state);
        this.state = {
            componentNumber: ComponentPlaceholder.componentCount
        };
        ComponentPlaceholder.componentCount++;
    }

    public render() {
        const bgColor =
            ComponentPlaceholder.bgColors[this.state.componentNumber % ComponentPlaceholder.bgColors.length];
        const stripeColor = '#eee';

        const PlaceholderDiv = styled.div`
        background:
         repeating-linear-gradient(45deg, ${bgColor}, ${bgColor} 1.8em, ${stripeColor} 1.8em, ${stripeColor} 2em);
        height: ${this.props.height === undefined ? '100%' : this.props.height};
        display: flex;
        align-items: center;
        justify-content: center;
    `;

        const VerticalTitle = styled.h1`
        margin: 0;
        transform: rotate(-85deg);
        font-size: 3em;
        color: white;
        white-space: nowrap;
    `;

        return (
            <PlaceholderDiv>
                <VerticalTitle>{this.props.name}</VerticalTitle>
            </PlaceholderDiv>
        );
    }
}

export default ComponentPlaceholder;