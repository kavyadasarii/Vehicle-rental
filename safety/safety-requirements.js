// Safety & Requirements page — measurement tools
// (Theme toggle, RTL toggle, and menus are handled by the shared script.js)
(function () {
  const $ = (id) => document.getElementById(id);

  
  const headInput = $('head-cm');
  const helmetOut = $('helmet-out');
  const scaleItems = Array.from(document.querySelectorAll('#helmet-scale li'));

  function updateHelmet() {
    if (!headInput) return;
    const sizeEl = helmetOut.querySelector('.size');
    const msgEl = helmetOut.querySelector('p');
    const v = parseFloat(headInput.value);
    scaleItems.forEach((li) => li.classList.remove('on'));

    if (isNaN(v)) {
      sizeEl.textContent = '\u2013';
      msgEl.textContent = 'Enter your head measurement to see your size.';
      return;
    }
    if (v < 40 || v > 75) {
      sizeEl.textContent = '?';
      msgEl.textContent = 'That measurement looks off. Measure again around the widest part of your head.';
      return;
    }
    if (v < 53) {
      sizeEl.textContent = 'Youth';
      msgEl.textContent = 'Smaller than our adult range. Ask the crew about youth helmets when you book.';
      return;
    }
    if (v >= 65) {
      sizeEl.textContent = 'XXL+';
      msgEl.textContent = 'Larger than our standard range. Call ahead so we can have a bigger helmet ready.';
      return;
    }
    const match = scaleItems.find((li) => v >= +li.dataset.min && v < +li.dataset.max);
    if (match) {
      match.classList.add('on');
      sizeEl.textContent = match.querySelector('b').textContent;
      msgEl.textContent = 'Head measurement ' + v + ' cm. We\u2019ll fit-check it at the trailhead.';
    }
  }
  if (headInput) headInput.addEventListener('input', updateHelmet);

  
  const VEHICLES = [
    { name: 'ATV',                driver: { age: 18, h: 150, w: 110 }, pass: null },
    { name: 'UTV / side-by-side', driver: { age: 18, h: 150, w: 120 }, pass: { h: 120, w: 120, adultOnly: false } },
    { name: 'Dirt bike',          driver: { age: 18, h: 160, w: 100 }, pass: null },
    { name: 'Dune buggy',         driver: { age: 18, h: 150, w: 120 }, pass: { h: 120, w: 120, adultOnly: true } }
  ];

  const hEl = $('fit-height'), wEl = $('fit-weight'), aEl = $('fit-age'), rEl = $('fit-role'), out = $('fit-out');

  function evaluate(v, p) {
    const reasons = [];
    let note = '';
    if (p.role === 'driver') {
      const d = v.driver;
      if (p.a < d.age) reasons.push('Drivers must be ' + d.age + ' or older');
      if (p.h < d.h) reasons.push('Minimum driver height is ' + d.h + ' cm');
      if (p.w > d.w) reasons.push('Maximum weight is ' + d.w + ' kg');
      if (!reasons.length) note = 'Meets the driver limits (' + d.h + ' cm or taller, up to ' + d.w + ' kg)';
    } else {
      const s = v.pass;
      if (!s) {
        reasons.push('No passenger seat on this vehicle');
      } else {
        if (s.adultOnly && p.a < 18) reasons.push('Passengers must be 18 or older');
        if (p.h < s.h) reasons.push('Minimum passenger height is ' + s.h + ' cm');
        if (p.w > s.w) reasons.push('Maximum weight is ' + s.w + ' kg');
        if (!reasons.length) {
          note = p.a < 18
            ? 'Fits. Ride with a parent or guardian on board'
            : 'Meets the passenger limits (' + s.h + ' cm or taller, up to ' + s.w + ' kg)';
        }
      }
    }
    return { ok: reasons.length === 0, text: reasons.length ? reasons.join('. ') : note };
  }

  function message(text) {
    const d = document.createElement('div');
    d.className = 'sf-empty';
    d.textContent = text;
    return d;
  }

  // Builds the ok/not-eligible pill. Styling (including the small status
  // dot) is handled entirely by .sf-pill/.sf-pill::before in CSS, so no
  // icon markup is created here.
  function pill(ok) {
    const span = document.createElement('span');
    span.className = 'sf-pill ' + (ok ? 'ok' : 'no');
    span.textContent = ok ? 'Good to go' : 'Not eligible';
    return span;
  }

  function updateFit() {
    if (!hEl || !wEl || !aEl || !rEl || !out) return;
    const h = parseFloat(hEl.value), w = parseFloat(wEl.value), a = parseFloat(aEl.value);
    out.replaceChildren();

    if (isNaN(h) || isNaN(w) || isNaN(a)) {
      out.appendChild(message('Enter your height, weight and age to see which vehicles fit.'));
      return;
    }
    if (h < 80 || h > 230 || w < 20 || w > 250 || a < 4 || a > 99) {
      out.appendChild(message('Those numbers look off. Double-check your height in cm, weight in kg and age, then try again.'));
      return;
    }

    const list = document.createElement('ul');
    list.className = 'sf-fit-list';
    VEHICLES.forEach((v) => {
      const res = evaluate(v, { h: h, w: w, a: a, role: rEl.value });

      const li = document.createElement('li');
      li.className = 'sf-fit-row';

      const info = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = v.name;
      const detail = document.createElement('small');
      detail.textContent = res.text;
      info.append(name, detail);

      li.append(info, pill(res.ok));
      list.appendChild(li);
    });
    out.appendChild(list);
  }

  [hEl, wEl, aEl].forEach((el) => { if (el) el.addEventListener('input', updateFit); });
  if (rEl) rEl.addEventListener('change', updateFit);
})();
