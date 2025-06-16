import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard({ repeat = 3 }: { repeat?: number }) {
    const skeletonItems = [];

    for (let i = 0; i < repeat; i++) {
        skeletonItems.push(
        <div className="space-y-2" key={i}>
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-24 lg:w-64 md:w-48" />
        </div>
        );
    }

  return (
    <div className="grid grid-cols-3 gap-4">
        {skeletonItems}
    </div>
  )
}
