import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Loader2,
  RefreshCw,
  TrendingUp,
  MessageSquare,
  Home,
  TreePine,
} from "lucide-react";
import api from "@/api/axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const MessageStatsChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statsData, setStatsData] = useState(null);

  // Filter state
  const [period, setPeriod] = useState("daily");
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  // Fetch stats data
  const fetchStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/admin/contacts/stats", {
        params: {
          period,
          start_date: startDate,
          end_date: endDate,
        },
      });

      if (response.data.success) {
        setStatsData(response.data.data);
      } else {
        setError("Failed to load statistics");
      }
    } catch (err) {
      console.error("Stats fetch error:", err);
      setError("Failed to fetch message statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Handle filter apply
  const handleApplyFilter = () => {
    fetchStats();
  };

  // Chart data configuration
  const chartData = useMemo(() => {
    if (!statsData) return null;

    const { labels, datasets } = statsData;
    const byCategory = datasets.by_category || {};

    return {
      labels: labels.map((label) => {
        // Format date labels based on period
        const date = new Date(label);
        if (period === "daily") {
          return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
          });
        } else if (period === "weekly") {
          return `Week ${label.split("-W")[1] || label}`;
        } else {
          return date.toLocaleDateString("id-ID", {
            month: "short",
            year: "2-digit",
          });
        }
      }),
      datasets: [
        {
          label: "Total Messages",
          data: datasets.total || [],
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
        {
          label: "Indoor",
          data: byCategory["Indoor"] || [],
          borderColor: "#C58E47",
          backgroundColor: "rgba(197, 142, 71, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
        {
          label: "Outdoor",
          data: byCategory["Outdoor"] || [],
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
        {
          label: "No Product",
          data: byCategory["No Product"] || [],
          borderColor: "#9CA3AF",
          backgroundColor: "rgba(156, 163, 175, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 1.5,
          borderDash: [5, 5],
        },
      ].filter((dataset) => dataset.data.length > 0), // Only show datasets with data
    };
  }, [statsData, period]);

  // Chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 3,
            useBorderRadius: true,
            padding: 20,
            font: {
              size: 11,
              weight: "600",
              family: "'Inter', sans-serif",
            },
            color: "#3C2F26",
          },
        },
        tooltip: {
          backgroundColor: "#3C2F26",
          titleFont: {
            size: 12,
            weight: "700",
            family: "'Inter', sans-serif",
          },
          bodyFont: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 10,
              weight: "600",
            },
            color: "#9CA3AF",
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(156, 163, 175, 0.1)",
          },
          ticks: {
            font: {
              size: 10,
              weight: "600",
            },
            color: "#9CA3AF",
            stepSize: 1,
          },
        },
      },
    }),
    [],
  );

  // Summary cards data
  const summaryCards = useMemo(() => {
    if (!statsData?.summary) return [];

    const { summary } = statsData;
    return [
      {
        label: "Total Messages",
        value: summary.total_messages || 0,
        icon: MessageSquare,
        color: "bg-blue-500",
      },
      {
        label: "New",
        value: summary.by_status?.new || 0,
        icon: TrendingUp,
        color: "bg-amber-500",
      },
      {
        label: "Read",
        value: summary.by_status?.read || 0,
        icon: RefreshCw,
        color: "bg-emerald-500",
      },
      {
        label: "Replied",
        value: summary.by_status?.replied || 0,
        icon: MessageSquare,
        color: "bg-purple-500",
      },
    ];
  }, [statsData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-[#3C2F26] rounded-full" />
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[#3C2F26] tracking-tight uppercase">
              Message Analytics
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
              Contact Form Statistics by Product Category
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Period Select */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-[#3C2F26] focus:outline-none focus:ring-2 focus:ring-[#C58E47] transition-all min-w-0"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {/* Date Range */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-7 sm:pl-9 pr-2 sm:pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-[#3C2F26] focus:outline-none focus:ring-2 focus:ring-[#C58E47] transition-all w-[130px] sm:w-auto"
              />
            </div>
            <span className="text-gray-400 font-bold hidden sm:inline">—</span>
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-7 sm:pl-9 pr-2 sm:pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-[#3C2F26] focus:outline-none focus:ring-2 focus:ring-[#C58E47] transition-all w-[130px] sm:w-auto"
              />
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApplyFilter}
            disabled={loading}
            className="px-4 sm:px-5 py-2 bg-[#3C2F26] hover:bg-[#2a211b] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            Apply
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {statsData?.summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-white`}
              >
                <card.icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-black text-[#3C2F26]">
                  {card.value}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {card.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="relative h-[250px] sm:h-[300px] lg:h-[350px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Loader2
                size={40}
                className="animate-spin text-[#3C2F26] mx-auto opacity-20"
              />
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                Loading Analytics...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <BarChart3 size={40} className="mx-auto text-gray-200" />
              <p className="text-sm font-bold text-gray-400">{error}</p>
              <button
                onClick={fetchStats}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-bold text-[#3C2F26] transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        ) : chartData && chartData.labels.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <BarChart3 size={40} className="mx-auto text-gray-200" />
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                No Data Available
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Legend Info */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-bold text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Total Messages</span>
          </div>
          <div className="flex items-center gap-2">
            <Home size={14} className="text-[#C58E47]" />
            <span>Indoor Interest</span>
          </div>
          <div className="flex items-center gap-2">
            <TreePine size={14} className="text-emerald-500" />
            <span>Outdoor Interest</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span>General Inquiry</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageStatsChart;
