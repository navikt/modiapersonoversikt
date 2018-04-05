import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'babel-polyfill';

configure({ adapter: new Adapter() });
