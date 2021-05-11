export default function Card({children, className}) {
  return (
    <div
      className={`rounded shadow-lg bg-white py-4 h-72 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}
