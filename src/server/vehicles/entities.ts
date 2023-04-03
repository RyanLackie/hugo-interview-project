import { Column, Entity, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";
import { Application } from "../applications/entities";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Application, (application) => application.vehicles, { cascade: true })
    application: Application

    @Column({
        default: ""
    })
    vin: string

    @Column({
        default: null
    })
    year: number

    @Column({
        default: ""
    })
    make: string

    @Column({
        default: ""
    })
    model: string
}