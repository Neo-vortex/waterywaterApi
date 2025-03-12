export const VALIDATION_MESSAGE = {
	notEmpty: (title?: string) => `${title || 'field'} should not be empty`,
	string: (title?: string) => `${title || 'field'} should be string`,
	array: (title?: string, elementsType?: string) =>
		`${title || 'field'} should be array of ${elementsType || 'elements'}`,
	number: (title?: string) => `${title || 'field'} should be number`,
	uuid: (title?: string) => `${title || 'field'} should be a valid UUID`
};
