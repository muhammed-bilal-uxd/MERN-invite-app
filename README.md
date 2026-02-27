## MERN Invite App

A simple MERN-stack invitation application with:
- **Client**: React (Vite)
- **Server**: Node.js, Express, MongoDB, and Nodemailer

### Project Structure

- **`client/`**: React frontend (Vite)
- **`server/`**: Express + MongoDB backend
- **`.env` files**: Environment variables (see below)

### Prerequisites

- **Node.js**: v18+ recommended
- **npm**: v9+ (or a compatible package manager)
- **MongoDB**: running locally or in the cloud (e.g. MongoDB Atlas)

### Setup

1. **Clone or download this project**
2. **Install dependencies**

   - From the project root:

     ```bash
     cd server
     npm install

     cd ../client
     npm install
     ```

3. **Configure environment variables**

   In the `server` folder, create a `.env` file (or update the existing one) with values similar to:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_if_applicable
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   FROM_EMAIL=your_from_email_address
   CLIENT_URL=http://localhost:5173
   ```

   Adjust keys/names to match your current `server/.env` file.

### Running the App in Development

1. **Start the backend**

   ```bash
   cd server
   npm run dev
   ```

   The server will typically run on `http://localhost:5000` (or the `PORT` defined in `.env`).

2. **Start the frontend**

   In a separate terminal:

   ```bash
   cd client
   npm run dev
   ```

   Vite will show the local URL, usually `http://localhost:5173`.

### Build for Production (Client)

To build the React client for production:

```bash
cd client
npm run build
```

The production build will be generated in `client/dist/`.

### Scripts Reference

- **Client (`client/package.json`)**
  - `npm run dev` – start Vite dev server
  - `npm run build` – build production assets
  - `npm run preview` – preview production build
  - `npm run lint` – run ESLint

- **Server (`server/package.json`)**
  - `npm run dev` – start server with `nodemon`
  - `npm start` – start server with Node

### Notes

- Make sure `.env` files are **not committed** to version control (already covered by `.gitignore`).
- If ports conflict, update the `PORT` in `server/.env` or the Vite port in `client/vite.config.*`.

