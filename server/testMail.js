import dotenv from "dotenv";
dotenv.config();

import { notifyAdminNewUser } from "./utils/mailer.js";

notifyAdminNewUser({
  organizationName: "Test Org",
  userName: "Test User",
  workEmail: "testuser@company.com",
  country: "India",
})
  .then(() => console.log("✅ Test email sent"))
  .catch((e) => console.error("❌ Test email failed:", e));
