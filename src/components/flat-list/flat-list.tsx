import React from 'react'

export type FlatListProps<T> = {
  data: T[]
  renderItem: React.ComponentType<any>
}

const FlatList = <T,>({ data, renderItem }: FlatListProps<T>) => {
  return (
    <>
      <div className="h-full p-4">
        <div className="overflow-y-auto max-h-full">
          {data.map((d, i) => (
            <div key={`${i}`} className="flex items-center py-2">
              {React.createElement(renderItem, { ...d })}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FlatList
