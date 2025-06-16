import { useState } from "react";
import { useDispatchFetchs, useFetchs } from "../context/FetchContext";
import fetchCallHistoryApi from "../api/fetchCallHistory";
import { format } from "date-fns";
import styles from "./Form.module.css";

const Form = () => {
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  //検索条件
  const [dateStart, setDateStart] = useState(formattedDate);
  const [dateEnd, setDateEnd] = useState(formattedDate);
  const [user, setUser] = useState("");

  const dispatch = useDispatchFetchs();

  //ダウンロード機能用
  const fetchs = useFetchs();

  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    //UTF-8 BOMを追加
    str += "\uFEFF";

    const headers = [
      "連番",
      "お客様名",
      "架電先",
      "電話番号",
      "電話日時",
      "電話内容",
      "応答状況",
    ];
    str += headers.join(",") + "\r\n";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (const key in array[i]) {
        if (line !== "") line += ",";
        if (key === "seq") {
          line += i + 1;
        } else if (key === "callstatus") {
          array[i][key] === 1 ? (line += "応答あり") : (line += "応答なし");
        } else if (key === "telno") {
          line += "0" + array[i][key];
        } else {
          line += array[i][key];
        }
      }
      str += line + "\r\n";
    }

    return str;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(fetchs);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "result.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchCallHistory = (e) => {
    e.preventDefault();

    const searchKey = {
      date_start: dateStart,
      date_end: dateEnd,
      user: user,
    };

    fetchCallHistoryApi.post(searchKey).then((fetchCallHistoryResult) => {
      dispatch({ type: "fetch", result: fetchCallHistoryResult });
      setDateStart("");
      setDateEnd("");
      setUser("");
    });
  };

  return (
    <div className={styles.formcontainer}>
      <form onSubmit={fetchCallHistory}>
        <div className={styles.formgroup}>
          <label htmlFor="username">開始日時：</label>
          <input
            type="date"
            className={styles.forminput}
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="username">終了日時：</label>
          <input
            type="date"
            className={styles.forminput}
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="username">ユーザー名：</label>
          <input
            type="text"
            className={styles.forminput}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className={styles.formactions}>
          <button type="submit" className={styles.btn}>
            検索
          </button>
          <button type="button" onClick={downloadCSV} className={styles.btn}>
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
