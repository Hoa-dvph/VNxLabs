function showContent(contentId) {
    document.querySelectorAll('.service-content').forEach(content => {
        content.classList.add('hidden');
    });

    document.getElementById(contentId).classList.remove('hidden');
}

document.querySelectorAll('.sidebar-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); 

        const targetContent = button.getAttribute('data-target'); 
        showContent(targetContent); 
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const filterBtn = document.getElementById('filterBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const gridContainer = document.querySelector('.grid-container');
    const header = document.querySelector('.header');

    function toggleSidebar() {
        const isSidebarOpen = sidebar.classList.contains('show');
        sidebar.classList.toggle('show');
        mainContent.classList.toggle('shifted');
        updateGridColumns(!isSidebarOpen);
        toggleFilterButtonVisibility(!isSidebarOpen);
    }

    function updateGridColumns(isSidebarOpen) {
        if (isSidebarOpen) {
            gridContainer.classList.remove('lg:grid-cols-4');
            gridContainer.classList.add('lg:grid-cols-3');
        } else {
            gridContainer.classList.remove('lg:grid-cols-3');
            gridContainer.classList.add('lg:grid-cols-4');
        }
    }

    function toggleFilterButtonVisibility(isSidebarOpen) {
        if (isSidebarOpen) {
            filterBtn.style.display = 'none';
        } else {
            filterBtn.style.display = 'flex';
        }
    }

    filterBtn.addEventListener('click', toggleSidebar);

    closeSidebar.addEventListener('click', function () {
        toggleSidebar();
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            header.classList.add('fixed-header');
        } else {
            header.classList.remove('fixed-header');
        }
    });

    document.querySelectorAll('.author-name').forEach(authorName => {
        authorName.addEventListener('mouseenter', function () {
            const authorCard = this.nextElementSibling;

            authorCard.style.display = 'block';

            const rect = this.getBoundingClientRect();
            const cardRect = authorCard.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if (rect.bottom + cardRect.height > windowHeight) {
                authorCard.style.top = `-${cardRect.height + 10}px`;
                authorCard.style.bottom = 'auto';
            } else {
                authorCard.style.top = `${rect.height + 10}px`;
                authorCard.style.bottom = 'auto';
            }

            if (rect.right + cardRect.width > windowWidth) {
                authorCard.style.left = 'auto';
                authorCard.style.right = '0';
            } else {
                authorCard.style.left = '0';
                authorCard.style.right = 'auto';
            }
        });

        authorName.addEventListener('mouseleave', function () {
            const authorCard = this.nextElementSibling;

            authorCard.style.display = 'none';
        });
    });
});
