import React, { useState } from 'react';
import useSchema from '../../hooks/useSchema';
import ToastProvider from '../Toasts/ToastProvider';
import PageEdit from '../PageEdit';
import PageList from '../PageList';
import ErrorIndicator from '../ErrorIndicator';
import LoadingIndicator from '../LoadingIndicator';

function App() {
  const { loading, error } = useSchema();
  const [pageId, setPageId] = useState();

  return loading ? (
    <section className="section">
      <p className="has-text-centered">
        <LoadingIndicator />
      </p>
    </section>
  ) : (
    <ToastProvider>
      <header className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item title is-5" href="/">
              EP Admin
            </a>
          </div>
        </div>
      </header>
      {error && <ErrorIndicator error={error} />}
      <main className="section">
        {pageId ? <PageEdit pageId={pageId} /> : <PageList onPageClick={setPageId} />}
      </main>
    </ToastProvider>
  );
}

export default App;
