### URL Shortener API using Cloudflare Worker and KV

- `POST` `/u`

  - Payload

  ```
  {
    url: 'https://www.prisma.io/blog'
  }
  ```

  - Success Response `200` `<hash>`
  - Error Response `400`

- `GET` `/:hash`

  - Success Response `302`
  - Error Response `404`

- `GET` `/health`

### Example

- [https://ushort.sfns.workers.dev/Y1w](https://ushort.sfns.workers.dev/Y1w)

### Note

- It's only able to query by key (not value) in KV.
- Query and mutate KV data from Worker is kinda slow. It might be miserable if thousands of mutations are processing
  concurrently.
- Durable Object is a better alternative for KV but it needs paid.
