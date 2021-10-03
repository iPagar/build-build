import { ApolloProvider } from "@apollo/client";
import { client } from "./adapters/ReposAdapter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import SearchPage from "./components/SearchPage/SearchPage";
import RepoPage from "./components/RepoPage/RepoPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className={styles.app}>
          <Switch>
            <Route path="/:name/:owner" component={RepoPage} />
            <Route path="/">
              <SearchPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
