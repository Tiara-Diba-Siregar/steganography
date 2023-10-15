const dragArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");

let button = document.querySelector(".button");
let input = document.querySelector("#fileInput");

let file;

button.onclick = () => {
  input.click();
};

//when browse
input.addEventListener("change", function () {
  file = this.files[0];
  dragArea.classList.add("active");
  displayFile();
});

// when file is inside the drag area
dragArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragArea.textContent = "Release to Upload";
  dragArea.classList.add("active");
  //console.log("File is inside the drag area");
});

// when file leaves the drag area
dragArea.addEventListener("dragleave", () => {
  dragArea.textContent = "Drag & Drop";
  dragArea.classList.remove("active");
  //console.log("File left the drag area");
});

//when the file is dropped in the drag area
dragArea.addEventListener("drop", (event) => {
  event.preventDefault();

  file = event.dataTransfer.files[0];
  //console.log(file);
  displayFile();
});

function displayFile() {
  let fileType = file.type;
  //console.log(fileType);
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // console.log(fileURL);
      let imgTag = `<img src="${fileURL}" alt="">`;
      dragArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("Ths file is not an image");
    dragArea.classList.remove("active");
  }
  //console.log("The File is dropped in drag area");
}

var imagedatauri;

function readURL(input) {
  var reader = new FileReader();
  reader.onload = function (e) {
    console.log(e.target.result);
    imagedatauri = e.target.result;
    document.querySelector("#image1").src = e.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}

function hideText() {
  document.querySelector("#image2").src = steg.encode(
    document.querySelector("#text").value,
    imagedatauri
  );
}

function decode(input) {
  var reader = new FileReader();
  reader.onload = function (e) {
    document.querySelector("#decoded").innerText = steg.decode(e.target.result);
  };
  reader.readAsDataURL(input.files[0]);
}

let btnDownload = document.querySelector("[data-download]");
let img = document.querySelector("encoded_img");

btnDownload.addEventListener("click", () => {
  let imgPath = img.getAttribute("src");
  let fileName = getFileName(imgPath);

  saveAs(imgPath, fileName);
});

function getFileName(str) {
  return str.substring(str.lastIndexOf("/") + 1);
}
