import React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../../../../styles/personOversiktTheme';
import { Input } from 'nav-frontend-skjema';

const DropDownWrapper = styled.div`
    ul {
        z-index: 1000;
        position: absolute;
        top: 100%;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    }
    li {
        min-width: 20rem;
        padding: 0.5rem 1rem;
        border: solid 0.05rem rgba(0, 0, 0, 0.2);
        background-color: white;
        color: black;
        display: flex;
    }
`;

const Style = styled.div`
    position: relative;
`;

interface Props<Item> {
    setValue: (value: Item) => void;
    inputValue: Item | undefined;
    itemToString: (item: Item) => string;
    label: string;
    suggestions: Item[];
    filter: (item: Item, input: string) => boolean;
}

function AutoComplete<Item>(props: Props<Item>) {
    const handleStateChange = (changes: any) => {
        if (changes.hasOwnProperty('selectedItem')) {
            props.setValue(changes.selectedItem);
        }
    };

    return (
        <Downshift
            selectedItem={props.inputValue}
            onStateChange={handleStateChange}
            itemToString={(item: Item) => (item ? props.itemToString(item) : '')}
        >
            {helpers => (
                <Style {...helpers.getRootProps()}>
                    <Input
                        // @ts-ignore
                        {...helpers.getInputProps({
                            onChange: e => {
                                if (e.target.value === '') {
                                    helpers.clearSelection();
                                }
                            }
                        })}
                        label={props.label}
                        onFocus={helpers.openMenu}
                    />
                    {helpers.isOpen ? (
                        <DropDownWrapper>
                            <ul>
                                {props.suggestions
                                    .filter(item => !helpers.inputValue || props.filter(item, helpers.inputValue))
                                    .map((item, index) => (
                                        <li
                                            {...helpers.getItemProps({
                                                key: props.itemToString(item),
                                                index,
                                                item,
                                                style: {
                                                    backgroundColor:
                                                        helpers.highlightedIndex === index
                                                            ? theme.color.navLysGra
                                                            : '#ffffff',
                                                    fontWeight: helpers.selectedItem === item ? 'bold' : 'normal'
                                                }
                                            })}
                                        >
                                            <Normaltekst>{props.itemToString(item)}</Normaltekst>
                                        </li>
                                    ))}
                            </ul>
                        </DropDownWrapper>
                    ) : null}
                </Style>
            )}
        </Downshift>
    );
}

export default AutoComplete;
