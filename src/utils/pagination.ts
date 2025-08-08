import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { FindManyOptions } from 'typeorm';

// 分页查询参数
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageNum?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;
}

// 分页响应结构
export interface PaginatedResponse<T> {
  list: T[];
  total: number;
}

// 通用分页处理函数
export async function paginate<T>(
  repository: any,
  pagination: PaginationDto,
  options?: FindManyOptions<any>,
  transformer?: (item: any) => T,
): Promise<PaginatedResponse<T>> {
  const { pageNum = 1, pageSize = 10 } = pagination || {};

  const findOptions: FindManyOptions<any> = {
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    ...options,
  };

  const [items, total] = await repository.findAndCount(findOptions);

  const list = transformer ? items.map(transformer) : items;

  return {
    list,
    total,
  };
}
