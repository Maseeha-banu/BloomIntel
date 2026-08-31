document.addEventListener('DOMContentLoaded', () => {

    /* ================= YEAR ================= */

    const yearElement = document.getElementById('year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');

    if (menuToggle && siteNav) {

        menuToggle.addEventListener('click', () => {

            const opened = siteNav.classList.toggle('open');

            menuToggle.classList.toggle('open', opened);

            menuToggle.setAttribute(
                'aria-expanded',
                String(opened)
            );

        });


        /* Close menu after clicking a navigation link */

        siteNav.querySelectorAll('a').forEach((link) => {

            link.addEventListener('click', () => {

                siteNav.classList.remove('open');
                menuToggle.classList.remove('open');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

            });

        });

    }


    /* ================= CONTACT FORM ================= */

    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');

    if (contactForm && contactMessage) {

        contactForm.addEventListener('submit', async (event) => {

            event.preventDefault();

            const formData = new FormData(contactForm);

            const name = formData.get('name')?.toString().trim() || '';
            const email = formData.get('email')?.toString().trim() || '';
            const phone = formData.get('phone')?.toString().trim() || '';
            const subject = formData.get('subject')?.toString().trim() || '';
            const message = formData.get('message')?.toString().trim() || '';


            /* Basic validation */

            if (!name || !email || !subject || !message) {

                contactMessage.textContent =
                    'Please fill in all required fields.';

                return;
            }


            /* Try Firebase if the existing Firebase setup is available */

            const firebaseConfig =
                window.BLOOMINTEL_FIREBASE_CONFIG || {};

            const hasFirebase =
                typeof window.firebase !== 'undefined' &&
                window.firebase.apps &&
                window.firebase.apps.length > 0;


            if (
                hasFirebase &&
                firebaseConfig.projectId &&
                firebaseConfig.projectId !== 'YOUR_PROJECT_ID'
            ) {

                try {

                    const firebaseApp =
                        window.firebase.app();

                    const db =
                        window.firebase.firestore(firebaseApp);


                    await db.collection('customers').add({

                        name,
                        email,
                        phone,
                        subject,
                        message,

                        createdAt:
                            new Date().toISOString()

                    });


                    contactMessage.textContent =
                        'Thanks for reaching out! Your message has been sent successfully.';

                    contactForm.reset();

                    return;

                } catch (error) {

                    console.warn(
                        'Firebase contact submission failed:',
                        error
                    );

                }

            }


            /* Local fallback */

            const LOCAL_CONTACT_KEY =
                'bloomintel-local-customers';

            try {

                const saved =
                    JSON.parse(
                        localStorage.getItem(LOCAL_CONTACT_KEY) || '[]'
                    );

                const contacts =
                    Array.isArray(saved) ? saved : [];


                contacts.unshift({

                    id: Date.now().toString(),

                    name,
                    email,
                    phone,
                    subject,
                    message,

                    createdAt:
                        new Date().toISOString()

                });


                localStorage.setItem(
                    LOCAL_CONTACT_KEY,
                    JSON.stringify(contacts)
                );


                contactMessage.textContent =
                    'Thanks for reaching out! Your message has been saved successfully.';

                contactForm.reset();

            } catch (error) {

                console.error(error);

                contactMessage.textContent =
                    'Unable to send your message right now. Please try again.';

            }

        });

    }


    /* ================= BACK TO TOP ================= */

    const backToTop =
        document.getElementById('backToTop');


    if (backToTop) {

        const updateBackToTop =
            () => {

                if (window.scrollY > 500) {

                    backToTop.classList.add('show');

                } else {

                    backToTop.classList.remove('show');

                }

            };


        window.addEventListener(
            'scroll',
            updateBackToTop
        );


        backToTop.addEventListener(
            'click',
            () => {

                window.scrollTo({

                    top: 0,
                    behavior: 'smooth'

                });

            }
        );


        updateBackToTop();

    }

});