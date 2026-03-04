# SEAT REGISTRY FIX — Claude Code Instructions

## Summary

The seat registry in `index.html` (mos2es.io) has a complete UI but the inquiry submission is a dead end. Inquiries are pushed to an in-memory JS array (`registryInquiries`) and are lost on page refresh. No data leaves the browser. No email is sent. No confirmation is shown to the buyer.

This document contains exact code changes to fix all of it.

---

## What needs to happen

1. **Inquiry form must actually deliver data** — via Formspree (free, no backend)
2. **localStorage backup** — persist inquiries locally so the owner has a record
3. **Confirmation view** — show the buyer a real confirmation after submission
4. **Form validation** — proper email validation + visual error states
5. **Rate limiting** — prevent spam/duplicate submissions
6. **Submission state** — disable button during send, show loading indicator

---

## File: `index.html`

All changes are in a single file. Line numbers reference the current version.

---

### CHANGE 1 — Replace `registryInquiries` declaration (line 4046)

**Find this:**
```javascript
let registryInquiries = [];
```

**Replace with:**
```javascript
let registryInquiries = JSON.parse(localStorage.getItem('moses-reg-inquiries') || '[]');
let regSubmitting = false;
let regLastSubmitTime = 0;
const REG_COOLDOWN_MS = 30000; // 30s cooldown between submissions
```

This loads any previously saved inquiries from localStorage on page load and adds submission state tracking.

---

### CHANGE 2 — Add `renderRegistryConfirmation` function

**Find this (line 7634):**
```javascript
// --- INFO / EXPLAINER ---
function renderRegistryInfo() {
```

**Insert BEFORE that line:**
```javascript
// --- CONFIRMATION VIEW ---
function renderRegistryConfirmation(inquiryData) {
  const isCommand = inquiryData.product === 'command';
  const prefix = isCommand ? 'C' : 'D';
  const seat = (isCommand ? COMMAND_SEATS : DEPLOY_SEATS).find(s => s.id === inquiryData.seatId);
  const label = seat ? regLabel(prefix, seat.id, seat.transferCount) : inquiryData.seatId;
  const waves = isCommand ? COMMAND_WAVES : DEPLOY_WAVES;
  const w = seat ? waves.find(x => x.key === seat.wave) : null;

  return `
    <div class="reg-detail" style="text-align:center;padding:40px 24px;">
      <div style="font-size:32px;margin-bottom:12px;">✓</div>
      <div style="font-family:var(--mono);font-size:16px;font-weight:700;color:var(--accent);letter-spacing:0.06em;margin-bottom:6px;">INQUIRY SUBMITTED</div>
      <div style="font-family:var(--mono);font-size:13px;color:var(--muted);margin-bottom:28px;">Reference: REG-${inquiryData.id}</div>

      <div style="text-align:left;background:var(--surface);border:1px solid var(--border);border-radius:3px;padding:16px 18px;margin-bottom:24px;">
        <div class="reg-row"><span class="reg-row-label">Seat</span><span class="reg-row-val" style="color:var(--accent)">${label}</span></div>
        <div class="reg-row"><span class="reg-row-label">Product</span><span class="reg-row-val">${isCommand ? 'COMMAND' : 'DEPLOY'}</span></div>
        ${w ? `<div class="reg-row"><span class="reg-row-label">Wave</span><span class="reg-row-val">${w.label} — ${w.sub}</span></div>` : ''}
        ${seat && seat.basePrice ? `<div class="reg-row"><span class="reg-row-label">Listed Price</span><span class="reg-row-val">${regFmt(seat.basePrice)}</span></div>` : ''}
        <div class="reg-row"><span class="reg-row-label">Company</span><span class="reg-row-val">${inquiryData.company}</span></div>
        <div class="reg-row"><span class="reg-row-label">Email</span><span class="reg-row-val">${inquiryData.email}</span></div>
        <div class="reg-row"><span class="reg-row-label">Submitted</span><span class="reg-row-val">${new Date(inquiryData.timestamp).toLocaleString()}</span></div>
      </div>

      <div style="font-family:var(--mono);font-size:12px;color:var(--muted);line-height:1.7;margin-bottom:24px;">
        Ello Cello LLC will respond directly to your inquiry.<br>
        All negotiations happen offline — no transactions are processed through this interface.
      </div>

      <button class="reg-btn reg-btn-secondary" onclick="regNavTo('overview')" style="margin-bottom:8px;">← Back to Registry</button>
    </div>`;
}

```

---

### CHANGE 3 — Add 'confirmation' to the renderSeatRegistry router (line 7283–7293)

**Find this:**
```javascript
function renderSeatRegistry() {
  const body = document.getElementById('popup-body');
  if (!body) return;
  switch (registryView) {
    case 'overview': body.innerHTML = renderRegistryOverview(); break;
    case 'command':  body.innerHTML = renderRegistryBoard('command'); break;
    case 'deploy':   body.innerHTML = renderRegistryBoard('deploy'); break;
    case 'detail':   body.innerHTML = renderRegistryDetail(); break;
    case 'inquiry':  body.innerHTML = renderRegistryInquiry(); break;
    case 'info':     body.innerHTML = renderRegistryInfo(); break;
  }
}
```

**Replace with:**
```javascript
function renderSeatRegistry() {
  const body = document.getElementById('popup-body');
  if (!body) return;
  switch (registryView) {
    case 'overview':     body.innerHTML = renderRegistryOverview(); break;
    case 'command':      body.innerHTML = renderRegistryBoard('command'); break;
    case 'deploy':       body.innerHTML = renderRegistryBoard('deploy'); break;
    case 'detail':       body.innerHTML = renderRegistryDetail(); break;
    case 'inquiry':      body.innerHTML = renderRegistryInquiry(); break;
    case 'confirmation': body.innerHTML = renderRegistryConfirmation(registryLastInquiry); break;
    case 'info':         body.innerHTML = renderRegistryInfo(); break;
  }
}
```

---

### CHANGE 4 — Add `registryLastInquiry` to state vars (right after CHANGE 1 area)

**Find this (the block you already changed in CHANGE 1):**
```javascript
let registryInquiries = JSON.parse(localStorage.getItem('moses-reg-inquiries') || '[]');
let regSubmitting = false;
let regLastSubmitTime = 0;
const REG_COOLDOWN_MS = 30000;
```

**Replace with:**
```javascript
let registryInquiries = JSON.parse(localStorage.getItem('moses-reg-inquiries') || '[]');
let registryLastInquiry = null;
let regSubmitting = false;
let regLastSubmitTime = 0;
const REG_COOLDOWN_MS = 30000; // 30s cooldown between submissions

// Formspree endpoint — OWNER MUST REPLACE with their own form ID
// Sign up free at https://formspree.io → create form → copy endpoint
const REG_FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

> **IMPORTANT**: The owner must create a free Formspree account, create a form, and replace `YOUR_FORM_ID` with their actual form ID. Formspree will email every submission to the connected email address. Free tier = 50 submissions/month. No backend needed.

---

### CHANGE 5 — Replace `regSubmitInquiry` function (lines 7617–7632)

**Find this:**
```javascript
function regSubmitInquiry() {
  const company = document.getElementById('reg-inq-company')?.value;
  const email = document.getElementById('reg-inq-email')?.value;
  if (!company || !email) return;
  const message = document.getElementById('reg-inq-message')?.value || '';
  registryInquiries.push({
    id: Date.now(),
    seatId: registrySelectedSeat?.id,
    product: registryProduct,
    company, email, message,
    timestamp: new Date().toISOString(),
    status: 'NEW'
  });
  logActivity('Seat inquiry submitted: ' + regLabel(registryProduct === 'command' ? 'C' : 'D', registrySelectedSeat?.id, registrySelectedSeat?.transferCount || 0), 'success');
  regNavTo('detail');
}
```

**Replace with:**
```javascript
async function regSubmitInquiry() {
  // --- Gather fields ---
  const companyEl = document.getElementById('reg-inq-company');
  const emailEl   = document.getElementById('reg-inq-email');
  const messageEl = document.getElementById('reg-inq-message');
  const bidEl     = document.getElementById('reg-inq-bid');
  const submitBtn = document.querySelector('.reg-detail .reg-btn-primary');

  const company = companyEl?.value?.trim();
  const email   = emailEl?.value?.trim();
  const message = messageEl?.value?.trim() || '';
  const bidAmount = bidEl?.value?.trim() || null;

  // --- Validate ---
  let valid = true;
  [companyEl, emailEl].forEach(el => {
    if (el) el.style.borderColor = '';
  });

  if (!company) {
    if (companyEl) companyEl.style.borderColor = '#E8553A';
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (emailEl) emailEl.style.borderColor = '#E8553A';
    valid = false;
  }
  if (!valid) return;

  // --- Rate limit ---
  const now = Date.now();
  if (now - regLastSubmitTime < REG_COOLDOWN_MS) {
    if (submitBtn) {
      submitBtn.textContent = 'Please wait…';
      setTimeout(() => { if (submitBtn) submitBtn.textContent = 'Submit Inquiry'; }, 2000);
    }
    return;
  }

  // --- Prevent double-click ---
  if (regSubmitting) return;
  regSubmitting = true;
  regLastSubmitTime = now;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';
    submitBtn.style.opacity = '0.6';
  }

  // --- Build inquiry object ---
  const isCommand = registryProduct === 'command';
  const prefix = isCommand ? 'C' : 'D';
  const seat = registrySelectedSeat;
  const seatLabel = seat ? regLabel(prefix, seat.id, seat.transferCount) : '—';
  const waves = isCommand ? COMMAND_WAVES : DEPLOY_WAVES;
  const w = seat ? waves.find(x => x.key === seat.wave) : null;

  const inquiry = {
    id: now,
    seatId: seat?.id,
    seatLabel: seatLabel,
    product: registryProduct,
    productLabel: isCommand ? 'COMMAND' : 'DEPLOY',
    wave: w?.label || '—',
    tier: seat?.tier || '—',
    listedPrice: seat?.basePrice ? regFmt(seat.basePrice) : '—',
    company,
    email,
    message,
    bidAmount,
    timestamp: new Date().toISOString(),
    status: 'SENT'
  };

  // --- 1. Save to localStorage (always — acts as backup) ---
  registryInquiries.push(inquiry);
  try {
    localStorage.setItem('moses-reg-inquiries', JSON.stringify(registryInquiries));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }

  // --- 2. Send via Formspree (delivers email to owner) ---
  let deliverySuccess = false;
  try {
    const res = await fetch(REG_FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: `MO§ES™ Seat Inquiry: ${seatLabel} — ${company}`,
        seat: seatLabel,
        product: inquiry.productLabel,
        wave: inquiry.wave,
        tier: inquiry.tier,
        listed_price: inquiry.listedPrice,
        company: company,
        email: email,
        message: message || '(none)',
        bid_amount: bidAmount || 'N/A',
        timestamp: inquiry.timestamp,
        reference: `REG-${inquiry.id}`
      })
    });
    deliverySuccess = res.ok;
    inquiry.status = res.ok ? 'SENT' : 'LOCAL_ONLY';
  } catch (err) {
    console.warn('Formspree delivery failed:', err);
    inquiry.status = 'LOCAL_ONLY';
  }

  // --- Update localStorage with delivery status ---
  try {
    localStorage.setItem('moses-reg-inquiries', JSON.stringify(registryInquiries));
  } catch (e) {}

  // --- 3. Log activity ---
  logActivity(
    'Seat inquiry ' + (deliverySuccess ? 'submitted' : 'saved locally') + ': ' + seatLabel,
    deliverySuccess ? 'success' : 'warning'
  );

  // --- 4. Navigate to confirmation ---
  regSubmitting = false;
  registryLastInquiry = inquiry;
  registryView = 'confirmation';
  renderSeatRegistry();
}
```

---

### CHANGE 6 — Replace `renderRegistryInquiry` for better UX (lines 7583–7615)

**Find this:**
```javascript
function renderRegistryInquiry() {
  const s = registrySelectedSeat;
  if (!s) return '';
  const isCommand = registryProduct === 'command';
  const prefix = isCommand ? 'C' : 'D';
  const label = regLabel(prefix, s.id, s.transferCount);
  const isBid = s.id === 17;
  const isHolder = s.status === 'TAKEN';

  return `
    <div class="reg-back" onclick="regNavTo('detail')">← ${label}</div>
    <div class="reg-detail">
      <div style="font-family:var(--mono);font-size: 13px;letter-spacing:0.08em;color:var(--muted);text-transform:uppercase;margin:14px 0 18px;">
        ${isHolder ? 'Contact Seat Holder' : (isBid ? 'Bid Inquiry' : 'Inquire')} — ${label}
      </div>
      <div class="reg-form-group">
        <label class="reg-label">Company Name *</label>
        <input class="reg-input" id="reg-inq-company" placeholder="Your organization" />
      </div>
      <div class="reg-form-group">
        <label class="reg-label">Contact Email *</label>
        <input class="reg-input" id="reg-inq-email" type="email" placeholder="email@company.com" />
      </div>
      <div class="reg-form-group">
        <label class="reg-label">Intended Use Case</label>
        <textarea class="reg-textarea" id="reg-inq-message" placeholder="${isBid ? 'Include bid amount, proof of funds reference, and implementation plan summary.' : 'Describe your intended use case and any questions.'}"></textarea>
      </div>
      ${isBid ? `<div class="reg-form-group"><label class="reg-label">Bid Amount</label><input class="reg-input" id="reg-inq-bid" type="number" placeholder="USD" /></div>` : ''}
      <button class="reg-btn reg-btn-primary" onclick="regSubmitInquiry()">Submit Inquiry</button>
      <button class="reg-btn reg-btn-secondary" onclick="regNavTo('detail')" style="margin-top:8px">Cancel</button>
      <div style="margin-top:14px;font-family:var(--mono);font-size: 12px;color:var(--muted);line-height:1.6">All negotiations happen offline. Ello Cello LLC will respond directly to your inquiry. No transactions are processed through this interface.</div>
    </div>`;
}
```

**Replace with:**
```javascript
function renderRegistryInquiry() {
  const s = registrySelectedSeat;
  if (!s) return '';
  const isCommand = registryProduct === 'command';
  const prefix = isCommand ? 'C' : 'D';
  const label = regLabel(prefix, s.id, s.transferCount);
  const waves = isCommand ? COMMAND_WAVES : DEPLOY_WAVES;
  const w = waves.find(x => x.key === s.wave);
  const isBid = s.id === 17;
  const isHolder = s.status === 'TAKEN';

  return `
    <div class="reg-back" onclick="regNavTo('detail')">\u2190 ${label}</div>
    <div class="reg-detail">
      <div style="font-family:var(--mono);font-size: 13px;letter-spacing:0.08em;color:var(--muted);text-transform:uppercase;margin:14px 0 10px;">
        ${isHolder ? 'Contact Seat Holder' : (isBid ? 'Bid Inquiry' : 'Inquire')} \u2014 ${label}
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:3px;padding:10px 14px;margin-bottom:18px;font-family:var(--mono);font-size:12px;color:var(--muted);display:flex;gap:16px;flex-wrap:wrap;">
        <span>${isCommand ? 'COMMAND' : 'DEPLOY'}</span>
        <span>${w ? w.label : ''} \u2014 ${s.tier}</span>
        ${!isBid && s.basePrice ? `<span style="color:var(--accent)">${regFmt(s.basePrice)}</span>` : ''}
      </div>
      <div class="reg-form-group">
        <label class="reg-label">Company Name *</label>
        <input class="reg-input" id="reg-inq-company" placeholder="Your organization" autocomplete="organization" />
      </div>
      <div class="reg-form-group">
        <label class="reg-label">Contact Email *</label>
        <input class="reg-input" id="reg-inq-email" type="email" placeholder="email@company.com" autocomplete="email" />
      </div>
      <div class="reg-form-group">
        <label class="reg-label">Intended Use Case</label>
        <textarea class="reg-textarea" id="reg-inq-message" rows="4" placeholder="${isBid ? 'Include bid amount, proof of funds reference, and implementation plan summary.' : 'Describe your intended use case and any questions.'}"></textarea>
      </div>
      ${isBid ? `<div class="reg-form-group"><label class="reg-label">Bid Amount (USD)</label><input class="reg-input" id="reg-inq-bid" type="number" placeholder="Amount in USD" min="0" step="1000" /></div>` : ''}
      <button class="reg-btn reg-btn-primary" onclick="regSubmitInquiry()">Submit Inquiry</button>
      <button class="reg-btn reg-btn-secondary" onclick="regNavTo('detail')" style="margin-top:8px">Cancel</button>
      <div style="margin-top:14px;font-family:var(--mono);font-size: 12px;color:var(--muted);line-height:1.6">All negotiations happen offline. Ello Cello LLC will respond directly to your inquiry. No transactions are processed through this interface.</div>
    </div>`;
}
```

---

## Setup: Formspree (5 minutes, free)

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up with the email you want to receive seat inquiries at
3. Click **New Form** → name it "MO§ES Seat Registry"
4. Copy the form endpoint (looks like `https://formspree.io/f/xyzabcde`)
5. Replace `YOUR_FORM_ID` in the code with just the ID portion (e.g., `xyzabcde`) so the full URL reads `https://formspree.io/f/xyzabcde`
6. Deploy

Every submission will arrive in your email with: seat ID, product, wave, tier, price, company, email, message, bid amount (if applicable), timestamp, and reference number.

---

## What this fixes

| Before | After |
|---|---|
| Inquiry data pushed to in-memory array | Data sent via Formspree + saved to localStorage |
| Lost on page refresh | Persists in browser + delivered to owner email |
| No confirmation shown to buyer | Full confirmation view with reference number |
| No email notification to owner | Email with all seat + inquiry details |
| No form validation | Email regex + required field highlighting |
| No spam/double-click protection | 30s cooldown + disabled button during send |
| Submit silently returns to detail view | Dedicated confirmation screen |

---

## What this does NOT change

- Seat data is still hardcoded (COMMAND_SEATS / DEPLOY_SEATS arrays). Flipping a seat from AVAILABLE → TAKEN still requires manually editing the HTML. This is correct for now — you confirmed all negotiations happen offline.
- The REGISTER dropdown in the COMMAND bar (Personal/Professional/Business/Academic/Financial) is unrelated to the seat registry. It's a session config flag. No changes needed.
- No payment processing. The inquiry form is an intent capture mechanism, not a checkout. This matches the "all negotiations happen offline" design.

---

## Optional future upgrades (not included here)

- **Admin panel**: A hidden view (behind a password) to see all localStorage inquiries, export as CSV, and manually update seat statuses
- **Seat status API**: A simple JSON file hosted alongside index.html that the page fetches on load to get live seat statuses (no backend needed — just update a static JSON)
- **Email confirmation to buyer**: Would require a backend or a service like EmailJS in addition to Formspree
- **Webhook to Slack/Discord**: Formspree Pro ($10/mo) supports webhook forwarding for real-time notifications
