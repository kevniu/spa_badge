$.ready(function(){

  Cookies.set('name', 'value');
  console.log(Cookies.get('name'));

  $.ajaxJson({
    url: 'http://spa-badge-api.herokuapp.com/teachers',
    type: 'GET',
    success: function(response){
      var template = Handlebars.compile(SweetSelector.select('#teachers-template')[0].innerHTML);
      $('#content').append(template({teachers: response}));
      $('.teacher-name').on('click', function(e){
        e.preventDefault();
        location.href = `#${e.target.getAttribute("teacherid")}`;
      })
    },
    fail: function(error){
      console.log(error);
    }
  })

  window.onhashchange = function(){
    $.ajaxJson({
      url: 'http://spa-badge-api.herokuapp.com/teachers/' + location.hash.slice(1),
      type: 'GET',
      success: function(response){
          $('#content').hide();
          var template = Handlebars.compile(SweetSelector.select('#badges-template')[0].innerHTML);
          $('#badges').append(template({name: response.name, badges: response.badges}));
      },
      fail: function(error){
        console.log(error);
      }
    })
  }



})
