let isSliding = false; // 애니메이션 상태

let slideUp = (target, duration = 500) => {
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight; 
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        isSliding = false; // 애니메이션 완료
    }, duration);
};

let slideDown = (target, duration = 500) => {
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        isSliding = false;
    }, duration);
};

let slideToggle = (target, duration = 500) => {
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};
(function() {
    const nav = document.querySelector('#nav');
    const header = document.querySelector('#header');
    const searchBtns = document.querySelectorAll('.search_btn');
    const hdSearch = document.querySelector('.hd_search');
    const hdSearchBtn = document.querySelector('.hd_search .search_btn');
    const navallBtns = document.querySelectorAll('.navall_btn');
    const hdNavall = document.querySelector('.hd_navall');
    const hdNavallToggleBtns = document.querySelectorAll('.hd_navall .navall_ul > li > a');

    // Toggle 검색 활성화
    function toggleSearch(event) {
        event.stopPropagation();
        const isSearchActive = hdSearch.classList.toggle('active');
        hdSearchBtn.classList.toggle('hd_btn_close', isSearchActive);
        hdSearchBtn.textContent = isSearchActive ? '검색 닫기' : '검색 열기';
        hdSearchBtn.setAttribute('aria-expanded', isSearchActive);

        // 전체 메뉴 상태 초기화
        closeNavall();
        window.scrollTo(0, 0);
    }

    // 닫기 기능 (검색)
    function closeSearch() {
        hdSearch.classList.remove('active');
        hdSearchBtn.classList.remove('hd_btn_close');
        hdSearchBtn.textContent = '검색 열기';
        hdSearchBtn.setAttribute('aria-expanded', 'false');
    }

    // 닫기 기능 (전체 메뉴)
    function closeNavall() {
        hdNavall.classList.remove('active');
        header.classList.remove('nav_all_active');
        document.querySelector('html').classList.remove('scroll_hidden');
        navallBtns.forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = '전체메뉴 열기';
            btn.classList.remove('hd_btn_close');
        });
        document.removeEventListener('keydown', trapFocus);
    }

    // 포커스 트랩
    const focusableElements = header.querySelectorAll('a, button, input, select, textarea');
    function trapFocus(event) {
        const focusable = Array.from(focusableElements).filter(el => el.offsetParent !== null);
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }
    }

    // 외부 클릭 시 닫기
    function handleOutsideClick(event) {
        if (!event.target.closest('.hd_search') && !event.target.classList.contains('search_btn')) {
            closeSearch();
        }
        if (!event.target.closest('.hd_navall') && !event.target.classList.contains('navall_btn')) {
            closeNavall();
        }
    }

    // 검색 버튼 이벤트
    searchBtns.forEach(btn => btn.addEventListener('click', toggleSearch));

    // 검색 포커스 아웃 이벤트
    hdSearch.addEventListener('focusout', (event) => {
        const relatedTarget = event.relatedTarget;
        if (!hdSearch.contains(relatedTarget)) {
            closeSearch();
        }
    });

    // 전체 메뉴 버튼 이벤트
    navallBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            btn.textContent = isExpanded ? '전체메뉴 열기' : '전체메뉴 닫기';
            btn.classList.toggle('hd_btn_close', !isExpanded);
            hdNavall.classList.toggle('active', !isExpanded);
            header.classList.toggle('nav_all_active', !isExpanded);
            document.querySelector('html').classList.toggle('scroll_hidden', !isExpanded);

            if (!isExpanded) {
                document.addEventListener('keydown', trapFocus);
            } else {
                document.removeEventListener('keydown', trapFocus);
            }

            closeSearch();
            window.scrollTo(0, 0);
        });
    });

    // 외부 클릭 이벤트
    document.addEventListener('click', handleOutsideClick);

    // 마우스 엔터 시 검색 닫기
    nav.addEventListener('mouseenter', closeSearch);

    // 모바일 메뉴 1depth 토글
    hdNavallToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSliding) return;
            btn.closest('li').classList.toggle('active');
            slideToggle(btn.closest('li').querySelector('ul'), 600);
        });
    });
})();



//커스텀 selectbox
const applyChoicesToSelect = (element) => {
    if (!element.closest('.pika-single') && !element.classList.contains('choices-applied')) {
    const searchEnabled = element.hasAttribute('search-select');
    new Choices(element, {
        searchEnabled: searchEnabled, // search-select 이면 검색 활성화
        shouldSort: false,
	    itemSelectText: '',
    });
    element.classList.add('choices-applied');
}
};
const selectElements = document.querySelectorAll('select');
selectElements.forEach((element) => applyChoicesToSelect(element));
const observer = new MutationObserver((mutations) => {
mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
    if (node.tagName === 'SELECT') {
        applyChoicesToSelect(node);
    } else if (node.querySelectorAll) {
        const newSelects = node.querySelectorAll('select');
        newSelects.forEach((element) => applyChoicesToSelect(element));
    }
    });
});
});
observer.observe(document.body, { childList: true, subtree: true });


//관련 사이트 바로가기
function openSite() {
    const selectElement = document.getElementById('ft_family_site');
    const selectedUrl = selectElement.value;
    if (selectedUrl) {
        window.open(selectedUrl, '_blank');
    } else {
        alert("관련 사이트를 선택해주세요.");
    }
}

//토글 슬라이드
function toggleSlideItem(button, content ,duration){
    if (isSliding) return;
    const toggleSlide = button.closest('.item');
    let targetSlide = null;
    targetSlide = content ? content : toggleSlide.querySelector('[slide-content]');
    toggleSlide.classList.toggle('active');
    let speed = duration !== undefined ? duration : 600;
    slideToggle(targetSlide, speed);
}

//aside nav toggle
document.querySelectorAll('.aside_nav > ul > li > button').forEach(button => {
    button.addEventListener('click', function() {
        const slideContent = button.closest('li').querySelector('ul');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        toggleSlideItem(button, slideContent);
    });
});


//체크박스 전체 체크 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.label_control input[type="checkbox"]').forEach(function (check) {
        check.addEventListener('change', function (event) {
        function isVisible(element) {
            return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
        }
        const target = event.target;
        const labelControlParent = check.closest('.label_control_parent');
        const checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check_all_parent') : null;
        if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
            const isChecked = target.checked;
            const checkboxes = check.closest('.label_control').querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function (checkbox) {
            if (isVisible(checkbox) && !checkbox.disabled) {
                checkbox.checked = isChecked;
            }
            });
            if (!isChecked) {
            target.checked = false; // check-all 비활성화
            if (checkAllParentCheckbox) {
                checkAllParentCheckbox.checked = false; // check-all 비활성화
            }
            }
        } else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
            const checkAllCheckbox = check.closest('.label_control').querySelector('.check_all');
            if (checkAllCheckbox) {
            checkAllCheckbox.checked = false; // check-all 비활성화
            }
            if (checkAllParentCheckbox) {
            checkAllParentCheckbox.checked = false; // check-all 비활성화
            }
        }
        });
    });
});


//input password 비밀번호 보기
document.querySelectorAll('.btn_password_toggle').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.closest('.input').querySelector('input');
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.add('active');
            this.textContent = '비밀번호 숨기기';
        } else {
            input.type = 'password';
            this.classList.remove('active');
            this.textContent = '비밀번호 보기';
        }
    });
});

//input tel 숫자만 입력
document.querySelectorAll('input[type="tel"]').forEach(telInput => {
    telInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});


//datepicker
function initializeLitepicker(element) {
    if (element.dataset.litepickerInitialized === "true") {
        return;
    }
    var picker = new Pikaday({
        field: element,
        showDaysInNextAndPreviousMonths: true,
        enableSelectionDaysInNextAndPreviousMonths: true,
        showMonthAfterYear: true,
        onSelect: function () {
            var date = picker.getDate();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            var formattedDate = `${year}-${month}-${day}`;
            element.value = formattedDate;
        },
        //firstDay: 1,  // 1-> 시작날짜 월요일 0-> 일요일
        //minDate: new Date(), //선택 최소날짜
        //maxDate: new Date(2020, 11, 31), //선택 최대날짜
        //yearRange: [2000, 2020] //표시년도
    });
    element.dataset.litepickerInitialized = "true";
}

document.addEventListener("DOMContentLoaded", function () {
    var datepickerIcons = document.querySelectorAll('.datepicker');
    datepickerIcons.forEach(function (datepicker) {
        initializeLitepicker(datepicker);
    });
});


//게시글 프린트 
function printContent(){
    window.print();
}

//url복사
function copyUrl(url) {
	var textarea = document.createElement('textarea');
	textarea.value = url;
	document.body.appendChild(textarea);
	textarea.select();
	try {
		document.execCommand('copy');
		alert('url을 복사했습니다');
	} catch (err) {
		alert('url 복사에 실패했습니다. 직접 복사해주세요. <br/>'+ url);
	}
	document.body.removeChild(textarea);
}

//input url 추가
document.addEventListener('DOMContentLoaded', () => {
    const addLinkButtons = document.querySelectorAll('.add_link_btn');
    const urlInputs = document.querySelectorAll('.url_input');
    const addLists = document.querySelectorAll('.add_links');
    const hiddenInputs = document.querySelectorAll('.url_hidden');

    addLinkButtons.forEach((addButton, index) => {
        const urlInput = urlInputs[index];
        const addList = addLists[index];
        const hiddenInput = hiddenInputs[index];

        let storedLinks = [];

        function updateLinkList() {
            if (storedLinks.length === 0) {
                addList.style.display = 'none';
            } else {
                addList.style.display = 'block';
            }
            
            hiddenInput.value = JSON.stringify(storedLinks);
        }

        addButton.addEventListener('click', () => {
            const urlValue = urlInput.value.trim();

            if (urlValue && !storedLinks.includes(urlValue)) {
                storedLinks.push(urlValue);

                const linkItem = document.createElement('div');
                linkItem.className = 'file_item';

                const linkText = document.createElement('span');
                linkText.className = 'file_name';
                linkText.textContent = urlValue;
                linkItem.appendChild(linkText);

                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.textContent = '삭제';
                deleteButton.className = 'file_remove';

                deleteButton.addEventListener('click', () => {
                    const index = storedLinks.indexOf(urlValue);
                    if (index > -1) {
                        storedLinks.splice(index, 1);
                        linkItem.remove();
                        updateLinkList();
                    }
                });

                linkItem.appendChild(deleteButton);
                addList.appendChild(linkItem);

                urlInput.value = '';
                updateLinkList();
            }
        });
    });
});

//탭
document.addEventListener('DOMContentLoaded', function () {
    const aTags = document.querySelectorAll('.tap_control a');
    aTags.forEach(function (aTag) {
        aTag.addEventListener('click', function () {
            const siblings = this.parentNode.querySelectorAll('a');
            siblings.forEach(function (sibling) {
                sibling.classList.remove('on');
                sibling.removeAttribute('title');
            });
            this.classList.add('on');
            this.setAttribute('title', '선택됨')
            //웹접근성 선택 카테고리 알림
            var formUpdate = document.getElementById('form_update');
            if (formUpdate) {
                document.getElementById('form_update').textContent = this.querySelector('span').innerText + `이(가) 선택 되고 목록이 갱신되었습니다.`;
            }
        });
    });
    const buttons = document.querySelectorAll('.tap_control button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const siblings = this.parentNode.querySelectorAll('button');
            siblings.forEach(function (sibling) {
                sibling.classList.remove('on');
                sibling.removeAttribute('title');
            });
            this.classList.add('on');
            this.setAttribute('title', '선택됨')
            //웹접근성 선택 카테고리 알림
            var formUpdate = document.getElementById('form_update');
            if (formUpdate) {
                document.getElementById('form_update').textContent = this.querySelector('span').innerText + `이(가) 선택 되고 목록이 갱신되었습니다.`;
            }
        });
        
    });
});

//연락처 포커스
function telFocus(){
    const firstInputs = document.querySelectorAll('.tel_first');
    firstInputs.forEach(function(firstInput) {
        firstInput.addEventListener('input', function () {
            if (this.value.length === parseInt(this.getAttribute('maxlength'))) {
                const nextInput = this.closest('.input_group').querySelector('.tel_second');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
    const secondInputs = document.querySelectorAll('.tel_second');
    secondInputs.forEach(function(secondInput) {
        secondInput.addEventListener('input', function () {
            if (this.value.length === parseInt(this.getAttribute('maxlength'))) {
                const nextInput = this.closest('.input_group').querySelector('.tel_third');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
}
telFocus();



//파일 첨부
function fileUpload() {
    const fileAreas = document.querySelectorAll('.file_area');
    const inputFiles = document.querySelectorAll('.file_input');
    const fileLists = document.querySelectorAll('.add_files');
    const fileCounts = document.querySelectorAll('.file_count');

    if (!inputFiles && !fileLists && !fileCounts) return;

    function updateFileCountMessage(fileList, inputFile, fileCountInput) {
        const fileCount = inputFile.files.length;

        if (fileCount === 0) {
            fileList.style.display = 'none';
            fileCountInput.value = "파일을 가져다 놓거나 버튼을 눌러주세요. 파일이 없습니다.";
        } else {
            fileList.style.display = 'block';
            fileCountInput.value = `첨부된 파일 ${fileCount}개`;
        }
    }

    inputFiles.forEach((inputFile, index) => {
        const allowedTypes = inputFile.getAttribute('file-type').split(' ');
        const fileArea = fileAreas[index];
        const fileList = fileLists[index];
        const fileCountInput = fileCounts[index];

        if (!inputFile.hasAttribute('data-listener-added')) {
            const dataTransfer = new DataTransfer();

            inputFile.addEventListener('change', (event) => {
                const newFiles = Array.from(event.target.files);
                let fileNames = [];

                newFiles.forEach((file) => {
                    const fileType = file.name.split('.').pop().toLowerCase();

                    if (allowedTypes.includes(fileType)) {
                        dataTransfer.items.add(file);

                        const fileItem = document.createElement('div');
                        fileItem.className = 'file_item';

                        const fileTitle = document.createElement('span');
                        fileTitle.className = 'sound_only';
                        fileTitle.textContent = '첨부파일명:';
                        fileItem.appendChild(fileTitle);

                        const fileName = document.createElement('span');
                        fileName.className = 'file_name';
                        fileName.textContent = file.name;
                        fileItem.appendChild(fileName);

                        const deleteButton = document.createElement('button');
                        deleteButton.type = 'button';
                        deleteButton.textContent = '파일삭제';
                        deleteButton.className = 'file_remove';

                        deleteButton.addEventListener('click', () => {
                            for (let i = 0; i < dataTransfer.items.length; i++) {
                                if (dataTransfer.items[i].getAsFile() === file) {
                                    dataTransfer.items.remove(i);
                                    break;
                                }
                            }

                            inputFile.files = dataTransfer.files;
                            fileItem.remove();
                            updateFileCountMessage(fileList, inputFile, fileCountInput);
                        });

                        fileItem.appendChild(deleteButton);
                        fileList.appendChild(fileItem);

                        fileNames.push(file.name); 
                    }
                });

                //웹접근성 추가된 파일 알림
                var formUpdate = document.getElementById('form_update');
                if (formUpdate && fileNames.length > 0) {
                    document.getElementById('form_update').textContent = `총 ${fileNames.length}개 파일, ${fileNames.join(', ')}이 추가되었습니다.`;
                }

                inputFile.files = dataTransfer.files;
                updateFileCountMessage(fileList, inputFile, fileCountInput);
            });

            fileArea.addEventListener('dragenter', (event) => {
                event.preventDefault();
                fileArea.classList.add('file_dragover');
            });
    
            fileArea.addEventListener('dragover', (event) => {
                event.preventDefault();
                fileArea.classList.add('file_dragover');
            });
    
            fileArea.addEventListener('dragleave', (event) => {
                event.preventDefault();
                fileArea.classList.remove('file_dragover');
            });
    
            fileArea.addEventListener('drop', (event) => {
                event.preventDefault();
                fileArea.classList.remove('file_dragover');
    
                const droppedFiles = event.dataTransfer.files;
    
                Array.from(droppedFiles).forEach((file) => {
                    const fileType = file.name.split('.').pop().toLowerCase();
    
                    if (allowedTypes.includes(fileType)) {
                        dataTransfer.items.add(file);
    
                        const fileItem = document.createElement('div');
                        fileItem.className = 'file_item';
    
                        const fileName = document.createElement('span');
                        fileName.className = 'file_name';
                        fileName.textContent = file.name;
                        fileItem.appendChild(fileName);
    
                        const deleteButton = document.createElement('button');
                        deleteButton.type = 'button';
                        deleteButton.textContent = '삭제';
                        deleteButton.className = 'file_remove';
    
                        deleteButton.addEventListener('click', () => {
                            for (let i = 0; i < dataTransfer.items.length; i++) {
                                if (dataTransfer.items[i].getAsFile() === file) {
                                    dataTransfer.items.remove(i);
                                    break;
                                }
                            }
    
                            inputFile.files = dataTransfer.files;
                            fileItem.remove();
                            updateFileCountMessage(fileList, inputFile, fileCountInput);
                        });
    
                        fileItem.appendChild(deleteButton);
                        fileList.appendChild(fileItem);
                    }
                });
                inputFile.files = dataTransfer.files;
                updateFileCountMessage(fileList, inputFile, fileCountInput);
            });

            inputFile.setAttribute('data-listener-added', 'true');
        }
    });
}
fileUpload();


//접근성 탭
class TabsAutomatic {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab, false);
  }

  setSelectedTab(currentTab, setFocus) {
    if (typeof setFocus !== 'boolean') {
      setFocus = true;
    }
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('title', '선택됨');
        tab.removeAttribute('tabindex');
        this.tabpanels[i].classList.remove('hide');
        if (setFocus) {
          tab.focus();
        }
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.removeAttribute('title');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add('hide');
      }
    }
  }

  setSelectedToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }
  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].automatic');
  for (var i = 0; i < tablists.length; i++) {
    new TabsAutomatic(tablists[i]);
  }
});



//접근성 모달
const termsButtons = document.querySelectorAll('.modal_open');
const modalCloseButtons = document.querySelectorAll('.modal_close');
let lastFocusedButton = null;

termsButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const modal = document.querySelector(targetId);
        lastFocusedButton = this;
        openLayer(modal, this);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.layer_popup');
            closeLayer(modal);
        });
    });
});

function openLayer(modal, triggerButton) {
    document.querySelectorAll('.layer_popup').forEach(m => {
        m.classList.remove('visible');
    });

    if (typeof modal === 'string') {
        modal = document.querySelector(modal);
    }
    modal.classList.add('visible');
    document.documentElement.classList.add('scroll_hidden');

    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }

    const escKeyHandler = (e) => {
        if (e.key === 'Escape') {
            closeLayer(modal);
            triggerButton.focus();
            modal.removeEventListener('keydown', escKeyHandler);
        }
    };
    modal.addEventListener('keydown', escKeyHandler);

    const trapFocus = (e) => {
        const focusable = modal.querySelectorAll(
            'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    };
    modal.addEventListener('keydown', trapFocus);
}

function closeLayer(modal) {
    modal.classList.remove('visible');
    document.documentElement.classList.remove('scroll_hidden');
    if (lastFocusedButton) {
        lastFocusedButton.focus();
    }
}


//디자인 스크롤 tabindex 활성화
document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll('[data-simplebar]');
  
    containers.forEach(container => {
      if (!container.hasAttribute('simplebar-tabindex')) return;
  
      new SimpleBar(container);
      const updateTabIndex = () => {
        const contentEl = container.querySelector('.simplebar-content-wrapper');
        contentEl.setAttribute('tabindex', '0');
      };
      updateTabIndex();
    });    
});