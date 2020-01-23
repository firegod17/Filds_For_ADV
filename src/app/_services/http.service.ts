// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//
// import { User } from '../_models/user';
//
// // export class httpRequest {
// //   constructor() {}
//   //  httpRequestd(){
//   // var myHeaders = new Headers();
//   // myHeaders.append("Content-Type", "application/json");
//   // myHeaders.append("auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3MTg4NmY1MmZlYjRjZWMxM2JiMGQiLCJpYXQiOjE1Nzk3MDY5ODR9.AyYoumQnOoHPDPaP62Ig-sjWkl6JmpeX_zEWfVfvjMg");
//   //
//   // var raw = JSON.stringify({"car":"12","km":"4","numb_cars":"2","type_car":"qwe","data_start":"4"});
//   //
//   // var requestOptions = {
//   //   method: 'PUT',
//   //   headers: myHeaders,
//   //   body: raw,
//   //   redirect: 'follow'
//   // };
//
//
//
//    function httpRequestdef(){
//       var endpoint = "http://47fb4d19.ngrok.io/api/"
//
//       var httpPost = new XMLHttpRequest();
//
//       httpPost.onload = function(err) {
//           if (httpPost.readyState == 4 && httpPost.status == 200){
//               var response=JSON.parse(httpPost.responseText)//here you will get uploaded image id
//               callback(response);
//           } else {
//               console.log(err);
//           }
//       }
//       httpPost.open(method, endpoint+path, true);
//       httpPost.setRequestHeader('Content-Type', 'application/json');//Specifies type of request
//       httpPost.send(JSON.stringify(dataObj))
//   }
//
// // }
