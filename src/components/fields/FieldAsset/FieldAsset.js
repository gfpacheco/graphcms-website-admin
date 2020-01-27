import React, { useRef } from 'react';
import './FieldAsset.scss';
import useUploadFile from '../../../hooks/useUploadFile';
import ErrorIndicator from '../../ErrorIndicator';

function FieldAsset({ field, value, onChange }) {
  const { loading, error, uploadFile } = useUploadFile();
  const inputRef = useRef();

  async function handleFileChange() {
    const file = inputRef.current.files[0];

    if (file) {
      const result = await uploadFile(file);

      if (result) {
        onChange(result);
      }
    }
  }

  return (
    <div className="field-asset field">
      <label className="label is-capitalized">{field.name}</label>
      <div className="media">
        <figure className="media-left">
          <p className="image is-128x128">
            {value && <img src={value.url} alt={value.fileName} />}
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <input ref={inputRef} type="file" className="is-hidden" onChange={handleFileChange} />
            <div className="field">
              <button
                type="button"
                className={`button is-link ${loading ? 'is-loading' : ''}`}
                onClick={() => inputRef.current.click()}
                disabled={loading}
              >
                {value ? 'Change file' : 'Choose file'}
              </button>
            </div>
            {value && (
              <div className="field">
                <button
                  type="button"
                  className="button"
                  onClick={() => onChange(null)}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            )}
            <ErrorIndicator error={error} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FieldAsset;
