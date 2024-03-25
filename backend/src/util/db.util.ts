import { promises as fs } from "fs";
import { Database } from "../types/db.types.js";
const filePath = "./db.json";

// Define an async function to read a JSON file and parse its content
export async function readJsonFile(): Promise<Database> {
  try {
    // Read file content using fs.promises.readFile
    const fileContent = await fs.readFile(filePath, "utf-8");
    // Parse the file content as JSON and return the parsed data
    return JSON.parse(fileContent);
  } catch (error) {
    // Handle errors (e.g., file not found, JSON parse error)
    console.error(`Error reading or parsing JSON file: ${error}`);
    throw error; // Rethrow the error for further handling
  }
}

export async function writeJsonFile(data: Database): Promise<void> {
  try {
    // Convert the data object to a JSON string with indentation for readability
    const jsonData = JSON.stringify(data, null, 2);
    // Write the JSON string to the file using fs.promises.writeFile
    await fs.writeFile(filePath, jsonData, "utf-8");
    console.log("JSON file has been written successfully.");
  } catch (error) {
    // Handle errors (e.g., write permission issues)
    console.error(`Error writing JSON file: ${error}`);
    throw error; // Rethrow the error for further handling
  }
}
