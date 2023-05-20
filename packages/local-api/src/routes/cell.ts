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
  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      // console.log(result);
      return res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // Add code to create a file and add default cells
        // console.log("insdide catch");
        await fs.writeFile(fullPath, "[]", "utf-8");
        return res.send([]);
      } else {
        // console.log("throwing an error");
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    return res.send({ status: "ok" });
  });

  return router;
};
