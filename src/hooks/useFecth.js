import { useEffect, useState } from "react";

// 리액트에서 use로 시작하는 함수는 훅으로 간주되고, 특정 규칙을 부여받음
export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn(); // 컴포넌트별 사용되는 fetch함수 불러와서 사용
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn, setFetchedData]); // 의존성으로 fetch함수 입력

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData,
  };
}
