import logger from "../infra/helper/logger";
import app from "./app";

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
