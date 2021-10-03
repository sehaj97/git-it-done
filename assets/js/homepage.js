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
      if(jQuery.isEmptyObject(data) === false){
      var container = $("#repos");
      container.html("");
      var reposGroup = $("<ul>").addClass("list-group");
      container.append(reposGroup);
      var reposItem = "";
      var repoItemDetails = "";
      reposItemStatus = "";
      reposStatusIcon = "";
        for(var i = 0; i< data.length; i++){
          repoItemDetails = $("<div>").append(user + "/" + data[i].name);
          reposItemStatus = $("<div>").addClass("status-"+i);
          reposItem = $("<li>").addClass("list-group-item m-2 bg-secondary rounded text-white font-weight-bold d-flex justify-content-between item-" + i);
          $(".list-group").append(reposItem);
          $(".item-" + i).append(repoItemDetails);
          $(".item-" + i).append(reposItemStatus);
          reposStatusIcon = $("<i>").addClass("fas fa-check-square status-icon icon-success");
          $(".status-"+i).append(reposStatusIcon);
          if (data[i].open_issues_count > 0) {
            $(".status-"+i).html("");
            reposStatusIcon = $("<i>").addClass("fas fa-times status-icon icon-danger");
            $(".status-"+i).append(reposStatusIcon);
            $(".status-"+i).append(data[i].open_issues_count + " issue(s)");
          }
        }
      } 

      if (data.length === 0) {
        alert("No repositories found.");
        return;
      }
    })
    .fail(function( error ) {
      alert("user not found");
  });
};
  
userFormEl.addEventListener("submit", formSubmitHandler);