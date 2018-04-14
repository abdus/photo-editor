'use strict'


let image = document.getElementsByTagName('img')[0];
let uploadImage = document.getElementById('uploadImage');
let sliders = document.querySelectorAll("input[type='range']");
let imageStyle = null;



uploadImage.addEventListener("input", (e) => {
    let file = e.target.files[0]; 

    var reader  = new FileReader();

    reader.addEventListener("load", function () {
      image.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }        
});


for (let i=0; i<sliders.length; i++) {
    sliders[i].addEventListener("input", () => {
        let blur = document.getElementById("blur").value;
        let brightness = document.getElementById("brightness").value;
        let contrast = document.getElementById("contrast").value; 
        let grayscale = document.getElementById("grayscale").value;
        let hue = document.getElementById("hue").value;
        let invert = document.getElementById("invert").value;
        let saturation = document.getElementById("saturation").value;
        let sepia = document.getElementById("sepia").value;
        
        // applying filter [safari and chrome]
        document.getElementById('edited-image').style.WebkitFilter = "blur(" + blur + "px) brightness(" + brightness + ") contrast(" + contrast + ") grayscale(" + grayscale + ") hue-rotate(" + hue + "deg) invert(" + invert + ") saturate(" + saturation +") sepia(" + sepia +")";

        //default 
        document.getElementById('edited-image').style.filter = "blur(" + blur + "px) brightness(" + brightness + ") contrast(" + contrast + ") grayscale(" + grayscale + ") hue-rotate(" + hue + "deg) invert(" + invert + ") saturate(" + saturation +") sepia(" + sepia +")";

        // saving style in env letiable 
        imageStyle = document.getElementById('edited-image').style.filter;

    })
}

let download = document.getElementById('download');


document.getElementById('ready-to-download').addEventListener('click', () => {

    // for converting it to canvas 
    let canvas = document.getElementById('canvas');
        
    // Get a 2D context.
    let ctx = canvas.getContext('2d');

    // create new image object to use as pattern
    let img = new Image();
    img.src = image.src;
    canvas.height = img.height;
    canvas.width = img.width;
    img.onload = () => {
        // Create pattern and don't repeat! 
        let ptrn = ctx.createPattern(img,'no-repeat');
        ctx.fillStyle = ptrn;
        ctx.filter = imageStyle;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        let dataURL = canvas.toDataURL('image/png');
        console.log(dataURL);
        download.href = window.open(dataURL);
    }

    document.getElementById('ready-to-download').style.display = "none";
    document.getElementById('ready').style.display = "inline-block";
})