export default function Card({children}) {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white py-6">
      {children}
    </div>
  )
}
