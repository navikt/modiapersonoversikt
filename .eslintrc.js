module.exports = {
    extends: ['react-app', 'prettier'],
    rules: {
        'react/jsx-pascal-case': 0, // skrur av regelen for at æøå skal være greit i komponent-navn
        'react-hooks/exhaustive-deps': 'error'
    }
};
