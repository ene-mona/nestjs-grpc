import { CreateTodoDto, TODO_SERVICE_NAME, TodoServiceClient, UpdateTodoDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TODO_SERVICE } from './constants';

@Injectable()
export class TodosService  implements OnModuleInit{

  private todosService: TodoServiceClient;

  constructor(
    @Inject('GRPC_URL') private readonly grpcUrl: any, 
    @Inject(TODO_SERVICE) private client: ClientGrpc
  ){}

  onModuleInit() {
    this.todosService = 
      this.client.getService<TodoServiceClient>(TODO_SERVICE_NAME)

    console.log("📡 gRPC Client is connecting to:", this.grpcUrl);

  }

  create(createUserDto: CreateTodoDto) {
    return this.todosService.create(createUserDto);
  }

  findAll() {
    return this.todosService.findAll({});
  }

  findOne(id: string) {
    return this.todosService.findOne({id});
  }

  update(id: string, updateUserDto: UpdateTodoDto) {
    const { id: _, ...updateData } = updateUserDto;
    return this.todosService.update({ id, ...updateData });
  }

  remove(id: string) {
    return this.todosService.remove({id});

  }
}
