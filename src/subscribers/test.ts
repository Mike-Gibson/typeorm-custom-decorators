import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Column } from "typeorm";
import { User } from "../entities/user";

@EventSubscriber()
export class CreatedBySubscriber implements EntitySubscriberInterface<User> {
    beforeInsert(event: InsertEvent<User>) {
        const applicableRegistrations = registrations.filter(r => {
            return event.entity instanceof r.constructor;
        });
        
        console.log('applicableRegistrations', applicableRegistrations);

        applicableRegistrations.forEach(r => r.operation(event.entity));

        // console.log(`BEFORE POST INSERTED: `, event.queryRunner.data);
    }
}

const registrations: any[] = [];

const register = (constructor: Object, operation: (entity: any) => void | Promise<void>) => {
    registrations.push({
        constructor,
        operation,
    });
};

// Decorator
export const CreatedBy = () => {
    return function (object: Object, propertyName: string) {
        console.log('decorating:', object, propertyName);
        register(object.constructor, entity => {
            console.log('setting created by on', entity);

            if (!entity[propertyName]) {
                entity[propertyName] = 'auto-set-woo-hoo';
            }

            console.log('entity now', entity);
        });

        Column({ nullable: false })(object, propertyName);
    };
}
