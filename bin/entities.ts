import { MikroORM } from "@mikro-orm/core";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import dotenv from "dotenv";
import { readdirSync, writeFileSync, existsSync } from "node:fs";
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

function pascalOrCamelToKebab(fileName: string): string {
  return fileName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

(async () => {
  console.log(`Attempting to generate entities for database: ${dbName}...`);
  const { mikro: baseMikroConfig } = await configuration();

  const orm = await MikroORM.init({
    ...baseMikroConfig,
    dbName,
    discovery: {
      warnWhenNoEntities: false,
    },
    extensions: [EntityGenerator],
    allowGlobalContext: true,
  });

  const outputPath = join(import.meta.dirname, "../src/entities", dbName);
  console.log(`Output path set to: ${outputPath}`);

  await orm.entityGenerator.generate({
    save: true,
    path: outputPath,
    // Generate filenames like 'user-address.entity.ts'
    fileName: (className: string) =>
      `${pascalOrCamelToKebab(className)}.entity`,
    // Optional: Configure relations, naming conventions, etc.
    // bidirectionalRelations: true,
    // identifiedReferences: true,
  });

  console.log(`Entity generation completed for database: ${dbName}`);
  await orm.close(true);

  // Generate the index.ts file for easy imports
  console.log(`Generating index.ts in ${outputPath}...`);
  if (existsSync(outputPath)) {
    const filesToExport: string[] = [];
    try {
      const directoryEntries = readdirSync(outputPath);
      for (const file of directoryEntries) {
        // Only export files ending with .entity.ts
        if (file.endsWith(".entity.ts")) {
          // Assuming build process handles module resolution correctly,
          // exporting with .js extension might be necessary depending on tsconfig/build setup.
          filesToExport.push(
            `export * from './${file.replace(".ts", ".js")}';`,
          );
        }
      }

      if (filesToExport.length > 0) {
        filesToExport.push(""); // Add trailing newline
        writeFileSync(join(outputPath, "index.ts"), filesToExport.join("\n"));
        console.log(`Successfully generated index.ts in ${outputPath}`);
      } else {
        console.log(`No *.entity.ts files found in ${outputPath} to export.`);
      }
    } catch (readDirError) {
      console.error(`Error reading directory ${outputPath}:`, readDirError);
    }
  } else {
    console.warn(
      `Output directory ${outputPath} does not exist. Skipping index.ts generation.`,
    );
  }

  console.log(`✅ Process finished for database '${dbName}'.`);
})().catch((error: unknown) => {
  // Catch and log any errors during the async process
  console.error("❌ An error occurred during entity generation:", error);
  process.exit(1); // Exit with error code
});
