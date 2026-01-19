import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dbPath = join(process.cwd(), "src", "db.json");

export const readDB = () => {
  const data = readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

export const writeDB = (data) => {
  writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
