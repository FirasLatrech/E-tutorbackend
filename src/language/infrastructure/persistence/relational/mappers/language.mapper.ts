import { language } from 'src/language/domain/language';
import { LanguageEntity } from '../entities/Language.entity';

export class LanguageMapper {
  static toDomain(raw: LanguageEntity): language {
    const Language = new language();
    Language.id = raw.id;

    Language.name = raw.name!;

    return Language;
  }

  static toPersistence(Language: language): LanguageEntity {
    const languageEntity = new LanguageEntity();
    if (Language.id && typeof Language.id === 'number') {
      languageEntity.id = Language.id;
    }

    languageEntity.name = Language.name;

    languageEntity.createdAt = new Date();
    languageEntity.deletedAt = Language.deletedAt;

    return languageEntity;
  }
}
