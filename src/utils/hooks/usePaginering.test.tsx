import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import usePaginering from './usePaginering';
import navfaker from 'nav-faker';
import { shallow } from 'enzyme';

navfaker.seed('pagineringtest');

const getRandomListe = (length: number) => [...new Array(length)].map(() => navfaker.navn.fornavn());

test('Paginator paginerer riktig', () => {
    const pageSize = 5;
    const renderer = renderHook(() => usePaginering(getRandomListe(11), pageSize, 'item'));
    const pagination = renderer.result.current;
    const paginator = shallow(<div>{pagination.pageSelect}</div>);

    expect(pagination.currentPage).toHaveLength(pageSize);
    expect(paginator.find('option')).toHaveLength(3);
    expect(
        paginator
            .find('option')
            .first()
            .text()
    ).toBe('Viser item 1 til 5');
});
