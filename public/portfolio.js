document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.getElementById('portfolio-container');

    // Function to get the first image in the folder
    function getFirstImage(folder, callback) {
        fetch(`paints/${folder}/`)
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                const imageElements = htmlDocument.querySelectorAll("a");
                let firstImage = null;
                imageElements.forEach(element => {
                    const fileName = element.getAttribute("href");
                    if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
                        firstImage = `paints/${folder}/${fileName}`;
                        return false; // Break the loop
                    }
                });
                if (firstImage) {
                    console.log(`First image in ${folder}: ${firstImage}`);
                    callback(firstImage);
                } else {
                    console.error(`No images found in folder: ${folder}`);
                }
            })
            .catch(error => {
                console.error(`Error fetching images from folder: ${folder}`, error);
            });
    }

    fetch('/paints/')
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html");
            const folderElements = htmlDocument.querySelectorAll("a");
            folderElements.forEach(element => {
                const folderName = element.getAttribute("href").replace('/', '');
                if (folderName && !folderName.includes('.')) { // Ensure it's a folder
                    getFirstImage(folderName, (thumbnail) => {
                        if (thumbnail) {
                            console.log(`Thumbnail for ${folderName}: ${thumbnail}`);
                            const projectElement = document.createElement('div');
                            projectElement.classList.add('portfolio-item');
                            projectElement.innerHTML = `
                                <img src="${thumbnail}" alt="${folderName}" onerror="this.onerror=null; this.src='default-thumbnail.png'">
                                <p>${folderName}</p>
                            `;
                            projectElement.addEventListener('click', () => {
                                window.location.href = `project.html?folder=${encodeURIComponent(folderName)}`;
                            });
                            portfolioContainer.appendChild(projectElement);
                        }
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching folders from /paints/', error);
        });
});
