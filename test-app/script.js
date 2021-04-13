
// function updateSize() {
//     let nBytes = 0,
//         oFiles = this.files,
//         nFiles = oFiles.length;
//     for (let nFileId = 0; nFileId < nFiles; nFileId++) {
//         nBytes += oFiles[nFileId].size;
//     }
//     let sOutput = nBytes + " bytes";
//     // optional code for multiples approximation
//     const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
//     for (nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
//         sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
//     }
//     // end of optional code
//     document.getElementById("fileNum").innerHTML = nFiles;
//     document.getElementById("fileSize").innerHTML = sOutput;
// }

// const encodeImageFileAsURL = (element) => {
//     const file = element.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//         console.log('RESULT', reader.result)
//     }
//     reader.readAsDataURL(file);
// }

const encodeImage = (element) => {
    for (let i = 0; i < element.files.length; i++) {
        const file = element.files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(`RESULT for file ${i + 1}`, reader.result);
        }
        reader.readAsDataURL(file);

        // const image = document.getElementById('input');
        // image.src = URL.createObjectURL(file);

        reader.onload = function (event) {
            document.getElementById('input').src = event.target.result;
        };
    }
}

// document.getElementById("uploadInput").addEventListener("change", updateSize, false);