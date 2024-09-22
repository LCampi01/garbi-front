import {
  useEffect, useState 
} from 'react';

export const usePagination = ({
  fetch, mapper
}) => {
  const [data, setData] = useState([])

  const [actualKey, setActualKey] = useState(null)
  const [nextKey, setNextKey] = useState(null)
  const [searchStack, setSearchStack] = useState([])

  useEffect(() => {
    asyncFetchData(actualKey);
    setSearchStack([]);
  }, [fetch]);

  const asyncFetchData = async (key = null) => {
    try {
      const {
        lastKey, nextKey, result 
      } = await fetch(key);

      setActualKey(lastKey)
      setNextKey(nextKey)

      var dataFetched = result;

      if (mapper) {
        dataFetched = mapper(result)
      }

      setData(dataFetched)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const prevFetch = () => {
    const newStack = [...searchStack]

    const prevKey = newStack.pop()

    setSearchStack(newStack)
    asyncFetchData(prevKey)
  }

  const nextFetch = async () => {
    const newStack = [...searchStack]
    newStack.push(actualKey)

    setSearchStack(newStack)

    asyncFetchData(nextKey)
  }

  const disabledPrevBtn = searchStack.length == 0
  const disabledNextBtn = nextKey  == null

  return {
    data,
    prevFetch,
    nextFetch,
    disabledPrevBtn,
    disabledNextBtn
  }
} 