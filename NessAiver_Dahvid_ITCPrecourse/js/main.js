
const GITHUB_URL = "https://api.github.com/users/cptnpluto";
const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");

fetch(GITHUB_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        profileImage.src = data.avatar_url;
        profileName.innerHTML = data.login;
        // update the profileImage and profileName with the information retrieved.
    });

const card = document.getElementById("card");
const links = document.querySelectorAll(".links-before-click");
card.addEventListener("click", addLinkNames);

function addLinkNames() {
    console.log("hello");
    links.forEach(div => {
        div.classList.add("links-after-click");
    });
    
}
 



