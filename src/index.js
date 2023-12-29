import app from "./app.js";
import { PORT } from "./config/config.js";
import { connectDB, defaultUser } from "./config/db.js";

//DB Connect
connectDB();
defaultUser();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
