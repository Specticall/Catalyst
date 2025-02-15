import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

const cwd = process.cwd();
const ENV_PATH = path.resolve(cwd, "./.env");

async function envExists() {
  try {
    await fs.stat(ENV_PATH);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  try {
    if (!envExists()) return;
    const envFile = await fs.readFile(ENV_PATH, "utf-8");
    const tokens = envFile.split("\n").filter((t) => t.trim() !== "");
    const sanitizedTokens = tokens.map((token) => {
      // Checks for comment tokens
      if (token.startsWith("#")) return token;
      if (token.startsWith("PORT=")) return token;
      const key = token.split("=")[0];
      return key + "=";
    });
    let result = "";
    for (let i = 0; i < sanitizedTokens.length; i++) {
      const token = sanitizedTokens[i];
      // Check if token is is a comment (thats not the first line)
      if (token.startsWith("#") && i !== 0) result += "\n";
      result += token + "\n";
    }
    await fs.writeFile(path.resolve(cwd, "./.env.example"), result);

    const { execa } = await import("execa");
    await execa("git", ["add", ".env.example"]);
  } catch {
    logger.error("Something went wrong while trying to create .env.example");
  }
}

main();
