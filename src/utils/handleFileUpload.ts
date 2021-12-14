import axios from "axios";

export const uploadFile = async (file: any, token: string) => {
  const formData: any = new FormData();
  try {
    formData.append("media", file);
    const { data } = await axios.post("/api/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.url;
  } catch (error) {
    console.error(error);
  }
};
