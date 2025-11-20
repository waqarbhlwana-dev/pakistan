import { Request, Response } from "express";

export function handleResearchEditAuth(req: Request, res: Response) {
  try {
    const { password } = (req.body ?? {}) as { password?: string };
    const expected = process.env.REPORT_EDIT_PASSWORD;

    if (!expected) {
      return res.status(500).json({ error: "Edit password not configured" });
    }
    if (typeof password !== "string") {
      return res.status(400).json({ error: "Invalid request" });
    }

    if (password === expected) {
      return res.status(200).json({ ok: true });
    }

    return res.status(401).json({ error: "Unauthorized" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
