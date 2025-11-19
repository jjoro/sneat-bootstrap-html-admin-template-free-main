/**
 * disabled 속성을 가진 체크박스를 찾아 체크 상태를 고정하고
 * 다른 체크박스들은 체크만 안되도록 막는 함수
 */
function lockCheckboxesIfDisabled() {
  // 모든 체크박스 요소 가져오기
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    // disabled 속성이 있는 체크박스 확인
    if (checkbox.disabled) {
      // 현재 체크 상태 고정 (변경 불가)
      const isChecked = checkbox.checked;
      
      // 체크 해제 시도 방지
      checkbox.addEventListener('click', function(e) {
        e.preventDefault();
        checkbox.checked = isChecked;
      });
      
      // 다른 모든 체크박스는 체크만 방지 (disabled는 안 함)
      checkboxes.forEach(otherCheckbox => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.addEventListener('click', function(e) {
            if (this.checked) {
              e.preventDefault();
              this.checked = false;
            }
          });
        }
      });
    }
  });
}

/**
 * 특정 체크박스가 disabled일 때 다른 체크박스의 체크를 막는 함수
 * @param {string} targetSelector - 감시할 체크박스의 선택자
 */
function lockAllCheckboxesOnDisabled(targetSelector) {
  const targetCheckbox = document.querySelector(targetSelector);
  
  if (!targetCheckbox) {
    console.error('체크박스를 찾을 수 없습니다:', targetSelector);
    return;
  }
  
  // MutationObserver로 disabled 속성 변경 감시
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
        if (targetCheckbox.disabled) {
          // 현재 체크 상태 저장
          const currentState = targetCheckbox.checked;
          
          // 모든 체크박스의 체크만 방지
          const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
          allCheckboxes.forEach(cb => {
            if (cb !== targetCheckbox) {
              // 체크 시도 방지
              cb.addEventListener('click', function(e) {
                if (this.checked) {
                  e.preventDefault();
                  this.checked = false;
                }
              });
            } else {
              cb.checked = currentState; // 대상 체크박스 상태 유지
            }
          });
        }
      }
    });
  });
  
  // 속성 변경 감시 시작
  observer.observe(targetCheckbox, { attributes: true });
}

/**
 * 체크박스 그룹 전체를 제어하는 함수
 * @param {string} containerSelector - 체크박스 그룹을 포함하는 컨테이너 선택자
 */
function controlCheckboxGroup(containerSelector) {
  const container = document.querySelector(containerSelector);
  
  if (!container) {
    console.error('컨테이너를 찾을 수 없습니다:', containerSelector);
    return;
  }
  
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function(e) {
      // disabled 체크박스가 있는지 확인
      const disabledCheckbox = Array.from(checkboxes).find(cb => cb.disabled);
      
      if (disabledCheckbox) {
        // disabled가 아닌 체크박스의 체크 시도를 막음
        if (this !== disabledCheckbox && this.checked) {
          e.preventDefault();
          this.checked = false;
        }
        
        // disabled 체크박스의 상태는 고정
        if (this === disabledCheckbox) {
          const savedState = disabledCheckbox.dataset.lockedState === 'true';
          disabledCheckbox.checked = savedState;
        }
      }
    });
    
    // disabled 상태일 때 현재 체크 상태 저장
    if (checkbox.disabled) {
      checkbox.dataset.lockedState = checkbox.checked;
    }
  });
}

// 사용 예시
// 1. 페이지 로드 시 모든 체크박스 확인
document.addEventListener('DOMContentLoaded', function() {
  lockCheckboxesIfDisabled();
});

// 2. 특정 체크박스 감시
// lockAllCheckboxesOnDisabled('#myCheckbox');

// 3. 특정 컨테이너 내 체크박스 그룹 제어
// controlCheckboxGroup('.checkbox-group');
