(function() { 'use strict';

var Nectd = {};

/*-----------------------------------------------------------------------------------------------
 * Environment and configuration checks
 *-----------------------------------------------------------------------------------------------*/
if (!window) {
    throw new Error('The Nectd API requires a window object');
}

// This is a strong assumption, but for now in order to implement the first version of the
// JS API is a fair one. In the future, we might have a global status of the Nectd object, to
// check in case the support of the Nectd API is not available for the current browser.
if(typeof(Storage) === "undefined") {
    throw new Error('The Nectd API requires a browser with local storage');
}

if (window.Nectd) {
    throw new Error('The Nectd API has already been defined');
}


/*-----------------------------------------------------------------------------------------------
 * Constants
 *-----------------------------------------------------------------------------------------------*/
var API_SRV = '@@API_SRV_URL@@'; // Replaced by Gulp build
var IFRAME_API_SRV = window.location.protocol === 'http:' ?
                     API_SRV.replace('https:', 'http:') :
                     API_SRV;

var LOCAL_STORAGE_TOKEN_INFO_KEY = '___Nectd___API___token___';

var API_PROXY_ENDPOINT =                        '/logged-in-proxy';
var API_OAUTH_TOKEN_PROXY =                     '/oauth-token/proxy';
var API_OAUTH_AUTHORIZE_ENDPOINT =              '/oauth/authorize';

var API_OAUTH_TOKEN_CHECK_ENDPOINT =            '/api/v1.0/account/profiles'; // Mock for now...

var CHECK_LOGIN_IFRAME_ID =                     'nectd-login-check-frame';
var LOGOUT_IFRAME_ID =                          'nectd-logout-frame';

// Globals
var loginInterval;
var currentCheckLoginEventListener;
var currentLoginEventListener;

/*-----------------------------------------------------------------------------------------------
 * jQuery no-conflict mode local reference
 *-----------------------------------------------------------------------------------------------*/
var $ = jQuery.noConflict(true);


/*-----------------------------------------------------------------------------------------------
 * Exporting the Nectd object
 *-----------------------------------------------------------------------------------------------*/
// TODO: Avoid to redefine it and check consistency
window.Nectd = Nectd;


/*-----------------------------------------------------------------------------------------------
 * Implementation
 *-----------------------------------------------------------------------------------------------*/

/**
 * Create an iframe for cross-domain messaging.
 */
function _iframeXdm(id, url, onloadCallback) {
    $('#' + id).remove(); // Preventive removal
    $('body').append(
        '<iframe id = "' + id + '" src = "' + url + '" style = "display: none;"></iframe>');
    document.getElementById(id).onload = onloadCallback;
}

function _checkValidToken(callback) {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_INFO_KEY) == null) {
        callback({ status: 'not_authorized' });
        return;
    }

    var tokenInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_INFO_KEY));
    $.ajax({
        url: IFRAME_API_SRV + API_OAUTH_TOKEN_CHECK_ENDPOINT,
        type: 'GET',
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + tokenInfo.access_token);
        },
        success: function () {
            callback({
                status: 'connected',
                authResponse: tokenInfo
            });
        },
        error: function () {
            // TODO: Policy of auto-renew of the token
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_INFO_KEY);
            callback({ status: 'not_authorized' });
        }
    });
}

function _createWindowLoginCheckEventListener(callback) {
    return function (e) {
        if (e.origin !== IFRAME_API_SRV) {
            return;
        }
        if (e.data === '__nectd__logged__in__proxy__') {
            window.removeEventListener('message', currentCheckLoginEventListener);
            _checkValidToken(callback);
            return;
        }
        else if (e.data === '__nectd__login__page__') {
            window.removeEventListener('message', currentCheckLoginEventListener);
            callback({ status: 'unknown' });
            return;
        }
    };
}

function _checkLoggedIn(callback) {
    window.removeEventListener('message', currentCheckLoginEventListener);
    currentCheckLoginEventListener = _createWindowLoginCheckEventListener(callback);
    window.addEventListener('message', currentCheckLoginEventListener);

    _iframeXdm(CHECK_LOGIN_IFRAME_ID, IFRAME_API_SRV + API_PROXY_ENDPOINT, function () {
        var receiver = document.getElementById(CHECK_LOGIN_IFRAME_ID).contentWindow;
        receiver.postMessage('__nectd__js__api__inquiry__', IFRAME_API_SRV);
    });
}


// a) Check if logged in
//      a.1) If not, return 'unknown' status
// b) Check if we have a token memorized somewhere
//      b.1) If not, return 'not_authorized'
// c) Check if the token is still valid
//      c.1) If not, return 'not_authorized'
// d) Return the token
function getLoginStatus(callback) {
    if (typeof callback !== 'function') {
        return;
    }
    _checkLoggedIn(callback);
}

function _createSuccessfulLoginEventListener(callback) {
    return function (e) {
        if (e.origin !== IFRAME_API_SRV) {
            return;
        }
        if (e.data.indexOf('__nectd__oauth__token__info__') !== -1 ) {
            var tokenInfo = e.data.split('__nectd__oauth__token__info__')[1];
            callback(JSON.parse(tokenInfo));
            return;
        }
        else if (e.data.indexOf('__nectd__oauth__token__error__') !== -1 ) {
            callback('error');
            return;
        }
    };
}

function _setLoginInterval(loginWin) {
    _clearLoginInterval();
    loginInterval = setInterval(function () {
        loginWin.postMessage('__nectd__js__get__oauth__token__', IFRAME_API_SRV);
    }, 1000);
}

function _clearLoginInterval() {
    if (loginInterval) {
        clearInterval(loginInterval);
        loginInterval = undefined;
    }
}

function login(callback) {
    var loginWin = window.open(IFRAME_API_SRV + API_OAUTH_AUTHORIZE_ENDPOINT +
                '?response_type=token' +
                '&client_id=' + 'nectd-js-api-beta' + // TODO: Set the proper client_id
                '&scope=default' +
                '&redirect_uri=' + IFRAME_API_SRV + API_OAUTH_TOKEN_PROXY,
                'Nectd Login Window',
                'height=400, width=450, status=yes, toolbar=no, menubar=no, location=no');

    _setLoginInterval(loginWin);

    window.removeEventListener('message', currentLoginEventListener);
    currentLoginEventListener = _createSuccessfulLoginEventListener(function (tokenInfo) {
        _clearLoginInterval();
        window.removeEventListener('message', currentLoginEventListener);
        if (tokenInfo !== 'error') {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_INFO_KEY, JSON.stringify(tokenInfo));
        }
        if (typeof callback === 'function') {
            callback(tokenInfo);
        }
    });
    window.addEventListener('message', currentLoginEventListener);
}

function _logoutEventListener(e) {
    if (e.origin !== IFRAME_API_SRV) {
        return;
    }
    if (e.data === '__nectd__logged__out__') {
        window.removeEventListener('message', _logoutEventListener);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_INFO_KEY);
        return;
    }
}

function logout() {
    window.addEventListener('message', _logoutEventListener);
    _iframeXdm(LOGOUT_IFRAME_ID, IFRAME_API_SRV + API_PROXY_ENDPOINT, function () {
        var receiver = document.getElementById(LOGOUT_IFRAME_ID).contentWindow;
        receiver.postMessage('__nectd__js__api__logout__', IFRAME_API_SRV);
    });
}

function _isPublicEndpoint(url) {
    return url != null && typeof url === 'string' && url.indexOf('/public/') === -1;
}

function api(url, type, data, success, error) {
    var tokenInfo = localStorage.getItem(LOCAL_STORAGE_TOKEN_INFO_KEY);
    $.ajax({
        url: API_SRV + url,
        type: type,
        data: data,
        beforeSend: function(xhr) {
            if (tokenInfo && _isPublicEndpoint(url)) {
                tokenInfo = JSON.parse(tokenInfo);
                xhr.setRequestHeader("Authorization", "Bearer " + tokenInfo.access_token);
            }
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: success,
        error: error
    });
}

/*-----------------------------------------------------------------------------------------------
 * Exporting the API functions
 *-----------------------------------------------------------------------------------------------*/
var apiFunctions = {
    'getLoginStatus': getLoginStatus,
    'login': login,
    'logout': logout,
    'api': api,
};

$.each(apiFunctions, function (apiName, fn) {
    Object.defineProperty(Nectd, apiName, {
        enumerable: true,
        get: function () { return fn; }
    });
});


}());
