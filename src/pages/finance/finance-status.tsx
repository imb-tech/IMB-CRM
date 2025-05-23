import { Card, CardContent } from "@/components/ui/card"

type Props = {}

function FinanceStatus({}: Props) {
    return (
        <Card>
            <CardContent>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    To'lov Holati
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-300 to-teal-300"></div>
                                <span className="font-medium text-gray-700">
                                    To'langan Summa
                                </span>
                            </div>
                            <span className="text-2xl font-bold text-emerald-600">
                                3 500 000
                            </span>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-25 to-teal-25 rounded-xl p-4 border border-emerald-100">
                            <div className="text-sm text-emerald-700">
                                Jami to'lovlarning 64.7%
                            </div>
                            <div className="text-xs text-emerald-600 mt-1">
                                O'tgan davrga nisbatan +5.2%
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-300 to-amber-300"></div>
                                <span className="font-medium text-gray-700">
                                    Kutilayotgan Summa
                                </span>
                            </div>
                            <span className="text-2xl font-bold text-orange-600">
                                7 000 000
                            </span>
                        </div>
                        <div className="bg-gradient-to-r from-orange-25 to-amber-25 rounded-xl p-4 border border-orange-100">
                            <div className="text-sm text-orange-700">
                                Jami to'lovlarning 35.3%
                            </div>
                            <div className="text-xs text-orange-600 mt-1">
                                O'tgan davrga nisbatan -2.1%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>To'lovlar Jarayoni</span>
                        <span>64.7%</span>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-300 to-teal-400 rounded-full transition-all duration-1000"
                            style={{ width: "64.7%" }}
                        ></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FinanceStatus
