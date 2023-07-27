import express, { Request, Response } from "express";

import { TicketService } from "../services/TicketService";

const app = express();
const port = 3000;

app.get(
  "/tickets/:eventId",
  async (req: Request, res: Response) => {
    try {
      const eventId = req.params.eventId;
      console.log(eventId);

      const tickets = await TicketService.getTickets(
        eventId
      );
      // console.log(tickets);

      res.json(tickets);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching tickets",
      });
    }
  }
);

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}`
  );
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
