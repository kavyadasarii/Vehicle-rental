const chips = document.querySelectorAll('.chip[data-filter]');
const categories = document.querySelectorAll('.rent-cat');

function applyFilter(filter) {
  categories.forEach((cat) => {
    const match = filter === 'all' || cat.dataset.category === filter;
    cat.hidden = !match;
  });
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    chip.setAttribute('aria-pressed', 'true');
    applyFilter(chip.dataset.filter);
  });
});

const rateButtons = document.querySelectorAll('.seg-btn[data-rate]');
const prices = document.querySelectorAll('.price-num[data-hour]');
const unitLabels = document.querySelectorAll('.price-unit[data-rate-unit]');

const unitText = { hour: 'per hour', half: 'per half-day (4 hrs)', day: 'per full day (8 hrs)' };

function applyRate(rate) {
  prices.forEach((el) => {
    el.textContent = '₹' + Number(el.dataset[rate]).toLocaleString('en-IN');
  });
  unitLabels.forEach((el) => {
    el.textContent = unitText[rate];
  });
}

rateButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    rateButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    applyRate(btn.dataset.rate);
  });
});
