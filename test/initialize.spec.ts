import 'mocha';
import {expect} from 'chai';
import {add} from '../src/initialize';

describe('initialize', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).to.equal(3);
  });
});