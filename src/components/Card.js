export default function Card({children, className}) {
  return (
    <div
      className={`max-w-md rounded shadow-lg bg-white py-6 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}
