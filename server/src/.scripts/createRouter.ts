import path from "path";
import fs from "fs/promises";
import { logger } from "./logger";
import { fileExists } from "./fileExists";

const EXPORT_REGEX = /export\s+default[\s\S]*/;

const template = `import { Router } from "express";

const {{ROUTER_NAME}} = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */

export default {{ROUTER_NAME}};
`;

async function main() {
  try {
    // Retrieve router name
    const name = process.argv[2];
    if (!name) {
      logger.error("Missing `name` argument");
      return;
    }
    const routerName = `${name}Router`;

    // Optional : accept router path override
    const pathOverride = process.argv[3] as string | undefined;

    // Resolve routes path
    const cwd = process.cwd();
    const routerPath = path.resolve(cwd, `./src/routes/${routerName}.ts`);
    const routerIndexPath = path.resolve(cwd, `./src/routes/index.ts`);

    if (await fileExists(routerPath)) {
      logger.error(`${routerName} already exists`);
      return;
    }

    await fs.writeFile(
      routerPath,
      template.replace(/{{ROUTER_NAME}}/g, `${routerName}`)
    );

    // Add router function to the index file
    const routerIndexFile = await fs.readFile(routerIndexPath, "utf-8");
    const importLine = `import ${routerName} from "./${routerName}";`;
    const indexFileWithoutExport = routerIndexFile
      .replace(EXPORT_REGEX, "")
      .replace(/\n+$/, "");
    const routerLine = `router.use("/${
      pathOverride || name + "s"
    }", ${routerName});`;
    const updatedRouterIndexFile = `${importLine}\n${indexFileWithoutExport}\n${routerLine}\n\nexport default router;`;

    await fs.writeFile(routerIndexPath, updatedRouterIndexFile);

    logger.success(`Successfuly Created ${routerName}`);
  } catch {
    logger.error("Unable to Create Router File");
  }
}

main();
