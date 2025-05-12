// 영화 정보
// - 영화 검색
// -- 필터링 검색(전체 검색은 미지원, 기본 옵션을 제목 검색으로, 한 번에 하나의 필터(제목/인물/장르/줄거리/)만 선택해 검색 가능)
//제목
//영화계 인물 검색: tmdb 연결 예시용
const personalUrl = "https://api.themoviedb.org/3/search/person?";
//include_adult=false&language=en-US&page=1
const personalOptions = {
  method: "GET",
  headers: { accept: "application/json" },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));

//장르

//줄거리

// - 영화 리뷰
// -- 해당 영화에 태그된 모든 리뷰 출력(좋아요도 반환값에 포함)
// - 영화 리스트 출력
// -- 최신순 정렬
// --- 개봉일 오름차순 조회
// -- 평점 높은 순 정렬
// --- 우리 사이트 내 평점 내림차순 조회
// -- 추천순 정렬
// --- 알고리즘 추천 영화 조회
// - 특정 영화 상세
// -- movie 테이블 내 모든 요소+해당 영화 리뷰 좋아요 상위 5개?
