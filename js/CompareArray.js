/**
 * [리팩토링 버전] Set과 직렬화를 이용한 고성능 필터링 함수
 */
const intersectByKeysRefactored = (arrA, arrB, ...keys) => {
  if (!keys.length) return [];

  // 1. 특정 객체에서 지정된 키들의 값만 뽑아 고유한 식별 문자열을 만드는 순수 함수
  const getIdentifier = (obj) => 
    JSON.stringify(keys.map(key => obj[key]));

  // 2. arrB의 식별자들을 Set으로 생성 (검색 성능 O(1))
  const targetIdentifiers = new Set(arrB.map(getIdentifier));

  // 3. arrA를 필터링 (식별자가 Set에 존재하는 것만 남김)
  return arrA.filter(obj => targetIdentifiers.has(getIdentifier(obj)));
};
// 테스트 데이터
const listA = [
  { id: 1, code: 'A', name: 'Apple' },
  { id: 2, code: 'B', name: 'Banana' },
  { id: 3, code: 'A', name: 'Cherry' }, // code는 같지만 id가 다름
];

const listB = [
  { id: 1, code: 'A', note: 'Discount' },
  { id: 4, code: 'C', note: 'New' },
];

// 테스트 실행 (기준 키: 'id', 'code')
const result = intersectByKeysRefactored(listA, listB, 'id', 'code');

// 결과 검증
console.log('결과:', result);
/* 출력: [ { id: 1, code: 'A', name: 'Apple' } ]
설명: id와 code가 모두 일치하는 요소는 id: 1인 객체뿐입니다.
*/

// 테스트 케이스 2: 키가 하나일 때
const resultSingleKey = intersectByKeysRefactored(listA, listB, 'code');
console.log('결과(단일키):', resultSingleKey);
/*
출력: [ { id: 1, code: 'A', name: 'Apple' }, { id: 3, code: 'A', name: 'Cherry' } ]
설명: code: 'A'를 가진 모든 요소가 반환됩니다.
*/
