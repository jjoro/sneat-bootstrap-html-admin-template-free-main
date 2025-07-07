/**
 * @file Bootstrap 메뉴 생성 함수 (함수형 JavaScript)
 * @description 플랫 데이터로부터 중첩된 Bootstrap 5 메뉴 HTML을 생성합니다.
 */

// --- 데이터 타입 정의 (JSDoc) ---
/**
 * @typedef {object} MenuItem
 * @property {string} label
 * @property {string} [url]
 * @property {MenuItem[]} [children]
 */
/** @typedef {object} FlatMenuSegment ... */
/** @typedef {FlatMenuSegment[]} FlatMenuPath ... */
/** @typedef {object} RawMenuDataItem ... */

// --- 데이터 변환 함수들 (원본과 동일, 변경 없음) ---

const preprocessRawMenuData = (rawDataArray) => {
  if (!Array.isArray(rawDataArray)) return [];
  return rawDataArray
    .map((rawPathObject) => {
      const path = [];
      let i = 1;
      while (rawPathObject[`level_nm${i}`]) {
        path.push({
          level_cd: rawPathObject[`level_cd${i}`] || String(i),
          level_nm: rawPathObject[`level_nm${i}`],
          url: rawPathObject.url,
        });
        i++;
      }
      return path;
    })
    .filter((path) => path.length > 0);
};

const mergePathIntoLevel = (currentTreeLevel, path) => {
  if (!path || path.length === 0) return currentTreeLevel;

  const [currentSegment, ...restOfPath] = path;
  const { level_nm, url } = currentSegment;
  const existingItemIndex = currentTreeLevel.findIndex(
    (item) => item.label === level_nm
  );

  if (existingItemIndex !== -1) {
    const itemToUpdate = currentTreeLevel[existingItemIndex];
    const updatedChildren = mergePathIntoLevel(
      itemToUpdate.children || [],
      restOfPath
    );
    return [
      ...currentTreeLevel.slice(0, existingItemIndex),
      {
        ...itemToUpdate,
        url: url || itemToUpdate.url,
        children: updatedChildren.length > 0 ? updatedChildren : undefined,
      },
      ...currentTreeLevel.slice(existingItemIndex + 1),
    ];
  } else {
    const newChildren = mergePathIntoLevel([], restOfPath);
    const newItem = {
      label: level_nm,
      ...(url && { url }),
      ...(newChildren.length > 0 && { children: newChildren }),
    };
    return [...currentTreeLevel, newItem];
  }
};

const transformFlatPathsToNestedMenu = (preprocessedPathsData) => {
  if (!Array.isArray(preprocessedPathsData)) return [];
  return preprocessedPathsData.reduce(
    (acc, path) => mergePathIntoLevel(acc, path),
    []
  );
};

// --- HTML 렌더링 함수들 (Bootstrap 용으로 수정) ---

/**
 * 간단한 메뉴 아이템(자식이 없는)의 <a> HTML 문자열을 생성합니다.
 * @param {MenuItem} item - 메뉴 아이템 객체.
 * @returns {string} 생성된 <a class="list-group-item ...">...</a> HTML 문자열.
 */
const createSimpleMenuItemHTML = (item) =>
  `
  <ul class="menu-sub">
    <li class="menu-item">
      <a href="${
        item.url || "#"
      }" class="menu-link">${item.label}</a>
    </li>
  </ul>
  `;

/**
 * 부모 메뉴 아이템(자식이 있는)의 Bootstrap collapse 구조 HTML을 생성합니다.
 * @param {MenuItem} item - 부모 메뉴 아이템 객체.
 * @param {(items: MenuItem[]) => string} renderRecursiveFn - 하위 메뉴를 렌더링하는 재귀 함수.
 * @returns {string} 생성된 Bootstrap collapse HTML 문자열.
 */
const createParentMenuItemHTML = (item, renderRecursiveFn) => {
  // Collapse ID는 label을 기반으로 생성하여 고유성을 보장합니다.
  const collapseId = `collapse-${item.label.replace(/\s+/g, "-")}`;
  const isCheckedChildren = (item.children && item.children.length > 0) ? true : false;
  const childrenHTML =
      isCheckedChildren
      ? renderRecursiveFn(item.children)
      : "";

  return `
      <ul class="menu-sub">
        <li class="menu-item">
          <a href="${
            collapseId || "#"
          }" class="${isCheckedChildren ? "menu-link menu-toggle" : "menu-link"}">${item.label}</a>
          ${childrenHTML}
        </li>
      </ul>
  `;
};

/**
 * 메뉴 아이템 배열을 받아 HTML 문자열로 변환하는 재귀 함수입니다.
 * @param {MenuItem[]} items - 메뉴 아이템 객체들의 배열.
 * @returns {string} 생성된 HTML 문자열.
 */
const renderMenuItemsRecursive = (items) => {
  if (!Array.isArray(items)) return "";
  return items
    .map((item, index) => {
      // 자식 노드가 있으면 부모 아이템으로, 없으면 단순 아이템으로 렌더링합니다.
      return item.children && item.children.length > 0
        ? createParentMenuItemHTML(item, renderMenuItemsRecursive)
        : createParentMenuItemHTML(item);
    })
    .join("");
};

/**
 * 최상위 함수: 중첩된 메뉴 데이터를 사용하여 전체 Bootstrap 메뉴 HTML을 생성합니다.
 * @param {MenuItem[]} nestedMenuData - 전체 메뉴 구조를 나타내는 중첩된 MenuItem 객체 배열.
 * @param {string} [ulClasses="list-group"] - 최상위 컨테이너에 적용할 CSS 클래스.
 * @returns {string} 완성된 Bootstrap 메뉴 HTML 문자열.
 */
const generateBootstrapMenuFromNested = (
  nestedMenuData,
  containerClasses = ""
) => {
  if (!Array.isArray(nestedMenuData) || nestedMenuData.length === 0) {
    return `<div class="${containerClasses}"><a href="#" class="list-group-item">메뉴 데이터가 비어있습니다.</a></div>`;
  }
  const menuItemsHTML = renderMenuItemsRecursive(nestedMenuData);
  return `
  <div class="${containerClasses}">
      ${menuItemsHTML}
  </div>
  `;
};

/**
 * 최종 사용자용 함수: 원시 메뉴 데이터를 받아 전체 Bootstrap 메뉴 HTML을 생성합니다.
 * @param {RawMenuDataItem[]} rawMenuData - 사용자 입력 형식의 메뉴 데이터 배열.
 * @param {string} [containerClasses] - 최상위 컨테이너에 적용할 CSS 클래스 (옵셔널).
 * @returns {string} 완성된 Bootstrap 메뉴 HTML 문자열.
 */
const createBootstrapMenuFromRawData = (rawMenuData, containerClasses) => {
  const preprocessedPaths = preprocessRawMenuData(rawMenuData);
  const nestedMenu = transformFlatPathsToNestedMenu(preprocessedPaths);
  return renderMenuItemsRecursive(nestedMenu);
};

// --- 사용 예시 ---
const myMenuData = [
  {
    level_cd1: "1",
    level_nm1: "정산1-1",
    level_cd2: "2",
    level_nm2: "정산2-1",
    level_cd3: "3",
    level_nm3: "정산3-1",
  },
  {
    level_cd1: "1",
    level_nm1: "청구1-1",
    level_cd2: "2",
    level_nm2: "청구2-1",
    level_cd3: "3",
    level_nm3: "청구3-1",
  },
  {
    level_cd1: "1",
    level_nm1: "정산1-1",
    level_cd2: "2",
    level_nm2: "정산2-1",
    level_cd3: "3",
    level_nm3: "정산3-1-서브1",
  },
  { level_cd1: "1", level_nm1: "정산1-1", level_cd2: "2", level_nm2: "정산2-2" },
];

document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu1");
  if (menuContainer) {
    console.log("새로운 메뉴 아이템이 추가되었습니다.");
    const generatedMenuHTML = createBootstrapMenuFromRawData(myMenuData);
    menuContainer.innerHTML += generatedMenuHTML;
  }
});
