document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.getElementById('portfolio-container');

    // Function to get a random image from the folder
    function getRandomImage(folder, callback) {
        fetch(`/public/paints/${folder}/`)
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                const imageElements = Array.from(htmlDocument.querySelectorAll("a"));
                const imageFiles = imageElements.map(element => element.getAttribute("href"))
                                                 .filter(fileName => fileName.match(/\.(jpg|jpeg|png|gif)$/));
                if (imageFiles.length > 0) {
                    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
                    const imagePath = `/public/paints/${folder}/${randomImage}`;
                    callback(imagePath);
                } else {
                    console.error(`No images found in folder: ${folder}`);
                    callback(null);
                }
            })
            .catch(error => {
                console.error(`Error fetching images from folder: ${folder}`, error);
                callback(null);
            });
    }

    fetch('/public/paints/')
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html");
            const folderElements = Array.from(htmlDocument.querySelectorAll("a"));
            folderElements.forEach(element => {
                const folderName = element.getAttribute("href").replace('/', '');
                if (folderName && !folderName.includes('.')) { // Ensure it's a folder
                    getRandomImage(folderName, (randomImage) => {
                        if (randomImage) {
                            const projectElement = document.createElement('div');
                            projectElement.classList.add('portfolio-item');
                            projectElement.innerHTML = `
                                <img src="${randomImage}" alt="${folderName}">
                                <p>${folderName}</p>
                            `;
                            projectElement.addEventListener('click', () => {
                                window.location.href = `project.html?folder=${encodeURIComponent(folderName)}`;
                            });
                            portfolioContainer.appendChild(projectElement);
                        } else {
                            console.error(`Could not load image for ${folderName}`);
                        }
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching folders from /public/paints/', error);
        });
});
