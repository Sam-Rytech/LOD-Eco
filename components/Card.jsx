// components/Card.jsx
export default function Card({ children }) {
  return (
    <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
      {children}
    </div>
  );
}
