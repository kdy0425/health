(function () {
  "use strict";

  function headerTemplate() {
    return [
      '<div class="app-header__inner">',
      '  <a class="app-header__logo" href="../index.html" aria-label="환경보건이용권 관리자 홈"><img src="../../assets/images/hd_logo.svg" alt="환경보건이용권 관리자"></a>',
      '  <div class="app-header__actions">',
      '    <a class="app-header__icon" href="privacy_manage.html" aria-label="개인정보 관리"><img src="../../assets/images/header_user.png" alt=""></a>',
      '    <button class="app-header__icon hamburger js-nav-open" type="button" aria-label="전체 메뉴 열기" aria-controls="navDrawer" aria-expanded="false"><img class="hamburger__surface" src="../../assets/images/figma/hamburger.svg" alt="" aria-hidden="true"><span class="hamburger__lines" aria-hidden="true"><span></span><span></span><span></span></span></button>',
      '  </div>',
      '</div>'
    ].join("");
  }

  function footerTemplate() {
    return '<span>Ⓒ<strong>KEITI</strong> ALL RIGHTS RESERVED.</span><span>Version&nbsp;1.0.0</span>';
  }

  function navMenuTemplate(settings) {
    var children = settings.children
      .map(function (item, index) {
        var activeAttributes = index === settings.activeIndex ? ' class="is-active" aria-current="page"' : "";
        var placeholderAttribute = item.placeholder ? ' data-nav-placeholder="true"' : "";
        return [
          '<li><a href="',
          item.href,
          '"',
          activeAttributes,
          placeholderAttribute,
          ">",
          item.label,
          "</a></li>"
        ].join("");
      })
      .join("");

    return [
      '<div class="nav-menu',
      settings.current ? " is-current" : "",
      settings.open ? " is-open" : "",
      '">',
      '  <button class="nav-group__item nav-group__toggle js-nav-accordion" type="button" aria-expanded="',
      String(settings.open),
      '" aria-controls="',
      settings.id,
      '">',
      '    <img src="',
      settings.icon,
      '" alt="" aria-hidden="true">',
      '    <span class="nav-group__text">',
      settings.label,
      "</span>",
      '    <span class="nav-group__arrow" aria-hidden="true"></span>',
      "  </button>",
      '  <ul class="nav-group__children" id="',
      settings.id,
      '"',
      settings.open ? "" : ' style="display:none"',
      ">",
      children,
      "</ul>",
      "</div>"
    ].join("");
  }

  function navTemplate() {
    function isCurrentNav(menuName) {
      return document.body.classList.contains("nav-current-" + menuName);
    }

    var counselOpen = isCurrentNav("counsel");
    var consultingOpen = isCurrentNav("consulting");
    var voucherOpen = isCurrentNav("voucher");
    var medicalOpen = isCurrentNav("medical");
    var systemOpen = isCurrentNav("system");
    var placeholderItems = [
      { label: "서브메뉴1", href: "#", placeholder: true },
      { label: "서브메뉴2", href: "#", placeholder: true },
      { label: "서브메뉴3", href: "#", placeholder: true }
    ];
    var counselMenu = navMenuTemplate({
      id: "navCounsel",
      icon: "../../assets/images/nav_icon1_2.svg",
      label: "상담 관리",
      children: placeholderItems,
      activeIndex: -1,
      current: counselOpen,
      open: counselOpen
    });
    var consultingMenu = navMenuTemplate({
      id: "navConsulting",
      icon: "../../assets/images/nav_icon2_1.svg",
      label: "컨설팅사업 관리",
      children: [
        { label: "컨설팅사업 총괄 관리", href: "consulting_operation_list.html" },
        { label: "컨설팅사업 신청 관리", href: "consulting_operation_list.html" }
      ],
      activeIndex: consultingOpen ? 0 : -1,
      current: consultingOpen,
      open: consultingOpen
    });
    var voucherMenu = navMenuTemplate({
      id: "navVoucher",
      icon: "../../assets/images/nav_icon3_1.svg",
      label: "환경보건이용권 관리",
      children: placeholderItems,
      activeIndex: -1,
      current: voucherOpen,
      open: voucherOpen
    });
    var medicalMenu = navMenuTemplate({
      id: "navMedical",
      icon: "../../assets/images/nav_icon3_2.svg",
      label: "진료 지원 신청 관리",
      children: placeholderItems,
      activeIndex: -1,
      current: medicalOpen,
      open: medicalOpen
    });
    var systemMenu = navMenuTemplate({
      id: "navSystem",
      icon: "../../assets/images/nav_icon4_3.svg",
      label: "사용자 관리",
      children: [
        { label: "사용기관 등록", href: "privacy_manage.html" },
        { label: "사용기관 업무시스템", href: "privacy_manage.html" },
        { label: "개인정보 관리", href: "privacy_manage.html" }
      ],
      activeIndex: systemOpen ? 2 : -1,
      current: systemOpen,
      open: systemOpen
    });

    return [
      '<aside class="nav-drawer" id="navDrawer" aria-hidden="true">',
      '  <div class="nav-drawer__header">',
      '    <img class="nav-drawer__logo" src="../../assets/images/hd_logo.svg" alt="환경보건이용권 관리자">',
      '    <div class="nav-drawer__icons">',
      '      <a class="app-header__icon" href="privacy_manage.html" aria-label="개인정보 관리"><img src="../../assets/images/header_user.png" alt=""></a>',
      '      <button class="app-header__icon nav-drawer__close js-nav-close" type="button" aria-label="전체 메뉴 닫기"></button>',
      "    </div>",
      "  </div>",
      '  <nav class="nav-drawer__body" aria-label="전체 메뉴">',
      '    <section class="nav-group"><div class="nav-group__label">사업 관리</div>',
      counselMenu,
      "</section>",
      '    <section class="nav-group"><div class="nav-group__label">컨설팅 서비스</div>',
      consultingMenu,
      "</section>",
      '    <section class="nav-group"><div class="nav-group__label">환경보건이용권 서비스</div>',
      voucherMenu,
      medicalMenu,
      "</section>",
      '    <section class="nav-group"><div class="nav-group__label">시스템 관리</div>',
      systemMenu,
      "</section>",
      "  </nav>",
      '  <div class="nav-drawer__bottom"><div class="nav-drawer__session"><span class="js-session-timer">00:52:45</span><button class="js-session-extend" type="button">연장</button></div><a href="../login/login.html">로그아웃</a></div>',
      "</aside>"
    ].join("");
  }

  function setNav(open) {
    var drawer = document.getElementById("navDrawer");
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);
    document.querySelectorAll(".js-nav-open").forEach(function (button) {
      button.setAttribute("aria-expanded", String(open));
      button.classList.toggle("is-active", open);
    });
    drawer.querySelectorAll(".js-nav-close").forEach(function (button) {
      button.classList.toggle("is-active", open);
    });
    if (open) {
      var closeButton = drawer.querySelector(".js-nav-close");
      if (closeButton) closeButton.focus();
    }
  }

  function initializeShell() {
    document.querySelectorAll(".app-header").forEach(function (header) { header.innerHTML = headerTemplate(); });
    document.querySelectorAll(".app-footer").forEach(function (footer) { footer.innerHTML = footerTemplate(); });
    if (document.querySelector(".app-header") && !document.getElementById("navDrawer")) {
      document.body.insertAdjacentHTML("beforeend", navTemplate());
    }
  }

  function initializeNav() {
    document.addEventListener("click", function (event) {
      if (event.target.closest(".js-nav-open")) setNav(true);
      if (event.target.closest(".js-nav-close")) setNav(false);
      var accordionButton = event.target.closest(".js-nav-accordion");
      if (accordionButton) {
        var currentMenu = accordionButton.closest(".nav-menu");
        var currentList = currentMenu.querySelector(".nav-group__children");
        var willOpen = !currentMenu.classList.contains("is-open");

        document.querySelectorAll(".nav-menu.is-open").forEach(function (menu) {
          if (menu === currentMenu) return;
          menu.classList.remove("is-open");
          menu.querySelector(".nav-group__toggle").setAttribute("aria-expanded", "false");
          var list = menu.querySelector(".nav-group__children");
          if (typeof slideUp === "function") slideUp(list, 260);
          else list.style.display = "none";
        });

        currentMenu.classList.toggle("is-open", willOpen);
        accordionButton.setAttribute("aria-expanded", String(willOpen));
        if (typeof slideDown === "function" && typeof slideUp === "function") {
          if (willOpen) slideDown(currentList, 260);
          else slideUp(currentList, 260);
        } else {
          currentList.style.display = willOpen ? "block" : "none";
        }
      }
      if (event.target.closest('[data-nav-placeholder="true"]')) event.preventDefault();
    });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") setNav(false); });
  }

  function initializeSessionTimer() {
    var timer = document.querySelector(".js-session-timer");
    var extend = document.querySelector(".js-session-extend");
    if (!timer || !extend) return;
    var remaining = 52 * 60 + 45;
    function render() {
      var hours = String(Math.floor(remaining / 3600)).padStart(2, "0");
      var minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
      var seconds = String(remaining % 60).padStart(2, "0");
      timer.textContent = hours + ":" + minutes + ":" + seconds;
    }
    extend.addEventListener("click", function () {
      remaining = 59 * 60 + 59;
      render();
    });
    window.setInterval(function () {
      if (remaining > 0) remaining -= 1;
      render();
    }, 1000);
  }

  function initializeSearch() {
    document.querySelectorAll(".js-search-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        var box = button.closest(".search-box");
        var panel = box && box.querySelector(".search-panel");
        if (!box || !panel || box.classList.contains("is-animating")) return;

        var willCollapse = !box.classList.contains("is-collapsed");
        var canSlide = typeof slideUp === "function" && typeof slideDown === "function";
        var duration = 260;

        if (canSlide) box.classList.add("is-animating");
        box.classList.toggle("is-collapsed", willCollapse);
        button.setAttribute("aria-expanded", String(!willCollapse));
        button.firstChild.nodeValue = willCollapse ? "상세검색 열기" : "상세검색 닫기";

        if (canSlide) {
          if (willCollapse) slideUp(panel, duration);
          else slideDown(panel, duration);
          window.setTimeout(function () {
            box.classList.remove("is-animating");
          }, duration);
        }
      });
    });
  }

  function initializeSelection() {
    document.querySelectorAll(".js-check-all").forEach(function (master) {
      master.addEventListener("change", function () {
        document.querySelectorAll(".js-row-check").forEach(function (checkbox) { checkbox.checked = master.checked; });
      });
    });
  }

  function initializeDateTimePickers() {
    if (!window.jQuery || typeof window.jQuery.fn.datetimepicker !== "function") return;
    window.jQuery(".input_time").each(function () {
      var input = window.jQuery(this);
      if (input.data("DateTimePicker")) return;
      input.datetimepicker({
        format: "HH:mm",
        ignoreReadonly: true,
        widgetPositioning: {
          horizontal: "right",
          vertical: "auto"
        }
      });
    });
  }

  function initializeFiles() {
    document.querySelectorAll(".js-upload-remove").forEach(function (button) {
      button.addEventListener("click", function () {
        var item = button.closest(".upload-item");
        if (item) item.remove();
      });
    });
    document.querySelectorAll(".js-file-input").forEach(function (input) {
      input.addEventListener("change", function () {
        var file = input.files && input.files[0];
        var target = input.closest(".photo-field");
        if (!file || !target || !file.type.startsWith("image/")) return;
        var preview = target.querySelector(".photo-preview");
        if (!preview) return;
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          preview.classList.remove("photo-preview--empty");
          preview.classList.add("photo-preview--image");
          preview.innerHTML = '<img src="' + reader.result + '" alt="선택한 사진 미리보기">';
        });
        reader.readAsDataURL(file);
      });
    });
  }

  function initializeLogin() {
    var form = document.querySelector(".login-form");
    if (!form) return;

    var loginButton = form.querySelector(".js-login-submit");
    var layer = document.querySelector(".auth-layer");
    var dialog = layer && layer.querySelector(".auth-dialog");
    var codeInput = layer && layer.querySelector("#auth_code");
    var timerText = layer && layer.querySelector(".js-auth-timer");
    var resendButton = layer && layer.querySelector(".js-auth-resend");
    var cancelButton = layer && layer.querySelector(".js-auth-cancel");
    var confirmButton = layer && layer.querySelector(".js-auth-confirm");
    var timerId = null;
    var remainingSeconds = 180;

    if (!loginButton || !layer || !dialog || !codeInput || !timerText) return;

    function renderTimer() {
      var minutes = Math.floor(remainingSeconds / 60);
      var seconds = remainingSeconds % 60;
      timerText.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }

    function startTimer() {
      window.clearInterval(timerId);
      remainingSeconds = 180;
      renderTimer();
      timerId = window.setInterval(function () {
        remainingSeconds -= 1;
        renderTimer();
        if (remainingSeconds <= 0) window.clearInterval(timerId);
      }, 1000);
    }

    function openAuthLayer() {
      layer.hidden = false;
      layer.setAttribute("aria-hidden", "false");
      document.body.classList.add("auth-layer-open");
      codeInput.value = "";
      startTimer();
      window.setTimeout(function () { dialog.focus(); }, 0);
    }

    function closeAuthLayer() {
      window.clearInterval(timerId);
      layer.hidden = true;
      layer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("auth-layer-open");
      loginButton.focus();
    }

    loginButton.addEventListener("click", openAuthLayer);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      openAuthLayer();
    });
    resendButton.addEventListener("click", function () {
      codeInput.value = "";
      startTimer();
      codeInput.focus();
    });
    cancelButton.addEventListener("click", closeAuthLayer);
    confirmButton.addEventListener("click", function () {
      codeInput.focus();
    });
    codeInput.addEventListener("input", function () {
      codeInput.value = codeInput.value.replace(/\D/g, "").slice(0, 6);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !layer.hidden) closeAuthLayer();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initializeShell();
    initializeNav();
    initializeSessionTimer();
    initializeSearch();
    initializeSelection();
    initializeDateTimePickers();
    initializeFiles();
    initializeLogin();
  });
})();
