import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import "./App.css";
import Fetch from "./components/Fetch";
import styles from "./components/Form.module.css";

Amplify.configure(outputs);

function App() {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <main>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 className=".logo">自動電話通知履歴検索画面</h2>
            <button type="button" className={styles.btn} onClick={signOut}>
              サインアウト
            </button>
          </div>

          <Fetch />
        </main>
      )}
    </Authenticator>
  );
}

export default App;
