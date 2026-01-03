// ...existing code...
const HOST = process.env.REACT_APP_API_HOST;
const PREFIX = process.env.REACT_APP_API_PREFIX;

export const API_BASE_URL = PREFIX ? `${HOST}/${PREFIX}` : HOST;

export function endpoint(path = '') {
  return `${API_BASE_URL}${path}`;
}
