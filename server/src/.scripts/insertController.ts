import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

const EXPORT_REGEX = /export\s+default[\s\S]*/;

const template = `const {{CONTROLLER_NAME}}: RequestHandler = async (request, response, next) => {
  try {
    // Your logic here
  } catch (error) {
    next(error);
  }
};

`;

async function main() {
  try {
    // Retrieve and format controller name
    const controllerNameInput = process.argv[2];
    const controllerName = `${controllerNameInput[0].toUpperCase()}${controllerNameInput.slice(
      1
    )}`;
    const controllerFileName = `${controllerName}Controller.ts`;

    // Retrieve function name and format it
    const methodName = process.argv[3];

    const cwd = process.cwd();
    const controllerPath = path.resolve(
      cwd,
      `./src/controllers/${controllerFileName}`
    );

    // Update the controller file
    const controllerFile = await fs.readFile(controllerPath, "utf-8");

    // Add the new controller to the `export default {}` list
    const exportLine = controllerFile.match(EXPORT_REGEX)?.[0] || "";
    const updatedExportLine = `${exportLine.split("}")[0]}, ${methodName} }\n`;

    // Use the template to create the desired controller
    const controllerTemplate = template.replace(
      /{{CONTROLLER_NAME}}/g,
      `${methodName}`
    );

    // Assemble the update controller file parts
    const updatedControllerFile = `${controllerFile.replace(
      EXPORT_REGEX,
      ""
    )}${controllerTemplate}${updatedExportLine}`;

    await fs.writeFile(controllerPath, updatedControllerFile);
    logger.success(
      `Successfuly Inserted ${methodName} to ${controllerFileName}`
    );
  } catch {
    logger.error(`Unable to Insert Controller Function`);
  }
}

main();
