const API = "http://localhost:5000/api/vision/generate";

export async function generateImage(formData) {
  const response = await fetch(API, {
    method: "POST",
    body: formData,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Backend không trả về dữ liệu JSON."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Generate thất bại."
    );
  }

  return data;
}