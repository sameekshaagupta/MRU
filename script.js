function getFrameSize(form) {
    return parseInt(form.frameSizeForm.value);
}

function getPages(form) {
    return form.pageNumbersForm.value.split(' ').map(Number);;
}

function runMRU(form) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear the content of the output div

    const inputString = getPages(form);
    let x = inputString.length;
    const frameSize = getFrameSize(form); // Set the size of the page frames
    const frames = [];
    let pageFaults = 0;

    function displayFrames() {
        outputDiv.innerHTML += 'Frames: ' + frames.join(' ') + '<br>';
    }

    for (let i = 0; i < inputString.length; i++) {
        const page = inputString[i];

        // Check if the page is already in the frame
        if (frames.includes(page)) {
            displayFrames();
        } else {
            pageFaults++;

            // Check if there is space in the frame
            if (frames.length < frameSize) {
                frames.push(page);
            } else {
                // Find the index of the most recently used page in the frame and replace it
                const lastUsedIndex = frames.map((p, index) => ({ page: p, lastIndex: inputString.lastIndexOf(p, i - 1) })).sort((a, b) => b.lastIndex - a.lastIndex)[0];
                const index = frames.indexOf(lastUsedIndex.page);
                frames[index] = page;
            }

            displayFrames();
        }
    }

    outputDiv.innerHTML += '<br>Total Failure: ' + pageFaults;
    outputDiv.innerHTML += '<br>Total Success: ' + (x - pageFaults);
    outputDiv.innerHTML += '<br>Failure Rate: ' + (((pageFaults / x) * 100).toFixed(2));
    outputDiv.innerHTML += '<br>Success Rate: ' + (((x - pageFaults) / x) * 100).toFixed(2);
    console.log((((x - pageFaults) / x) * 100).toFixed(2));
    console.log(x);
}