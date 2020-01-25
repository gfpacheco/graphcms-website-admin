import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import './PageList.scss';

const pagesQuery = gql`
  {
    pages {
      id
      title
      createdAt
    }
  }
`;

function PageList({ onPageClick }) {
  const { loading, error, data } = useQuery(pagesQuery);

  return (
    <div className="container page-list">
      <h1 className="title">Pages {loading && <LoadingIndicator />}</h1>
      {error && <p className="has-text-error">{error}</p>}
      {data && (
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Creation date</th>
            </tr>
          </thead>
          <tbody>
            {data.pages.map(page => (
              <tr key={page.id} onClick={() => onPageClick(page.id)}>
                <td>{page.title}</td>
                <td>{new Date(page.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PageList;
