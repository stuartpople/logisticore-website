(function () {
  const API = window.UK_RATES_API;

  const originEl = document.getElementById('origin');
  const destEl = document.getElementById('destination');
  const weightEl = document.getElementById('weight');
  const searchBtn = document.getElementById('search_btn');
  const resultsHead = document.getElementById('results_head');
  const resultsBody = document.getElementById('results_body');
  const disclaimerEl = document.getElementById('disclaimer');

  function fmtMoney(val, cur) {
    if (val == null || val === '') return '—';
    return (cur || 'GBP') + ' ' + Number(val).toFixed(2);
  }

  function rateForWeight(rate, weightKg) {
    const breaks = rate.weight_breaks || [];
    if (breaks.length && weightKg > 0) {
      for (const b of breaks) {
        const mn = b.min ?? 0;
        const mx = b.max ?? 99999;
        if (weightKg >= mn && weightKg < mx) {
          return b.rate ?? b.rate_per_kg;
        }
      }
    }
    if (weightKg < 45 && rate.rate_0_45) return rate.rate_0_45;
    if (weightKg < 100 && rate.rate_45_100) return rate.rate_45_100;
    if (weightKg < 300 && rate.rate_100_300) return rate.rate_100_300;
    if (weightKg < 500 && rate.rate_300_500) return rate.rate_300_500;
    if (weightKg < 1000 && rate.rate_500_1000) return rate.rate_500_1000;
    if (rate.rate_1000_plus) return rate.rate_1000_plus;
    if (breaks.length) return breaks[0].rate ?? breaks[0].rate_per_kg;
    return null;
  }

  function totalCharge(rate, weightKg) {
    const perKg = rateForWeight(rate, weightKg);
    if (perKg == null) return null;
    const base = perKg * (weightKg || 0);
    const min = rate.minimum_charge || 0;
    return Math.max(base, min);
  }

  async function loadAirports() {
    try {
      const res = await fetch(API + '/airports/');
      const data = await res.json();
      (data.airports || []).forEach(ap => {
        const opt = document.createElement('option');
        opt.value = ap.code;
        opt.textContent = ap.code + ' — ' + ap.name;
        originEl.appendChild(opt);
      });
      if (!originEl.value) originEl.value = 'LHR';
    } catch (e) {
      console.warn('Could not load UK airports', e);
    }
  }

  async function loadStats() {
    try {
      const res = await fetch(API + '/stats/');
      const data = await res.json();
      document.getElementById('stat_rates').textContent = data.total_rates ?? '—';
      document.getElementById('stat_airlines').textContent = data.airlines ?? '—';
      document.getElementById('stat_routes').textContent = data.routes ?? '—';
    } catch (e) {
      document.getElementById('stat_rates').textContent = '—';
    }
  }

  function renderResults(rates, weightKg) {
    if (!rates.length) {
      resultsHead.textContent = 'No rates found';
      resultsBody.innerHTML = '<div class="results-empty">No published rates for this lane yet. We add new airline tariffs regularly — check back soon.</div>';
      return;
    }
    resultsHead.textContent = rates.length + ' rate' + (rates.length === 1 ? '' : 's') + ' found';
    const rows = rates.map(r => {
      const perKg = rateForWeight(r, weightKg);
      const total = weightKg > 0 ? totalCharge(r, weightKg) : null;
      const logo = r.logo_url
        ? '<img class="airline-logo" src="' + r.logo_url + '" alt="" onerror="this.style.display=\'none\'">'
        : '<div class="airline-logo"></div>';
      return '<tr>' +
        '<td data-label="Airline"><div class="airline-cell">' + logo +
        '<div><strong>' + esc(r.airline_name) + '</strong>' +
        '<div class="rate-meta">' + esc(r.airline_code || '') + '</div></div></div></td>' +
        '<td data-label="Route"><strong>' + esc(r.origin_code) + ' → ' + esc(r.destination_code) + '</strong>' +
        (r.via_code ? '<div class="rate-meta">via ' + esc(r.via_code) + '</div>' : '') + '</td>' +
        '<td data-label="Service"><span class="svc-badge">' + esc(r.service_type || 'standard') + '</span>' +
        (r.transit_time ? '<div class="rate-meta">' + esc(r.transit_time) + '</div>' : '') + '</td>' +
        '<td data-label="Rate/kg"><div class="rate-val">' + (perKg != null ? fmtMoney(perKg, r.currency) + '/kg' : '—') + '</div>' +
        (r.minimum_charge ? '<div class="rate-meta">min ' + fmtMoney(r.minimum_charge, r.currency) + '</div>' : '') + '</td>' +
        '<td data-label="Total">' + (total != null ? '<div class="rate-val">' + fmtMoney(total, r.currency) + '</div>' +
        '<div class="rate-meta">at ' + weightKg + ' kg</div>' : '—') + '</td>' +
        '<td data-label="Valid"><div class="rate-meta">' +
        (r.effective_date ? 'from ' + r.effective_date : '') +
        (r.expiry_date ? '<br>to ' + r.expiry_date : '') + '</div></td>' +
        '</tr>';
    }).join('');
    resultsBody.innerHTML = '<table class="rate-table"><thead><tr>' +
      '<th>Airline</th><th>Route</th><th>Service</th><th>Rate/kg</th><th>Est. total</th><th>Validity</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table>';
  }

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  async function doSearch() {
    const origin = originEl.value.trim().toUpperCase();
    const dest = destEl.value.trim().toUpperCase();
    const weight = parseFloat(weightEl.value) || 0;
    if (!origin || !dest) {
      resultsBody.innerHTML = '<div class="results-empty">Enter origin and destination airport codes</div>';
      return;
    }
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching…';
    resultsBody.innerHTML = '<div class="results-empty">Searching published UK export rates…</div>';
    try {
      const qs = new URLSearchParams({ origin, destination: dest });
      if (weight > 0) qs.set('weight', String(weight));
      const res = await fetch(API + '/search/?' + qs.toString());
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      if (data.disclaimer) disclaimerEl.textContent = data.disclaimer;
      renderResults(data.rates || [], weight);
    } catch (e) {
      resultsBody.innerHTML = '<div class="results-empty" style="color:#dc2626">' + esc(e.message) + '</div>';
    }
    searchBtn.disabled = false;
    searchBtn.textContent = 'Search rates';
  }

  searchBtn.addEventListener('click', doSearch);
  document.getElementById('search_form').addEventListener('submit', e => { e.preventDefault(); doSearch(); });

  loadAirports();
  loadStats();
})();
