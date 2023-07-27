import express from "express";
import { buildSchema } from "graphql/utilities";
import { createHandler } from "graphql-http/lib/use/express";

import { TicketSchema } from "graphql-schema";
import { ExternalApiService } from "external-api/services/external-api.service";
import { TicketService } from "services/ticket.service";
import { TicketController } from "controllers/ticket.controller";

const app = express();
const PORT = 3000;

const schema = buildSchema(`
    ${TicketSchema}

    type Query {
        tickets(eventId: String!): [Ticket]!
    }
`);

// TODO improve with DI
const externalApiService = new ExternalApiService();
const ticketService = new TicketService(externalApiService);
const ticketController = new TicketController(
  ticketService
);

app.post(
  "/graphql",
  createHandler({
    schema,
    rootValue: {
      tickets: ticketController.getTicketByEventId,
    },
  })
);

app.listen(PORT, () => {
  console.log(
    `GraphQL server is running on http://localhost:${PORT}/graphql`
  );
});
