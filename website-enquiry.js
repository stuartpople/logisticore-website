/**
 * First-party contact form submit helper for logisticoreapp.com.
 * Posts to LogistiCore /api/services/website-enquiry/ (no Formspree).
 */
(function (global) {
  'use strict';

  var ENDPOINT = 'https://app.logisticoreapp.com/api/services/website-enquiry/';

  function formToPayload(form) {
    var data = new FormData(form);
    var payload = {};
    data.forEach(function (value, key) {
      if (key === 'fax_number_leave_blank' || key === 'bot_field') {
        payload[key] = value;
        return;
      }
      if (typeof value === 'string') {
        payload[key] = value;
      }
    });
    payload.domain = payload.domain || 'logisticoreapp.com';
    payload.page_url = payload.page_url || global.location.href;
    return payload;
  }

  async function submitForm(form) {
    var payload = formToPayload(form);
    var response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    var body = {};
    try {
      body = await response.json();
    } catch (e) {
      body = {};
    }
    if (!response.ok || body.ok === false) {
      var err = new Error(body.error || 'Failed to send enquiry');
      err.status = response.status;
      err.body = body;
      throw err;
    }
    return body;
  }

  function ensureHoneypot(form) {
    if (form.querySelector('[name="fax_number_leave_blank"]')) return;
    var wrap = document.createElement('label');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;';
    wrap.textContent = 'Fax number';
    var input = document.createElement('input');
    input.type = 'text';
    input.name = 'fax_number_leave_blank';
    input.tabIndex = -1;
    input.autocomplete = 'off';
    wrap.appendChild(input);
    form.appendChild(wrap);
  }

  function bindForm(form, options) {
    if (!form || form.dataset.lcEnquiryBound === '1') return;
    options = options || {};
    ensureHoneypot(form);
    form.removeAttribute('action');
    form.dataset.lcEnquiryBound = '1';

    var statusEl = options.statusEl || null;
    var submitBtn = form.querySelector('[type="submit"]');
    var idleLabel = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (statusEl) {
        statusEl.textContent = 'Sending…';
        statusEl.style.color = '#64748b';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      try {
        await submitForm(form);
        if (statusEl) {
          statusEl.textContent = options.successMessage || 'Thank you — your enquiry has been sent. We will reply shortly.';
          statusEl.style.color = '#059669';
        }
        form.reset();
        if (typeof options.onSuccess === 'function') options.onSuccess();
      } catch (err) {
        if (statusEl) {
          statusEl.textContent =
            (err && err.message) ||
            'Could not send your enquiry. Please email sales@logisticoreapp.com or try again.';
          statusEl.style.color = '#dc2626';
        }
        if (typeof options.onError === 'function') options.onError(err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = idleLabel || 'Send';
        }
      }
    });
  }

  global.LCWebsiteEnquiry = {
    endpoint: ENDPOINT,
    submitForm: submitForm,
    bindForm: bindForm,
    ensureHoneypot: ensureHoneypot,
  };
})(typeof window !== 'undefined' ? window : this);
