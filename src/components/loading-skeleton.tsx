export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-800 rounded-lg mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-1/2" />
        <div className="h-4 bg-gray-800 rounded w-5/6" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-800 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-800 rounded w-3/4" />
          <div className="h-3 bg-gray-800 rounded w-1/2" />
          <div className="h-3 bg-gray-800 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center">
          <div className="h-8 bg-gray-800 rounded w-16 mx-auto mb-2" />
          <div className="h-4 bg-gray-800 rounded w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}
