import { logger } from "./logger";
async function main() {
  try {
    const seederName = process.argv[2];
    // Execa doesn't work with normal imports when the package is not set to use ESM
    const { execa } = await import("execa");

    await execa(
      "npx",
      ["tsx", `./src/models/seed/${seederName || "index"}.ts`],
      {
        stdio: "inherit",
      }
    );
    logger.success("Successfuly Ran Seeder");
  } catch (err) {
    logger.info((err as Error).message);
    logger.error("Something went wrong while trying to run the seeder");
  }
}

main();
