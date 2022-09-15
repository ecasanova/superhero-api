import { ConfigModule } from "@nestjs/config";
ConfigModule.forRoot();

const config: any = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + "/**/*.entity.ts"],
  synchronize: true,
  migrationsRun: false,
  autoLoadEntities: true,
  logging: false,
  migrations: [__dirname + "/migrations/**/*.ts"],
  cli: {
    migrationsDir: "./src/migrations",
  },
};
export = config;
