'use strict';
const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

class UriMask {
  static maskUri(uri, options) {
    if (!uri || typeof uri !== 'string') return uri;

    const protocolEnd = uri.indexOf('://');
    if (protocolEnd < 0) return uri;

    options = options
      ? MaskHelper.mapWithDefaultValues(options, Constants.defaultUriMaskOptions)
      : Constants.defaultUriMaskOptions;
    MaskHelper.validateUriMaskOptions(options);

    const protocol = uri.substring(0, protocolEnd);
    let remainder = uri.substring(protocolEnd + 3);

    // Extract fragment
    let fragment = '';
    const fragmentIndex = remainder.indexOf('#');
    if (fragmentIndex >= 0) {
      fragment = remainder.substring(fragmentIndex + 1);
      remainder = remainder.substring(0, fragmentIndex);
    }

    // Extract query
    let query = '';
    const queryIndex = remainder.indexOf('?');
    if (queryIndex >= 0) {
      query = remainder.substring(queryIndex + 1);
      remainder = remainder.substring(0, queryIndex);
    }

    // Extract userinfo (user:password@)
    let username = '';
    let password = '';
    let hasUserinfo = false;
    let hasPassword = false;
    const atIndex = remainder.indexOf('@');
    if (atIndex >= 0) {
      hasUserinfo = true;
      const userinfo = remainder.substring(0, atIndex);
      remainder = remainder.substring(atIndex + 1);
      const colonIndex = userinfo.indexOf(':');
      if (colonIndex >= 0) {
        hasPassword = true;
        username = userinfo.substring(0, colonIndex);
        password = userinfo.substring(colonIndex + 1);
      } else {
        username = userinfo;
      }
    }

    // Extract path
    let path = '';
    const pathIndex = remainder.indexOf('/');
    if (pathIndex >= 0) {
      path = remainder.substring(pathIndex + 1);
      remainder = remainder.substring(0, pathIndex);
    }

    // remainder is now host or host:port
    let host = remainder;
    let port = '';
    const portIndex = remainder.lastIndexOf(':');
    if (portIndex >= 0) {
      host = remainder.substring(0, portIndex);
      port = remainder.substring(portIndex + 1);
    }

    // Build masked URI
    let masked = '';

    masked += options.maskProtocol
      ? `${options.maskWith}`.repeat(protocol.length)
      : protocol;
    masked += '://';

    if (hasUserinfo) {
      masked += options.maskUsername
        ? `${options.maskWith}`.repeat(username.length)
        : username;
      if (hasPassword) {
        masked += ':';
        masked += options.maskPassword
          ? `${options.maskWith}`.repeat(password.length)
          : password;
      }
      masked += '@';
    }

    masked += options.maskHost
      ? `${options.maskWith}`.repeat(host.length)
      : host;

    if (port.length > 0) {
      masked += ':';
      masked += options.maskPort
        ? `${options.maskWith}`.repeat(port.length)
        : port;
    }

    if (path.length > 0) {
      masked += '/';
      masked += options.maskPath
        ? `${options.maskWith}`.repeat(path.length)
        : path;
    }

    if (query.length > 0) {
      masked += '?';
      masked += options.maskQuery
        ? `${options.maskWith}`.repeat(query.length)
        : query;
    }

    if (fragment.length > 0) {
      masked += '#';
      masked += options.maskFragment
        ? `${options.maskWith}`.repeat(fragment.length)
        : fragment;
    }

    return masked;
  }
}

module.exports = UriMask;
