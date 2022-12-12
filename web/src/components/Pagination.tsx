import React, { useEffect, useState } from 'react'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  term: string | null | undefined
}

export const Pagination = ({ page, setPage, totalPages, term }: Props) => {
  const [pagination, setPagination] = useState<any>([])

  useEffect(() => {
    ;((page: number, totalPages: number) => {
      const pages = []
      if (totalPages <= 4) {
        let i = 0
        while (i < totalPages) {
          i++
          pages.push(i)
        }
      } else if (totalPages === 5 && page === 3) {
        pages.push(2, 3, 4, totalPages)
      } else if (totalPages > 4 && page <= 2) {
        pages.push(1, 2, 3, '...', totalPages)
      } else if (page === totalPages) {
        pages.push(1, '...', page - 2, page - 1, totalPages)
      } else if (page === totalPages - 1) {
        pages.push(page - 2, page - 1, page, totalPages)
      } else if (totalPages > 4 && page > 2) {
        pages.push(page - 2, page - 1, page, page + 1, '...', totalPages)
      }
      setPagination(pages)
    })(page, totalPages)
  }, [page, totalPages])

  const isString = (myVar: string | number | object) => {
    return typeof myVar === 'string' || myVar instanceof String
  }

  return (
    <div className={style.wrapper}>
      <span className={`${!term ? 'mt-4' : 'mt-[41px]'} ${style.wrapperPages}`}>
        {!term && (
          <div className={style.pagesContainer}>
            {pagination.map((pageItem: any, index: React.Key) => (
              <span
                key={index}
                onClick={() => {
                  !isString(pageItem) && setPage(Number(pageItem))
                }}
                className={`${style.page} ${
                  pageItem === page && '!bg-violet-500'
                }`}
              >
                {pageItem}
              </span>
            ))}
          </div>
        )}
      </span>
    </div>
  )
}

const style = {
  wrapper: `mx-auto w-full text-center`,
  wrapperPages: `mx-auto inline-block text-white text-2xl`,
  pagesContainer: `inline-block space-x-2`,
  page: `cursor-pointer w-8 h-8 inline-block rounded-md hover:bg-white/10 transition-all duration-300 text-white`,
}
