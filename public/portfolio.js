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
                callback(firstImage);
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
                if (folderName) {
                    getFirstImage(folderName, (thumbnail) => {
                        if (thumbnail) {
                            const projectElement = document.createElement('div');
                            projectElement.classList.add('portfolio-item');
                            projectElement.innerHTML = `
                                <img src="${thumbnail}" alt="${folderName}">
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
        });
});
