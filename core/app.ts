import express from "express";
import "dotenv/config";
import chalk from "chalk";
import morgan from "morgan";

const app = express();
// parsing request json become object
app.use(express.json());
app.use(morgan("tiny"));

const PORT = process.env.PORT || 4100;

const start = async () => {
	try {
		app.listen(PORT, () =>
			console.info(chalk.yellowBright(`Server started at ${PORT}`))
		);
	} catch (error) {
		console.error(error);
	}
};

start();
