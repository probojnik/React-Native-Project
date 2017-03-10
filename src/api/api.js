import DeviceInfo from 'react-native-device-info';


import { AppConfig, ErrorMessages, APIConfig } from '@constants/';
import AppUtil from '@util/api';

const Token = {};

const HOSTNAME = APIConfig.hostname;
const ENDPOINTS = APIConfig.endpoints;

let USER_AGENT;
try {
  USER_AGENT = `${AppConfig.appName} ` +
    `${DeviceInfo.getVersion()}; ${DeviceInfo.getSystemName()}  ` +
    `${DeviceInfo.getSystemVersion()}; ${DeviceInfo.getBrand()} ` +
    `${DeviceInfo.getDeviceId()}`;
} catch (e) {
  USER_AGENT = `${AppConfig.appName}`;
}

const DEBUG_MODE = AppConfig.DEV;

let requestCounter = 0;

function debug(str, title) {
  if (DEBUG_MODE && (title || str)) {
    if (title) {
      console.log(`=== DEBUG: ${title} ===========================`);
    }
    if (str) {
      console.log(str);
      console.log('%c ...', 'color: #CCC');
    }
  }
}

function handleError(err) {
  let error = '';
  if (typeof err === 'string') error = err;
  else if (err.message) error = err.message;

  if (!err) error = ErrorMessages.default;
  return error;
}

function serialize(obj, prefix) {
  const str = [];

  Object.keys(obj).forEach((p) => {
    const k = prefix ? `${prefix}[${p}]` : p;
    const v = obj[p];

    str.push((v !== null && typeof v === 'object') ?
      serialize(v, k) :
      `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  });

  return str.join('&');
}

function fetcher(method, endpoint, params, body) {
  return new Promise(async (resolve, reject) => {
    requestCounter += 1;
    const requestNum = requestCounter;

    const timeoutAfter = 7;
    const apiTimedOut = setTimeout(() => (
      reject(ErrorMessages.timeout)
    ), timeoutAfter * 1000);

    if (!method || !endpoint) return reject('Missing params (AppAPI.fetcher).');

    const req = {
      method: method.toUpperCase(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
    };

    if (Token.getStoredToken && endpoint !== APIConfig.endpoints.get(APIConfig.tokenKey)) {
      const apiToken = await Token.getStoredToken();
      if (apiToken) {
        req.headers.Authorization = `Bearer ${apiToken}`;
      }
    }

    // Add Endpoint Params
    let urlParams = '';
    if (params) {
      // Object - eg. /recipes?title=this&cat=2
      if (typeof params === 'object') {
        // If there's an 'id' prop, /{id}?
        if (params.id !== undefined) {
          if (typeof params.id === 'string' || typeof params.id === 'number') {
            urlParams = `/${params.id}`;
            delete params.id;
          }
        }

        // The rest of the params
        urlParams = `?${serialize(params)}`;

      // String or Number - eg. /recipes/23
      } else if (typeof params === 'string' || typeof params === 'number') {
        urlParams = `/${params}`;

      // Something else? Just log an error
      } else {
        debug('You provided params, but it wasn\'t an object!', HOSTNAME + endpoint + urlParams);
      }
    }

    // Add Body
    if (body) req.body = JSON.stringify(body);

    const thisUrl = HOSTNAME + endpoint + urlParams;

    debug('', `API Request #${requestNum} to ${thisUrl}`);

    // Make the request
    return fetch(thisUrl, req)
      .then(async (rawRes) => {
        // API got back to us, clear the timeout
        clearTimeout(apiTimedOut);

        let jsonRes = {};

        try {
          jsonRes = await rawRes.json();
        } catch (error) {
          const err = { message: ErrorMessages.invalidJson };
          throw err;
        }

        // Only continue if the header is successful
        if (rawRes && rawRes.status === 200) { return jsonRes; }
        throw jsonRes;
      })
      .then((res) => {
        debug(res, `API Response #${requestNum} from ${thisUrl}`);
        return resolve(res);
      })
      .catch((err) => {
        // API got back to us, clear the timeout
        clearTimeout(apiTimedOut);

        const apiCredentials = Token.getStoredCredentials ? Token.getStoredCredentials() : {};

        // If unauthorized, try logging them back in
        if (
          !AppUtil.objIsEmpty(apiCredentials) &&
          err &&
          err.data &&
          err.data.status.toString().charAt(0) === 4 &&
          err.code !== 'jwt_auth_failed' &&
          Token.getToken
        ) {
          return Token.getToken()
            .then(() => { fetcher(method, endpoint, params, body); })
            .catch(error => reject(error));
        }

        debug(err, HOSTNAME + endpoint + urlParams);
        return reject(err);
      });
  });
}

const AppAPI = {
  handleError,
  getToken: Token.getToken,
  deleteToken: Token.deleteToken,
};

ENDPOINTS.forEach((endpoint, key) => {
  AppAPI[key] = {
    get: (params, payload) => fetcher('GET', endpoint, params, payload),
    post: (params, payload) => fetcher('POST', endpoint, params, payload),
    patch: (params, payload) => fetcher('PATCH', endpoint, params, payload),
    put: (params, payload) => fetcher('PUT', endpoint, params, payload),
    delete: (params, payload) => fetcher('DELETE', endpoint, params, payload),
  };
});

/* Export ==================================================================== */
export default AppAPI;
