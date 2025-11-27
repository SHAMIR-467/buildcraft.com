import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    Calendar,
    HardHat,
    DollarSign,
    Activity,
} from "lucide-react";

const CircularProgress = ({ value, label, subLabel, color = "#f97316" }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-gray-200"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-gray-800">{value}%</span>
                </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{label}</h3>
            <p className="text-sm text-gray-500">{subLabel}</p>
        </div>
    );
};

const TimelineStage = ({ stage, status, index }) => {
    const getStatusColor = (s) => {
        switch (s) {
            case "Completed":
                return "bg-green-500 text-white border-green-500";
            case "In Progress":
                return "bg-orange-500 text-white border-orange-500";
            default:
                return "bg-white text-gray-400 border-gray-300";
        }
    };

    const getIcon = (s) => {
        switch (s) {
            case "Completed":
                return <CheckCircle2 size={20} />;
            case "In Progress":
                return <Activity size={20} className="animate-pulse" />;
            default:
                return <Clock size={20} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start pb-12 last:pb-0"
        >
            {/* Line */}
            <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-gray-200" />

            {/* Dot/Icon */}
            <div
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStatusColor(
                    status
                )} shadow-md transition-all duration-300 hover:scale-110`}
            >
                {getIcon(status)}
            </div>

            {/* Content */}
            <div className="ml-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow w-full">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-gray-800">{stage}</h4>
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : status === "In Progress"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {status}
                    </span>
                </div>
                <p className="text-sm text-gray-500">
                    {status === "Completed"
                        ? "Successfully completed on schedule."
                        : status === "In Progress"
                            ? "Currently active. Estimated completion: 2 weeks."
                            : "Scheduled to start pending previous stage completion."}
                </p>
            </div>
        </motion.div>
    );
};

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
            </div>
            {trend && (
                <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-lg">
                    <TrendingUp size={14} className="mr-1" />
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
    </motion.div>
);

const ConstructionTracker = () => {
    const stages = [
        { name: "Site Planning & Approval", status: "Completed" },
        { name: "Foundation Work", status: "Completed" },
        { name: "Structural Framing", status: "In Progress" },
        { name: "Plumbing & Electrical", status: "Pending" },
        { name: "Interior Finishing", status: "Pending" },
    ];

    return (
        <section id="tracker" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-orange-600 font-bold tracking-wider uppercase text-sm"
                    >
                        Client Portal
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mt-2"
                    >
                        Live Project Tracker
                    </motion.h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Track the progress of your dream project in real-time. We believe in
                        complete transparency and keeping you informed every step of the way.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Progress Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center lg:col-span-1 border border-gray-100"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            Overall Completion
                        </h3>
                        <CircularProgress
                            value={45}
                            label="On Track"
                            subLabel="Estimated Completion: Dec 2025"
                        />
                        <div className="mt-8 w-full">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Budget Utilized</span>
                                <span>42%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "42%" }}
                                    transition={{ duration: 1.5 }}
                                    className="bg-blue-600 h-full rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
                        <StatCard
                            icon={HardHat}
                            label="Safety Score"
                            value="100%"
                            trend="+5%"
                            color="bg-green-500"
                        />
                        <StatCard
                            icon={Calendar}
                            label="Days Remaining"
                            value="142"
                            color="bg-blue-500"
                        />
                        <StatCard
                            icon={DollarSign}
                            label="Cost Efficiency"
                            value="98%"
                            trend="+2.4%"
                            color="bg-purple-500"
                        />
                        <StatCard
                            icon={Activity}
                            label="Workers on Site"
                            value="24"
                            color="bg-orange-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Timeline */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                            <Clock className="mr-3 text-orange-500" /> Construction Timeline
                        </h3>
                        <div className="pl-2">
                            {stages.map((stage, index) => (
                                <TimelineStage
                                    key={index}
                                    stage={stage.name}
                                    status={stage.status}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Recent Updates / Log */}
                    <div className="bg-gray-900 rounded-3xl shadow-xl p-8 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-32 bg-orange-500 rounded-full filter blur-3xl opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center relative z-10">
                            <Activity className="mr-3 text-orange-500" /> Site Activity Log
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                {
                                    date: "Today, 10:30 AM",
                                    text: "Structural steel delivery confirmed for Block B.",
                                    type: "info",
                                },
                                {
                                    date: "Yesterday, 4:15 PM",
                                    text: "Weekly safety inspection passed with 0 violations.",
                                    type: "success",
                                },
                                {
                                    date: "Nov 20, 09:00 AM",
                                    text: "Foundation pouring completed for main tower.",
                                    type: "success",
                                },
                                {
                                    date: "Nov 18, 2:00 PM",
                                    text: "Weather alert: Heavy rain expected tomorrow. Outdoor work rescheduled.",
                                    type: "warning",
                                },
                            ].map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <div
                                        className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${log.type === "success"
                                                ? "bg-green-400"
                                                : log.type === "warning"
                                                    ? "bg-yellow-400"
                                                    : "bg-blue-400"
                                            }`}
                                    />
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">{log.date}</p>
                                        <p className="text-gray-200 leading-relaxed">{log.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <button className="mt-8 w-full py-3 bg-orange-600 hover:bg-orange-700 rounded-xl font-semibold transition-colors">
                            View Full Report
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConstructionTracker;
