export const mailCheck = (value) => {
  const regex = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+.[a-z]{2,3}(.[a-z]{2})?)$/g;
  if (regex.test(value)) {
    // var user_name = email_address.replace( regex, "$1" );
    // var domain_name = email_address.replace( regex, "$2" );
    return true;
  }
  return false;
};
export const numberCheck = (value) => {
  const reg = new RegExp('^[0-9]*$');
  if (reg.test(value)) {
    return true;
  }
  return false;
};
export const queryString = () => {
  const _queryString = {};
  const _query = window.location.search.substr(1);
  if (_query) {
    const _vars = _query.split('&');
    _vars.forEach((v) => {
      if (v) {
        const _pair = v.split('=');
        if (!Object.prototype.hasOwnProperty.call(_queryString, _pair[0])) {
          _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
          const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
          _queryString[_pair[0]] = _arr;
        } else {
          _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
      }
    });
  }
  return _queryString;
};
