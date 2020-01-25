import uuid from 'uuid/v4';
import { useState } from 'react';

const apiKey = 'APyTOAOBTR2YveVNE35vQz';
const projectId = '6137faad444c4583b2ac0604e80022c6';
const stage = 'master';
const baseUrl = `https://www.filestackapi.com/api/store/S3?key=${apiKey}&path=/${projectId}-${stage}`;

function useUploadFile() {
  const [state, setState] = useState({ loading: false, error: undefined });

  async function uploadFile(file) {
    try {
      setState({ loading: true, error: undefined });

      const fileName = file.name;
      const body = new FormData();
      body.append('fileUpload', file);

      const response = await fetch(`${baseUrl}/${uuid()}_${fileName}`, {
        method: 'POST',
        body,
      });

      const { type, size, url } = await response.json();

      setState({ loading: false, error: undefined });

      return { fileName, mimeType: type, size, url };
    } catch (error) {
      console.error(error);
      setState({ loading: false, error });
    }
  }

  return { ...state, uploadFile };
}

export default useUploadFile;
