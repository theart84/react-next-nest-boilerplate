import { Get } from '@nestjs/common';

export const GetPageWithApi = (path = ''): MethodDecorator => (
  target,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  Get(`:api(api/page)?${path}`)(target, propertyKey, descriptor);

  return descriptor;
};
