import { Card } from "antd";
import React from "react";

type Props = {
    title: string;
    value: React.ReactNode;
    subtitle?: React.ReactNode;
    icon?: React.ReactNode;
    loading?: boolean;
    color?: "emerald" | "orange" | "blue" | "green";
    className?: string;
};

const COLOR_CLASS: Record<NonNullable<Props["color"]>, string> = {
    emerald: "text-emerald-500 bg-emerald-500",
    orange: "text-orange-500 bg-orange-500",
    blue: "text-blue-500 bg-blue-500",
    green: "text-green-500 bg-green-500",
};

export default function StatCard({
    title,
    value,
    subtitle,
    icon,
    loading,
    color = "emerald",
    className,
}: Props) {
    const waveText = COLOR_CLASS[color].split(" ")[0];   // text-*-500
    const badgeBg = COLOR_CLASS[color].split(" ")[1];   // bg-*-500

    return (
        <Card
            loading={loading}
            className={`rounded-2xl shadow-md ${className ?? ""}`}
            bodyStyle={{ position: "relative", minHeight: 120 }}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <div className={`inline-block text-white text-xs font-semibold rounded-md px-2.5 py-1 ${badgeBg}`}>
                        {title}
                    </div>

                    <div className="mt-2 text-3xl font-extrabold text-slate-900 leading-tight">
                        {value}
                    </div>

                    {subtitle && (
                        <div className="mt-1.5 text-sm text-slate-500">
                            {subtitle}
                        </div>
                    )}
                </div>

                {icon && <div className="text-2xl text-slate-400">{icon}</div>}
            </div>

            {/* Wavy footer */}
            <svg
                viewBox="0 0 1440 90"
                preserveAspectRatio="none"
                className={`absolute -bottom-0.5 left-0 w-full h-9 opacity-25 ${waveText}`}
            >
                <path
                    d="M0,64 C180,90 360,0 540,32 C720,64 900,96 1080,64 C1260,32 1440,64 1440,64 L1440,90 L0,90 Z"
                    fill="currentColor"
                />
            </svg>
        </Card>
    );
}
