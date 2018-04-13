import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../setupTests';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
