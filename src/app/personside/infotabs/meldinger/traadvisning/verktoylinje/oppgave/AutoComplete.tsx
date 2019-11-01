import React from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../../../../styles/personOversiktTheme';
import { Input } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import EtikettGrå from '../../../../../../../components/EtikettGrå';

const DropDownWrapper = styled.div`
    ul {
        z-index: 1000;
        position: absolute;
        top: 100%;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        max-height: 20rem;
        overflow: auto;
    }
    li {
        min-width: 20rem;
        padding: 0.5rem 1rem;
        border: solid 0.05rem rgba(0, 0, 0, 0.2);
        background-color: white;
        color: black;
        display: flex;
        &[aria-selected='true'] {
            background-color: ${theme.color.navLysGra};
            border: ${theme.border.skille};
        }
    }
`;

const Style = styled.div`
    position: relative;
`;

const StyledSpinner = styled(NavFrontendSpinner)`
    position: absolute !important;
    bottom: 0.4rem;
    right: 0.4rem;
`;

const InputfeltWrapper = styled.div`
    position: relative;
    margin-bottom: 1rem;
    .skjemaelement {
        margin-bottom: 0;
    }
`;

interface Props<Item> {
    setValue: (value: Item) => void;
    inputValue: Item | undefined;
    itemToString: (item: Item) => string;
    filter: (item: Item, input: string) => boolean;
    label: string;
    suggestions: Item[];
    topSuggestions?: Item[];
    topSuggestionsLabel?: string;
    otherSuggestionsLabel?: string;
    spinner?: boolean;
    feil?: SkjemaelementFeil;
}

function SuggestionMarkup<Item>(props: { item: Item; helpers: ControllerStateAndHelpers<Item> }) {
    return (
        <li
            {...props.helpers.getItemProps({
                item: props.item
            })}
        >
            <Normaltekst>{props.helpers.itemToString(props.item)}</Normaltekst>
        </li>
    );
}

function AutoComplete<Item>(props: Props<Item>) {
    const handleStateChange = (changes: any) => {
        if (changes.hasOwnProperty('selectedItem')) {
            props.setValue(changes.selectedItem);
        }
    };

    const itemNotInTopSuggestions = (item: Item) => {
        return (
            !props.topSuggestions ||
            !props.topSuggestions.some(it => props.itemToString(it) === props.itemToString(item))
        );
    };
    const itemMatchesInput = (input: string | null) => (item: Item) => !input || props.filter(item, input);

    const showTopSuggestions = props.topSuggestions && props.topSuggestions.length > 0;

    return (
        <Downshift
            selectedItem={props.inputValue}
            onStateChange={handleStateChange}
            itemToString={(item: Item) => (item ? props.itemToString(item) : '')}
        >
            {helpers => (
                <Style {...helpers.getRootProps()}>
                    <InputfeltWrapper>
                        <Input
                            feil={props.feil}
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
                            aria-label={props.spinner ? 'Laster data' : props.label}
                        />
                        {props.spinner && <StyledSpinner type={'S'} />}
                    </InputfeltWrapper>
                    {helpers.isOpen ? (
                        <DropDownWrapper>
                            <ul>
                                {showTopSuggestions && (
                                    <li>
                                        <EtikettGrå>{props.topSuggestionsLabel || 'Anbefalte forslag'}</EtikettGrå>
                                    </li>
                                )}
                                {props.topSuggestions
                                    ? props.topSuggestions
                                          .filter(itemMatchesInput(helpers.inputValue))
                                          .map(item => (
                                              <SuggestionMarkup
                                                  key={helpers.itemToString(item)}
                                                  item={item}
                                                  helpers={helpers}
                                              />
                                          ))
                                    : null}
                                {showTopSuggestions && (
                                    <li>
                                        <EtikettGrå>{props.otherSuggestionsLabel || 'Andre forslag'}</EtikettGrå>
                                    </li>
                                )}
                                {props.suggestions
                                    .filter(itemMatchesInput(helpers.inputValue))
                                    .filter(itemNotInTopSuggestions)
                                    .map(item => (
                                        <SuggestionMarkup
                                            key={helpers.itemToString(item)}
                                            item={item}
                                            helpers={helpers}
                                        />
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
