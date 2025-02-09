import express from "express";
import "dotenv/config";
import chalk from "chalk";
import morgan from "morgan";
// router
import userRouter from "../routes/userRoutes";

// middlewarea
import { notFound } from "../middleware/index";

const app = express();

// parsing request json become object
app.use(express.json());
app.use(morgan("tiny"));

const PORT = process.env.PORT || 4100;

// router
app.use("/v1/api", userRouter);

// middleware
app.use(notFound);

const start = async () => {
	try {
		app.listen(PORT, () =>
			console.info(chalk.yellowBright(`Server started at ${PORT}`))
		);
	} catch (error) {
		console.error(chalk.red("Failed to start server:", error));
		process.exit(1);
	}
};

start();
