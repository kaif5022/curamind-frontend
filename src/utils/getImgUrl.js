import axios from './axiosConfig';

export const getImgUrl = (path) => {
  if (!path) return '';
  const baseUrl = axios.defaults.baseURL.replace('/api', '');
  if (path.includes('/uploads/')) {
    const uploadPath = path.substring(path.indexOf('/uploads/'));
    return `${baseUrl}${uploadPath}`;
  }
  return path.startsWith('http') ? path : `${baseUrl}${path}`;
};
