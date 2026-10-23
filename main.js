(() => {
  "use strict";
  const form = document.getElementById("rent-calculator");
  if (!form) return;
  const ids = ["rent", "service", "electricOld", "electricNew", "electricPrice", "waterOld", "waterNew", "waterPrice"];
  const inputs = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
  const money = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });
  const qty = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 });
  const formatMoney = value => money.format(value) + " ₫";
  const totals = ["result-rent", "result-service", "result-electric", "result-water", "result-total"];
  const errorNode = document.getElementById("calc-error");
  const fields = ids.map(id => inputs[id]);
  const MAX_MONEY = 500000000;
  const MAX_READING = 100000000;
  function calculate() {
    let invalid = false;
    let description = "";
    const values = {};
    for (const input of fields) {
      const value = Number(input.value);
      const upper = ["electricOld", "electricNew", "waterOld", "waterNew"].includes(input.id) ? MAX_READING : MAX_MONEY;
      const bad = input.value.trim() === "" || !Number.isFinite(value) || value < 0 || value > upper;
      input.setAttribute("aria-invalid", String(bad));
      if (bad) {
        invalid = true;
        description = "Vui lòng nhập các số từ 0 trở lên, trong giới hạn hợp lý.";
      }
      values[input.id] = value;
    }
    if (!invalid && (values.electricNew < values.electricOld || values.waterNew < values.waterOld)) {
      invalid = true;
      description = "Số điện/nước mới phải lớn hơn hoặc bằng số cũ. Đồng hồ quay vòng hoặc thay mới cần được xử lý riêng trong ứng dụng chính thức.";
      for (const name of ["electricNew", "waterNew"]) {
        if (values[name] < values[name.replace("New", "Old")]) inputs[name].setAttribute("aria-invalid", "true");
      }
    }
    errorNode.hidden = !invalid;
    errorNode.textContent = invalid ? description : "";
    const area = document.querySelector(".calc-result");
    const totalArea = document.querySelector(".calc-total");
    area.style.opacity = invalid ? ".38" : "1";
    totalArea.style.opacity = invalid ? ".38" : "1";
    if (invalid) {
      document.getElementById("result-total").textContent = "—";
      return;
    }
    const eUnits = Math.round((values.electricNew - values.electricOld) * 100) / 100;
    const wUnits = Math.round((values.waterNew - values.waterOld) * 100) / 100;
    const electricity = Math.round(eUnits * values.electricPrice);
    const water = Math.round(wUnits * values.waterPrice);
    const rent = Math.round(values.rent);
    const service = Math.round(values.service);
    const total = rent + service + electricity + water;
    if (![electricity, water, total].every(Number.isSafeInteger)) {
      errorNode.hidden = false;
      errorNode.textContent = "Số tiền quá lớn để tính chính xác trong bản mô phỏng.";
      document.getElementById("result-total").textContent = "—";
      return;
    }
    document.getElementById("label-electric").textContent = "Điện · " + qty.format(eUnits) + " kWh";
    document.getElementById("label-water").textContent = "Nước · " + qty.format(wUnits) + " m³";
    document.getElementById("result-rent").textContent = formatMoney(rent);
    document.getElementById("result-electric").textContent = formatMoney(electricity);
    document.getElementById("result-water").textContent = formatMoney(water);
    document.getElementById("result-service").textContent = formatMoney(service);
    document.getElementById("result-total").textContent = formatMoney(total);
  }
  fields.forEach(input => input.addEventListener("input", calculate));
  form.addEventListener("submit", e => e.preventDefault());
  document.getElementById("reset").addEventListener("click", () => {
    form.reset();
    calculate();
    inputs.rent.focus();
  });
  calculate();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.setAttribute("aria-label", expanded ? "Mở menu" : "Đóng menu");
      nav.classList.toggle("is-open", !expanded);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Mở menu");
    }));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  const share = document.getElementById("share");
  if (share) share.addEventListener("click", async () => {
    const url = window.location.href.split("#")[0];
    const prior = share.textContent;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url });
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        share.textContent = "Đã sao chép ✓";
        share.setAttribute("aria-label", "Đã sao chép liên kết");
      } else {
        share.textContent = "Sao chép URL trên thanh địa chỉ";
      }
    } catch (error) {
      if (error?.name !== "AbortError") share.textContent = "Sao chép URL trên thanh địa chỉ";
    }
    if (share.textContent !== prior) {
      share.addEventListener("blur", () => { share.textContent = prior; share.removeAttribute("aria-label"); }, { once: true });
    }
  });
})();