document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder');

    document.getElementById('project-title').textContent = folder;

    const projectGallery = document.getElementById('project-gallery');

    // Fetch all images from the folder
    fetch(`/paints/${folder}/`)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html");
            const imageElements = htmlDocument.querySelectorAll("a");
            imageElements.forEach(element => {
                const fileName = element.getAttribute("href");
                if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
                    const imgElement = document.createElement('img');
                    imgElement.src = `/paints/${folder}/${fileName}`;
                    imgElement.alt = `${folder} - ${fileName}`;
                    projectGallery.appendChild(imgElement);
                }
            });
        });
});
