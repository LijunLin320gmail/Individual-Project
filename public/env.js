//dummy data
//const dummyProjects={
//  author:'Lin',
//  imageUrl:'https://getwallpapers.org/wp-content/uploads/2021/12/Tree-Desktop-Wallpapers.jpg',
//  videoUrl:'https://youtu.be/de2fWxL4lZ0',
//  uniqueID:'4',
//  description:'the  introduction of trees',
//  title:'trees'
//}

//const { contentType } = require("express/lib/response")


//let dummyData=[dummyProjects,dummyProjects]

const submitProject = (project) => {
  $.ajax({
    url: '/api/projects',
    contentType: 'application/json',
    data: JSON.stringify(project),
    type: 'POST',
    success: function (result) {
      alert('Project Successfully submitted')
    }
  });
}

const newProject = () => {
  let imageUrl = $('#image').val()
  let project = {
    image
  }
  console.log(project)
  submitProject(project)
}

const requestProjects = () => {
  $.get('/api/projects', (projects) => {
    if (projects.lenth != 0) {
      console.log(projects)
      listProjects(projects)
    }
  })
}

const testButtonFunction = () => {
  // alert('Thank you for clicking')
}

// connect to the socket

let socket = io();


socket.on('number', (msg) => {
  console.log('Random number: ' + msg);
})
//appens the project row with objects of types of projects
listProjects = (projects) => {
  projects.forEach(project => {
    console.log(project)
    let item =
      '<div class="card">' +
      '                    <div class="card">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
      '<img class="activator" src="' + project.imageUrl + '">' +
      '</div>' +
      '<div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + project.title + '<i class="material-icons right">more_vert</i></span>' +
      '<p><a href="' + project.videoUrl + '">Video</a></p><p>' + project.title + '</p>' +
      '</div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' + project.title + '<i class="material-icons right">close</i></span>' +
      '<p>' + project.title + '</p>' +
      '</div>' +
      '</div>' +
      '<div class="row" id="projectslist">'
    '</div>' +
      $('#listProjects').append(item)
  });
}

//initializtion





//console.log('test')
$(document).ready(function () {
  console.log('Ready')

  //get data build UI conponent
  //  listProjects(dummyData)
  //bind the button
  $('#testButton').click(testButtonFunction)

  //test get call
  $.get('/test?user_name="Fantastic User"', (result) => {
    console.log(result)
  })

  //initialize
  $('.modal').modal();
  requestProjects()

})
