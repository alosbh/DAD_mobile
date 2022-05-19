import axios,{AxiosError} from 'axios';

export const api = axios.create({
  baseURL: "http://juansilva-001-site1.btempurl.com/"
});

export const authApi = axios.create({
  baseURL:"http://victorgontijo-001-site1.htempurl.com/api/"
});

