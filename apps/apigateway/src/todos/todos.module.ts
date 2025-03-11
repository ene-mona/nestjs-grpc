import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {  TODO_SERVICE } from './constants';
import {  TODO_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import * as grpc from '@grpc/grpc-js';

const GRPC_URL = `localhost:50052`
@Module({
  imports: [
    ClientsModule.register([
      {
        name: TODO_SERVICE,
        transport:Transport.GRPC,
        options: {
          package: TODO_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../../proto/todo.proto'),
          url:GRPC_URL,

        }
      }
    ])
  ],
  controllers: [TodosController],
  providers: [TodosService,
    { provide: 'GRPC_URL', useValue: GRPC_URL },

  ],
})
export class TodosModule {}
