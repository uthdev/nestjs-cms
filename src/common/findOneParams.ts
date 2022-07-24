import { IsUUID } from 'class-validator';

class FindOneParams {
  @IsUUID()
  id: string;
}

export default FindOneParams