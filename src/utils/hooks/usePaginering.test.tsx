import { render, renderHook, screen } from '@testing-library/react';
import navfaker from 'nav-faker';
import usePaginering from './usePaginering';

navfaker.seed('pagineringtest');

const getRandomListe = (length: number) => [...new Array<string>(length)].map(() => navfaker.navn.fornavn());

test('Paginator paginerer riktig', () => {
    const pageSize = 5;
    const renderer = renderHook(() => usePaginering(getRandomListe(11), pageSize, 'item'));
    const pagination = renderer.result.current;
    render(<div>{pagination.pageSelect}</div>);

    expect(pagination.currentPage).toHaveLength(pageSize);
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getAllByRole('option').firstOrNull()).toHaveTextContent('Viser item 1 til 5');
});
