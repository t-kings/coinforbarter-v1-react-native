import axios from 'axios';
import {CoinForBarterStatus, MethodTypes, RequestResponseSchema} from './types';
import {settings} from './config';

class CoinForBarterRequest {
  private url = settings.url;

  async call(
    path = '',
    method = MethodTypes.Get,
    body = {},
    publicKey: string | null = null,
  ): Promise<RequestResponseSchema> {
    try {
      let request: Record<string, any>;
      const status = CoinForBarterStatus.Success;
      const url = `${this.url}${path}`;
      let data = {};
      let statusCode = 200;
      let message = '';

      const headers: Record<string, any> = {
        'Content-Type': 'application/json',
      };
      if (publicKey) {
        headers.Authorization = `Bearer ${publicKey}`;
      }

      if (method === MethodTypes.Get || method === MethodTypes.Delete) {
        request = await axios[method](url, {headers});
        if (request.status === 204) {
          statusCode = request.status;
        } else {
          data = request.data.data;
          message = request.data.message;
          statusCode = request.status;
        }
      }
      if (method === MethodTypes.Post || method === MethodTypes.Patch) {
        request = await axios[method](url, body, {headers});
        data = request.data.data;
        message = request.data.message;
        statusCode = request.status;
      }
      return {data, status, message, statusCode};
    } catch (error: any) {
      const status = CoinForBarterStatus.Error;
      if (error.response?.status && error.response?.data) {
        const {
          status: statusCode,
          data: {data, message},
        } = error.response;
        return {data, message, status, statusCode};
      }
      return {
        status,
        message: 'an error occurred',
        data: {},
        statusCode: 0,
      };
    }
  }

  makeQueryString(query: Record<string, any>): string {
    const queryArray = Object.entries(query).map(
      ([key, value]) => `${key}=${value}`,
    );
    return queryArray.length > 0 ? `?${queryArray.join('&')}` : '';
  }
}

export const coinForBarterRequest = new CoinForBarterRequest();
