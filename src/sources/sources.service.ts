import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { SourcesEntity } from './infrastructure/persistence/relational/entities/sources.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(SourcesEntity)
    private repository: Repository<SourcesEntity>,
  ) {}
  async create(createProfileDto) {
    return await this.repository.save(createProfileDto);
  }
}
