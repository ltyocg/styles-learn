import {createRoot} from 'react-dom/client'
import React, {RefObject, useEffect, useRef} from 'react'


createRoot(document.querySelector<HTMLDivElement>('#app')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

function App() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      style={{
        height: 200,
        border: 'solid',
        overflowY: 'auto',
        marginTop: 50
      }}
    >
      <List title="标题固定 1" parentRef={ref}/>
      <List title="标题固定 2" parentRef={ref}/>
    </div>
  )
}

function List({title, parentRef}: {
  title: string
  parentRef: RefObject<HTMLDivElement>
}) {
  const headerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      console.dir(entries)
    }, {
      root: parentRef.current!,
      threshold: [1],
      rootMargin: `${-Math.floor((headerRef.current?.getBoundingClientRect().height ?? 0))}px 0px 0px 0px`
    })
    observer.observe(ref.current!)
    return () => observer.unobserve(ref.current!)
  }, [])
  return (
    <div>
      <div
        ref={headerRef}
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white'
        }}
      >{title}</div>
      {Array.from({length: 5}).map((_, index) => (
        <div
          ref={index ? undefined : ref}
          key={index}
          style={{
            height: 60,
            backgroundColor: Math.floor(index % 2) ? 'rgb(193 78 77)' : 'rgb(87 150 92)'
          }}
        >{index}</div>
      ))}
    </div>
  )
}