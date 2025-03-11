import {  Empty, TodoList, CreateTodoDto, UpdateTodoDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';


@Injectable()
export class TodosService {

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}
  create(createTodoServerDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoServerDto);
    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<{ todos: Todo[] }> {
    const todos = await this.todoRepository.find();
    return { todos };
  }

  findOne(id: string): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id: Number(id) });
  }

  async update(id: string, updateTodoServerDto: UpdateTodoDto): Promise<Todo> {
    const updateData = { ...updateTodoServerDto, id: Number(updateTodoServerDto.id) };
    await this.todoRepository.update({ id: Number(id) }, updateData);
    const updatedTodo = await this.findOne(id);
    if (!updatedTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return updatedTodo;
  }

  remove(id: string): Empty {
    return this.todoRepository.delete(id) ;
  }
}
