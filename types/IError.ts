export class IError extends Error {
	code: number;
	message: string;
	/**
	 *
	 * @param message The message to be logged for the error
	 * @param code Status code of the error
	 */
	constructor(message: string, code: number) {
		super();
		this.message = message;
		this.code = code;
	}
}
