import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

async function main() {
  try {
    const envKey = process.argv[2];
    const envValue = process.argv[3];

    const cwd = process.cwd();
    const configPath = path.resolve(cwd, "./src/config/env.ts");
    const envPath = path.resolve(cwd, "./.env");

    const envPair = `${envKey}=${envValue}`;

    // Insert into .env
    const dotEnvFile = await fs.readFile(envPath, "utf-8");
    await fs.writeFile(envPath, `${dotEnvFile}\n${envPair}`);

    // Insert into config
    const configEnvFile = await fs.readFile(configPath, "utf-8");
    await fs.writeFile(
      configPath,
      `${configEnvFile}export const ${envKey} = process.env.${envValue} || "";\n`
    );

    logger.success("Successfuly Added Enviroment Variable");
  } catch {
    logger.error("Unable to Insert Enviroment Variable");
  }
}

main();
