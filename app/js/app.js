$.ready(function(){

  fetchTeachers().then(renderTeachers
  ).catch(function(error){
    console.log(error);
  })

  window.onhashchange = function(){
    var teacherId = location.hash.slice(1)
    fetchTeacher(teacherId)
      .then(renderTeacher
      ).catch(function(error){
        console.log(error);
      })
  }
})

function fetchTeachers() {
  return $.ajaxJson({
    url: 'http://localhost:3000/teachers/',
    type: 'GET'
  })
}

function fetchTeacher(teacherId) {
  return $.ajaxJson({
    url: 'http://localhost:3000/teachers/' + teacherId,
    type: 'GET'
  })
}

function createBadge(teacherId, title) {
  return $.ajaxJson({
    url: 'http://localhost:3000/badges',
    type: 'POST',
    data: {teacher_id: teacherId, title}
  })
}

function voteBadge(badgeId, voteType) {
  return $.ajaxJson({
    url: 'http://localhost:3000/badges/' + badgeId,
    type: 'POST',
    data: {vote_type: voteType}
  })
}

function renderTeachers(response){
  var template = Handlebars.compile(SweetSelector.select('#teachers-template')[0].innerHTML);
  replaceContentDiv(template({teachers: response}));
  $('.teacher-name').on('click', function(e){
    e.preventDefault();
    location.href = `#${e.target.getAttribute("teacherid")}`;
  })
}

function renderTeacher(response){
  var template = Handlebars.compile(SweetSelector.select('#badges-template')[0].innerHTML);
  replaceContentDiv(template({name: response.name, badges: response.badges}));
  $('#submit-btn').on('click', function(e){
    e.preventDefault();
    var title = SweetSelector.select('#addbadge-btn')[0].value;
    createBadge(teacherId, title).then(renderTeacher);
    })
  $('.votebutton').on('click', function(e){
    e.preventDefault();
    var badgeId = e.target.parentElement.parentElement.getAttribute("badgeid");
    var voteType = e.target.parentElement.getAttribute("votetype");
    if (checkVoted(badgeId)) {
      voteBadge(badgeId, voteType)
      .then(renderTeacher)
      .then(function(){
        recordVote(badgeId);
      })
    }
    })
}

function replaceContentDiv(html){
  SweetSelector.select('#content')[0].innerHTML = html;
}

function setCookies(object){
  Cookies.set('votes', JSON.stringify(object));
}

function getCookies(){
  return JSON.parse(Cookies.get('votes'));
}

function checkVoted(badgeId){
  var votes = getCookies();
  return !!votes[badgeId]; // same as votes[badgeId] == trues
}

function recordVote(badgeId){
  var votes = getCookies();
  if (!votes) {
    votes = {}
  }
  votes[badgeId] = true;
  setCookies(votes)
}
