export default function TripCard({ img, title, desc }) {
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-md">
      <img src={img} alt={title} loading="lazy" className="w-full h-40 object-cover " />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-text-primary">{title}</h3>
        <p className="text-sm text-text-primary">{desc}</p>
      </div>
   
    </div>
  );}