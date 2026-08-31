/* =========================================================
   BLOOMINTEL ADMIN DASHBOARD
   script7.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC HELPERS
       ===================================================== */

    const escapeHtml = (value = "") => {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    };


    /* =====================================================
       LOCAL STORAGE
       ===================================================== */

    const LOCAL_CUSTOMERS_KEY = "bloomintel-local-customers";
    const LOCAL_APPLICATIONS_KEY = "bloomintel-local-applications";

    const getLocalCustomers = () => {
        try {
            const saved = JSON.parse(
                localStorage.getItem(LOCAL_CUSTOMERS_KEY) || "[]"
            );

            return Array.isArray(saved) ? saved : [];
        } catch (error) {
            return [];
        }
    };


    const saveLocalCustomers = (customers) => {
        try {
            localStorage.setItem(
                LOCAL_CUSTOMERS_KEY,
                JSON.stringify(customers)
            );
        } catch (error) {
            console.warn("Could not save local customer records.", error);
        }
    };


    const getLocalApplications = () => {
        try {
            const saved = JSON.parse(
                localStorage.getItem(LOCAL_APPLICATIONS_KEY) || "[]"
            );

            return Array.isArray(saved) ? saved : [];
        } catch (error) {
            return [];
        }
    };


    const saveLocalApplications = (applications) => {
        try {
            localStorage.setItem(
                LOCAL_APPLICATIONS_KEY,
                JSON.stringify(applications)
            );
        } catch (error) {
            console.warn("Could not save local application records.", error);
        }
    };


    /* =====================================================
       FIREBASE CONFIGURATION
       ===================================================== */

    const firebaseConfig =
        window.BLOOMINTEL_FIREBASE_CONFIG || {};

    const ownerEmails =
        window.BLOOMINTEL_OWNER_EMAILS || [
            "owner@bloomintel.com"
        ];

    const hasFirebaseSdk =
        typeof window.firebase !== "undefined" &&
        typeof window.firebase.initializeApp === "function";

    let db = null;
    let auth = null;


    if (hasFirebaseSdk) {

        try {

            const firebaseApp =
                window.firebase.apps.length
                    ? window.firebase.app()
                    : window.firebase.initializeApp(firebaseConfig);

            if (typeof window.firebase.auth === "function") {
                auth = window.firebase.auth(firebaseApp);
            }

            if (typeof window.firebase.firestore === "function") {
                db = window.firebase.firestore(firebaseApp);
            }

        } catch (error) {
            console.warn(
                "Firebase initialization failed.",
                error
            );
        }
    }


    const isFirebaseConfigured = () => {

        return Boolean(
            firebaseConfig &&
            firebaseConfig.projectId &&
            firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
            db &&
            auth
        );

    };


    const isFirestoreConfigured = () => {

        return Boolean(
            firebaseConfig &&
            firebaseConfig.projectId &&
            firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
            db
        );

    };


    /* =====================================================
       ADMIN ELEMENTS
       ===================================================== */

    const adminLoginForm =
        document.getElementById("adminLoginForm");

    const adminLock =
        document.getElementById("adminLock");

    const adminDashboard =
        document.getElementById("adminDashboard");

    const adminLoginMessage =
        document.getElementById("adminLoginMessage");

    const logoutAdminButton =
        document.getElementById("logoutAdmin");


    /* =====================================================
       DASHBOARD ELEMENTS
       ===================================================== */

    const applicationCountElement =
        document.getElementById("applicationCount");

    const customerCountElement =
        document.getElementById("customerCount");

    const savedApplicationsCount =
        document.getElementById("savedApplicationsCount");

    const savedMessagesCount =
        document.getElementById("savedMessagesCount");

    const blogCount =
        document.getElementById("blogCount");

    const applicationTableBody =
        document.getElementById("applicationTableBody");

    const customerTableBody =
        document.getElementById("customerTableBody");

    const blogList =
        document.getElementById("blogList");


    /* =====================================================
       ADMIN VISIBILITY
       ===================================================== */

    const setAdminVisibility = (isAuthenticated) => {

        if (adminLock) {
            adminLock.classList.toggle(
                "hidden",
                isAuthenticated
            );
        }

        if (adminDashboard) {
            adminDashboard.classList.toggle(
                "hidden",
                !isAuthenticated
            );
        }

    };


    /* =====================================================
       APPLICATION TABLE
       ===================================================== */

    const renderApplicationRows = (applications) => {

        if (!applicationTableBody) return;

        if (!applications.length) {

            applicationTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        No application records yet.
                    </td>
                </tr>
            `;

            return;
        }


        applicationTableBody.innerHTML =
            applications.map((application) => {

                const date = application.createdAt
                    ? new Date(
                        application.createdAt
                    ).toLocaleString()
                    : "—";


                return `
                    <tr>

                        <td data-label="Name">
                            ${escapeHtml(
                                application.name || "Unknown"
                            )}
                        </td>

                        <td data-label="Email">
                            ${escapeHtml(
                                application.email ||
                                application.phone ||
                                "No contact"
                            )}
                        </td>

                        <td data-label="Phone">
                            ${escapeHtml(
                                application.phone ||
                                "No phone"
                            )}
                        </td>

                        <td data-label="Category">
                            ${escapeHtml(
                                application.category ||
                                "General"
                            )}
                        </td>

                        <td data-label="Experience / Skills">
                            ${escapeHtml(
                                `${application.experience || ""} • ${
                                    application.skills || ""
                                }`.trim() ||
                                "No details"
                            )}
                        </td>

                        <td data-label="Date">
                            ${escapeHtml(date)}
                        </td>

                        <td data-label="Actions">

                            <button
                                type="button"
                                class="view-btn"
                                data-id="${escapeHtml(application.id || "")}"
                                data-record="application">
                                View
                            </button>

                            <button
                                type="button"
                                class="delete-btn"
                                data-id="${escapeHtml(application.id || "")}"
                                data-record="application">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            }).join("");

    };


    /* =====================================================
       CUSTOMER TABLE
       ===================================================== */

    const renderCustomerRows = (customers) => {

        if (!customerTableBody) return;

        if (!customers.length) {

            customerTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        No customer records yet.
                    </td>
                </tr>
            `;

            return;
        }


        customerTableBody.innerHTML =
            customers.map((customer) => {

                const date = customer.createdAt
                    ? new Date(
                        customer.createdAt
                    ).toLocaleString()
                    : "—";


                return `
                    <tr>

                        <td data-label="Name">
                            ${escapeHtml(
                                customer.name ||
                                "Unknown"
                            )}
                        </td>

                        <td data-label="Email">
                            ${escapeHtml(
                                customer.email ||
                                customer.phone ||
                                "No contact"
                            )}
                        </td>

                        <td data-label="Message / Skills">
                            ${escapeHtml(
                                customer.skills ||
                                customer.message ||
                                ""
                            )}
                        </td>

                        <td data-label="Date">
                            ${escapeHtml(date)}
                        </td>

                        <td data-label="Actions">

                            <button
                                type="button"
                                class="view-btn"
                                data-id="${escapeHtml(customer.id || "")}"
                                data-record="message">
                                View
                            </button>

                            <button
                                type="button"
                                class="delete-btn"
                                data-id="${escapeHtml(customer.id || "")}"
                                data-record="message">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            }).join("");

    };


    /* =====================================================
       BLOG FORM ELEMENTS
       ===================================================== */

    const blogForm =
        document.getElementById("blogForm");

    const blogMessage =
        document.getElementById("blogMessage");

    const blogIdInput =
        document.getElementById("blogId");

    const blogTitleInput =
        document.getElementById("blogTitle");

    const blogAuthorInput =
        document.getElementById("blogAuthor");

    const blogExcerptInput =
        document.getElementById("blogExcerpt");

    const blogContentInput =
        document.getElementById("blogContent");

    const cancelBlogEditButton =
        document.getElementById("cancelBlogEdit");


    /* =====================================================
       BLOG RENDER
       ===================================================== */

    const renderBlogs = (blogs) => {

        if (!blogList) return;

        if (!blogs.length) {

            blogList.innerHTML = `
                <p class="empty-state">
                    No blog posts yet.
                </p>
            `;

            return;
        }


        blogList.innerHTML =
            blogs.map((blog) => {

                const date = blog.createdAt
                    ? new Date(
                        blog.createdAt
                    ).toLocaleDateString()
                    : "—";


                return `
                    <article class="blog-item">

                        <div class="blog-item-content">

                            <h4>
                                ${escapeHtml(
                                    blog.title ||
                                    "Untitled Blog"
                                )}
                            </h4>

                            <p>
                                ${escapeHtml(
                                    blog.excerpt ||
                                    blog.content ||
                                    ""
                                )}
                            </p>

                            <small>
                                By
                                ${escapeHtml(
                                    blog.author ||
                                    "BloomIntel"
                                )}
                                •
                                ${escapeHtml(date)}
                            </small>

                        </div>


                        <div class="blog-actions">

                            <button
                                type="button"
                                data-action="edit"
                                data-id="${escapeHtml(blog.id || "")}">
                                Edit
                            </button>

                            <button
                                type="button"
                                data-action="delete"
                                data-id="${escapeHtml(blog.id || "")}"
                                class="danger-btn">
                                Delete
                            </button>

                        </div>

                    </article>
                `;

            }).join("");

    };


    /* =====================================================
       LOAD ADMIN DASHBOARD
       ===================================================== */

    const renderAdminDashboard = async () => {

        try {

            const token =
                sessionStorage.getItem(
                    "bloomintel-owner-token"
                );


            /* ---------------------------------------------
               SERVER API
               --------------------------------------------- */

            if (
                token &&
                token !== "owner" &&
                token !== "firebase"
            ) {

                try {

                    const response =
                        await fetch(
                            "/api/admin/dashboard",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );


                    if (response.ok) {

                        const body =
                            await response.json();


                        const applications =
                            Array.isArray(
                                body.applications
                            )
                                ? body.applications
                                : [];


                        const messages =
                            Array.isArray(
                                body.messages
                            )
                                ? body.messages
                                : Array.isArray(
                                    body.customers
                                )
                                    ? body.customers
                                    : [];


                        const blogs =
                            Array.isArray(
                                body.blogs
                            )
                                ? body.blogs
                                : [];


                        updateDashboardCounts(
                            applications,
                            messages,
                            blogs
                        );


                        renderApplicationRows(
                            applications
                        );


                        renderCustomerRows(
                            messages
                        );


                        renderBlogs(blogs);

                        return;
                    }

                } catch (error) {

                    console.warn(
                        "Server dashboard unavailable.",
                        error
                    );

                }
            }


            /* ---------------------------------------------
               LOCAL STORAGE FALLBACK
               --------------------------------------------- */

            const localApplications =
                getLocalApplications();

            const localCustomers =
                getLocalCustomers();


            if (
                localApplications.length ||
                localCustomers.length
            ) {

                updateDashboardCounts(
                    localApplications,
                    localCustomers,
                    []
                );


                renderApplicationRows(
                    localApplications
                );


                renderCustomerRows(
                    localCustomers
                );


                renderBlogs([]);

                return;
            }


            /* ---------------------------------------------
               FIREBASE
               --------------------------------------------- */

            if (!isFirebaseConfigured()) {

                updateDashboardCounts([], [], []);

                renderApplicationRows([]);

                renderCustomerRows([]);

                renderBlogs([]);

                return;
            }


            const [
                applicationsSnapshot,
                customersSnapshot,
                blogsSnapshot
            ] = await Promise.all([

                db
                    .collection("applications")
                    .orderBy(
                        "createdAt",
                        "desc"
                    )
                    .get(),

                db
                    .collection("customers")
                    .orderBy(
                        "createdAt",
                        "desc"
                    )
                    .get(),

                db
                    .collection("blogs")
                    .orderBy(
                        "createdAt",
                        "desc"
                    )
                    .get()

            ]);


            const applications =
                applicationsSnapshot.docs.map(
                    (doc) => ({
                        id: doc.id,
                        ...doc.data()
                    })
                );


            const customers =
                customersSnapshot.docs.map(
                    (doc) => ({
                        id: doc.id,
                        ...doc.data()
                    })
                );


            const blogs =
                blogsSnapshot.docs.map(
                    (doc) => ({
                        id: doc.id,
                        ...doc.data()
                    })
                );


            updateDashboardCounts(
                applications,
                customers,
                blogs
            );


            renderApplicationRows(
                applications
            );


            renderCustomerRows(
                customers
            );


            renderBlogs(blogs);


        } catch (error) {

            console.error(
                "Unable to load admin dashboard.",
                error
            );

            if (blogList) {
                blogList.innerHTML = `
                    <p class="empty-state">
                        Unable to load admin data.
                    </p>
                `;
            }

        }

    };


    /* =====================================================
       DASHBOARD COUNTERS
       ===================================================== */

    const updateDashboardCounts = (
        applications,
        customers,
        blogs
    ) => {

        if (applicationCountElement) {

            applicationCountElement.textContent =
                `${applications.length} records`;

        }


        if (savedApplicationsCount) {

            savedApplicationsCount.textContent =
                applications.length;

        }


        if (customerCountElement) {

            customerCountElement.textContent =
                `${customers.length} records`;

        }


        if (savedMessagesCount) {

            savedMessagesCount.textContent =
                customers.length;

        }


        if (blogCount) {

            blogCount.textContent =
                blogs.length;

        }

    };


    /* =====================================================
       ADMIN LOGIN
       ===================================================== */

    if (adminLoginForm) {

        const savedToken =
            sessionStorage.getItem(
                "bloomintel-owner-token"
            );


        setAdminVisibility(
            Boolean(savedToken)
        );


        if (savedToken) {
            renderAdminDashboard();
        }


        adminLoginForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const email =
                    document
                        .getElementById("adminEmail")
                        ?.value
                        .trim() || "";


                const password =
                    document
                        .getElementById("adminPassword")
                        ?.value
                        .trim() || "";


                if (adminLoginMessage) {
                    adminLoginMessage.textContent =
                        "Signing in...";
                }


                if (!email || !password) {

                    if (adminLoginMessage) {

                        adminLoginMessage.textContent =
                            "Please enter both email and password.";

                    }

                    return;
                }


                /* -----------------------------------------
                   SERVER LOGIN
                   ----------------------------------------- */

                try {

                    const response =
                        await fetch(
                            "/api/admin/login",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },
                                body: JSON.stringify({
                                    email,
                                    password
                                })
                            }
                        );


                    if (response.ok) {

                        const body =
                            await response.json();


                        const token =
                            body.token;


                        sessionStorage.setItem(
                            "bloomintel-owner-token",
                            token || "owner"
                        );


                        setAdminVisibility(true);

                        renderAdminDashboard();


                        if (adminLoginMessage) {

                            adminLoginMessage.textContent =
                                "Welcome back, owner.";

                        }

                        return;
                    }

                } catch (error) {

                    console.warn(
                        "Server login unavailable.",
                        error
                    );

                }


                /* -----------------------------------------
                   FIREBASE LOGIN
                   ----------------------------------------- */

                if (
                    isFirebaseConfigured() &&
                    auth
                ) {

                    try {

                        const userCredential =
                            await auth
                                .signInWithEmailAndPassword(
                                    email,
                                    password
                                );


                        const user =
                            userCredential.user;


                        const userEmail =
                            user?.email
                                ? user.email.toLowerCase()
                                : "";


                        const authorized =
                            ownerEmails
                                .map(
                                    (item) =>
                                        item.toLowerCase()
                                )
                                .includes(userEmail);


                        if (authorized) {

                            sessionStorage.setItem(
                                "bloomintel-owner-token",
                                "firebase"
                            );


                            setAdminVisibility(true);

                            renderAdminDashboard();


                            if (adminLoginMessage) {

                                adminLoginMessage.textContent =
                                    "Signed in with Firebase.";

                            }

                            return;
                        }


                        await auth.signOut();


                        if (adminLoginMessage) {

                            adminLoginMessage.textContent =
                                "This account is not authorized as owner.";

                        }

                        return;

                    } catch (error) {

                        console.warn(
                            "Firebase login failed.",
                            error
                        );

                    }

                }


                /* -----------------------------------------
                   LOCAL FALLBACK
                   ----------------------------------------- */

                const acceptedOwnerEmails = [
                    "owner@bloomintel.com",
                    "careers@bloomintel.in"
                ];


                const localPassword =
                    "BloomIntel2026";


                if (
                    acceptedOwnerEmails.includes(
                        email.toLowerCase()
                    ) &&
                    password === localPassword
                ) {

                    sessionStorage.setItem(
                        "bloomintel-owner-token",
                        "owner"
                    );


                    setAdminVisibility(true);

                    renderAdminDashboard();


                    if (adminLoginMessage) {

                        adminLoginMessage.textContent =
                            "Welcome back, owner.";

                    }

                } else {

                    if (adminLoginMessage) {

                        adminLoginMessage.textContent =
                            "Access denied. Invalid owner credentials.";

                    }

                }

            }
        );

    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    if (logoutAdminButton) {

        logoutAdminButton.addEventListener(
            "click",
            async () => {

                try {

                    if (auth) {
                        await auth.signOut();
                    }

                } catch (error) {
                    console.warn(error);
                }


                sessionStorage.removeItem(
                    "bloomintel-owner-token"
                );


                setAdminVisibility(false);


                if (adminLoginMessage) {

                    adminLoginMessage.textContent =
                        "You are logged out.";

                }


                if (adminLoginForm) {
                    adminLoginForm.reset();
                }

            }
        );

    }


    /* =====================================================
       APPLICATION VIEW / DELETE
       ===================================================== */

    if (applicationTableBody) {

        applicationTableBody.addEventListener(
            "click",
            async (event) => {

                const viewButton =
                    event.target.closest(
                        ".view-btn"
                    );


                const deleteButton =
                    event.target.closest(
                        ".delete-btn"
                    );


                if (
                    !viewButton &&
                    !deleteButton
                ) {
                    return;
                }


                const button =
                    viewButton ||
                    deleteButton;


                const id =
                    button.dataset.id;


                /* -----------------------------------------
                   VIEW
                   ----------------------------------------- */

                if (viewButton) {

                    try {

                        const token =
                            sessionStorage.getItem(
                                "bloomintel-owner-token"
                            );


                        if (
                            token &&
                            token !== "owner" &&
                            token !== "firebase"
                        ) {

                            const response =
                                await fetch(
                                    "/api/admin/dashboard",
                                    {
                                        headers: {
                                            Authorization:
                                                `Bearer ${token}`
                                        }
                                    }
                                );


                            if (response.ok) {

                                const body =
                                    await response.json();


                                const application =
                                    (
                                        body.applications ||
                                        []
                                    ).find(
                                        item =>
                                            String(item.id) ===
                                            String(id)
                                    );


                                if (application) {

                                    showRecordModal(
                                        "Application Details",
                                        application
                                    );

                                    return;
                                }

                            }

                        }


                        if (isFirebaseConfigured()) {

                            const doc =
                                await db
                                    .collection(
                                        "applications"
                                    )
                                    .doc(id)
                                    .get();


                            if (
                                doc &&
                                doc.exists
                            ) {

                                showRecordModal(
                                    "Application Details",
                                    {
                                        id: doc.id,
                                        ...doc.data()
                                    }
                                );

                                return;
                            }

                        }


                        const local =
                            getLocalApplications()
                                .find(
                                    item =>
                                        String(item.id) ===
                                        String(id)
                                );


                        if (local) {

                            showRecordModal(
                                "Application Details",
                                local
                            );

                            return;
                        }


                        alert(
                            "Application details not found."
                        );

                    } catch (error) {

                        alert(
                            error.message ||
                            "Unable to load details."
                        );

                    }

                }


                /* -----------------------------------------
                   DELETE
                   ----------------------------------------- */

                if (deleteButton) {

                    if (
                        !confirm(
                            "Delete this application record?"
                        )
                    ) {
                        return;
                    }


                    try {

                        const token =
                            sessionStorage.getItem(
                                "bloomintel-owner-token"
                            );


                        if (
                            token &&
                            token !== "owner" &&
                            token !== "firebase"
                        ) {

                            const response =
                                await fetch(
                                    "/api/admin/applications",
                                    {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type":
                                                "application/json",
                                            Authorization:
                                                `Bearer ${token}`
                                        },
                                        body: JSON.stringify({
                                            id
                                        })
                                    }
                                );


                            if (response.ok) {

                                renderAdminDashboard();

                                return;
                            }

                        }


                        if (isFirebaseConfigured()) {

                            await db
                                .collection(
                                    "applications"
                                )
                                .doc(id)
                                .delete();


                            renderAdminDashboard();

                            return;
                        }


                        const filtered =
                            getLocalApplications()
                                .filter(
                                    item =>
                                        String(item.id) !==
                                        String(id)
                                );


                        saveLocalApplications(
                            filtered
                        );


                        renderAdminDashboard();

                    } catch (error) {

                        alert(
                            error.message ||
                            "Delete failed."
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       CUSTOMER VIEW / DELETE
       ===================================================== */

    if (customerTableBody) {

        customerTableBody.addEventListener(
            "click",
            async (event) => {

                const viewButton =
                    event.target.closest(
                        ".view-btn"
                    );


                const deleteButton =
                    event.target.closest(
                        ".delete-btn"
                    );


                if (
                    !viewButton &&
                    !deleteButton
                ) {
                    return;
                }


                const button =
                    viewButton ||
                    deleteButton;


                const id =
                    button.dataset.id;


                /* -----------------------------------------
                   VIEW
                   ----------------------------------------- */

                if (viewButton) {

                    try {

                        const token =
                            sessionStorage.getItem(
                                "bloomintel-owner-token"
                            );


                        if (
                            token &&
                            token !== "owner" &&
                            token !== "firebase"
                        ) {

                            const response =
                                await fetch(
                                    "/api/admin/dashboard",
                                    {
                                        headers: {
                                            Authorization:
                                                `Bearer ${token}`
                                        }
                                    }
                                );


                            if (response.ok) {

                                const body =
                                    await response.json();


                                const message =
                                    (
                                        body.messages ||
                                        body.customers ||
                                        []
                                    ).find(
                                        item =>
                                            String(item.id) ===
                                            String(id)
                                    );


                                if (message) {

                                    showRecordModal(
                                        "Customer Details",
                                        message
                                    );

                                    return;
                                }

                            }

                        }


                        if (isFirebaseConfigured()) {

                            const doc =
                                await db
                                    .collection(
                                        "customers"
                                    )
                                    .doc(id)
                                    .get();


                            if (
                                doc &&
                                doc.exists
                            ) {

                                showRecordModal(
                                    "Customer Details",
                                    {
                                        id: doc.id,
                                        ...doc.data()
                                    }
                                );

                                return;
                            }

                        }


                        const local =
                            getLocalCustomers()
                                .find(
                                    item =>
                                        String(item.id) ===
                                        String(id)
                                );


                        if (local) {

                            showRecordModal(
                                "Customer Details",
                                local
                            );

                            return;
                        }


                        alert(
                            "Customer details not found."
                        );

                    } catch (error) {

                        alert(
                            error.message ||
                            "Unable to load details."
                        );

                    }

                }


                /* -----------------------------------------
                   DELETE
                   ----------------------------------------- */

                if (deleteButton) {

                    if (
                        !confirm(
                            "Delete this customer record?"
                        )
                    ) {
                        return;
                    }


                    try {

                        const token =
                            sessionStorage.getItem(
                                "bloomintel-owner-token"
                            );


                        if (
                            token &&
                            token !== "owner" &&
                            token !== "firebase"
                        ) {

                            const response =
                                await fetch(
                                    "/api/admin/customers",
                                    {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type":
                                                "application/json",
                                            Authorization:
                                                `Bearer ${token}`
                                        },
                                        body: JSON.stringify({
                                            id
                                        })
                                    }
                                );


                            if (response.ok) {

                                renderAdminDashboard();

                                return;
                            }

                        }


                        if (isFirebaseConfigured()) {

                            await db
                                .collection(
                                    "customers"
                                )
                                .doc(id)
                                .delete();


                            renderAdminDashboard();

                            return;
                        }


                        const filtered =
                            getLocalCustomers()
                                .filter(
                                    item =>
                                        String(item.id) !==
                                        String(id)
                                );


                        saveLocalCustomers(
                            filtered
                        );


                        renderAdminDashboard();

                    } catch (error) {

                        alert(
                            error.message ||
                            "Delete failed."
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       RECORD MODAL
       ===================================================== */

    const showRecordModal = (
        title,
        record
    ) => {

        const existing =
            document.getElementById(
                "recordViewModal"
            );


        if (existing) {
            existing.remove();
        }


        const modal =
            document.createElement("div");


        modal.id =
            "recordViewModal";


        modal.className =
            "record-modal-overlay";


        const formatted =
            Object.entries(record)
                .map(
                    ([key, value]) => `
                        <div class="record-row">
                            <span class="record-label">
                                ${escapeHtml(key)}
                            </span>

                            <span class="record-value">
                                ${escapeHtml(
                                    value ?? ""
                                )}
                            </span>
                        </div>
                    `
                )
                .join("");


        modal.innerHTML = `

            <div class="record-modal">

                <div class="record-modal-header">

                    <h3>
                        ${escapeHtml(title)}
                    </h3>

                    <button
                        type="button"
                        class="record-modal-close">
                        ×
                    </button>

                </div>


                <div class="record-modal-body">

                    ${formatted}

                </div>


                <div class="record-modal-footer">

                    <button
                        type="button"
                        class="record-modal-close secondary-btn">
                        Close
                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(modal);


        modal
            .querySelectorAll(
                ".record-modal-close"
            )
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    () => modal.remove()
                );

            });


        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {
                    modal.remove();
                }

            }
        );

    };


    /* =====================================================
       BLOG CREATE / UPDATE
       ===================================================== */

    if (blogForm) {

        blogForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                if (!isFirebaseConfigured()) {

                    if (blogMessage) {

                        blogMessage.textContent =
                            "Firebase is not configured yet.";

                    }

                    return;
                }


                const payload = {

                    title:
                        blogTitleInput?.value.trim() ||
                        "Untitled Blog",

                    excerpt:
                        blogExcerptInput?.value.trim() ||
                        "",

                    content:
                        blogContentInput?.value.trim() ||
                        "",

                    author:
                        blogAuthorInput?.value.trim() ||
                        "BloomIntel Team",

                    createdAt:
                        new Date().toISOString()

                };


                try {

                    const id =
                        blogIdInput?.value;


                    if (id) {

                        await db
                            .collection("blogs")
                            .doc(id)
                            .update(payload);


                        if (blogMessage) {

                            blogMessage.textContent =
                                "Blog updated successfully.";

                        }

                    } else {

                        await db
                            .collection("blogs")
                            .add(payload);


                        if (blogMessage) {

                            blogMessage.textContent =
                                "Blog published successfully.";

                        }

                    }


                    blogForm.reset();


                    if (blogIdInput) {
                        blogIdInput.value = "";
                    }


                    renderAdminDashboard();

                } catch (error) {

                    if (blogMessage) {

                        blogMessage.textContent =
                            error.message ||
                            "Unable to save blog.";

                    }

                }

            }
        );

    }


    /* =====================================================
       CANCEL BLOG EDIT
       ===================================================== */

    if (
        cancelBlogEditButton &&
        blogForm
    ) {

        cancelBlogEditButton.addEventListener(
            "click",
            () => {

                blogForm.reset();


                if (blogIdInput) {
                    blogIdInput.value = "";
                }


                if (blogMessage) {
                    blogMessage.textContent = "";
                }

            }
        );

    }


    /* =====================================================
       BLOG ACTIONS
       ===================================================== */

    if (blogList) {

        blogList.addEventListener(
            "click",
            async (event) => {

                const button =
                    event.target.closest(
                        "button[data-action]"
                    );


                if (!button) return;


                const action =
                    button.dataset.action;


                const id =
                    button.dataset.id;


                if (!isFirebaseConfigured()) {

                    if (blogMessage) {

                        blogMessage.textContent =
                            "Firebase is not configured.";

                    }

                    return;
                }


                try {

                    if (action === "delete") {

                        if (
                            !confirm(
                                "Delete this blog post?"
                            )
                        ) {
                            return;
                        }


                        await db
                            .collection("blogs")
                            .doc(id)
                            .delete();


                        if (blogMessage) {

                            blogMessage.textContent =
                                "Blog deleted.";

                        }


                        renderAdminDashboard();

                    }


                    if (action === "edit") {

                        const blogDoc =
                            await db
                                .collection("blogs")
                                .doc(id)
                                .get();


                        if (
                            !blogDoc.exists
                        ) {
                            return;
                        }


                        const blog =
                            blogDoc.data();


                        if (blogIdInput) {
                            blogIdInput.value =
                                blogDoc.id;
                        }


                        if (blogTitleInput) {
                            blogTitleInput.value =
                                blog.title || "";
                        }


                        if (blogAuthorInput) {
                            blogAuthorInput.value =
                                blog.author ||
                                "BloomIntel Team";
                        }


                        if (blogExcerptInput) {
                            blogExcerptInput.value =
                                blog.excerpt || "";
                        }


                        if (blogContentInput) {
                            blogContentInput.value =
                                blog.content || "";
                        }


                        if (blogMessage) {

                            blogMessage.textContent =
                                "Editing blog post.";

                        }


                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }

                } catch (error) {

                    if (blogMessage) {

                        blogMessage.textContent =
                            error.message ||
                            "Unable to process blog action.";

                    }

                }

            }
        );

    }


    /* =====================================================
       SIDEBAR / MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.getElementById(
            "adminMenuToggle"
        );


    const sidebar =
        document.getElementById(
            "adminSidebar"
        );


    if (
        menuToggle &&
        sidebar
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

                menuToggle.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =====================================================
       QUICK LINKS
       ===================================================== */

    document
        .querySelectorAll(
            "[data-admin-link]"
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    const target =
                        link.dataset.adminLink;


                    if (!target) return;


                    const element =
                        document.getElementById(
                            target
                        );


                    if (element) {

                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       ACTIVE SIDEBAR LINK
       ===================================================== */

    const adminNavLinks =
        document.querySelectorAll(
            ".admin-nav-link"
        );


    adminNavLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                adminNavLinks.forEach(
                    (item) =>
                        item.classList.remove(
                            "active"
                        )
                );


                link.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       SCROLL EFFECTS
       ===================================================== */

    const progressBar =
        document.createElement("div");


    progressBar.className =
        "scroll-progress";


    document.body.prepend(
        progressBar
    );


    const updateScrollProgress = () => {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        progressBar.style.width =
            `${Math.min(progress, 100)}%`;

    };


    window.addEventListener(
        "scroll",
        updateScrollProgress
    );


    updateScrollProgress();


    /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            const observer =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "show"
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.15
                    }
                );


            observer.observe(
                element
            );

        });


    /* =====================================================
       UPDATE WHEN ANOTHER TAB CHANGES STORAGE
       ===================================================== */

    window.addEventListener(
        "storage",
        (event) => {

            if (
                event.key ===
                LOCAL_APPLICATIONS_KEY ||
                event.key ===
                LOCAL_CUSTOMERS_KEY
            ) {

                renderAdminDashboard();

            }

        }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    const token =
        sessionStorage.getItem(
            "bloomintel-owner-token"
        );


    if (token) {

        setAdminVisibility(true);

        renderAdminDashboard();

    } else {

        setAdminVisibility(false);

    }

});