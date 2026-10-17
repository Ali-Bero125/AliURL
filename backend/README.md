# Backend setup

1. Copy `.env.example` to `.env`.
2. In `.env`, replace the MongoDB URI placeholders with the connection string
   from MongoDB Atlas. URL-encode special characters in the database username
   or password.
3. In Atlas, allow the machine's IP address under **Network Access** and make
   sure the database user has read/write access.
4. Run `npm run dev` from this directory. The API starts on port `8001` unless
   `PORT` is set.

The server waits for the MongoDB connection before listening. If the URI is
missing or Atlas cannot be reached, the startup error is printed and the server
does not start.
