import { MikroORM } from "@mikro-orm/core";
import dotenv from "dotenv";
import { join } from "node:path";

import { configuration } from "../src/config/index.js";

dotenv.config();

// biome-ignore lint/complexity/useLiteralKeys: TS4111
if (!process.env["DB_HOST"] || !process.env["DB_NAME"]) {
  throw new Error(
    "DB_HOST and DB_NAME must be defined in the .env file. Please create or update it.",
  );
}

// biome-ignore lint/complexity/useLiteralKeys: TS4111
const dbName = process.env["DB_NAME"] as string;

// Self-invoking async function to run the schema synchronization process
(async () => {
  console.log(`Attempting to synchronize schema for database: ${dbName}...`);
  const { mikro: baseMikroConfig } = await configuration();

  const entitiesPath = join(import.meta.dirname, "../src/entities", dbName);

  // Initialize MikroORM, pointing to the specific entities folder for discovery
  const orm = await MikroORM.init({
    ...baseMikroConfig,
    dbName,
    entities: [entitiesPath],
    entitiesTs: [entitiesPath],
    allowGlobalContext: true,
    schemaGenerator: {
      // createForeignKeyConstraints: false,
    },
  });

  const generator = orm.schema;

  // Optional: Log the SQL statements that will be executed
  console.log("--- Schema SQL Dump ---");
  const sqlDump = await generator.getCreateSchemaSQL();
  console.log(sqlDump);
  console.log("--- End SQL Dump ---");

  // Execute schema changes against the database
  // WARNING: This can be destructive (drop tables/columns).
  // Use with caution, especially in production. Consider migrations instead.
  console.log(`Executing schema synchronization for database: ${dbName}...`);
  await generator.createSchema();
  console.log("Schema synchronization finished.");

  await orm.close(true);
  console.log(`✅ Process finished for database '${dbName}'.`);
})().catch((error: unknown) => {
  console.error(
    `❌ An error occurred during schema synchronization for ${dbName}:`,
    error,
  );
  process.exit(1);
});
