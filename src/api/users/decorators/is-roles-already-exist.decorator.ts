import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { RolesRepository } from '../../roles/roles.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRolesAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private rolesRepository: RolesRepository) {}

  async validate(ids: number[]) {
    const roles = await this.rolesRepository.findByIds(ids);

    if (ids.length !== roles.length) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `One of given roles (${args.value}) does not exist in the application`;
  }
}

export function IsRolesAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRolesAlreadyExistConstraint,
    });
  };
}
