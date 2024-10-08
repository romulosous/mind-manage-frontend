export const errorFields = {
	RecaptchaToken: "",
	Name: "Nome",
	Password: "Senha",
	Email: "E-mail",
	Cellphone: "Celular",
	Address: "Endereço",
	Neighborhood: "Bairro",
	Number: "Número",
	City: "Cidade",
	Uf: "Estado",
	Zipcode: "CEP",
	CompanySize: "Tamanha da empresa",
	MonthlyIncome: "Renda Mensal",
	BirthDate: "Data de Nascimento",
	PrimaryDocument: "CPF ou CNPJ",
	MotherName: "Nome da Mãe",
	CivilStatus: "Estado civil",
	Nationality: "Nacionalidade",
	DocumentType: "Tipo de documento",
	OpeningDate: "Data de abertura da empresa",
	Partners: "Sócios",
	SecundaryDocument: "RG, CNH ou RNE",
	InvoiceIds: "InvoiceIds",
}

export enum ErrorMessages {
	USER_NOT_FOUND_OR_INVALID_PASSWORD = "Documento ou senha incorreta",
	INVALID_SCHEMA = "O esquema informado é inválido",
	INVALID_NAME = "O nome informado é inválido",
	INVALID_EMAIL = "O email informado é inválido",
	INVALID_PASSWORD = "A senha informada é inválida",
	INVALID_RECAPTCHA = "O recaptcha informado é inválido",
	UNAUTHORIZED = "Sua sessão expirou",
	TOKEN_EXPIRED = "O token foi expirado",
	DOCUMENT_ALREADY_USED = "O documento já está sendo utilizado",
	GENERIC = "Houve um erro, tente novamente ou volte mais tarde",
	NETWORK = "Houve um problema com a rede, verifique sua conexão ou tente novamente mais tarde",
	INVALID_TOKEN = "Token de assinatura inválido. Tente novamente.",
	ACCESSTOKEN_NOT_FOUND = "Token de acesso não encontrado.",
	CONNECTION_REFUSED = "Houve um problema ao conectar com o servidor.",
	invalid_fields = "Por favor, revise os campos em vermelho.",
	TOKEN_ALREADY_SENT = "O seu token foi enviado, verifique seu E-mail.",
	INVALID_EMAIL_OR_TOKEN = "Token inválido. Por favor, verifique e tente novamente.",
	INVALID_DDD_NUMBER = "Número do DDD do telefone inválido!",
	ALREADY_VALIDATED_OR_EXPIRATED = "O seu token expirou. Por favor, aguarde um momento e tente novamente.",
}

export type ErrorMessageKey = keyof typeof ErrorMessages


