import { useFetchs } from "../context/FetchContext";
import styles from "./List.module.css";
const List = () => {
  const fetchs = useFetchs();
  return (
    <div className={styles.tablecontainer}>
      <table className={styles.styledtable}>
        <thead>
          <tr>
            <th width="70px">連番</th>
            <th width="150px">お客様名</th>
            <th width="120px">架電先</th>
            <th width="100px">電話番号</th>
            <th width="180px">電話日時</th>
            <th width="370px">電話内容</th>
            <th width="100px">応答状況</th>
          </tr>
        </thead>
        <tbody>
          {fetchs.map((result, index) => {
            return (
              <tr key={result.seq}>
                <td>{index + 1}</td>
                <td>{result.company_name}</td>
                <td>{result.sename}</td>
                <td>{"0" + result.telno}</td>
                <td>{result.calldatetime}</td>
                <td>{result.callmessage}</td>
                <td>{result.callstatus === 1 ? "応答あり" : "応答なし"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
