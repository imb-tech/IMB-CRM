import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ChevronDown, Plus } from "lucide-react"

export default function FormSkeleton() {
    return (
        <div className="w-full h-[400px] bg-card text-white p-5 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ArrowLeft size={14} />
                    <Skeleton className="h-4 w-40 bg-gray-700/20 dark:bg-gray-700" />
                </div>
                <Skeleton className="h-6 w-8 bg-gray-700/20 dark:bg-gray-700" />
            </div>

            {/* Status Field */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-12 bg-gray-700/20 dark:bg-gray-700" />
                <div className="relative">
                    <Skeleton className="h-10 w-full bg-gray-800/20 dark:bg-gray-800 rounded-lg" />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-8 bg-gray-700/20 dark:bg-gray-700" />
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full bg-gray-800/20 dark:bg-gray-800 rounded-lg" />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-32 bg-gray-700/20 dark:bg-gray-700" />
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <div className="flex items-center gap-3 bg-gray-800/20 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-6 h-4 bg-gray-600/20 dark:bg-gray-600 rounded" />
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    <Skeleton className="h-6 flex-1 bg-gray-700/20 dark:bg-gray-700" />
                </div>
            </div>

            {/* Additional Phone Link */}
            <div className="flex items-center gap-2 text-blue-400">
                <Plus className="w-5 h-5" />
                <Skeleton className="h-4 w-40 bg-gray-700/20 dark:bg-gray-700" />
            </div>
        </div>
    )
}
