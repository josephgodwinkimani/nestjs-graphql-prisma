import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  // microservice #2
  /*app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });*/

  // microservice #3
  /*app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'hero-consumer'
      }
    },
  });*/

  // microservice #4
  /*app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, '../auth.proto'),
    },
  });*/

  // microservice #5
  /*app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'moses_queue',
    queueOptions: {
      durable: false
    },
  });*/

  // microservice #6
  /*app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.MQTT,
  options: {
    url: 'mqtt://localhost:1883',
  },
  });*/

  // microservice #7
  /*app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.NATS,
  options: {
    servers: ['nats://localhost:4222'],
  }
  });*/

  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
}
bootstrap();
