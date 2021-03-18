var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    fetch(apiUrl).then(function(response) {
        //SUCCESSFUL REQUEST
        if(response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
        } else {
            alert("Error: " + response.status);
        }
    })
    //.CATCH IS BEING ATTACHED TO THE END OF THE .THEN!!!
    .catch(function(error)) {alert("Unable to connect to GitHub");
};
console.log("outside");

var response = fetch("https://api.github.com/users/octocat/repos");
console.log(response);

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username){
        getUserRepos(username);
        nameInputEl.value="";
    } else {
        alert("Please enter a GitHub username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var displayRepos = function(repos, searchTerm) {
    //CHECK IF API RETURNED ANY REPOS
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);

    //CLEAR OLD CONTENT
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i=0; i < repos.length; i++) {
        //FORMAT REPO NAME
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //CREATE A CONTAINER FOR EACH REPO
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //CREATE A SPAN ELEMENT TO HOLD REPOSITORY NAME
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //APPEND
        repoEl.appendChild(titleEl);

        //CREATE A STATUS ELEMENT
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //CHECK IF CURRENT REPO HAS ISSUES OR NOT
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        //APPEND
        repoContainerEl.appendChild(repoEl);
    }
}

getUserRepos();

