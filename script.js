'use strict';
const run = (btn) => {
    const downloadBtn = document.getElementById(btn);
    downloadBtn.addEventListener("click", (event) => {
        event.preventDefault();
        load();
    });
}
run("download-Btn");


const load = () => {
   let counter = 0;
   let downloadBtn = document.getElementById("download-Btn");
   downloadBtn.textContent = `Downloading...`;
    const loadTime = setInterval(() => {
        counter++
        if(counter === 80) {
            downloadBtn.textContent = `Download File`;
            fetchFile();
            clearInterval(loadTime);
            counter = 0;
        }
    }, 60)
}

const fetchFile = () => {
    const linkQuery = document.getElementById("urlInput").value;
    fetch(linkQuery).then(response => {
        return response.blob();
    }).then(file => {
       let tempDownloadLink = URL.createObjectURL(file);
       let downloadLink = document.createElement("a");
       downloadLink.href = tempDownloadLink;
       let filename = prompt("rename your file");
       filename ? downloadLink.download = filename : downloadLink.download = "download_from_file_downloader";
       document.body.appendChild(downloadLink);
       downloadLink.click();
       downloadLink.remove();
    }).catch(err => {
        const error = document.querySelector(".wrong");
        error.textContent = "Error downloading file, Please try again"
    })
}