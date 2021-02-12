'use strict';

/**
 *По пути к вложенному свойству объекта устанавливает значение в это свойство
 *
 * @param {Object} object Объект, во вложенное свойство которого нужно установить значение
 * @param {String} propertyPath Путь к вложенному свойству объекта
 * @param {*} value Значение, которое нужно установить во вложенное свойство объекта
 * @returns {Object} Объект с установленным вложенным свойством
 */
const set = (object, propertyPath, value) => {
  try {
    if (typeof object != 'object' || typeof propertyPath != 'string') {
      throw new TypeError('Передан аргумент неверного типа');
    }
  } catch (e) {
    throw e;
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

  return object;
};
