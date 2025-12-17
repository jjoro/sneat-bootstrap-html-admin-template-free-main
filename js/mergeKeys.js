/**
 * 두 배열을 병합하고, 객체의 경우 특정 키(들)을 기준으로 중복을 제거합니다.
 * @param {Array} arr1 - 첫 번째 배열
 * @param {Array} arr2 - 두 번째 배열
 * @param {Array<String>} uniqueKeys - 중복 검사 기준으로 삼을 객체의 키 배열 (예: ['id', 'type'])
 */
function mergeByKeys(arr1, arr2, uniqueKeys = []) {
  const merged = [...arr1, ...arr2];
  const seen = new Set();
  const result = [];

  merged.forEach((item) => {
    let identifier;

    // 1. 객체인 경우: 파라미터로 받은 key들의 값을 조합하여 식별자 생성
    if (typeof item === 'object' && item !== null) {
      if (uniqueKeys.length > 0) {
        // 지정된 키들의 값만 추출하여 배열로 만들고 문자열화
        // 예: keys=['id', 'type'] -> 값 [1, 'admin'] -> 식별자 '[1,"admin"]'
        const values = uniqueKeys.map(key => item[key]);
        identifier = JSON.stringify(values);
      } else {
        // 키 파라미터가 없으면 객체 전체를 기준으로 함
        identifier = JSON.stringify(item);
      }
    } 
    // 2. 문자열(Primitive)인 경우: 값 자체를 식별자로 사용
    else {
      identifier = item;
    }

    // 3. 중복 검사
    if (!seen.has(identifier)) {
      seen.add(identifier);
      result.push(item);
    }
  });

  return result;
}

// --- 테스트 실행 ---

// Case 1: 복합 키 (id와 type이 모두 같아야 중복으로 처리)
const users1 = [
  { id: 1, type: 'admin', name: 'Kim' },
  { id: 2, type: 'user', name: 'Lee' }
];

const users2 = [
  { id: 1, type: 'admin', name: 'Kim Duplicate' }, // 중복 (id:1, type:admin) -> 제거됨 (첫번째 배열 기준 유지)
  { id: 1, type: 'user', name: 'Kim User' },       // 유지 (id는 같지만 type이 다름)
  { id: 3, type: 'guest', name: 'Park' }
];

// 'id'와 'type' 두 가지 키를 그룹으로 묶어 중복 검사
const resultObjects = mergeByKeys(users1, users2, ['id', 'type']);


// Case 2: 문자열과 객체 혼합 (문자열은 값 자체, 객체는 id 기준)
const mixed1 = ["banana", { id: 100, val: "A" }];
const mixed2 = ["apple", "banana", { id: 100, val: "B" }]; // banana 중복, 객체(id:100) 중복

const resultMixed = mergeByKeys(mixed1, mixed2, ['id']);

console.log("--- 1. 객체 복합 키(id, type) 중복 제거 결과 ---");
console.log(JSON.stringify(resultObjects, null, 2));

console.log("\n--- 2. 혼합 배열(문자열 + 객체 id) 중복 제거 결과 ---");
console.log(resultMixed);
