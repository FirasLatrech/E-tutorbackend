// entity-audit.listener.ts
import { EntitySubscriberInterface, EventSubscriber, Entity } from 'typeorm';
import { EntityAuditLog } from './entity-audit-log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@EventSubscriber()
export class EntityAuditListener implements EntitySubscriberInterface {
  constructor(
    @InjectRepository(EntityAuditLog)
    private auditLogRepository: Repository<EntityAuditLog>,
  ) {}

  listenTo() {
    return Entity;
  }

  async beforeInsert(event) {
    // Create audit log for entity creation
    const auditLog = new EntityAuditLog();
    auditLog.entityName = event.metadata.tableName;
    auditLog.action = 'CREATE';
    auditLog.entityId = event.entity.id; // Assuming entity has an id property
    auditLog.timestamp = new Date();
    // You may want to fetch userId from your authentication system
    auditLog.userId = '1'; // For example, if the userId is 1
    await this.auditLogRepository.save(auditLog);
  }

  async beforeUpdate(event) {
    // Create audit log for entity update
    const auditLog = new EntityAuditLog();
    auditLog.entityName = event.metadata.tableName;
    auditLog.action = 'UPDATE';
    auditLog.entityId = event.entity.id; // Assuming entity has an id property
    auditLog.oldValue = JSON.stringify(event.databaseEntity);
    auditLog.newValue = JSON.stringify(event.entity);
    auditLog.timestamp = new Date();
    // You may want to fetch userId from your authentication system
    auditLog.userId = '1'; // For example, if the userId is 1
    await this.auditLogRepository.save(auditLog);
  }

  async beforeRemove(event) {
    // Create audit log for entity deletion
    const auditLog = new EntityAuditLog();
    auditLog.entityName = event.metadata.tableName;
    auditLog.action = 'DELETE';
    auditLog.entityId = event.entity.id; // Assuming entity has an id property
    auditLog.oldValue = JSON.stringify(event.entity);
    auditLog.timestamp = new Date();
    // You may want to fetch userId from your authentication system
    auditLog.userId = '1'; // For example, if the userId is 1
    await this.auditLogRepository.save(auditLog);
  }
}
