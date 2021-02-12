'use strict';

QUnit.module('Тестируем функцию set', function () {
  QUnit.test('set работает правильно c объектами с существующими свойствами', function (assert) {
    const object = {
      deep: {
        hested: {
          field: 'baz',
        },
      },
    };

    const object2 = {
      deep: {
        hested: {
          field: 42,
        },
      },
    };

    const object3 = {
      deep: {
        hested: {
          foo: 'bar',
        },
      },
    };

    const object4 = {
      deep: null,
    };

    assert.deepEqual(set({foo: 'bar'}, '.foo', 'baz'), {foo: 'baz'});
    assert.deepEqual(set(object, '.deep.hested.field', 42), object2);

    assert.deepEqual(set(object, '.deep.hested', {foo: 'bar'}), object3);
    assert.deepEqual(set(object, '.deep', null), object4);
  });

  QUnit.test('set изменяет переданный объект', function (assert) {
    const object = {
      foo: 'bar',
    };

    const object1 = {
      foo: 'baz',
    };

    const object2 = set(object, '.foo', 'baz');
    assert.deepEqual(object, object1);
    assert.deepEqual(object2, object1);
  });

  QUnit.test('set работает правильно c массивами', function (assert) {
    const object1 = {
      foo: [1, 2, 3],
      bar: [{foobar: '42'}],
    };

    const object2 = {
      foo: [1, 2, 3],
      bar: [{foobar: '42'}],
    };

    const new1 = {
      foo: [42, 2, 3],
      bar: [{foobar: '42'}],
    };

    const new2 = {
      foo: [1, 2, 3],
      bar: [{foobar: 'baz'}],
    };

    assert.deepEqual(set(object1, '.foo.0', 42), new1);
    assert.deepEqual(set(object2, '.bar.0.foobar', 'baz'), new2);
  });

  QUnit.test('set работает правильно c объектами без свойств', function (assert) {
    const object = {
      deep: {
        nested: {
          field: null,
        },
      },
    };

    assert.deepEqual(set({}, '.deep.nested.field', null), object);
  });

  QUnit.test('set работает правильно c разными типами и значениями свойств', function (assert) {
    const object1 = {
      deep: {
        nested: null,
      },
    };

    const object2 = {
      deep: {
        nested: 10,
      },
    };

    const object3 = {
      deep: {
        nested: -458.77,
      },
    };

    const object4 = {
      deep: {
        nested: 0,
      },
    };

    const object5 = {
      deep: {
        nested: true,
      },
    };

    const object6 = {
      deep: {
        nested: false,
      },
    };

    const object7 = {
      deep: {
        nested: 873n,
      },
    };

    const object8 = {
      deep: {
        nested: -11n,
      },
    };

    const object9 = {
      deep: {
        nested: 0n,
      },
    };

    const object10 = {
      deep: {
        nested: 'Hello',
      },
    };

    const object11 = {
      deep: {
        nested: '',
      },
    };

    assert.deepEqual(set({}, '.deep.nested', null), object1);
    assert.deepEqual(set({}, '.deep.nested', 10), object2);
    assert.deepEqual(set({}, '.deep.nested', -458.77), object3);
    assert.deepEqual(set({}, '.deep.nested', 0), object4);
    assert.deepEqual(set({}, '.deep.nested', true), object5);
    assert.deepEqual(set({}, '.deep.nested', false), object6);
    assert.deepEqual(set({}, '.deep.nested', 873n), object7);
    assert.deepEqual(set({}, '.deep.nested', -11n), object8);
    assert.deepEqual(set({}, '.deep.nested', 0n), object9);
    assert.deepEqual(set({}, '.deep.nested', 'Hello'), object10);
    assert.deepEqual(set({}, '.deep.nested', ''), object11);
  });

  QUnit.test('set работает правильно c неполными объектами', function (assert) {
    const object = {
      one: {
        two: {},
      },
    };

    const object1 = {
      one: {
        two: {
          five: {},
        },
      },
    };
    const object2 = {
      one: {
        two: {
          five: {
            ten: 14,
          },
        },
      },
    };

    assert.deepEqual(set(object, '.one.two.five', {}), object1);
    assert.deepEqual(set(object, '.one.two.five.ten', 14), object2);
  });

  QUnit.test('set кидает исключение при неверных типах входных данных', function (assert) {
    assert.throws(() => set(123, '.field', 14), new TypeError('Передан аргумент неверного типа'));
    assert.throws(() => set({}, 123, 14), new TypeError('Передан аргумент неверного типа'));
    assert.throws(() => set(123, 123, 14), new TypeError('Передан аргумент неверного типа'));
  });
});
