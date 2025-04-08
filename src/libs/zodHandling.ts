const errorMessages = {
  invalid_type: "must be a valid type",
  too_small: "is too short",
  too_big: "is too long",
  invalid_enum_value: "must be a valid choice",
  invalid_string: "must be a valid string",
  invalid_date: "must be a valid date",
  not_multiple_of: "must be a multiple of the required value",
  unrecognized_keys: "contains unrecognized keys",
};

export const formatZodError = (zodErrors: any) => {
  console.log("The Zod errors are:", zodErrors);
  if (!Array.isArray(zodErrors) || zodErrors.length === 0)
    return "An unknown error occurred.";

  const firstError = zodErrors[0];
  const fieldName = firstError.path?.[0] || "Field";
  const expected = firstError.expected
    ? `Expected: ${firstError.expected}`
    : "";
  const received = firstError.received
    ? `Received: ${firstError.received}`
    : "";
  const defaultMsg = firstError.message.toLowerCase();
  const customMessage = errorMessages[firstError.code] || defaultMsg;

  // Constructing the message
  let message = `${fieldName} field ${customMessage}`;

  if (firstError.code === "invalid_type") {
    message += ` (${expected}, but got ${received})`;
  }

  return message;
};
