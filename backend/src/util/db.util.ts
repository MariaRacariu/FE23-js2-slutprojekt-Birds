import { promises as fs } from "fs";
import { Database } from "../types/db.types.js";
const filePath = "./db.json";

// Async function to read a JSON file and parse its content
export async function readJsonFile(): Promise<Database> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing JSON file: ${error}`);
    throw error;
  }
}

export async function writeJsonFile(data: Database): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, "utf-8");
    console.log("JSON file has been written successfully.");
  } catch (error) {
    console.error(`Error writing JSON file: ${error}`);
  }
}
