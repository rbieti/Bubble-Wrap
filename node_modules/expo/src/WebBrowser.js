// @flow
import { Linking, NativeModules, Platform } from 'react-native';
import invariant from 'invariant';

const { ExponentWebBrowser } = NativeModules;

type RedirectEvent = {
  url: 'string',
};

async function openBrowserAsync(
  url: string
): Promise<{ type: 'cancel' | 'dismissed' }> {
  return ExponentWebBrowser.openBrowserAsync(url);
}

function dismissBrowser(): void {
  ExponentWebBrowser.dismissBrowser();
}

async function openAuthSessionAsync(
  url: string,
  redirectUrl: string
): Promise<any> {
  if (_authSessionIsNativelySupported()) {
    return ExponentWebBrowser.openAuthSessionAsync(url, redirectUrl);
  } else {
    return _openAuthSessionPolyfillAsync(url, redirectUrl);
  }
}

function dismissAuthSession(): void {
  if (_authSessionIsNativelySupported()) {
    ExponentWebBrowser.dismissAuthSession();
  } else {
    ExponentWebBrowser.dismissBrowser();
  }
}

/* iOS <= 10 and Android polyfill for SFAuthenticationSession flow */

function _authSessionIsNativelySupported() {
  if (Platform.OS === 'android') {
    return false;
  }

  const versionNumber = parseInt(Platform.Version, 10);
  return versionNumber >= 11;
}

let _redirectHandler;
async function _openAuthSessionPolyfillAsync(startUrl, returnUrl) {
  invariant(
    !_redirectHandler,
    'WebBrowser.openAuthSessionAsync is in a bad state. _redirectHandler is defined when it should not be.'
  );

  let result;
  let error;
  try {
    result = await Promise.race([
      openBrowserAsync(startUrl),
      _waitForRedirectAsync(returnUrl),
    ]);
  } catch (e) {
    error = e;
  }

  dismissBrowser();
  Linking.removeEventListener('url', _redirectHandler);
  _redirectHandler = null;

  if (error) {
    throw error;
  } else {
    return result;
  }
}

function _waitForRedirectAsync(returnUrl) {
  return new Promise(resolve => {
    _redirectHandler = (event: RedirectEvent) => {
      if (event.url.startsWith(returnUrl)) {
        resolve({ url: event.url, type: 'success' });
      }
    };

    Linking.addEventListener('url', _redirectHandler);
  });
}

export default {
  openBrowserAsync,
  openAuthSessionAsync,
  dismissBrowser,
  dismissAuthSession,
};
