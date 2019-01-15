import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { CreatedBy } from "../subscribers/test";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreatedBy()
    createdBy!: string;

}
