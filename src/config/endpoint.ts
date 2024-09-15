export enum BackUrl {
	LOCALHOST = "http://localhost:3333",
	PROD = "",
}

type IConstants = {
	backUrl: BackUrl
}

const Endpoint: IConstants = (() => {
	let constants: IConstants = { backUrl: BackUrl.LOCALHOST }

	const domain = typeof window !== "undefined" && window.location.hostname.split(".")[0]

	switch (domain) {
		case "localhost":
			constants = {
				backUrl: BackUrl.LOCALHOST,
			}
			break

		case "prod":
			constants = {
				backUrl: BackUrl.PROD,
			}
			break
		default:
			constants = {
				backUrl: BackUrl.LOCALHOST,
			}
	}
	return constants
})()

export default Endpoint
