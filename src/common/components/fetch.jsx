
import 'whatwg-fetch';
import { message } from 'antd';
import DTO from './dto';

export default function post(url, data, cab, errcbk) {
  const param = DTO.input;
  param.data = data;
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    dataType: 'json',
    body: JSON.stringify(param),
  }).then((res) => {
    // 如果是 application/json
    if (res.headers.get('Content-type').indexOf('application/json') > -1) {
      return res.json();
    }
    return res.text();
  }).then((res) => {
    if (res.status === 1) {
      if (cab) {
        cab(res);
      }
    } else if (res.status === 2) {
      message.error(res.msg);
    }
  }).catch((error) => {
    console.log(error);
    if (errcbk) {
      errcbk(error);
    }
  });
}

export function get(url, cab, errcbk) {
  fetch(url, {
    headers: {
      'Content-Type': 'text/plain',
      'X-Custom-Header': 'ProcessThisImmediately',
    },
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  }).then(res => res.text())
    .then((res) => {
      if (cab) {
        cab(res);
      }
    })
    .catch((error) => {
      console.log(error);
      if (errcbk) {
        errcbk(error);
      }
    });
}
