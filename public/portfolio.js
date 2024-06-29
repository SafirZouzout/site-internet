document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.getElementById('portfolio-container');

    const projects = [
        {
            folder: 'Émotions animées',
            title: 'Émotions animées',
            description: 'Ici les émotions prennent la dimension du plan matérielle avec lequel nous les ressentons et les exprimons pour palier aux failles du langage et renforcer notre communication picturale.'
        },
        {
            folder: 'Abstracswag',
            title: 'AbstracSwag',
            description: 'Etre ou ne pas être, telle est l\'abswagction.'
        },
        {
            folder: 'Portraits d\'êtres vivants du Quotidien',
            title: 'Portraits d\'êtres vivants du Quotidien',
            description: 'L\'univers et multiple, plein de personnalité qui communiquent et ne font qu\'un par la diversité et les liens qu\'elles tissent. Voici leur histoire.'
        },
        {
            folder: 'Éléments de peinture naturaliste',
            title: 'Éléments de peinture naturaliste',
            description: 'Travail d\'archivage des paysages de notre époque à l\'aide de techniques très précises de reproduction par le dessin afin de donner une idée d\'à quoi ressemblait notre belle planète aux générations futures qui ne connaitront plus l\'apparence de l\'herbe verte.'
        }
    ];

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('portfolio-item');

        const thumbnail = `${project.folder}/thumbnail.png`;
        projectElement.innerHTML = `
            <img src="${thumbnail}" alt="${project.title}">
            <p>${project.title}</p>
        `;

        projectElement.addEventListener('click', () => {
            window.location.href = `project.html?folder=${encodeURIComponent(project.folder)}`;
        });

        portfolioContainer.appendChild(projectElement);
    });
});
