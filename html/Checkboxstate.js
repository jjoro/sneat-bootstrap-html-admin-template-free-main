// 부모 체크박스 변경 시 자식들 동기화
function handleParentCheckbox(parentCheckbox) {
  const authCd = parentCheckbox.getAttribute('auth_cd');
  const isChecked = parentCheckbox.checked;
  
  // 동일한 auth_cd를 가진 자식 체크박스들 찾기
  const childCheckboxes = document.querySelectorAll(
    `input[type="checkbox"][data-parent-auth="${authCd}"]`
  );
  
  childCheckboxes.forEach(child => {
    // disabled가 아닌 경우에만 체크 상태 변경
    if (!child.disabled) {
      child.checked = isChecked;
    }
  });
}

// 자식 체크박스 변경 시 부모 동기화
function handleChildCheckbox(childCheckbox) {
  const parentAuthCd = childCheckbox.getAttribute('data-parent-auth');
  
  // 동일한 auth_cd를 가진 부모 체크박스 찾기
  const parentCheckbox = document.querySelector(
    `input[type="checkbox"][auth_cd="${parentAuthCd}"]`
  );
  
  if (!parentCheckbox || parentCheckbox.disabled) return;
  
  // 동일한 auth_cd를 가진 모든 자식 체크박스들 확인
  const childCheckboxes = document.querySelectorAll(
    `input[type="checkbox"][data-parent-auth="${parentAuthCd}"]`
  );
  
  // 활성화된 자식 중 하나라도 체크 해제되면 부모도 해제
  let allChecked = true;
  childCheckboxes.forEach(child => {
    if (!child.disabled && !child.checked) {
      allChecked = false;
    }
  });
  
  parentCheckbox.checked = allChecked;
}

// 이벤트 리스너 초기화
function initializeCheckboxSync() {
  // 모든 부모 체크박스에 이벤트 리스너 추가
  const parentCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][auth_cd]'
  );
  
  parentCheckboxes.forEach(parent => {
    parent.addEventListener('change', function() {
      // disabled 체크박스는 변경 불가
      if (this.disabled) {
        this.checked = !this.checked; // 상태 되돌리기
        return;
      }
      handleParentCheckbox(this);
    });
  });
  
  // 모든 자식 체크박스에 이벤트 리스너 추가
  const childCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][data-parent-auth]'
  );
  
  childCheckboxes.forEach(child => {
    child.addEventListener('change', function() {
      // disabled 체크박스는 변경 불가
      if (this.disabled) {
        this.checked = !this.checked; // 상태 되돌리기
        return;
      }
      handleChildCheckbox(this);
    });
  });
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', initializeCheckboxSync);

/* 
HTML 구조 예시:

<!-- 부모 체크박스 -->
<input type="checkbox" auth_cd="AUTH001" id="parent1"> 관리자 권한

<!-- 자식 체크박스들 (동일한 auth_cd를 data-parent-auth로 가짐) -->
<input type="checkbox" data-parent-auth="AUTH001" id="child1"> 읽기
<input type="checkbox" data-parent-auth="AUTH001" id="child2"> 쓰기
<input type="checkbox" data-parent-auth="AUTH001" id="child3" disabled> 삭제 (비활성)
*/
