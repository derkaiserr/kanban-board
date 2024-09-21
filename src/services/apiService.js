const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getMoodsAPI = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  const data = await response.json();
  return data;
};

export const addMoodAPI = async (status, tag, task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, tag, task }),
  });
  const data = await response.json();
  return data;
};

export const updateMoodAPI = async (id, updatedStatus) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: updatedStatus }), // Ensure this is valid JSON
  });

  if (!response.ok) {
    throw new Error(`Failed to update mood: ${response.statusText}`);
  }

  return response.json();
};

// Delete mood
export const deleteMoodAPI = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error details from response
      throw new Error(
        `Failed to delete task. Status: ${response.status}. Details: ${errorText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error during delete operation:", error);
    throw error; // Rethrow error for further handling if needed
  }
};
