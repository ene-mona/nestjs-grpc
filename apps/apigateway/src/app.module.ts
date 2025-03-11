import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from 'apps/auth/src/auth.module';

@Module({
  imports: [TodosModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
