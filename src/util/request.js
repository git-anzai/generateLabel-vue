import axios from 'axios';
import Qs from 'qs';
import Vue from 'vue'
/*
* axios封装
* */
var instance = axios.create({});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const baseUrl = {
  host1: 'http://dev.shijijiaming.cn:3000/apis/',
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    //post传参序列化
    const jwt_token = window.localStorage.getItem('token');
    if (jwt_token) {
      config.headers['Authorization'] =`Bearer ${jwt_token}`;
    }
    if (config.method === 'post') {
      config.data = Qs.stringify(config.data);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
});


// http response 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.error == 110) {
      if(window.location.href.indexOf('localhost')!=-1){
        Vue.prototype.$Modal.confirm({
          title:'提示',
          content:response.data.message,
          okText:'去登录',
          onOk:function(){
            window.location.href="http://dev.shijijiaming.cn:3000/#/login";
          }
        })
      }else{
        Vue.prototype.$Modal.confirm({
          title:'提示',
          content:response.data.message,
          okText:'去登录',
          onOk:function(){
            window.location.href="http://dev.shijijiaming.cn:3000/#/login";
          }
        })
      }
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  });

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(service,data = {}) {
  var _url = baseUrl.host1;
  return new Promise((resolve, reject) => {
    axios.post(_url+service, data).then(response => {
      var res = response.data;
      if (!res.success) {
          Vue.prototype.$Message.warning({
            content: res.message,
            duration: 3,
            closable: true
          });
      } else {
        Vue.prototype.$Message.success({
          content: res.message,
          duration: 3,
          closable: true
        });
      }
      resolve(response.data);
    }, err => {
      reject(err);
    })
  })
}



/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function getData(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(baseUrl.host1+url,{
      params:params
    })
    .then(response => {
      var res = response.data;
      if (!res.success) {
        Vue.prototype.$Message.warning({
          content: res.message,
          duration: 3,
          closable: true
        });
      } else {
        Vue.prototype.$Message.success({
          content: res.message,
          duration: 3,
          closable: true
        });
      }
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}


export const Api = {
  "LOGIN":"login",
  "GET_ORDER_LIST":"getOrderList",
  "GENERATE_LABEL":"generateLabel",
  "GET_LABLE":"getLabel",
  "ORDER_GENERATE":"orderGenerate",
  "ORDER_UPLOAD":"orderUpload"
}
export default {
  post,baseUrl,getData
}
