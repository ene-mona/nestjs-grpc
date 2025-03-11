import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TodosService, } from './todos.service';
import { Observable } from 'rxjs';
import { CreateTodoDto, Empty, Todo, TodoById, TodoList, TodoServiceController, TodoServiceControllerMethods, UpdateTodoDto } from '@app/common';


@Controller()
@TodoServiceControllerMethods()
export class TodosController implements TodoServiceController {
  constructor(private readonly todosService: TodosService) {}
  async findOne(request: TodoById): Promise<Todo> {
    const todo = await this.todosService.findOne(request.id);
    if (!todo) {
        throw new Error('Todo not found');
    }
    return { ...todo, id: todo.id.toString() } as Todo;

  }

  async findAll(request: Empty): Promise<TodoList> {
    
    const todos =  await this.todosService.findAll();
    return { todos: todos.todos.map((todo): Todo => ({ id: todo.id.toString(), title: todo.title, completed: todo.completed })) };

  }

  async create(request: CreateTodoDto): Promise<Todo> {
    const todo = await this.todosService.create(request);
    return { ...todo, id: todo.id.toString() } as Todo;
  }

  async update(request: UpdateTodoDto): Promise<Todo>  {
    await this.todosService.update(request.id, request);
    return { id: request.id.toString(), title: request.title, completed: request.completed };
  }

  remove(request: TodoById): Promise<Empty> {
    return Promise.resolve(this.todosService.remove(request.id));
  }
}
 




