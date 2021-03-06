class MiniQuery {
  constructor(element) {
    this.element = element;
  }
  show() {
    DOM.show(this.element);
    return this;
  }
  hide() {
    DOM.hide(this.element);
    return this;
  }
  addClass(className) {
    DOM.addClass(this.element, className);
    return this;
  }
  removeClass(className) {
    DOM.removeClass(this.element, className);
    return this;
  }
  append(htmlString){
    DOM.append(this.element, htmlString);
    return this;
  }
  on(eventName, callBack){
    EventDispatcher.on(this.element, eventName, callBack);
    return this;
  }
  trigger(eventName){
    EventDispatcher.trigger(this.element, eventName);
    return this;
  }
  static ajax({url, type, success, fail}) {
    AjaxWrapper.request({url, type}).then(success).catch(fail);
  }
  static ready(callBack) {
    if (document.readyState == "complete") {
        callBack();
    }
    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            callBack();
        }
    }
  }
  static ajaxJson(parameters){
      return AjaxWrapper.request(parameters).then(function(response){
        return JSON.parse(response);
      });
  }
}

class SweetSelector {
  static select(element){
    if (element.includes('#')){
      var idElement = []
      var selected = document.getElementById(element.substring(1));
      if (selected != null) {
        idElement.push(selected);
      }
      return idElement;
    } else if (element.includes('.')) {
      return document.getElementsByClassName(element.substring(1));
    } else {
      return document.getElementsByTagName(element);
    }
  }
}

class DOM {
  static hide(element){
    var elementArr = SweetSelector.select(element)
    for (var i = 0; i < elementArr.length; i++){
      elementArr[i].style.display = "none";
    }
  }
  static show(element){
    var elementArr = SweetSelector.select(element)
    for (var i = 0; i < elementArr.length; i++){
      elementArr[i].style.display = "";
    }
  }
  static addClass(element, className){
    var elementArr = SweetSelector.select(element)
    for (var i = 0; i < elementArr.length; i++){
      elementArr[i].classList.add(className);
    }
  }
  static removeClass(element, className){
    var elementArr = SweetSelector.select(element)
    for (var i = 0; i < elementArr.length; i++){
      elementArr[i].classList.remove(className);
    }
  }
  static append(element, htmlString) {
    var elementArr = SweetSelector.select(element)
    for (var i = 0; i < elementArr.length; i++){
      elementArr[i].innerHTML += htmlString;
    }
  }
}

class EventDispatcher {
  static on(element, eventName, callBack) {
    var elementArr = SweetSelector.select(element)
    for (var i = 0; i < elementArr.length; i++){
      elementArr[i].addEventListener(eventName, callBack);
    }
  }
  static trigger(element, eventName){
    var event = new Event(eventName);
    var elementArr = SweetSelector.select(element)
    for (var i = 0; i < elementArr.length; i++){
      elementArr[i].dispatchEvent(event);
      break;
    }
  }
}

class AjaxWrapper {
  static request(properties){
    return new Promise( function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
              resolve(xhr.responseText);
          }
      }
      xhr.onerror = function(error) {
          reject(error);
          //return the error code
      }
      xhr.open(properties.type, properties.url);
      var data;
      if (properties.data) {
        data = new FormData();
        Object.keys(properties.data).forEach(function(key){
          data.append(key, properties.data[key]);
        })
      }
      xhr.send(data);
    })
  }
}



var $ = miniQuery = (function(MiniQuery, DOM, EventDispatcher, AjaxWrapper){
  var mq = function(element) {
    return new MiniQuery(element);
  }
  mq.DOM = DOM;
  mq.EventDispatcher= EventDispatcher;
  mq.AjaxWrapper = AjaxWrapper;
  mq.ready = MiniQuery.ready;
  mq.ajax = MiniQuery.ajax;
  mq.ajaxJson = MiniQuery.ajaxJson;
  return mq;
})(MiniQuery, DOM, EventDispatcher, AjaxWrapper);
