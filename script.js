const imgContainer = document.getElementById('img-container');
const spin = document.getElementById('spin');
const count = 7;
const Key = 'XlvrSvOaDz82Kp6UUueMu41IdmlrCSkLZCiarOWHepI';
const url = `https://api.unsplash.com/photos/random/?client_id=${Key}&count=${count}`
let totalimages = 0;
let loaded = 0;
let ready = false;
let data = [];
async function getPhotos() {
    try {
        const location = await fetch(url);
        data = await location.json();
        getImg();
    } catch (error) {
        console.log(`An error occured ${error}`);
    }

}
function getImg() {
    totalimages = data.length;
    data.forEach((photo) => {
        console.log(totalimages);
        const a = document.createElement('a');
        a.setAttribute('href', photo.links.html);
        a.setAttribute('target', '_blank');
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('title', photo.alt_description)
        img.setAttribute('alt', photo.alt_description);
        a.appendChild(img);
        img.addEventListener('load', fullyloaded);
        imgContainer.appendChild(a);

    });
}
function fullyloaded() {
   loaded++
   if(totalimages===loaded){
    ready=true;
    spin.hidden=true;
   }
}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 700 && ready === true) {
        ready = false;
        loaded=0;
        getPhotos();

    }
})
getPhotos();