import { Level } from 'src/level/domain/level';
import { LevelEntity } from '../entities/level.entity';

export class LevelMapper {
  static toDomain(raw: LevelEntity): Level {
    const levelInstance = new Level();
    levelInstance.id = raw.id;

    levelInstance.name = raw.name!;

    return levelInstance;
  }

  static toPersistence(Level: Level): LevelEntity {
    const LevelEntityy = new LevelEntity();
    if (Level.id && typeof Level.id === 'number') {
      LevelEntityy.id = Level.id;
    }

    LevelEntityy.name = Level.name;

    LevelEntityy.createdAt = new Date();
    LevelEntityy.deletedAt = Level.deletedAt;

    return LevelEntityy;
  }
}
