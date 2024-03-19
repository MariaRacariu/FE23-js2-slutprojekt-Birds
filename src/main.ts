<<<<<<< Updated upstream
console.log("Hello");

=======
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json(), cors());






app.listen(1234, () => {
  console.log("listening on port 1234");
});
>>>>>>> Stashed changes
