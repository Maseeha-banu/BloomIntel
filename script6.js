document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElement = document.getElementById('year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');

    if (menuToggle && siteNav) {

        menuToggle.addEventListener('click', () => {

            const opened = siteNav.classList.toggle('open');

            menuToggle.innerHTML = opened
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute(
                'aria-expanded',
                String(opened)
            );

        });

    }


    /* =====================================================
       BLOG SEARCH
       ===================================================== */

    const blogSearch = document.getElementById('blogSearch');
    const clearSearch = document.getElementById('clearSearch');
    const blogGrid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');
    const blogCount = document.getElementById('blogCount');

    const blogCards = blogGrid
        ? Array.from(blogGrid.querySelectorAll('.blog-card'))
        : [];

    let activeCategory = 'all';


    const updateBlogResults = () => {

        const searchTerm = blogSearch
            ? blogSearch.value.trim().toLowerCase()
            : '';

        let visibleCount = 0;

        blogCards.forEach((card) => {

            const category =
                card.dataset.category?.toLowerCase() || '';

            const title =
                card.dataset.title?.toLowerCase() || '';

            const keywords =
                card.dataset.keywords?.toLowerCase() || '';

            const description =
                card.querySelector('p')?.textContent
                    .toLowerCase() || '';

            const matchesSearch =
                !searchTerm ||
                title.includes(searchTerm) ||
                keywords.includes(searchTerm) ||
                description.includes(searchTerm) ||
                category.includes(searchTerm);

            const matchesCategory =
                activeCategory === 'all' ||
                category === activeCategory.toLowerCase();

            const shouldShow =
                matchesSearch && matchesCategory;

            card.classList.toggle('hidden', !shouldShow);

            if (shouldShow) {
                visibleCount++;
            }

        });


        if (noResults) {
            noResults.classList.toggle(
                'show',
                visibleCount === 0
            );
        }


        if (blogCount) {
            blogCount.textContent =
                `${visibleCount} ${visibleCount === 1 ? 'article' : 'articles'}`;
        }


        if (clearSearch && blogSearch) {
            clearSearch.classList.toggle(
                'show',
                blogSearch.value.length > 0
            );
        }

    };


    if (blogSearch) {

        blogSearch.addEventListener(
            'input',
            updateBlogResults
        );

    }


    if (clearSearch && blogSearch) {

        clearSearch.addEventListener('click', () => {

            blogSearch.value = '';

            updateBlogResults();

            blogSearch.focus();

        });

    }


    /* =====================================================
       BLOG CATEGORY FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll('.filter-btn');

    filterButtons.forEach((button) => {

        button.addEventListener('click', () => {

            filterButtons.forEach((item) => {
                item.classList.remove('active');
            });

            button.classList.add('active');

            activeCategory =
                button.dataset.category || 'all';

            updateBlogResults();

        });

    });


    /* =====================================================
       SUCCESS STORIES
       ===================================================== */

    const stories = {

        ava: {
            name: 'Ava Thompson',
            role: 'Product Designer',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85',
            quote: 'BloomIntel connected me with a role that matched my passion and growth goals within two weeks.',
            description:
                'I had been searching for a product design role where I could combine creativity with meaningful user experiences. BloomIntel helped me discover an opportunity that matched both my experience and long-term career goals. The process was simple, focused, and much less stressful than my previous job searches.'
        },

        daniel: {
            name: 'Daniel Brooks',
            role: 'Software Engineer',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85',
            quote: 'The job recommendations were accurate, and the application process felt smooth from start to finish.',
            description:
                'As a software engineer, finding the right technical environment was just as important to me as finding a good position. BloomIntel helped me discover opportunities that matched my technical skills and experience. The recommendations saved me time and made the entire process feel much more focused.'
        },

        mina: {
            name: 'Mina Patel',
            role: 'Marketing Specialist',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=85',
            quote: 'I found a remote opportunity that fit my schedule and skills perfectly.',
            description:
                'I was specifically looking for a flexible remote opportunity where I could continue growing in digital marketing. BloomIntel helped me find a position that aligned with my skills, preferred work style, and career direction. It gave me confidence that the right opportunity was actually out there.'
        }

    };


    const storyModal =
        document.getElementById('storyModal');

    const modalClose =
        document.getElementById('modalClose');

    const modalImage =
        document.getElementById('modalImage');

    const modalName =
        document.getElementById('modalName');

    const modalRole =
        document.getElementById('modalRole');

    const modalQuote =
        document.getElementById('modalQuote');

    const modalDescription =
        document.getElementById('modalDescription');


    const openStory = (storyId) => {

        const story = stories[storyId];

        if (!story || !storyModal) return;

        if (modalImage) {
            modalImage.src = story.image;
        }

        if (modalName) {
            modalName.textContent = story.name;
        }

        if (modalRole) {
            modalRole.textContent = story.role;
        }

        if (modalQuote) {
            modalQuote.textContent =
                `"${story.quote}"`;
        }

        if (modalDescription) {
            modalDescription.textContent =
                story.description;
        }

        storyModal.classList.add('show');

        document.body.style.overflow = 'hidden';

    };


    const closeStory = () => {

        if (!storyModal) return;

        storyModal.classList.remove('show');

        document.body.style.overflow = '';

    };


    const storyButtons =
        document.querySelectorAll('.story-read-btn');

    storyButtons.forEach((button) => {

        button.addEventListener('click', () => {

            const storyId =
                button.dataset.storyId;

            openStory(storyId);

        });

    });


    if (modalClose) {

        modalClose.addEventListener(
            'click',
            closeStory
        );

    }


    const storyOverlay =
        document.querySelector('.story-modal-overlay');

    if (storyOverlay) {

        storyOverlay.addEventListener(
            'click',
            closeStory
        );

    }


    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape') {
            closeStory();
        }

    });


    /* =====================================================
       NEWSLETTER
       ===================================================== */

    const newsletterForm =
        document.getElementById('newsletter-form');

    const newsletterMessage =
        document.getElementById('newsletter-message');


    if (newsletterForm && newsletterMessage) {

        newsletterForm.addEventListener(
            'submit',
            (event) => {

                event.preventDefault();

                const input =
                    newsletterForm.querySelector(
                        'input[type="email"]'
                    );

                const email =
                    input?.value.trim() || '';

                if (!email) {

                    newsletterMessage.textContent =
                        'Please enter a valid email address.';

                    return;

                }

                newsletterMessage.textContent =
                    `Thanks! ${email} has been subscribed.`;

                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       INITIAL BLOG RENDER
       ===================================================== */

    updateBlogResults();

});