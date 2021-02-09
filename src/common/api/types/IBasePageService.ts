import { ApiResponse } from '@common/api/ApiResponse';
import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

export interface IBasePageService<
  Response extends IBasePageResponse = IBasePageResponse
> {
  init(route: string): Promise<ApiResponse<Response>>;
}
