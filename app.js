const DEFAULT_SHIPPING = 9.36;

const categories = {
  bhrt: "BHRT",
  "mens-health": "Men's Health",
  dermatology: "Dermatology",
  "hair-loss": "Hair Loss",
  ldn: "LDN",
};

const products = [
  {
    id: "bhrt-standard",
    categoryId: "bhrt",
    name: "Standard BHRT",
    dosageForms: ["Cream", "Vaginal Cream", "Troche", "RDT", "Capsule", "SR Capsule"],
    pricingType: "standard",
    criteria: "Routine formulary products within approved strength ranges.",
    strengths: [
      "Bi-Est creams, DHEA cream, estradiol cream, pregnenolone cream, progesterone cream, testosterone cream",
      "Vaginal BHRT creams and listed troche/RDT/capsule/SR strengths",
    ],
    pricePoints: [
      { quantity: "1-30", unit: "GM / CT", medicationPrice: 42 },
      { quantity: 60, unit: "GM / CT", medicationPrice: 65 },
      { quantity: 90, unit: "GM / CT", medicationPrice: 89 },
      { quantity: 120, unit: "GM / CT", medicationPrice: 112 },
      { quantity: 180, unit: "GM / CT", medicationPrice: 155 },
    ],
  },
  {
    id: "bhrt-custom",
    categoryId: "bhrt",
    name: "Custom BHRT",
    dosageForms: ["Cream", "Vaginal Cream", "Troche", "RDT", "Capsule", "SR Capsule"],
    pricingType: "custom",
    criteria: "Custom BHRT combinations or strengths outside routine formulary rules.",
    pricePoints: [
      { quantity: "1-30", unit: "GM / CT", medicationPrice: 52, plusFlag: true, reviewRequired: true },
      { quantity: 60, unit: "GM / CT", medicationPrice: 75, plusFlag: true, reviewRequired: true },
      { quantity: 90, unit: "GM / CT", medicationPrice: 99, plusFlag: true, reviewRequired: true },
      { quantity: 120, unit: "GM / CT", medicationPrice: 125, plusFlag: true, reviewRequired: true },
      { quantity: 180, unit: "GM / CT", medicationPrice: 168, plusFlag: true, reviewRequired: true },
    ],
    customTriggers: ["Non-standard strength", "Custom combination", "High-cost ingredient"],
  },
  {
    id: "mens-ed-tiers",
    categoryId: "mens-health",
    name: "ED Troche / RDT / Oral Solution Tiers",
    dosageForms: ["Troche", "RDT", "Oral Solution"],
    pricingType: "per-unit",
    criteria: "Tiered per-unit pricing by active complexity.",
    priceMatrix: {
      columns: ["Tier", "Criteria", "Unit Price", "Example 30 CT", "Example 60 CT"],
      rows: [
        ["Tier 1", "Single PDE5", "$2.50 each", "$75.00", "$150.00"],
        ["Tier 2", "Two PDE5", "$3.50 each", "$105.00", "$210.00"],
        ["Tier 3", "1-2 PDE5 + Apomorphine", "$4.00 each", "$120.00", "$240.00"],
        ["Tier 4", "Complex 4+ actives", "$5.00 each", "$150.00", "$300.00"],
        ["Tier 5", "Custom with PT-141 and/or oxytocin", "$6.00 each", "$180.00", "$360.00"],
      ],
    },
    pricePoints: [
      { quantity: "Tier 1: Single PDE5", unit: "CT", unitPrice: 2.5 },
      { quantity: "Tier 2: Two PDE5", unit: "CT", unitPrice: 3.5 },
      { quantity: "Tier 3: 1-2 PDE5 + Apomorphine", unit: "CT", unitPrice: 4 },
      { quantity: "Tier 4: Complex 4+ actives", unit: "CT", unitPrice: 5 },
      { quantity: "Tier 5: PT-141 and/or oxytocin", unit: "CT", unitPrice: 6, plusFlag: true, reviewRequired: true },
    ],
    tags: ["PT-141", "Oxytocin"],
  },
  {
    id: "mens-product-specific",
    categoryId: "mens-health",
    name: "Men's Health Product-Specific Pricing",
    dosageForms: ["Cream", "Capsule", "Troche"],
    pricingType: "product-specific",
    criteria: "Product and strength-specific medication-only pricing.",
    priceMatrix: {
      columns: ["Product group", "Strengths", "15", "30", "60", "90", "120", "180"],
      rows: [
        ["Standard DHEA/Preg/Testosterone cream", "DHEA 100 mg/gm; Pregnenolone 100 mg/gm; Testosterone 1-49 mg/gm", "", "$42", "$65", "$89", "$112", "$155"],
        ["Testosterone Cream", "50/100/150 mg/gm", "$45", "$55", "$90", "$123", "$157", "$225"],
        ["Testosterone Cream", "200/250 mg/gm", "$50", "$62", "$99", "$135", "$172", "$245"],
        ["Anastrozole Cap", "0.125/0.25/0.5/0.75 mg", "", "$40", "$75", "$110", "$145", "$215"],
        ["Enclomiphene Cap", "6.25 mg", "", "$45", "$75", "$94", "$125", "$175"],
        ["Enclomiphene Cap", "12/15 mg", "", "$54", "$87", "$112", "$139", "$199"],
        ["Enclomiphene Cap", "25 mg", "", "$75", "$120", "$155", "$190", "$275"],
        ["Enclomiphene Cap", "50 mg", "$75", "$120", "$185", "$240", "$290", "$390"],
        ["Clomiphene Citrate IR", "25 mg", "", "$55", "$90", "$125", "$160", "$235"],
        ["Clomiphene Citrate IR", "56 mg", "", "$65", "$105", "$145", "$185", "$270"],
        ["Testosterone Troche", "1/2/5/10 mg", "", "$42", "$65", "$89", "$112", "$155"],
        ["Testosterone Troche", "100/200 mg", "", "$57", "$90", "$130", "$173", "$260"],
      ],
    },
    pricePoints: [{ quantity: 30, unit: "CT / GM", medicationPrice: 40 }],
  },
  {
    id: "derm-tiers",
    categoryId: "dermatology",
    name: "Dermatology Tier Pricing",
    dosageForms: ["Cream"],
    pricingType: "tier",
    criteria: "Topical dermatology formulas priced by ingredient complexity.",
    priceMatrix: {
      columns: ["Tier", "Criteria", "30 GM Med-Only", "60 GM Med-Only", "60 GM Total w/ Shipping"],
      rows: [
        ["Tier 1", "Fast movers / 1-2 common actives", "$39.00", "$50.00", "$59.36"],
        ["Tier 2", "2-3 common actives", "$49.00", "$65.00", "$74.36"],
        ["Tier 3", "4+ common actives", "$59.00", "$79.00", "$88.36"],
        ["Tier 4", "Tazarotene / Eflornithine / Tofacitinib", "$69.00", "$95.00", "$104.36"],
        ["Tier 5", "Custom / NAD+ / GHK-Cu", "$79.00+", "$109.00+", "$118.36+"],
      ],
    },
    pricePoints: [
      { quantity: "Tier 1 - 30", unit: "GM", medicationPrice: 39 },
      { quantity: "Tier 1 - 60", unit: "GM", medicationPrice: 50 },
      { quantity: "Tier 2 - 30", unit: "GM", medicationPrice: 49 },
      { quantity: "Tier 2 - 60", unit: "GM", medicationPrice: 65 },
      { quantity: "Tier 3 - 30", unit: "GM", medicationPrice: 59 },
      { quantity: "Tier 3 - 60", unit: "GM", medicationPrice: 79 },
      { quantity: "Tier 4 - 30", unit: "GM", medicationPrice: 69 },
      { quantity: "Tier 4 - 60", unit: "GM", medicationPrice: 95 },
      { quantity: "Tier 5 - 30", unit: "GM", medicationPrice: 79, plusFlag: true, reviewRequired: true },
      { quantity: "Tier 5 - 60", unit: "GM", medicationPrice: 109, plusFlag: true, reviewRequired: true },
    ],
    customTriggers: ["Tazarotene", "Eflornithine", "Tofacitinib", "NAD+", "GHK-Cu"],
  },
  {
    id: "hair-loss-tiers",
    categoryId: "hair-loss",
    name: "Hair Loss Tier Pricing",
    dosageForms: ["Solution", "Foam", "Topical"],
    pricingType: "tier",
    criteria: "Hair-loss formulas priced by active count and specialty ingredients.",
    priceMatrix: {
      columns: ["Tier", "Criteria", "30 ML Med-Only", "60 ML Med-Only", "60 ML Total w/ Shipping"],
      rows: [
        ["Tier 1", "Fast movers / 1-2 common actives", "$49.00", "$65.00", "$74.36"],
        ["Tier 2", "3-4 common actives", "$59.00", "$79.00", "$88.36"],
        ["Tier 3", "Latanoprost / Levocetirizine / 4+ actives", "$69.00", "$95.00", "$104.36"],
        ["Tier 4", "Custom / Peptide", "$79.00+", "$109.00+", "$118.36+"],
      ],
    },
    pricePoints: [
      { quantity: "Tier 1 - 30", unit: "ML", medicationPrice: 49 },
      { quantity: "Tier 1 - 60", unit: "ML", medicationPrice: 65 },
      { quantity: "Tier 2 - 30", unit: "ML", medicationPrice: 59 },
      { quantity: "Tier 2 - 60", unit: "ML", medicationPrice: 79 },
      { quantity: "Tier 3 - 30", unit: "ML", medicationPrice: 69 },
      { quantity: "Tier 3 - 60", unit: "ML", medicationPrice: 95 },
      { quantity: "Tier 4 - 30", unit: "ML", medicationPrice: 79, plusFlag: true, reviewRequired: true },
      { quantity: "Tier 4 - 60", unit: "ML", medicationPrice: 109, plusFlag: true, reviewRequired: true },
    ],
    customTriggers: ["Latanoprost", "Levocetirizine", "Peptide"],
  },
  {
    id: "ldn-capsules",
    categoryId: "ldn",
    name: "LDN Capsule",
    dosageForms: ["Capsule"],
    pricingType: "product-specific",
    criteria: "LDN capsules in approved strengths.",
    strengths: ["0.5, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 8, 10 mg"],
    pricePoints: [
      { quantity: 30, unit: "CT", medicationPrice: 40 },
      { quantity: 60, unit: "CT", medicationPrice: 64 },
      { quantity: 90, unit: "CT", medicationPrice: 82 },
      { quantity: 120, unit: "CT", medicationPrice: 106 },
    ],
  },
  {
    id: "ldn-tablets",
    categoryId: "ldn",
    name: "LDN Tablet",
    dosageForms: ["Tablet"],
    pricingType: "product-specific",
    criteria: "LDN tablets in approved strengths.",
    strengths: ["0.5, 1.5, 3, 4.5 mg"],
    pricePoints: [
      { quantity: 30, unit: "CT", medicationPrice: 30 },
      { quantity: 60, unit: "CT", medicationPrice: 54 },
      { quantity: 90, unit: "CT", medicationPrice: 72 },
      { quantity: 120, unit: "CT", medicationPrice: 96 },
    ],
  },
];

const state = {
  category: "all",
  form: "all",
  pricing: "all",
  review: "all",
  search: "",
  shippingMethod: "ship",
  view: "cards",
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  formFilter: document.querySelector("#formFilter"),
  pricingFilter: document.querySelector("#pricingFilter"),
  reviewFilter: document.querySelector("#reviewFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  productGrid: document.querySelector("#productGrid"),
  productTable: document.querySelector("#productTable"),
  productTableWrap: document.querySelector("#productTableWrap"),
  emptyState: document.querySelector("#emptyState"),
  resultCount: document.querySelector("#resultCount"),
  cardViewButton: document.querySelector("#cardViewButton"),
  tableViewButton: document.querySelector("#tableViewButton"),
  dialog: document.querySelector("#detailDialog"),
  closeDialog: document.querySelector("#closeDialog"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogCategory: document.querySelector("#dialogCategory"),
  dialogBody: document.querySelector("#dialogBody"),
};

function money(value, plus = false) {
  if (value === undefined || value === null || Number.isNaN(value)) return "Review Required";
  return `$${Number(value).toFixed(2)}${plus ? "+" : ""}`;
}

function shippedTotal(pricePoint) {
  if (!pricePoint || pricePoint.medicationPrice === undefined) return null;
  const shipping = state.shippingMethod === "ship" ? DEFAULT_SHIPPING : 0;
  return pricePoint.medicationPrice + shipping;
}

function startingPoint(product) {
  const direct = product.pricePoints?.find((point) => point.medicationPrice !== undefined);
  if (direct) return direct;
  const unit = product.pricePoints?.find((point) => point.unitPrice !== undefined);
  if (unit) return { ...unit, medicationPrice: unit.unitPrice * 30 };
  return null;
}

function isReviewRequired(product) {
  return Boolean(product.pricePoints?.some((point) => point.plusFlag || point.reviewRequired));
}

function productSearchText(product) {
  return [
    product.name,
    categories[product.categoryId],
    product.criteria,
    product.pricingType,
    product.dosageForms.join(" "),
    product.strengths?.join(" "),
    product.tags?.join(" "),
    product.customTriggers?.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function fillSelect(select, values, label = "All") {
  select.innerHTML = `<option value="all">${label}</option>${values
    .map((value) => `<option value="${value}">${value}</option>`)
    .join("")}`;
}

function initFilters() {
  fillSelect(els.categoryFilter, Object.entries(categories).map(([id, name]) => `${id}|${name}`), "All categories");
  [...els.categoryFilter.options].forEach((option) => {
    if (option.value.includes("|")) {
      const [id, name] = option.value.split("|");
      option.value = id;
      option.textContent = name;
    }
  });
  fillSelect(els.formFilter, uniqueSorted(products.flatMap((product) => product.dosageForms)), "All dosage forms");
  fillSelect(
    els.pricingFilter,
    uniqueSorted(products.map((product) => product.pricingType)),
    "All pricing types",
  );
}

function filteredProducts() {
  const query = state.search.trim().toLowerCase();
  return products.filter((product) => {
    const matchesCategory = state.category === "all" || product.categoryId === state.category;
    const matchesForm = state.form === "all" || product.dosageForms.includes(state.form);
    const matchesPricing = state.pricing === "all" || product.pricingType === state.pricing;
    const review = isReviewRequired(product);
    const matchesReview =
      state.review === "all" || (state.review === "review" && review) || (state.review === "standard" && !review);
    const matchesSearch = !query || productSearchText(product).includes(query);
    return matchesCategory && matchesForm && matchesPricing && matchesReview && matchesSearch;
  });
}

function renderMetrics() {
  document.querySelector("#metricCategories").textContent = Object.keys(categories).length;
  document.querySelector("#metricProducts").textContent = products.length;
  document.querySelector("#metricReview").textContent = products.filter(isReviewRequired).length;
}

function renderPriceBoxes(product) {
  const start = startingPoint(product);
  const total = shippedTotal(start);
  return `
    <div class="price-box">
      <span>Starting med-only</span>
      <strong>${start?.unitPrice ? `${money(start.unitPrice)} / unit` : money(start?.medicationPrice, start?.plusFlag)}</strong>
    </div>
    <div class="price-box">
      <span>${state.shippingMethod === "ship" ? "Starting shipped" : "Pickup total"}</span>
      <strong>${money(total, start?.plusFlag)}</strong>
    </div>
  `;
}

function cardMarkup(product) {
  const review = isReviewRequired(product);
  return `
    <article class="product-card">
      <header>
        <div class="meta-row">
          <span class="tag">${categories[product.categoryId]}</span>
          <span class="badge ${review ? "review" : "standard"}">${review ? "Review required" : "Standard quote"}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.criteria}</p>
      </header>
      <div class="tag-row">${product.dosageForms.map((form) => `<span class="tag">${form}</span>`).join("")}</div>
      <div class="price-row">${renderPriceBoxes(product)}</div>
      <div class="card-actions">
        <button class="primary-button" type="button" data-detail="${product.id}">View details</button>
        <button class="secondary-button" type="button" data-calc="${product.id}">Calculate</button>
      </div>
    </article>
  `;
}

function renderTable(productsToRender) {
  els.productTable.innerHTML = productsToRender
    .map((product) => {
      const start = startingPoint(product);
      const review = isReviewRequired(product);
      return `
        <tr>
          <td><strong>${product.name}</strong><br><button class="ghost-button" type="button" data-detail="${product.id}">View details</button></td>
          <td>${categories[product.categoryId]}</td>
          <td>${product.dosageForms.join(", ")}</td>
          <td>${product.pricingType}</td>
          <td>${start?.unitPrice ? `${money(start.unitPrice)} / unit` : money(start?.medicationPrice, start?.plusFlag)}</td>
          <td>${money(shippedTotal(start), start?.plusFlag)}</td>
          <td><span class="badge ${review ? "review" : "standard"}">${review ? "Review required" : "Standard"}</span></td>
        </tr>
      `;
    })
    .join("");
}

function renderCatalog() {
  const visible = filteredProducts();
  els.resultCount.textContent = `${visible.length} product group${visible.length === 1 ? "" : "s"}`;
  els.productGrid.innerHTML = visible.map(cardMarkup).join("");
  renderTable(visible);
  els.emptyState.classList.toggle("hidden", visible.length > 0);
  els.productGrid.classList.toggle("hidden", state.view !== "cards" || visible.length === 0);
  els.productTableWrap.classList.toggle("hidden", state.view !== "table" || visible.length === 0);
  els.cardViewButton.classList.toggle("active", state.view === "cards");
  els.tableViewButton.classList.toggle("active", state.view === "table");
}

function renderPriceRows(product) {
  if (product.priceMatrix) {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr>${product.priceMatrix.columns.map((col) => `<th>${col}</th>`).join("")}</tr></thead>
          <tbody>${product.priceMatrix.rows
            .map((row) => `<tr>${row.map((cell) => `<td>${cell || "—"}</td>`).join("")}</tr>`)
            .join("")}</tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Medication-only</th>
            <th>${state.shippingMethod === "ship" ? "Patient total shipped" : "Pickup total"}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${product.pricePoints
            .map((point) => {
              const medication = point.unitPrice ? point.unitPrice * 30 : point.medicationPrice;
              const total = medication === undefined ? null : medication + (state.shippingMethod === "ship" ? DEFAULT_SHIPPING : 0);
              return `
                <tr>
                  <td>${point.quantity}</td>
                  <td>${point.unit}${point.unitPrice ? " per unit" : ""}</td>
                  <td>${point.unitPrice ? `${money(point.unitPrice)} each` : money(point.medicationPrice, point.plusFlag)}</td>
                  <td>${money(total, point.plusFlag)}${point.unitPrice ? " for 30 units" : ""}</td>
                  <td>${point.reviewRequired || point.plusFlag ? "Review required" : "Standard quote"}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCalculator(product) {
  const options = product.pricePoints
    ?.map((point, index) => {
      const base = point.medicationPrice ?? point.unitPrice ?? 0;
      const label = point.unitPrice
        ? `${point.quantity} - ${money(point.unitPrice)} each`
        : `${point.quantity} ${point.unit} - ${money(point.medicationPrice, point.plusFlag)}`;
      return `<option value="${index}" data-base="${base}" data-unit="${point.unitPrice ? "1" : "0"}">${label}</option>`;
    })
    .join("");

  return `
    <aside class="calculator">
      <h3>Price calculator</h3>
      <label>
        Price point
        <select id="calcPricePoint">${options}</select>
      </label>
      <label>
        Quantity for per-unit items
        <input id="calcQuantity" type="number" min="1" value="30" />
      </label>
      <div class="calc-output">
        <div><span>Medication</span><strong id="calcMedication">$0.00</strong></div>
        <div><span>Shipping</span><strong id="calcShipping">$0.00</strong></div>
        <div><span>Total</span><strong id="calcTotal">$0.00</strong></div>
      </div>
    </aside>
  `;
}

function updateDialogCalculator(product) {
  const select = document.querySelector("#calcPricePoint");
  const quantity = document.querySelector("#calcQuantity");
  if (!select || !quantity) return;
  const point = product.pricePoints[Number(select.value)];
  const isUnit = point.unitPrice !== undefined;
  quantity.disabled = !isUnit;
  const med = isUnit ? point.unitPrice * Number(quantity.value || 0) : point.medicationPrice;
  const shipping = state.shippingMethod === "ship" ? DEFAULT_SHIPPING : 0;
  document.querySelector("#calcMedication").textContent = money(med, point.plusFlag);
  document.querySelector("#calcShipping").textContent = money(shipping);
  document.querySelector("#calcTotal").textContent = money(med + shipping, point.plusFlag);
}

function openDetail(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  els.dialogTitle.textContent = product.name;
  els.dialogCategory.textContent = categories[product.categoryId];
  els.dialogBody.innerHTML = `
    <div class="detail-grid">
      <div class="detail-section">
        <p>${product.criteria}</p>
        <div class="tag-row">${product.dosageForms.map((form) => `<span class="tag">${form}</span>`).join("")}</div>
        ${
          product.strengths
            ? `<section><h3>Strengths / formulary notes</h3><ul>${product.strengths.map((item) => `<li>${item}</li>`).join("")}</ul></section>`
            : ""
        }
        ${
          product.customTriggers
            ? `<section><h3>Review triggers</h3><ul>${product.customTriggers.map((item) => `<li>${item}</li>`).join("")}</ul></section>`
            : ""
        }
      </div>
      ${renderCalculator(product)}
    </div>
    <section class="detail-section">
      <h3>Pricing</h3>
      ${renderPriceRows(product)}
    </section>
  `;
  els.dialog.showModal();
  updateDialogCalculator(product);
  document.querySelector("#calcPricePoint")?.addEventListener("change", () => updateDialogCalculator(product));
  document.querySelector("#calcQuantity")?.addEventListener("input", () => updateDialogCalculator(product));
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderCatalog();
  });
  els.categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderCatalog();
  });
  els.formFilter.addEventListener("change", (event) => {
    state.form = event.target.value;
    renderCatalog();
  });
  els.pricingFilter.addEventListener("change", (event) => {
    state.pricing = event.target.value;
    renderCatalog();
  });
  els.reviewFilter.addEventListener("change", (event) => {
    state.review = event.target.value;
    renderCatalog();
  });
  document.querySelectorAll("input[name='shippingMethod']").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      state.shippingMethod = event.target.value;
      renderCatalog();
    });
  });
  els.resetFilters.addEventListener("click", () => {
    state.category = "all";
    state.form = "all";
    state.pricing = "all";
    state.review = "all";
    state.search = "";
    els.searchInput.value = "";
    els.categoryFilter.value = "all";
    els.formFilter.value = "all";
    els.pricingFilter.value = "all";
    els.reviewFilter.value = "all";
    renderCatalog();
  });
  els.cardViewButton.addEventListener("click", () => {
    state.view = "cards";
    renderCatalog();
  });
  els.tableViewButton.addEventListener("click", () => {
    state.view = "table";
    renderCatalog();
  });
  document.body.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-detail], [data-calc]");
    if (detailButton) openDetail(detailButton.dataset.detail || detailButton.dataset.calc);
  });
  els.productGrid.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".product-card");
    if (card) card.classList.add("is-hovered");
  });
  els.productGrid.addEventListener("mouseout", (event) => {
    const card = event.target.closest(".product-card");
    if (card && !card.contains(event.relatedTarget)) card.classList.remove("is-hovered");
  });
  els.closeDialog.addEventListener("click", () => els.dialog.close());
}

initFilters();
renderMetrics();
bindEvents();
renderCatalog();
