import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);

    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );

    console.log('Users is now:', this.users);
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
