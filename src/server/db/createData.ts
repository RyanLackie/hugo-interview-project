import { AppDataSource } from ".";

import { CreateApplication } from "../applications/controller";
import { Application } from "../applications/entities";

import { CreateUser } from "../users/controller";
import { User } from "../users/entities";
import { CreateVehicle } from "../vehicles/controller";
import { Vehicle } from "../vehicles/entities";


(async () => {
    await AppDataSource.initialize();

    const application: Application = await CreateApplication({});

    const user: User = await CreateUser(
        application.id,
        {
            firstName: 'Test',
            lastName: 'User 1',
            dateOfBirth: new Date(),
            street: '77 Some Street',
            city: 'Some City',
            state: 'NJ',
            zipCode: '00000',
            relationship: ''
        } as User
    );

    const vehicle: Vehicle = await CreateVehicle(
        application.id,
        {
            vin: "080808080",
            year: 2000,
            make: "SomeMake",
            model: "SomeModel",
        } as Vehicle
    );

    process.exit();
})();
