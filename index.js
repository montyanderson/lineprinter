const fs = require("fs");
const util = require("util");

const fsOpen = util.promisify(fs.open);
const fsWrite = util.promisify(fs.write);
const fsReaddir = util.promisify(fs.readdir);

class LinePrinter {
	constructor(device) {
		this.device = device;
	}

	static async list() {
		const files = await fsReaddir("/dev/usb");

		return files
			.filter(file => file.startsWith("lp"))
			.sort();
	}

	static async connect(device) {
		const printer = new LinePrinter(device);
		printer.fd = await fsOpen(`/dev/usb/${device}`, "w");

		return printer;
	}

	static async auto() {
		const printers = await LinePrinter.list();

		if(printers.length < 0) {
			throw new Error("LinePrinter: No line printers found!");
		}

		return await LinePrinter.connect(printers[0]);
	}

	async print(data) {
		await fsWrite(this.fd, data);
	}

	async println(data) {
		await this.print(data);
		await this.print("\n");
	}
}

module.exports = LinePrinter;
