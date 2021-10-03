var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var formSubmitHandler = function(event) {
  event.preventDefault();// get value from input element
  var username = nameInputEl.value.trim();
  
  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var getUserRepos = function(user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
    $.getJSON(apiUrl)
    .done(function(data) {
      var container = $("#repos");
      container.html("");
      var reposGroup = $("<ul>").addClass("list-group");
      container.append(reposGroup);
      var reposItem = "";
        for(var i = 0; i< data.length; i++){
          reposItem = $("<li>").addClass("list-group-item m-2 bg-secondary rounded text-white font-weight-bold").append(user + "/" + data[i].name);
          $(".list-group").append(reposItem);
        }
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
};
  
userFormEl.addEventListener("submit", formSubmitHandler);