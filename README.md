### URL Shortener and Image Uploader using Cloudflare Worker, KV and R2

- `POST` `/u`

  - Payload

  ```
  {
    url: 'https://www.prisma.io/blog'
  }
  ```

  - Success Response `200` `<hash>`
  - Error Response `400`

- `POST` `/i`

  - FormData

  ```
  {
    file: File
  }
  ```

  - Success Response `200` `<hash>`
  - Error Response `400`

- `GET` `/u/:hash` , `/i/:hash`

  - Success Response `302`
  - Error Response `404`

- `GET` `/`
  - Static HTML (a built SolidJS app)

### Note

- It's only able to query by key (not value) in KV.
- Query and mutate KV data from Worker is kinda slow. It might be miserable if thousands of mutations are processing
  concurrently.
- Durable Object is a better alternative for KV but it needs paid.
