import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
export declare class AppService {
    private readonly communicationClient;
    private readonly analyticsClient;
    private readonly users;
    constructor(communicationClient: ClientProxy, analyticsClient: ClientProxy);
    getHello(): string;
    createUser(createUserRequest: CreateUserRequest): void;
}
