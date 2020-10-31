import { Get } from '@nestjs/common';

export const GetPageWithApi = (path?: string): MethodDecorator => (
  target,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  Get(`:api(api/page)?${path}`)(target, propertyKey, descriptor);

  return descriptor;
};
