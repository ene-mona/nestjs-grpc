import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {  TODO_PACKAGE_NAME } from '@app/common';
import { ReflectionService } from '@grpc/reflection';
import 'dotenv/config'
import { AppModule } from 'apps/apigateway/src/app.module';

async function bootstrap() {
  const GRPC_PORT = process.env.GRPC_PORT || '50051'
  const app = await NestFactory.create(AppModule); 
  console.log(GRPC_PORT,process.env.PORT )
  
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../todo.proto'),
        package: TODO_PACKAGE_NAME,
        url:`0.0.0.0:${GRPC_PORT}`,

        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      }
    }
  )
    
      await app.startAllMicroservices();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
