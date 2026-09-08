type ProgressBarProps = {
    totalCards: number
    totalLearneds: number
}

export default function ProgressBar({ totalCards, totalLearneds }: ProgressBarProps) {
    const porcentaje = totalCards > 0
        ? Math.round((totalLearneds / totalCards) * 100)
        : 0

    return (        
        <div>
            <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400 font-medium">{totalLearneds} / {totalCards} aprendidas</span>
                <span className="text-gray-500 font-semibold">{porcentaje}%</span>
            </div>
            <div
                role="progressbar"
                aria-valuenow={porcentaje}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full bg-gray-200 rounded-full h-2"
            >
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${porcentaje}%` }}
                />
            </div>
        </div>
    )
}