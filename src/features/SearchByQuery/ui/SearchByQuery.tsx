import { FC, useState } from 'react'

import cls from './SearchByQuery.module.scss'
import {
  resetRecivedData,
  setSearchQuery,
  setPrevSearchParams,
} from '../../../providers/redux/slice/bookSlice'
import { Button } from '../../../shared/ui/button'
import { Input } from '../../../shared/ui/input/Input'
import { useAppDispatch, useAppSelector } from '../../../providers/redux'
import { SearchParams } from '../../../types'
import { reciveAllBooks } from '../../../providers/redux/thunk/bookThunk'

interface SearchByQueryProps {}

export const SearchByQuery: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const { searchQuery, selectedSort, selectedCategory } = useAppSelector((s) => s.BOOKS)
  const dispatch = useAppDispatch()

  console.log('input', inputValue)
  console.log('search', searchQuery)

  console.log('category:', selectedCategory)

  const searchParams: SearchParams = {
    query: inputValue,
    sort: selectedSort,
    subject: selectedCategory,
    startIndex: 0,
  }

  const clickCondition = inputValue.trim() !== '' && inputValue.trim() !== ' '

  const handleClickButton = () => {
    if (clickCondition) {
      if (inputValue === searchQuery) {
        dispatch(resetRecivedData())
      }

      dispatch(setSearchQuery(inputValue))
      dispatch(setPrevSearchParams(searchParams))
      dispatch(reciveAllBooks(searchParams))
    }
  }

  return (
    <div className={cls.search}>
      <Input
        type='text'
        placeholder='What book would you like to find ?'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button theme='primary' onClick={handleClickButton} disabled={!clickCondition}>
        Search
      </Button>
    </div>
  )
}
