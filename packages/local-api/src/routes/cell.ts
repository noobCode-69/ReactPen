import express from "express";
import fs from "fs/promises";
import path from "path";
interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json());

  const fullPath = path.join(dir, filename);
  router.get("/cell", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // Add code to create a file and add default cells
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cell", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    res.send({ status: "ok" });
  });

  return router;
};
