import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
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
    <div className="page-list container">
      <h1 className="title">Pages {loading && <LoadingIndicator />}</h1>
      <ErrorIndicator error={error} />
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
