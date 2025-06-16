import axios from "axios";

const ENDPOINT_URL =
  "https://dhac90ybbb.execute-api.ap-northeast-1.amazonaws.com/prod/fetchCallHistory";

const today = new Date();
const formattedDate = `${today.getFullYear()}${String(
  today.getMonth() + 1
).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

const fetchCallHistoryApi = {
  async getTodayAll() {
    const result = await axios.post(ENDPOINT_URL, {
      date_start: formattedDate,
      date_end: formattedDate,
      user: "",
    });
    return result.data;
  },
  async post(searchKey) {
    const result = await axios.post(ENDPOINT_URL, searchKey);
    console.log(result.data);
    return result.data;
  },
};

export default fetchCallHistoryApi;
