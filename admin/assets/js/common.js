
let slideUp = (target, duration = 500) => {
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
    }, duration);
};

let slideDown = (target, duration = 500) => {
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
    }, duration);
};

let slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};


document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('#nav > ul > li > ul > li > a');
	const openLink = document.querySelectorAll('#nav > ul > li > ul > li ul');
	openLink.forEach(link => {
		openLinkCount = link.querySelectorAll('li').length;
		link.style.maxHeight = openLinkCount * 36 + 16 + 'px';
	})

	navLinks.forEach(function(link) {
		link.addEventListener('click', function(event) {
			const parentLi = this.parentElement;
			const siblingUl = this.nextElementSibling;

			document.querySelectorAll('#nav > ul > li > ul > li').forEach(function(li) {
				if (li !== parentLi) {
					li.classList.remove('open');
					li.classList.add('close');
				}
			});
			if (siblingUl) {
				event.preventDefault();
				if(parentLi.classList.contains('open')){
					parentLi.classList.remove('open');
					parentLi.classList.add('close');
				}else{
					parentLi.classList.add('open');
					parentLi.classList.remove('close');
				}
			} else {
				parentLi.classList.add('open');
				parentLi.classList.remove('close');
			}
		});
	});
});


// 바이트 계산
document.addEventListener('DOMContentLoaded', function () {
	const maxInitial = 90;
	const maxExtended = 2000;
	const maxByteElements = document.querySelectorAll('.max-byte');
	function updateByteLength(element) {
		let textValue = element.value;
		let byteCount = getByteLength(textValue);

		let maxByteDisplay = element.closest('.input-group').querySelector('.max-len strong');
		let lenDisplay = element.closest('.input-group').querySelector('.max-len b');
		if (byteCount > maxInitial) {
			maxByteDisplay.textContent = maxExtended;
		} else {
			maxByteDisplay.textContent = maxInitial;
		}
		if (byteCount > maxExtended) {
			element.value = truncateToByteLength(textValue, maxExtended);
			byteCount = getByteLength(element.value);
		}
		lenDisplay.textContent = byteCount;
	}
	maxByteElements.forEach(function (element) {
		updateByteLength(element);
	});
	document.addEventListener('input', function (event) {
		if (event.target.matches('.max-byte')) {
			updateByteLength(event.target);
		}
	});
});
function getByteLength(str) {
	let byteLength = 0;
	for (let i = 0; i < str.length; i++) {
		byteLength += (str.charCodeAt(i) > 127) ? 2 : 1;
	}
	return byteLength;
}
function truncateToByteLength(str, maxLength) {
	let byteLength = 0;
	let truncatedStr = '';
	for (let i = 0; i < str.length; i++) {
		let charByteLength = (str.charCodeAt(i) > 127) ? 2 : 1;
		if (byteLength + charByteLength > maxLength) {
			break;
		}
		truncatedStr += str[i];
		byteLength += charByteLength;
	}
	return truncatedStr;
}

//input 최대값 계산
document.addEventListener('input', function (event) {
if (event.target.matches('.max-text')) {
	let tsVal = event.target.value;
	let numChar = tsVal.length;
	const maxNum = event.target.getAttribute('maxlength');
	let lenDisplay = event.target.closest('.input-group').querySelector('.max-len b');
	if (numChar > maxNum) {
	event.target.value = tsVal.substr(0, maxNum);
	lenDisplay.textContent = numChar;
	} else {
	lenDisplay.textContent = numChar;
	}
}
});


document.addEventListener("DOMContentLoaded", function () {

//input 최대값 계산 - 페이지 로드 시 최대값 계산해서 출력
const maxLenSpans = document.querySelectorAll('.max-len');
maxLenSpans.forEach(function (maxLenSpan) {
	const inputGroup = maxLenSpan.closest('.input-group');
	const maxText = inputGroup.querySelector('.max-text');
	
	if (maxText) {
		let numChar = maxText.value.length;
		maxLenSpan.querySelector('b').textContent = numChar;
	}
});


//input tel 숫자만 입력
function allowOnlyNumbersForTelInputs() {
	const telInputs = document.querySelectorAll('input[type="tel"]');
	telInputs.forEach(function (telInput) {
	telInput.addEventListener('input', function () {
		this.value = this.value.replace(/[^0-9]/g, '');
	});
	});
}
allowOnlyNumbersForTelInputs();

//input 가격 콤마처리
function formatAmountWithComma(value) {
	value = value.replace(/[^0-9]/g, '');
	value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return value;
}

function numberFotmatComma() {
	const telInputs = document.querySelectorAll('input[data-amount-comma]');
	telInputs.forEach(function (telInput) {
		telInput.value = formatAmountWithComma(telInput.value);

		telInput.addEventListener('input', function () {
			this.value = formatAmountWithComma(this.value);
		});
	});
}
numberFotmatComma();

//input 특수문자 입력불가
function restrictSpecialCharacters() {
	const inputs = document.querySelectorAll('input[data-input-texts]');
	const specialCharsRegex = /[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g; // 특수 문자 제외 정규 표현식

	inputs.forEach(function(input) {
		input.addEventListener('input', function() {
			this.value = this.value.replace(specialCharsRegex, '');
		});
	});
}
restrictSpecialCharacters();
});

//체크박스 전체 체크 
document.addEventListener("DOMContentLoaded", function () {
document.querySelectorAll('.label_control input[type="checkbox"]').forEach(function (check) {
	check.addEventListener('change', function (event) {
	const target = event.target;
	const labelControlParent = check.closest('.label_control_parent');
	const checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check_all_parent') : null;
	if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
		const isChecked = target.checked;
		const checkboxes = check.closest('.label_control').querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach(function (checkbox) {
		checkbox.checked = isChecked;
		});
		if (!isChecked) {
		target.checked = false; // check_all 비활성화
		if (checkAllParentCheckbox) {
			checkAllParentCheckbox.checked = false; // check_all 비활성화
		}
		}
	} else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
		const checkAllCheckbox = check.closest('.label_control').querySelector('.check_all');
		if (checkAllCheckbox) {
		checkAllCheckbox.checked = false; // check_all 비활성화
		}
		if (checkAllParentCheckbox) {
		checkAllParentCheckbox.checked = false; // check_all 비활성화
		}
	}
	});
});
});
/*
document.addEventListener("DOMContentLoaded", function () {
document.querySelectorAll('.label_control').forEach(function (labelControl) {
	labelControl.addEventListener('change', function (event) {
	const target = event.target;
	if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
		const isChecked = target.checked;
		const checkboxes = labelControl.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach(function (checkbox) {
		checkbox.checked = isChecked;
		});
		if (!isChecked) {
		target.checked = false; // check_all 비활성화
		}
	} else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
		const checkAllCheckbox = labelControl.querySelector('.check_all');
		if (checkAllCheckbox) {
		checkAllCheckbox.checked = false; // check_all 비활성화
		}
	}
	});
});
});*/

//공통 쿠키 셋 겟
function setCookie(name, value, days) {
var expires = '';
if (days) {
	var date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	expires = '; expires=' + date.toUTCString();
}
document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name) {
var nameEQ = name + '=';
var ca = document.cookie.split(';');
for (var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') c = c.substring(1, c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
}
return null;
}

//로딩바 생성
document.addEventListener("DOMContentLoaded", function() {
var loadingDiv = document.createElement("div");
loadingDiv.classList.add("loading");
document.body.appendChild(loadingDiv);
var loadingInnerDiv = document.createElement("div");
loadingInnerDiv.classList.add("loading_inner");
loadingDiv.appendChild(loadingInnerDiv);
})
function loading(action) {
const loadingDiv = document.querySelector('.loading');
if (action === 'show') {
	loadingDiv.classList.add('active');
} else if (action === 'hide') {
	loadingDiv.classList.remove('active');
}
}

// 라디오 변경에 따른 display
function handleRadioChange() {
var groupName = this.getAttribute("name");
var sameRadios = document.querySelectorAll('input[name="'+ groupName +'"]');
sameRadios.forEach(function(target) {
	var displayTargets = target.getAttribute("radio-display").split(" ");
	displayTargets.forEach(function(target) {
		var elements = document.getElementsByClassName(target);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
	});
	if(target.getAttribute("radio-display-hide")){
		var displayHideTargets = target.getAttribute("radio-display-hide").split(" ");
		displayHideTargets.forEach(function(target) {
			var elements = document.getElementsByClassName(target);
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = "none";
			}
		});
	}
});
var selectedTargets = this.getAttribute("radio-display").split(" ");
selectedTargets.forEach(function(target) {
	var selectedElements = document.getElementsByClassName(target);
	for (var i = 0; i < selectedElements.length; i++) {
		selectedElements[i].style.display = "";
	}
});
}

// 검색 셀렉트 박스 변경에 따른 display
function handleSearchSelectChange() {
var options = this.querySelectorAll('.item a');

// 모든 대상 요소 숨기기
options.forEach(function(target) {
	var displayTargets = target.getAttribute("select-display").split(" ");
	displayTargets.forEach(function(targetClass) {
		var elements = document.getElementsByClassName(targetClass);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
	});
	if(target.getAttribute("select-display-hide")){
		var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
		displayHideTargets.forEach(function(target) {
		var elements = document.getElementsByClassName(target);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
		});
	}
});

// active 클래스를 가진 옵션의 인덱스를 찾기
let activeIndex = -1;
for (let i = 0; i < options.length; i++) {
	if (options[i].classList.contains('active')) {
		activeIndex = i;
		break;
	}
}

// active 클래스를 가진 옵션이 있으면 해당 옵션의 display 설정
if (activeIndex !== -1) {
	var selectedOption = options[activeIndex];
	var selectedTargets = selectedOption.getAttribute("select-display");
	if (selectedTargets) {
		var targetsArray = selectedTargets.split(" ");
		targetsArray.forEach(function(targetClass) {
			var selectedElements = document.getElementsByClassName(targetClass);
			for (var i = 0; i < selectedElements.length; i++) {
				selectedElements[i].style.display = "";
			}
		});
	}
}
}

// 셀렉트박스 변경에 따른 display
function handleSelectChange() {
var options = this.querySelectorAll('option');

options.forEach(function(target) {
	var displayTargets = target.getAttribute("select-display").split(" ");
	displayTargets.forEach(function(target) {
		var elements = document.getElementsByClassName(target);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
	});
	if(target.getAttribute("select-display-hide")){
		var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
		displayHideTargets.forEach(function(target) {
		var elements = document.getElementsByClassName(target);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
		});
	}
});

var selectedOption = this.options[this.selectedIndex];
var selectedTargets = selectedOption.getAttribute("select-display");
if (selectedTargets) {
	var targetsArray = selectedTargets.split(" ");
	targetsArray.forEach(function(target) {
		var selectedElements = document.getElementsByClassName(target);
		for (var i = 0; i < selectedElements.length; i++) {
			selectedElements[i].style.display = "";
		}
	});
}
}

document.addEventListener("DOMContentLoaded", function() {

// 라디오 버튼 변경 이벤트 리스너 등록
var radios = document.querySelectorAll('input[radio-display]');
radios.forEach(function(radio) {
	radio.addEventListener("change", handleRadioChange);
	// 페이지 로드 시 라디오 버튼의 상태에 따라 초기 화면 설정
	if (radio.checked) {
		handleRadioChange.call(radio); // 선택된 라디오 버튼에 대한 처리 실행
	}
});


// 셀렉트 디스플레이 변경 이벤트 리스너 등록
var selects = document.querySelectorAll('select.select-display');
selects.forEach(function(select) {
	select.addEventListener("change", handleSelectChange);
	// 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
	if (checkVisibility(select)) {
		if (select.selectedIndex > 0) {
		handleSelectChange.call(select);
		}
	}
});


// 검색셀렉트 디스플레이 변경 이벤트 리스너 등록
var searchSelects = document.querySelectorAll('.search_select.select-display');
searchSelects.forEach(function(select) {
	select.addEventListener("click", handleSearchSelectChange);
	// 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
	if (checkVisibility(select)) {
	handleSearchSelectChange.call(select);
	}
});
});

// 가시성 체크 함수
function checkVisibility(element) {
while (element) {
	if (element === document.body) {
	break;
	}
	const style = window.getComputedStyle(element);
	if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
	return false;
	}
	element = element.parentElement;
}
const rect = element.getBoundingClientRect();
return rect.width > 0 && rect.height > 0;
}

//라디오, 셀렉트 디스플레이 초기화 셋
function radioSelectdisplaySet(){
var selects = document.querySelectorAll('select.select-display');
	selects.forEach(function(select) {
		if (checkVisibility(select)) {
		if (select.selectedIndex > 0) {
			handleSelectChange.call(select);
		}
		}
	});

var searchSelects = document.querySelectorAll('.search_select.select-display');
searchSelects.forEach(function(select) {
	if (checkVisibility(select)) {
	handleSearchSelectChange.call(select);
	}
});

var radios = document.querySelectorAll('input[radio-display]');
radios.forEach(function(radio) {
	if (checkVisibility(radio)) {
	if (radio.checked) {
		handleRadioChange.call(radio);
		}
	}
});
}

//글자 복사금지
/*
function preventRclick(){ 
$('body').on("contextmenu", function(e){ 
	return false; 
}); $('body').on("selectstart", function(e){ 
	return false; 
}); $('body').on("dragstart", function(e){ 
	return false; 
}); $('body').on("keydown",function(e){ 
	var pressedKey = String.fromCharCode(e.keyCode).toLowerCase(); 
	if (e.ctrlKey && pressedKey == "c") { 
	return false; 
	} 
});
}
preventRclick();

//우클릭 금지
document.oncontextmenu = function(){return false;}
*/
  
//커스텀 selectbox
function customSelect(button) {
    const options = button.nextElementSibling;
    const allOptions = document.querySelectorAll('.custom_select .options');
    allOptions.forEach(opt => {
        if (opt !== options) {
            opt.style.display = 'none';
            opt.classList.remove('bottom');
        }
    });

    const viewHeight = document.getElementById('layout').height;

    options.style.display = options.style.display === 'block' ? 'none' : 'block';
	const rect = options.getBoundingClientRect();
    if (rect.bottom > viewHeight) {
        options.classList.add('bottom');
    } else {
        options.classList.remove('bottom');
    }
}

function customSelectSelect(anchor) {
	const items = anchor.closest('.options').querySelectorAll('.item a');
	items.forEach(function(item) {
		item.classList.remove('active');
	});
	anchor.classList.add('active');
	const hiddenInput = anchor.closest('.custom_select').querySelector('input[type="hidden"]');
	const btnSelect = anchor.closest('.custom_select').querySelector('.select_selected');
	hiddenInput.value = anchor.getAttribute('data-id');
	btnSelect.textContent = anchor.textContent;
	anchor.closest('.custom_select .options').style.display = 'none';
	}

	document.addEventListener('click', function(event) {
	if (!event.target.closest('.custom_select')) {
		document.querySelectorAll('.custom_select .options').forEach(function(options) {
			options.style.display = 'none';
		});
	}
});

window.onload = function() {
	const activeItem = document.querySelector('.custom_select .options .item a.active');
	if (activeItem) {
		const hiddenInput = activeItem.closest('.custom_select').querySelector('input[type="hidden"]');
		const btnSelect = activeItem.closest('.custom_select').querySelector('.select_selected');
		hiddenInput.value = activeItem.getAttribute('data-id');
		btnSelect.textContent = activeItem.textContent;
	}
}


//레이어팝업 열고닫기
function openLayer(target) {
    document.querySelector(target).style.display = 'flex';
    document.querySelector('html').classList.add('scroll_hidden');
	const layerBox = document.querySelector(target).querySelector('.layer_box');
	const windowHeight = window.innerHeight;

	if (layerBox.offsetHeight >= (windowHeight - 25)) {
		layerBox.setAttribute('data-simplebar', '');
		new SimpleBar(layerBox);
	} else {
		layerBox.removeAttribute('data-simplebar');
	}
}
function closeLayer(button) {
    button.closest('.layer_popup').style.display = 'none';
    document.querySelector('html').classList.remove('scroll_hidden');
}

//체크박스 상위 tr 색변경
document.addEventListener('DOMContentLoaded', function() {
    function updateRowClass(checkbox) {
        const tr = checkbox.closest('tr');
        if (checkbox.checked) {
            tr.classList.add('bg_active');
        } else {
            tr.classList.remove('bg_active');
        }
    }
    document.querySelectorAll('input[type="checkbox"].checked_bg_tr').forEach(function(checkbox) {
        updateRowClass(checkbox);
    });
    document.addEventListener('change', function(event) {
        if (event.target.matches('input[type="checkbox"].checked_bg_tr')) {
            updateRowClass(event.target);
        }
    });

    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element 노드
                        const checkboxes = node.querySelectorAll('input[type="checkbox"].checked_bg_tr');
                        checkboxes.forEach(function(checkbox) {
                            updateRowClass(checkbox);
                            checkbox.addEventListener('change', function() {
                                updateRowClass(checkbox);
                            });
                        });
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});



//input password 비밀번호 보기
document.addEventListener('DOMContentLoaded', function() {
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
});


//datepicker
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.datepicker').forEach(function(pickerField) {
		var picker = new Pikaday({
			field: pickerField,
			showDaysInNextAndPreviousMonths: true,
			enableSelectionDaysInNextAndPreviousMonths: true, 
			onSelect: function() {
				var date = picker.getDate();
				var year = date.getFullYear();
				var month = (date.getMonth() + 1).toString().padStart(2, '0');
				var day = date.getDate().toString().padStart(2, '0');
				var formattedDate = `${year}-${month}-${day}`;
				pickerField.value = formattedDate;
			},
			showMonthAfterYear : true
			//firstDay: 1,  // 1-> 시작날짜 월요일 0-> 일요일
			//minDate: new Date(), //선택 최소날짜
			//maxDate: new Date(2020, 11, 31), //선택 최대날짜
			//yearRange: [2000, 2020] //표시년도
		});
	});
});




//검색기간 날짜 설정
document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('.radio_taps')){
		document.querySelector('.radio_taps').addEventListener('click', function(event) {
			if (event.target.tagName === 'BUTTON') {
				var button = event.target;
				var today = new Date();
				var startDate, endDate;

				function formatDate(date) {
					if (!date) return '';
					var year = date.getFullYear();
					var month = (date.getMonth() + 1).toString().padStart(2, '0');
					var day = date.getDate().toString().padStart(2, '0');
					return `${year}-${month}-${day}`;
				}

				if (button.textContent === '오늘') {
					startDate = today;
					endDate = today;
				} else if (button.textContent === '3개월') {
					startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
					endDate = today;
				} else if (button.textContent === '6개월') {
					startDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
					endDate = today;
				} else if (button.textContent === '1년') {
					startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
					endDate = today;
				} else if (button.textContent === '전체') {
					startDate = '';
					endDate = today;
				}

				button.closest('.radio_taps').querySelectorAll('button').forEach(function(btn){
					btn.classList.remove('active');
				});
				button.classList.add('active');
				document.querySelector('.date_start').value = formatDate(startDate);
				document.querySelector('.date_end').value = formatDate(endDate);
			}
		});
	}
});



//멑티 파일 첨부
document.addEventListener('DOMContentLoaded', () => {
    const inputFiles = document.querySelectorAll('.file_input');
    const fileLists = document.querySelectorAll('.add_files');

    if (!inputFiles && !fileLists) return;
    function updateFileCountMessage(fileList, inputFile) {
        if (inputFile.files.length === 0) {
            fileList.style.display = 'none';
        } else {
            fileList.style.display = 'block';
        }
    }

    inputFiles.forEach((inputFile, index) => {
        const allowedTypes = inputFile.getAttribute('file-type').split(' ');
        const fileList = fileLists[index];
        const dataTransfer = new DataTransfer();

        inputFile.addEventListener('change', (event) => {
            const newFiles = Array.from(event.target.files);

            newFiles.forEach((file) => {
                const fileType = file.name.split('.').pop().toLowerCase();

                if (allowedTypes.includes(fileType)) {
                    dataTransfer.items.add(file);

                    const fileItem = document.createElement('div');
                    fileItem.className = 'file_item';

                    const fileName = document.createElement('span');
                    fileName.className = 'file_name';
                    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
                    const fileSizeText = fileSizeInMB < 1 
                        ? `${(file.size / 1024).toFixed(2)} KB`
                        : `${fileSizeInMB} MB`;

                    fileName.textContent = `${file.name} (${fileSizeText})`;
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
                        updateFileCountMessage(fileList, inputFile);
                    });

                    fileItem.appendChild(deleteButton);
                    fileList.appendChild(fileItem);
                }
            });

            inputFile.files = dataTransfer.files;
            updateFileCountMessage(fileList, inputFile);
        });
    });
});

// input 파일
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.file_single').forEach(function(fileDiv) {
		const fileInput = fileDiv.querySelector('input[type="file"]');
		const fileNameInput = fileDiv.querySelector('.file_name');
		const deleteBtn = fileDiv.querySelector('.remove_btn');
	
		fileInput.addEventListener('change', function() {
			if(this.files.length > 0) {
				fileNameInput.value = this.files[0].name;
				deleteBtn.style.display = 'block';
			} else {
				fileNameInput.value = '';
				deleteBtn.style.display = 'none';
			}
		});
		deleteBtn.addEventListener('click', function() {
			fileInput.value = '';
			fileNameInput.value = '';
			this.style.display = 'none';
		});
	});
});


//url input추가
document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.url_label');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const addList = this.nextElementSibling;
            addList.style.display = 'block';
            
            const urlItem = document.createElement('div');
            urlItem.className = 'url_item';
            urlItem.innerHTML = `
                <input type="text">
                <button type="button" class="file_remove">삭제</button>
            `;
            
            addList.appendChild(urlItem);
            
            const removeButton = urlItem.querySelector('.file_remove');
            removeButton.addEventListener('click', function() {
                addList.removeChild(urlItem);
                if (addList.children.length === 0) {
                    addList.style.display = 'none';
                }
            });
        });
    });
});

// input hh:mm:ss 마스크
document.addEventListener('DOMContentLoaded', () => {
    const timeInputs = document.querySelectorAll('.input-time');
    const im = new Inputmask({
        mask: "99:99:99",
        placeholder: "hh:mm:ss",
        insertMode: false,
        showMaskOnHover: false,
        hourFormat: "24"
    });

    timeInputs.forEach(input => {
        im.mask(input);
        
        input.addEventListener('blur', function() {
            validateTime(this);
        });
    });
    function validateTime(input) {
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (!timePattern.test(input.value)) {
            //유효하지 않은 시간
        } else {
            //유효함
        }
    }
});

//라디오 이미지 첨부
document.addEventListener('DOMContentLoaded', function() {
const items = document.querySelectorAll('.upload_image_radio');

items.forEach(item => {
	const fileInput = item.querySelector('input[type="file"]');
	const imgLabel = item.querySelector('.upload_label');
	const txtDiv = item.querySelector('.txt');
	const removeBtn = item.querySelector('.remove_btn');

	fileInput.addEventListener('change', function(e) {
		const file = e.target.files[0];
		if (file) {
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();

				reader.onload = function(e) {
					imgLabel.style.backgroundImage = `url('${e.target.result}')`;
					txtDiv.style.display = 'none';
					removeBtn.style.display = 'flex';
				}

				reader.readAsDataURL(file);
			} else {
				alert('이미지 파일만 업로드 가능합니다.');
				this.value = '';
			}
		}
	});

	removeBtn.addEventListener('click', function() {
		fileInput.value = '';
		imgLabel.style.backgroundImage = 'none';
		txtDiv.style.display = 'flex';
		this.style.display = 'none';
	});
});
});


//toast alert
function showToast(type, msg, duration) {
    const toastOptions = {
        duration: duration,
        newWindow: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true, 
        style: {
            background: "#fff",
        },
    };
    toastOptions.className = type;
    toastOptions.text = msg;
    Toastify(toastOptions).showToast();
}

//마우스오버 레이어 화면 밖으로 나가는거 제어 
document.addEventListener('DOMContentLoaded', () => {
    const hoverBoxes = document.querySelectorAll('.hover_box');
    hoverBoxes.forEach(box => {
        const hoverCnt = box.querySelector('.hover_cnt');

        box.addEventListener('mouseenter', () => {
            const boxRect = box.getBoundingClientRect();
            const hoverCntRect = hoverCnt.getBoundingClientRect();
            box.classList.remove('right', 'left', 'bottom', 'top');

            if (boxRect.right + hoverCntRect.width > window.innerWidth) {
                box.classList.add('right');
            }
            else if (boxRect.left - hoverCntRect.width < 0) {
                box.classList.add('left');
            }
            if (boxRect.bottom + hoverCntRect.height > window.innerHeight) {
                box.classList.add('bottom');
            }
            else if (boxRect.top - hoverCntRect.height < 0) {
                box.classList.add('top');
            }
        });
    });
});

