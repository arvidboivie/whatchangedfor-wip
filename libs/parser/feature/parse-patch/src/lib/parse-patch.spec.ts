import { parsePatch } from './parse-patch';

describe('parsePatch', () => {
  it('should work', () => {
    expect(parsePatch()).toEqual('parse-patch');
  });
});
