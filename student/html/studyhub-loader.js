// Load user data
const session = JSON.parse(localStorage.getItem('eduportal_session'));
const user = session || JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    window.location.href = '../../../login2.html';
}

// Load Shared Sidebar
fetch('../../../sidebar.html')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load sidebar');
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        
        const sidebar = doc.getElementById('sidebar');
        const overlay = doc.getElementById('sidebarOverlay');
        const scriptContent = doc.querySelector('script').textContent;

        const container = document.querySelector('.dashboard-container');
        if (sidebar && overlay) {
            const existingSidebar = document.getElementById('sidebar');
            const existingOverlay = document.getElementById('sidebarOverlay');
            if (existingSidebar) existingSidebar.remove();
            if (existingOverlay) existingOverlay.remove();

            container.prepend(sidebar);
            container.prepend(overlay);
            
            const script = document.createElement('script');
            script.textContent = scriptContent;
            document.body.appendChild(script);
        }
    })
    .catch(err => console.error('Error loading sidebar:', err));

// Fallback toggle function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}