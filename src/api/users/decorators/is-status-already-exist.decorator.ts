import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { StatusesRepository } from '../../statuses/statuses.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsStatusAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private statusesRepository: StatusesRepository) {}

  async validate(id: number) {
    const status = await this.statusesRepository.findOne(id);

    if (!status) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `The status with given id (${args.value}) does not exist in the application`;
  }
}

export function IsStatusAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStatusAlreadyExistConstraint,
    });
  };
}
