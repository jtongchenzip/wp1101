// make previrePic container and make pic as a child
function previewImage(album, button)
{
    let preview = document.getElementById("preview");
    preview.innerHTML = ""; // clear containers and images
    
    for (counter = 0; counter <= album.length - 1; counter++) {
        // create container as a button so that we can click on it
        let previewContainer = document.createElement("button");
        previewContainer.setAttribute("class", "previewContainer");
        // id for making clicking easier
        previewContainer.setAttribute("id", String(`previewContainer${counter}`)); 

        // declare stuff for preview
        let imagem = document.createElement("img");
        imagem.src = album[counter];
        let newP = document.createElement("p");
        newP.innerHTML = "picture " + String(counter + 1);
        
        // append into container and preview area
        previewContainer.appendChild(imagem);
        previewContainer.appendChild(newP);
        preview.appendChild(previewContainer);
    }
   
    // reset for clicking album button back and forth
    resetButton(button);
    containerClickable();
    // make the showing image the first pic in the album
    showImg(0, currentshowingContainer);
}

function changeAlbum(album, button, AlbumName)
{
    // empty album
    if(album.length === 0) {
        let preview = document.getElementById("preview");
        preview.innerHTML = ""; // clear containers and images

        let show = document.getElementById("show");
        show.innerHTML = ""; // clear images

        // warning for empty album
        let newP = document.createElement("p");
        newP.innerHTML = "This is an empty album!!!";

        preview.appendChild(newP);
        // reset for clicking albu, button back and forth
        resetButton(button);
    }

    //non-empty album
    else {
        currentAlbum = album;
        previewImage(album, button);
    }

    // title text change with albumname
    let titleText = document.getElementById("Album Title");
    titleText.innerHTML = AlbumName;    
}

// set pic in show area
function showImg(index, container) {
    // change preview photo setting
    currentshowingContainer.classList.remove("selectedPic");
    currentshowingContainer = container;
    currentshowingContainer.classList.add("selectedPic");

    // change show pic
    let show = document.getElementById("show");
    show.innerHTML = ""; // clear images

    let imagem = document.createElement("img");
    imagem.src = currentAlbum[index];
    show.appendChild(imagem);
}

function resetButton(button) {
    currentButton.classList.remove("chosenButton");
    currentButton = button;
    currentButton.classList.add("chosenButton");
}

// enable container to be able to be clicked
function containerClickable(){
    var con0 = document.getElementById("previewContainer0");
    var con1 = document.getElementById("previewContainer1");
    var con2 = document.getElementById("previewContainer2");
    var con3 = document.getElementById("previewContainer3");
    var con4 = document.getElementById("previewContainer4");
    var con5 = document.getElementById("previewContainer5");

    con0.onclick = function() { showImg(0, con0); }
    con1.onclick = function() { showImg(1, con1); }
    con2.onclick = function() { showImg(2, con2); }
    con3.onclick = function() { showImg(3, con3); }
    con4.onclick = function() { showImg(4, con4); }
    con5.onclick = function() { showImg(5, con5); }

    currentshowingContainer = con0;
    currentshowingContainer.classList.add("selectedPic");
}

function warningEmpty() {
    alert('Warning: This album is empty!!');
}

// photo albums
const empty = [];

const cuteCatAlbum = [
    "https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png",
    "https://cdn.pixabay.com/photo/2021/08/24/01/44/cat-6569156_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/06/14/00/14/cat-1455468_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg",
];

const dogs = [
    "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/09/19/12/19/animal-6637774_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/08/18/22/42/australian-shepherd-6556697_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/10/31/14/55/rottweiler-1785760_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/07/09/19/32/dog-838281_960_720.jpg",
];


// decalre albun buttons
let catButton = document.getElementById("catAlbum");
let dogButton = document.getElementById("dogAlbum");
let emptyAlertButton = document.getElementById("emptyAlert");
let emptyAlbumButton = document.getElementById("emptyAlbum");

catButton.onclick = function() { changeAlbum(cuteCatAlbum, catButton, "Album : Cute Cats"); }
dogButton.onclick = function() { changeAlbum(dogs, dogButton, "Album : Doggies"); }
emptyAlertButton.onclick = function() { warningEmpty() };
emptyAlbumButton.onclick = function() { changeAlbum(empty, emptyAlbumButton, "Album : Empty"); }


// start loading page
let currentAlbum = cuteCatAlbum;
let currentButton = catButton;
previewImage(currentAlbum, currentButton);