import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from your Express + TypeScript server!");
});

app.get("/users", (req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Jobi" },
    { id: 2, name: "Master Jobi" },
  ]);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, name: `User number ${id}` });
});

function fakeDatabaseCall(): Promise<{ id: number; name: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Jobi" },
        { id: 2, name: "Master Jobi" },
      ]);
    }, 1000);
  });
}

app.get("/async-users", async (req: Request, res: Response) => {
  try {
    const users = await fakeDatabaseCall();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
