import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { eventHub } from '~/utils/evnetHub';

// eslint-disable-next-line
let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance): void {
  $axios = axiosInstance;
  $axios.interceptors.request.use(
    conf => {
      eventHub.$emit('before-request');
      return conf;
    },
    error => {
      eventHub.$emit('request-error');
      return Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    response => {
      eventHub.$emit('after-response');
      return response;
    },
    error => {
      eventHub.$emit('response-error');
      return Promise.reject(error);
    }
  );
}

export { $axios };
