import { buildSchema } from "graphql";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { TicketService } from "../services/TicketService";

const app = express();
const port = 3000;

const schema = buildSchema(`
  type Ticket {
    section: String!
    row: String!
    seatNumber: String!
    price: Float!
  }

  type Query {
    tickets(eventId: String!): [Ticket!]!
  }
`);

const root = {
  tickets: async ({ eventId }: { eventId: string }) => {
    const tickets = await TicketService.getTickets(eventId);
    console.log("tickets", tickets);

    return tickets;
  },
};

// app.use(
//   '/graphql',
//   express.json(),
//   graphqlHTTP({
// schema: schema,
// rootValue: root,
// graphiql: true,
//   })
// );

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
    // graphql: true,
  })
);

app.listen(port, () => {
  console.log(
    `GraphQL server is running on http://localhost:${port}/graphql`
  );
});
