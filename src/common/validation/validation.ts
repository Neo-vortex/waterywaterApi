export const VALIDATION_MESSAGE = {
  notEmpty: (title = "input") => `${title} should not be empty`,
  string: (title = "input") => `${title} should be type of string`,
  array: (title = "input", elementsType = "string") =>
    `${title} should be an array of ${elementsType}`,
};
