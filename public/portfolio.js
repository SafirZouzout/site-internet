document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.getElementById('portfolio-container');

    fetch('/paints/')
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html");
            const folderElements = htmlDocument.querySelectorAll("a");
            folderElements.forEach(element => {
                const folderName = element.getAttribute("href").replace('/', '');
                if (folderName) {
                    const projectElement = document.createElement('div');
                    projectElement.classList.add('portfolio-item');
                    
                    const thumbnail = `/paints/${folderName}/image1.png`;
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
        });
});
