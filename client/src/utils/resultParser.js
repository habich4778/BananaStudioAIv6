export function parseResult(data) {
  if (!data) {
    return null;
  }

  const response = data.response || {};

  return {
    success: data.success ?? false,

    image:
      response.image ||
      response.imageUrl ||
      "",

    prompt:
      response.prompt ||
      "",

    model:
      response.model ||
      "gemini-3-flash-preview",

    time:
      response.time ||
      "",

    metadata:
      response.metadata || {},

    raw: data,
  };
}
