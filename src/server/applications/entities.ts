import { Entity, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import { User } from "../users/entities";
import { Vehicle } from "../vehicles/entities";

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => User, (user) => user.application, { eager: true, cascade: ['update'] })
    users: User[]

    @OneToMany(() => Vehicle, (vehicle) => vehicle.application, { eager: true, cascade: ['update'] })
    vehicles: Vehicle[]
}