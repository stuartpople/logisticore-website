// Custom Support Widget - LogistiCore (Freshdesk Style)
(function() {
    'use strict';
    
    // Formspree endpoint - same service you use for contact form
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkgzbaqy';
    
    // Create widget HTML
    const widgetHTML = `
        <button class="support-widget-button" id="supportWidgetBtn" aria-label="Open support chat">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
            </svg>
        </button>
        
        <div class="support-widget-window" id="supportWidgetWindow">
            <div class="support-widget-header">
                <div class="support-widget-logo">
                    <img src="assets/img/logisticore-technologies-logo.png" alt="LogistiCore">
                </div>
                <div class="support-widget-header-text">
                    <h3>LogistiCore Support</h3>
                    <p>We typically reply in minutes</p>
                </div>
                <button class="support-widget-close" id="supportWidgetClose" aria-label="Close">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            <div class="support-widget-body" id="supportWidgetBody">
                <div id="supportFormContainer">
                    <div class="support-widget-intro">
                        <h4>How can we help?</h4>
                        <p>Send us a message and we'll get back to you as soon as possible.</p>
                    </div>
                    <div class="support-widget-error" id="supportWidgetError"></div>
                    <form class="support-widget-form" id="supportWidgetForm">
                        <div class="support-widget-field">
                            <label for="supportName">Your Name *</label>
                            <input type="text" id="supportName" name="name" required placeholder="Your name">
                        </div>
                        <div class="support-widget-field">
                            <label for="supportEmail">Email *</label>
                            <input type="email" id="supportEmail" name="email" required placeholder="your@email.com">
                        </div>
                        <div class="support-widget-field">
                            <label for="supportType">Type *</label>
                            <select id="supportType" name="type" required>
                                <option value="">Select option(s)</option>
                                <option value="Question">Question</option>
                                <option value="Incident">Incident</option>
                                <option value="Problem">Problem</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="Refund">Refund</option>
                            </select>
                        </div>
                        <div class="support-widget-field">
                            <label for="supportPriority">Priority *</label>
                            <select id="supportPriority" name="priority" required>
                                <option value="">Select option(s)</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                        <div class="support-widget-field">
                            <label for="supportProduct">Product</label>
                            <select id="supportProduct" name="product">
                                <option value="">Select option(s)</option>
                                <option value="LogistiCore SaaS">LogistiCore SaaS</option>
                                <option value="IT Support">IT Support</option>
                                <option value="Website Services">Website Services</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="support-widget-field">
                            <label for="supportSubject">Subject *</label>
                            <input type="text" id="supportSubject" name="subject" required placeholder="Brief summary">
                        </div>
                        <div class="support-widget-field">
                            <label for="supportDescription">Description *</label>
                            <textarea id="supportDescription" name="description" required placeholder="Please describe your issue or question in detail..."></textarea>
                        </div>
                        <div class="support-widget-field">
                            <label for="supportReference">Reference Number</label>
                            <input type="text" id="supportReference" name="reference" placeholder="Invoice or ticket number (if applicable)">
                        </div>
                        <button type="submit" class="support-widget-submit" id="supportWidgetSubmit">
                            Send Message
                        </button>
                    </form>
                </div>
                <div id="supportSuccessContainer" style="display: none;">
                    <div class="support-widget-success">
                        <div class="support-widget-success-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                        </div>
                        <h4>Message Sent!</h4>
                        <p>Thank you for contacting us. We'll get back to you shortly at the email address you provided.</p>
                        <button class="support-widget-back" id="supportWidgetBack">Send Another Message</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inject widget into page
    document.addEventListener('DOMContentLoaded', function() {
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'supportWidget';
        widgetContainer.innerHTML = widgetHTML;
        document.body.appendChild(widgetContainer);
        
        // Get elements
        const btn = document.getElementById('supportWidgetBtn');
        const window = document.getElementById('supportWidgetWindow');
        const closeBtn = document.getElementById('supportWidgetClose');
        const form = document.getElementById('supportWidgetForm');
        const submitBtn = document.getElementById('supportWidgetSubmit');
        const errorDiv = document.getElementById('supportWidgetError');
        const formContainer = document.getElementById('supportFormContainer');
        const successContainer = document.getElementById('supportSuccessContainer');
        const backBtn = document.getElementById('supportWidgetBack');
        
        // Toggle widget
        function toggleWidget() {
            window.classList.toggle('active');
            btn.classList.toggle('active');
            console.log('Widget toggled. Active:', window.classList.contains('active'));
        }
        
        // Open widget
        btn.addEventListener('click', function() {
            console.log('Support button clicked');
            toggleWidget();
        });
        
        // Close widget
        closeBtn.addEventListener('click', toggleWidget);
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!window.contains(e.target) && !btn.contains(e.target) && window.classList.contains('active')) {
                toggleWidget();
            }
        });
        
        // Handle form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submitted. Sending via Formspree...');
            
            // Clear previous error
            errorDiv.classList.remove('active');
            errorDiv.textContent = '';
            
            // Get form data
            const formData = new FormData(form);
            
            // Build formatted message for Formspree
            const message = `
Type: ${formData.get('type')}
Priority: ${formData.get('priority')}
Product: ${formData.get('product') || 'Not specified'}
Reference: ${formData.get('reference') || 'None'}

Subject: ${formData.get('subject')}

Description:
${formData.get('description')}
`;
            
            // Create new FormData with formatted fields for Formspree
            const submitData = new FormData();
            submitData.append('name', formData.get('name'));
            submitData.append('email', formData.get('email'));
            submitData.append('_replyto', formData.get('email'));
            submitData.append('_subject', `[${formData.get('priority')}] ${formData.get('type')}: ${formData.get('subject')}`);
            submitData.append('message', message);
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Send to Formspree
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: submitData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    console.log('✓ Email sent successfully via Formspree');
                    // Show success message
                    formContainer.style.display = 'none';
                    successContainer.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
                
            } catch (error) {
                console.error('Error sending message:', error);
                errorDiv.textContent = 'Failed to send message. Please try again or email us directly at support@logisticoreapp.com';
                errorDiv.classList.add('active');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
        
        // Back button
        backBtn.addEventListener('click', function() {
            formContainer.style.display = 'block';
            successContainer.style.display = 'none';
        });
    });
})();
