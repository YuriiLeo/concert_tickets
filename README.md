# Concert Tickets API

## Description

This is a simple API for fetching concert tickets from a
website.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository.
2. Install dependencies with `pnpm install`.
3. Build the project with `pnpm run build`.
4. Start the server with `pnpm start`.
5. How to Call the API using cURL

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query GetTickets($eventId: String!, $page: Int = 1, $pageSize: Int = 50) { tickets(eventId: $eventId, page: $page, pageSize: $pageSize) { totalTickets tickets { section row seatNumber price } } }",
    "variables": {
      "eventId": "1195"
    }
  }' \
  http://localhost:3000/graphql
```

## Tech Stack

The project uses the following technologies and libraries:

- Express.js: Web framework for the API.
- TypeScript: Language for type-checking and enhanced
  tooling.
- Axios: HTTP client for making API requests.
- GraphQL: Optional technology for querying the service
  using GraphQL.
