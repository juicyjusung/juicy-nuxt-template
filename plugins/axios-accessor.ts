import { Context, Plugin } from '@nuxt/types';
import { eventHub } from '~/utils/evnetHub';
import { ErrorType } from '~/constants';

const accessor: Plugin = ({ $axios, redirect, app }: Context) => {
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

  $axios.onError(error => {
    if (!error.response) {
      return;
    }

    const code = error.response.status;

    if (code === ErrorType.Unprocessable) {
      return Promise.reject(error.response.data.errors);
    }

    if (code === ErrorType.Unauthorized) {
      redirect('/login');
      return;
    }

    if (code === ErrorType.Forbidden) {
      app?.router?.back();
      return;
    }

    if (code === ErrorType.NotFound) {
      redirect('/');
    }
  });
};

export default accessor;
