document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder');

    const projectDetails = {
        'Émotions Animées': {
            title: 'Émotions animées',
            description: 'Ici les émotions prennent la dimension du plan matérielle avec lequel nous les ressentons et les exprimons pour palier aux failles du langage et renforcer notre communication picturale.'
        },
        'Abstracswag': {
            title: 'AbstracSwag',
            description: 'Etre ou ne pas être, telle est l\'abswagction.'
        },
        'Portraits d\'êtres vivants du Quotidien': {
            title: 'Portraits d\'êtres vivants du Quotidien',
            description: "L'univers et multiple, plein de personnalité qui communiquent et ne font qu'un par la diversité et les liens qu'elles tissent. Voici leur histoire."
        },
        'Éléments de peinture naturaliste': {
            title: 'Éléments de peinture naturaliste',
            description: "Travail d'archivage des paysages de notre époque à l'aide de techniques très précises de reproduction par le dessin afin de donner une idée d'à quoi ressemblait notre belle planète aux générations futures qui ne connaitront plus l'apparence de l'herbe verte."
        }
    };

    const project = projectDetails[folder];

    if (project) {
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').textContent = project.description;

        const projectGallery = document.getElementById('project-gallery');
        
        fetch(`/${folder}/`)
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                const imageElements = htmlDocument.querySelectorAll("a");
                imageElements.forEach(element => {
                    const fileName = element.getAttribute("href");
                    if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
                        const imgElement = document.createElement('img');
                        imgElement.src = `/${folder}/${fileName}`;
                        imgElement.alt = `${project.title} - ${fileName}`;
                        projectGallery.appendChild(imgElement);
                    }
                });
            });
    } else {
        document.getElementById('project-info').textContent = 'Projet non trouvé.';
    }
});
