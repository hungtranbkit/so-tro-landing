(() => {
  "use strict";

  // Self-contained, illustrative 60-second product walkthrough; no analytics or API calls.
  const player = document.getElementById("tour-v2-content");
  const caption = document.getElementById("tour-v2-subtitle");
  const progress = document.getElementById("tour-v2-progress");
  const time = document.getElementById("tour-v2-time");
  const play = document.getElementById("tour-v2-play");
  const previous = document.getElementById("tour-v2-prev");
  const next = document.getElementById("tour-v2-next");
  const chapters = Array.from(document.querySelectorAll("[data-tour-index]"));

  const scenes = [
    {
      headline: "Mở bản dùng thử",
      caption: "Truy cập Sổ Trọ mới, chọn “Mở bản dùng thử”. Không nhập thông tin người thuê thật.",
      body: '<div class="tour-v2-box"><strong>Chào mừng đến Sổ Trọ</strong><small>Quản lý nhà trọ nhẹ nhàng hơn</small></div><div class="tour-v2-highlight">Mở bản dùng thử →</div>'
    },
    {
      headline: "Kiểm tra danh sách phòng",
      caption: "Xem phòng trống/đang thuê, giá thuê và người ở cùng trước khi tính tiền.",
      body: '<div class="tour-v2-box flex"><strong>A01</strong><span class="tour-v2-tag">Đang thuê</span></div><div class="tour-v2-box flex"><strong>A02</strong><span class="tour-v2-tag">Còn trống</span></div><div class="tour-v2-box"><small>Giá phòng A01</small><strong>1.500.000 ₫</strong></div>'
    },
    {
      headline: "Ghi điện & nước",
      caption: "Nhập số mới cho từng phòng. Kiểm tra số cũ, số mới và lượng đã dùng.",
      body: '<div class="tour-v2-box"><small>Điện — số cũ 100</small><strong>125 kWh</strong><small>Tiêu thụ: 25 kWh</small></div><div class="tour-v2-box"><small>Nước — số cũ 10</small><strong>13 m³</strong><small>Tiêu thụ: 3 m³</small></div>'
    },
    {
      headline: "Rà soát & chốt hóa đơn",
      caption: "Kiểm tra tiền phòng, điện, nước và phụ phí trước khi chốt hóa đơn.",
      body: '<div class="tour-v2-box flex"><span>Tiền phòng</span><strong>1.500.000 ₫</strong></div><div class="tour-v2-box flex"><span>Điện + nước</span><strong>123.500 ₫</strong></div><div class="tour-v2-highlight">Tổng 1.673.500 ₫</div>'
    },
    {
      headline: "Gửi Zalo, ghi đã thu",
      caption: "Sao chép phiếu sang Zalo, người thuê chuyển khoản VietQR, chủ trọ xác nhận số tiền đã nhận.",
      body: '<div class="tour-v2-box"><strong>Hóa đơn A03</strong><small>Hạn thanh toán · Mã VietQR</small></div><div class="tour-v2-box flex"><span>Đã thu</span><strong>500.000 ₫</strong></div><div class="tour-v2-highlight">Còn lại 1.173.500 ₫</div>'
    },
    {
      headline: "In & lưu hợp đồng",
      caption: "Tạo hợp đồng, in PDF A4, ký tay rồi lưu ảnh/PDF bản đã ký trong hồ sơ riêng.",
      body: '<div class="tour-v2-box"><strong>Hợp đồng phòng A03</strong><small>Bản in A4 · có chỗ ký hai bên</small></div><div class="tour-v2-box"><span class="tour-v2-tag">Đã kiểm tra bản ký</span><small>Lưu hồ sơ PDF/ảnh có mã hóa</small></div><div class="tour-v2-highlight">In PDF / Xem tài liệu</div>'
    }
  ];
  let elapsed = 0;
  let running = false;
  let last = 0;
  let animation = 0;
  const duration = 60;
  const pad = value => String(value).padStart(2, "0");

  function render() {
    if (!player || !caption || !progress || !time) return;
    const index = Math.min(scenes.length - 1, Math.floor(elapsed / 10));
    const scene = scenes[index];
    if (player.dataset.scene !== String(index)) {
      player.dataset.scene = String(index);
      // Static trusted scene templates: no user-supplied HTML is interpolated.
      player.innerHTML = '<div class="tour-v2-kicker">BƯỚC ' + (index + 1) + ' / 6</div><h3>' + scene.headline + '</h3>' + scene.body;
      caption.textContent = scene.caption;
    }
    chapters.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
      if (i === index) btn.setAttribute("aria-current", "step"); else btn.removeAttribute("aria-current");
    });
    progress.style.width = (elapsed / duration * 100).toFixed(1) + "%";
    time.textContent = "00:" + pad(Math.floor(elapsed)) + " / 01:00";
    if (play) {
      play.textContent = running ? "❚❚ Tạm dừng" : elapsed >= duration ? "↺ Phát lại video" : "▶ Phát hướng dẫn";
      play.setAttribute("aria-pressed", String(running));
    }
  }

  function pause() {
    running = false;
    if (animation) cancelAnimationFrame(animation);
    animation = 0;
    render();
  }
  function tick(now) {
    if (!running) return;
    const delta = Math.min((now - last) / 1000, 0.25);
    last = now;
    elapsed = Math.min(duration, elapsed + Math.max(delta, 0));
    if (elapsed >= duration) { pause(); return; }
    render();
    animation = requestAnimationFrame(tick);
  }
  function seek(index) {
    const step = Math.max(0, Math.min(scenes.length - 1, index));
    elapsed = step * 10;
    render();
  }

  if (player && play && previous && next) {
    render();
    play.addEventListener("click", () => {
      if (running) return pause();
      if (elapsed >= duration) elapsed = 0;
      running = true;
      last = performance.now();
      animation = requestAnimationFrame(tick);
      render();
    });
    previous.addEventListener("click", () => seek(Math.floor(elapsed / 10) - 1));
    next.addEventListener("click", () => seek(Math.floor(elapsed / 10) + 1));
    chapters.forEach(button => button.addEventListener("click", () => seek(Number(button.dataset.tourIndex))));
    document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  }

  const form = document.getElementById("request-v2-form");
  if (form) form.addEventListener("submit", async event => {
    event.preventDefault();
    const topic = document.getElementById("request-v2-topic");
    const description = document.getElementById("request-v2-description");
    const status = document.getElementById("request-v2-status");
    const fallback = document.getElementById("request-v2-fallback");
    const text = description.value.trim();
    if (text.length < 10) {
      status.textContent = "Bạn hãy mô tả ít nhất 10 ký tự để admin hiểu rõ yêu cầu.";
      description.focus();
      return;
    }
    const message = [
      "Xin chào admin Sổ Trọ, tôi muốn trao đổi thêm tính năng:",
      "Nhóm tính năng: " + topic.value,
      "Yêu cầu: " + text,
      "Mong được tư vấn giải pháp và chi phí (nếu có)."
    ].join("\n");
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("clipboard_unavailable");
      await navigator.clipboard.writeText(message);
      status.textContent = "✓ Đã sao chép yêu cầu. Bấm “Mở Zalo gửi admin” và dán nội dung vào khung chat 0942 591 888.";
      fallback.hidden = true;
      fallback.value = "";
    } catch {
      fallback.hidden = false;
      fallback.value = message;
      fallback.focus();
      fallback.select();
      status.textContent = "Trình duyệt chưa cho sao chép tự động. Hãy sao chép phần nội dung bên dưới, rồi mở Zalo để gửi.";
    }
  });
})();
