document.addEventListener("DOMContentLoaded", function() {

  SweetSelector.ajaxClone({
    url: 'http://localhost:3000/teachers',
    method: 'GET'
  }).then(function(res) {

    var content = SweetSelector.select('#content');
    res = JSON.parse(res);
    var template = Handlebars.compile(SweetSelector.select('#teachers-template').innerHTML);
    content.innerHTML = template({teachers: res});

    EventDispatcher.on('a', 'click', function(e){
      e.preventDefault();
      var teacher = this.getAttribute('href').split('#')[1];
      var url = 'http://localhost:3000/teachers/teacher?name=' + teacher;
      console.log(url);

      SweetSelector.ajaxClone({
        url: url,
        method: 'GET'
      })
      .then(function(res) {
        DOM.hide('#content');
        var content = SweetSelector.select('#badges');
        var data = JSON.parse(res);
        var template = Handlebars.compile(SweetSelector.select('#badges-template').innerHTML);
        content.innerHTML = template(data);
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
    });
  }).catch(function(err) {
    console.log(err);
  });



});
