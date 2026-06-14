//your code here
let reset = document.getElementById("reset");
let verify = document.getElementById("verify");
let h = document.getElementById("h");
let innerDiv1 = document.getElementById("innerDiv1");
let innerDiv2 = document.getElementById("innerDiv2");
let arr = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];
let imageIdxArr = [];

window.onload = () => {
  addImages();
};

let clickedImage = [];
let clickedImgCount = 0;
//Create images
function createImage(i) {
  let image = document.createElement("img");
  image.src = arr[imageIdxArr[i]];

  //click listener
  image.addEventListener("click", () => {
    if (clickedImage.length < 3) {
      clickedImage.push(image.src);
    }

    console.log(image.src);
    clickedImgCount++;

    if (clickedImage.length > 1) {
      verify.style.display = "block";
    }

    if (clickedImgCount > 0) {
      reset.style.display = "block";
    } else {
      reset.style.display = "none";
    }

    if (clickedImgCount < 3) {
      image.classList.add("imgClick");
    }
  });

  if (i < 3) {
    innerDiv1.appendChild(image);
  } else {
    innerDiv2.appendChild(image);
  }
}

function addImages() {
  while (imageIdxArr.length < 6) {
    let idx = Math.floor(Math.random() * 6);
    if (!imageIdxArr.includes(idx)) {
      imageIdxArr.push(idx);
    }
  }
  for (let i = 0; i < 6; i++) {
    createImage(i);
  }
  imageIdxArr = [];
}

// debugger;
function reloadImages() {
  innerDiv1.querySelectorAll("img").forEach((childDiv) => childDiv.remove());
  innerDiv2.querySelectorAll("img").forEach((childDiv) => childDiv.remove());
  addImages();
  clickedImage = [];
  clickedImgCount = 0;
}

verify.addEventListener("click", () => {
  console.log("Verify clicked");
  if (clickedImage[0] === clickedImage[1]) {
    h.innerText = "You are a human. Congratulations!";
  } else {
    h.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  clickedImage = [];
  clickedImgCount = 0;
  reloadImages();
  setTimeout(() => {
    h.innerText =
      "Please click on the identical tiles to verify that you are not a robot.";
  }, 3000);
});
