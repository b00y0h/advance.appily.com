import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
	try {
		const vertical = req.query.vertical;
		const dataDirectory = path.resolve(process.cwd(), "src/data");
		const filePath = path.join(dataDirectory, `results-${vertical}.json`);

		console.log("🚀 ~ file: slugs.js:10 ~ handler ~ filePath:", filePath);
		const fileContents = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(fileContents);
		const { results } = data;

		res.status(200).json(results);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
