const contactsGrid = document.getElementById('contactsGrid');

// Mock Data for Contacts
const contactsData = [
    { id: 1, name: "Rahul Sharma", role: "Teacher - Mathematics", email: "rahul@eduportal.com", phone: "+91 98765 43210" },
    { id: 2, name: "Priya Patel", role: "Teacher - Physics", email: "priya@eduportal.com", phone: "+91 98765 43211" },
    { id: 3, name: "Amit Verma", role: "HOD - Science", email: "amit.hod@eduportal.com", phone: "+91 98765 43212" },
    { id: 4, name: "Sarah Wilson", role: "Teacher - English", email: "sarah@eduportal.com", phone: "+91 98765 43213" },
    { id: 5, name: "Admin Office", role: "Administration", email: "admin@eduportal.com", phone: "022-12345678" }
];

function renderContacts(data) {
    if (data.length === 0) {
        contactsGrid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No contacts found.</p>';
        return;
    }

    const html = data.map(contact => `
        <div class="contact-card">
            <div class="contact-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="contact-info">
                <h3>${contact.name}</h3>
                <div class="contact-role">${contact.role}</div>
                <div class="contact-actions">
                    <a href="mailto:${contact.email}" class="action-link" title="Email">
                        <i class="fas fa-envelope"></i> Email
                    </a>
                    <a href="tel:${contact.phone}" class="action-link" title="Call">
                        <i class="fas fa-phone"></i> Call
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    contactsGrid.innerHTML = html;
}

function filterContacts() {
    const query = document.getElementById('contactSearch').value.toLowerCase();
    const filtered = contactsData.filter(contact => 
        contact.name.toLowerCase().includes(query) || 
        contact.role.toLowerCase().includes(query)
    );
    renderContacts(filtered);
}

// Initialize
renderContacts(contactsData);