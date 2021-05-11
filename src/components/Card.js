export default function Card({children, className}) {
  return (
    <div
      className={`max-w-sm rounded shadow-lg bg-white py-4 max-h-72 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}
