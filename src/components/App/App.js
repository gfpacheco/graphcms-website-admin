import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import useSchema from '../../hooks/useSchema';
import ToastProvider from '../Toasts/ToastProvider';
import PageEdit from '../PageEdit';
import PageList from '../PageList';
import ErrorIndicator from '../ErrorIndicator';
import LoadingIndicator from '../LoadingIndicator';

function App() {
  const { loading, error } = useSchema();

  return loading ? (
    <section className="section">
      <p className="has-text-centered">
        <LoadingIndicator />
      </p>
    </section>
  ) : (
    <ToastProvider>
      <Router>
        <header className="navbar is-primary">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item title is-5" href="/">
                EP Admin
              </Link>
            </div>
          </div>
        </header>
        {error && <ErrorIndicator error={error} />}
        <main className="section">
          <Switch>
            <Route path="/:pageId">
              <PageEdit />
            </Route>
            <Route path="/">
              <PageList />
            </Route>
          </Switch>
        </main>
      </Router>
    </ToastProvider>
  );
}

export default App;
