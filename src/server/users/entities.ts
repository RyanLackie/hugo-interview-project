import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";
import { Application } from "../applications/entities";


export enum Relationship {
    SPOUSE = "Spouse",
    SIBLING = "Sibling",
    PARENT = "Parent",
    FRIEND = "Friend",
    OTHER = "Other",
    NONE = ""
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Application, (application) => application.users, { cascade: true })
    application: Application

    @Column({
        default: ""
    })
    firstName: string

    @Column({
        default: ""
    })
    lastName: string

    @Column({
        default: null
    })
    dateOfBirth: Date

    @Column({
        default: ""
    })
    street: string

    @Column({
        default: ""
    })
    city: string

    @Column({
        default: ""
    })
    state: string

    @Column({
        default: ""
    })
    zipCode: string

    @Column({
        type: "enum",
        enum: Relationship,
        default: Relationship.NONE
    })
    relationship: Relationship
}