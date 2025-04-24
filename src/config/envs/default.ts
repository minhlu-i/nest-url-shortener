import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import type { MikroOrmModuleOptions } from "@mikro-orm/nestjs";

export const config = {
  mikro: {
    driver: PostgreSqlDriver,
    // entities: [`${import.meta.dirname}/../../entities`],
    // entitiesTs: [`${import.meta.dirname}/../../entities`],
    autoLoadEntities: true,
    dbName: "test",
    allowGlobalContext: true,
  } satisfies MikroOrmModuleOptions<PostgreSqlDriver>,

  hello: "world",
  jwtSecret: process.env.JWT_SECRET,
};
