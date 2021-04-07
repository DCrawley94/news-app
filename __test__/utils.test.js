const { queryCleaner } = require('../src/utils');

describe('queryCleaner', () => {
  test('should return an object', () => {
    expect(typeof queryCleaner({})).toBe('object');
  });
  test('should remove properties that have a value of undefined', () => {
    const queryObj = {
      topic: undefined,
      author: 'Geoff'
    };
    expect(queryCleaner(queryObj)).toEqual({ author: 'Geoff' });
  } );
    test('should avoid mutating given object', () => {
        const queryObj = {
          topic: undefined,
          author: 'Geoff'
        };
        queryCleaner( queryObj )
        expect(queryObj).toEqual({
          topic: undefined,
          author: 'Geoff'
        });
    });
});
