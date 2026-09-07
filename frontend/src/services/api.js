import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSessions = async () => {
  try {
    const response = await API.get("/chat/sessions");
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const createSession = async (title = "New Chat") => {
  try {
    const response = await API.post("/chat/sessions", { title });
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const fetchMessages = async (sessionId) => {
  try {
    const response = await API.get(`/chat/sessions/${sessionId}/messages`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching messages for session ${sessionId}:`, error);
    throw error;
  }
};

export const sendMessage = async (sessionId, content) => {
  try {
    const response = await API.post(`/chat/sessions/${sessionId}/messages`, { content });
    return response.data;
  } catch (error) {
    console.error(`Error sending message to session ${sessionId}:`, error);
    throw error;
  }
};

export const deleteSession = async (sessionId) => {
  try {
    const response = await API.delete(`/chat/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting session ${sessionId}:`, error);
    throw error;
  }
};

export const clearAllSessions = async () => {
  try {
    const response = await API.delete("/chat/sessions");
    return response.data;
  } catch (error) {
    console.error("Error clearing sessions:", error);
    throw error;
  }
};

export default API;
