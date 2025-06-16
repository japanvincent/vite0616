import Form from "./Form";
import List from "./List";
import { FetchProvider } from "../context/FetchContext";
const Fetch = () => {
  return (
    <FetchProvider>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <div>
          <h2>
            <Form />
          </h2>
        </div>
        <div>
          <h2>
            <List />
          </h2>
        </div>
      </div>
    </FetchProvider>
  );
};

export default Fetch;
