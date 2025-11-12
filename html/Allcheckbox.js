// 부모 체크박스 클릭 시 자식 체크박스들을 동기화
function syncChildCheckboxes(parentCheckbox) {
  // disabled 상태면 동작하지 않음
  if (parentCheckbox.disabled) {
    return;
  }

  const authCd = parentCheckbox.getAttribute('auth_cd');
  const isChecked = parentCheckbox.checked;
  
  // 동일한 auth_cd를 가진 모든 자식 체크박스 찾기
  const childCheckboxes = document.querySelectorAll(
    `input[type="checkbox"][auth_cd="${authCd}"].child`
  );
  
  // 각 자식 체크박스의 상태 변경 (disabled가 아닌 경우만)
  childCheckboxes.forEach(checkbox => {
    if (!checkbox.disabled) {
      checkbox.checked = isChecked;
    }
  });
}

// 자식 체크박스 클릭 시 부모 체크박스 상태 업데이트
function syncParentCheckbox(childCheckbox) {
  // disabled 상태면 동작하지 않음
  if (childCheckbox.disabled) {
    return;
  }

  const authCd = childCheckbox.getAttribute('auth_cd');
  
  // 동일한 auth_cd를 가진 부모 체크박스 찾기
  const parentCheckbox = document.querySelector(
    `input[type="checkbox"][auth_cd="${authCd}"].parent`
  );
  
  if (!parentCheckbox || parentCheckbox.disabled) {
    return;
  }
  
  // 동일한 auth_cd를 가진 모든 자식 체크박스 찾기
  const childCheckboxes = document.querySelectorAll(
    `input[type="checkbox"][auth_cd="${authCd}"].child`
  );
  
  // disabled가 아닌 자식 체크박스들만 필터링
  const activeChildren = Array.from(childCheckboxes).filter(cb => !cb.disabled);
  
  // 모든 활성 자식이 체크되어 있는지 확인
  const allChecked = activeChildren.length > 0 && 
                     activeChildren.every(cb => cb.checked);
  
  // 부모 체크박스 상태 업데이트
  parentCheckbox.checked = allChecked;
}

// 이벤트 리스너 설정 함수
function initializeCheckboxSync() {
  // 모든 부모 체크박스에 이벤트 리스너 추가
  const parentCheckboxes = document.querySelectorAll(
    'input[type="checkbox"].parent'
  );
  
  parentCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      syncChildCheckboxes(this);
    });
  });
  
  // 모든 자식 체크박스에 이벤트 리스너 추가
  const childCheckboxes = document.querySelectorAll(
    'input[type="checkbox"].child'
  );
  
  childCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      syncParentCheckbox(this);
    });
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initializeCheckboxSync);

// 또는 직접 호출
// initializeCheckboxSync();
