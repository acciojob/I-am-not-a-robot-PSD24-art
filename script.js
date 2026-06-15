let reset = document.getElementById("reset");
let verify = document.getElementById("verify");
let h = document.getElementById("h");
let innerDiv1 = document.getElementById("innerDiv1");
let innerDiv2 = document.getElementById("innerDiv2");

let arr = [
  "https://picsum.photos",
  "https://picsum.photos",
  "https://picsum.photos", // Duplicate for human verification
  "https://picsum.photos",
  "https://picsum.photos",
  "https://picsum.photos",
];

// Map the index of the 'arr' array to its matching CSS class name
const classMap = {
  0: "img1",
  1: "img2",
  2: "img2", // Second identical image maps to img2 as well
  3: "img3",
  4: "img4",
  5: "img5"
};

let imageIdxArr = [];
let clickedImage = [];
let clickedImgCount = 0;

window.onload = () => {
  addImages();
};

// Create images
function createImage(i) {
  let image = document.createElement("img");
  let originalIdx = imageIdxArr[i];

  // Set the image source
  image.src = arr[originalIdx];

  // Add the class name so Cypress can find it (e.g., .img1, .img2)
  image.classList.add(classMap[originalIdx]);

  // Click listener
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

function reloadImages() {
  innerDiv1.querySelectorAll("img").forEach((childDiv) => childDiv.remove());
  innerDiv2.querySelectorAll("img").forEach((childDiv) => childDiv.remove());
  addImages();
  clickedImage = [];
  clickedImgCount = 0;
  reset.style.display = "none";
  verify.style.display = "none";
}

verify.addEventListener("click", () => {
  console.log("Verify clicked");
  if (clickedImage[0] === clickedImage[1]) {
    alert("You are a human. Congratulations!");
  } else {
    alert("We can't verify you as a human. You selected the non-identical tiles.");
  }

  clickedImage = [];
  clickedImgCount = 0;
  reloadImages();
});
