const transformImage = (element) => {
    for (let i = 0; i < element.files.length; i++) {
        const file = element.files[i];
        const reader = new FileReader();
        reader.onloadend = function () {
            console.log(`RESULT for file ${i + 1}`, reader.result);
            const fileBinary = reader.result;

            axios
                .post('https://grxe35576l.execute-api.us-east-1.amazonaws.com/dev/imageTransform', fileBinary)
                .then(response => {
                    console.log('Server Response: ', response)
                    const imageElement = document.createElement('IMG');
                    imageElement.src = response.data;
                    document.getElementById('output').appendChild(imageElement);
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });


        }
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            const imageElement = document.createElement('IMG');
            imageElement.src = URL.createObjectURL(file);
            document.getElementById('input').appendChild(imageElement);
        };
    }
}

const reset = () => {
    console.log("reset");

    let inputNode = document.getElementById('input');
    inputNode.innerHTML = "";
    // while (inputNode.firstChild) {
    //     inputNode.removeChild(inputNode.firstChild);
    // }

    let outputNode = document.getElementById('output');
    outputNode.innerHTML = "";

    // while (outputNode.firstChild) {
    //     inputNode.removeChild(outputNode.firstChild);
    // }

    window.location.reload();
}