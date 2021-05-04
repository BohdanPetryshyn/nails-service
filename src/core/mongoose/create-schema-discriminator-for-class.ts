import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';

export function createSchemaDiscriminatorForClass<T>(
  target: Type<T>,
  discriminatorField: string,
) {
  const schema = SchemaFactory.createForClass(target);

  delete schema.paths[discriminatorField];

  return schema;
}
