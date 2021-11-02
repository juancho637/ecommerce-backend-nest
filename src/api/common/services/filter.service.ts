import {
  FindConditions,
  FindManyOptions,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';

export class FilterService<E, T> {
  filterByParams(params: T): FindManyOptions<E> {
    const properties = new Map(Object.entries(params));
    const filterProperties: FindConditions<E> = {};
    let limit = 15;
    let page = 1;
    let include = [];

    properties.forEach((val, key) => {
      if (key === 'limit') {
        limit = parseInt(val);
        return;
      }
      if (key === 'page') {
        page = parseInt(val);
        return;
      }
      if (key === 'includes') {
        include = val;
        return;
      }
      const filterProperty = `${val}`.split('|');

      if (filterProperty.length === 1) {
        Object.assign(filterProperties, { [key]: filterProperty[0] });
      } else if (filterProperty.length === 2) {
        switch (filterProperty[0]) {
          case '>':
            Object.assign(filterProperties, {
              [key]: MoreThan(filterProperty[1]),
            });
            break;
          case '<':
            Object.assign(filterProperties, {
              [key]: LessThan(filterProperty[1]),
            });
            break;
          case '>=':
            Object.assign(filterProperties, {
              [key]: MoreThanOrEqual(filterProperty[1]),
            });
            break;
          case '<=':
            Object.assign(filterProperties, {
              [key]: LessThanOrEqual(filterProperty[1]),
            });
            break;
          case 'like':
            Object.assign(filterProperties, {
              [key]: Like(`%${filterProperty[1]}%`),
            });
            break;
          case 'in':
            Object.assign(filterProperties, {
              [key]: In(filterProperty[1].split(',')),
            });
            break;
        }
      }
    });

    const skip = (page - 1) * limit;

    return {
      where: filterProperties,
      relations: include,
      take: limit,
      skip,
    };
  }
}
