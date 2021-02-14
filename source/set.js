'use strict';

/**
 *По пути к вложенному свойству объекта устанавливает значение в это свойство
 *
 * @param {Object} object Объект, во вложенное свойство которого нужно установить значение
 * @param {String} propertyPath Путь к вложенному свойству объекта
 * @param {any} value Значение, которое нужно установить во вложенное свойство объекта
 * @returns {Object} Объект с установленным вложенным свойством
 */
const set = (object, propertyPath, value) => {
  try {
    if (!isCorrectType(object, propertyPath)) {
      throw new TypeError('Передан аргумент неверного типа');
    }

    const properties = propertyPath.split('.');
    properties.shift();
    let curObject = object;

    properties.forEach((item, index, arr) => {
      if (index < arr.length - 1) {
        curObject = curObject[item] === undefined ? (curObject[item] = {}) : curObject[item];
      }
    });

    curObject[properties.pop()] = value;
  } catch (e) {
    throw e;
  }

  return object;
};

const isCorrectType = (object, string) => {
  return !(typeof object !== 'object' || object === null || typeof string !== 'string');
};
