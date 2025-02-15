import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";
import { fileExists } from "./fileExists";

const template = `import { RequestHandler } from "express";

const {{CONTROLLER_FUNCTION}}: RequestHandler = async (request, response, next) => {
  try {
    // Your logic here
  } catch (error) {
    next(error);
  }
};

export default { {{CONTROLLER_FUNCTION}} }
`;

async function main() {
  try {
    const rawNameInput = process.argv[2];
    const controllerName = `${rawNameInput[0].toUpperCase()}${rawNameInput.slice(
      1
    )}`;
    const controllerVariable = `get${controllerName}`;
    const controllerFormattedName = `${controllerName}Controller`;

    const cwd = process.cwd();
    const controllerPath = path.resolve(
      cwd,
      `./src/controllers/${controllerFormattedName}.ts`
    );

    if (await fileExists(controllerPath)) {
      logger.error(`${controllerFormattedName} already exists`);
      return;
    }

    await fs.writeFile(
      controllerPath,
      template.replace(/{{CONTROLLER_FUNCTION}}/g, `${controllerVariable}`)
    );

    const controllerIndexPath = path.resolve(cwd, `./src/controllers/index.ts`);
    const controllerIndexFile = await fs.readFile(controllerIndexPath, "utf-8");
    await fs.writeFile(
      controllerIndexPath,
      `${controllerIndexFile}export { default as ${controllerFormattedName} } from "./${controllerFormattedName}";\n`
    );

    logger.success(`Successfuly Created ${controllerFormattedName}`);
  } catch {
    logger.error("Unable To Create Controller");
  }
}

main();
