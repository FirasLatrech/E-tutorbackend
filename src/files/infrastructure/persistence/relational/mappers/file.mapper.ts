import { FileType } from '../../../../domain/file';
import { FileEntity } from '../entities/file.entity';

export class FileMapper {
  static toDomain(raw: FileEntity): FileType {
    const file = new FileType();
    file.id = raw.id;
    file.path = raw.path;
    file.name = raw.name;
    return file;
  }

  static toPersistence(file: FileType): FileEntity {
    const fileEntity = new FileEntity();
    fileEntity.id = file.id;
    fileEntity.name = file.name!;
    fileEntity.path = file.path;
    return fileEntity;
  }
}
