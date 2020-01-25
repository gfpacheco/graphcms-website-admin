import React, { useState } from 'react';
import PageEdit from '../PageEdit';
import PageList from '../PageList';

function App() {
  const [pageId, setPageId] = useState();

  return (
    <>
      <header className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item title is-5" href="/">
              EP Admin
            </a>
          </div>
        </div>
      </header>
      <main className="section">
        {pageId ? <PageEdit pageId={pageId} /> : <PageList onPageClick={setPageId} />}
      </main>
    </>
  );
}

export default App;
