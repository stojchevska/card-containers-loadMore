
//get data from json file
fetch("data.json")
    .then((response) => response.json())
    .then((data) => appendData(data))
    .catch((err) => console.log(err));

//append data
function appendData(data) {

    var container = document.getElementById("mainContainer");
    for (let i = 0; i < data.length; i++) {

        //create instagram cards
        var cardContainer = document.createElement("div");
        cardContainer.setAttribute("class","cardContainer");
        if(i>=4){
            cardContainer.setAttribute("style","display: none");
        }

        //add profile image, name and date
        var profileImg = document.createElement("img");
        profileImg.src = data[i].profile_image;
        profileImg.setAttribute("class", "profileImg");
        cardContainer.appendChild(profileImg);

        var name = document.createElement("h2");
        name.innerHTML = data[i].name;
        name.setAttribute("class", "name");
        cardContainer.appendChild(name);

        var date = document.createElement("h4");
        var parseDate = new Date(data[i].date);
        var formatDate =
            parseDate.getDate() +
            " " +
            parseDate.getMonth()+
            " " +
            parseDate.getFullYear();
        date.innerHTML = formatDate;
        date.setAttribute("class", "date");
        cardContainer.appendChild(date);

        // add instagram logo
        var instagramLogo = document.createElement("img");
        instagramLogo.src='icons/instagram-logo.svg';
        instagramLogo.setAttribute("class", "instagramLogo");
        cardContainer.appendChild(instagramLogo);

        // add main image
        var image = document.createElement("img");
        image.src = data[i].image;
        image.setAttribute("class", "img");
        cardContainer.appendChild(image);

        // add image description
        if (data[i].caption.length != 0) {
            var description = document.createElement("p");
            description.innerHTML = data[i].caption;
            description.setAttribute("class", "description");
            cardContainer.appendChild(description);
        }

        //like functionality
        let likeicon = document.createElement("button");
        likeicon.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
        likeicon.setAttribute("class", "likeicon");
        likeicon.setAttribute("id", "button" + i);
        likeicon.setAttribute("onclick","like");
        cardContainer.appendChild(likeicon);
        function like(){
            data[i].likes ++;
        }

        // num of likes
        let numLikes = document.createElement("span");
        numLikes.innerHTML = data[i].likes;
        numLikes.setAttribute("class", "numLikes");
        cardContainer.appendChild(numLikes);

        // append all to the main container
        container.appendChild(cardContainer);
    }
}
let loadMoreBtn = document.getElementById("loadMore");
let currentItem = 4;
loadMoreBtn.onclick = () =>{

    let cards = document.getElementsByClassName("cardContainer");
    for (var i = currentItem; i < currentItem + 4; i++){
        cards[i].setAttribute("style", "display : inline")
    }

    currentItem += 4;

    if(currentItem>=cards.length){
        loadMoreBtn.style.display = 'none';
    }
}