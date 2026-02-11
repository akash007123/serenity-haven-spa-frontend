import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  IndianRupee,
  Users,
  TrendingUp,
  Clock,
  Loader2,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight,
  Star,
  MapPin,
  Award,
  Activity,
  DollarSign,
  CalendarCheck,
  UserPlus,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import api, { Therapist } from "../lib/api";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartJS, Doughnut, Pie, PolarArea, Radar } from "@/components/ui/chartjs-charts";

interface DashboardData {
  stats: {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalContacts: number;
    unreadContacts: number;
    uniqueClients: number;
    estimatedRevenue: number;
  };
  recentBookings: Array<{
    _id: string;
    name: string;
    service: string;
    date: string;
    time: string;
    status: string;
    createdAt: string;
  }>;
  recentContacts: Array<{
    _id: string;
    name: string;
    email: string;
    subject?: string;
    date: string;
    status: string;
    createdAt: string;
  }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
    completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    new: "bg-primary/10 text-primary dark:bg-primary/20",
    read: "bg-muted text-muted-foreground",
    unread: "bg-primary/10 text-primary dark:bg-primary/20",
    replied: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
    archived: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400",
  };
  return styles[status] || "bg-muted text-muted-foreground";
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getProfilePicUrl = (pic?: string) => {
  if (!pic) return null;
  if (pic.startsWith("http")) return pic;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const baseUrl = API_URL.replace("/api", "");
  return `${baseUrl}/${pic.replace(/^\/+/, "")}`;
};

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [analytics, setAnalytics] = useState<{
    monthlyBookings: Array<{ name: string; bookings: number; revenue: number }>;
    weeklyData: Array<{ name: string; visitors: number; bookings: number }>;
    servicesDistribution: Array<{ name: string; value: number }>;
    statusDistribution: Array<{ name: string; value: number }>;
    peakHours: Array<{ name: string; value: number }>;
    customerSatisfaction: {
      currentMonth: {
        service: number;
        ambiance: number;
        staff: number;
        value: number;
        cleanliness: number;
        parking: number;
      };
      lastMonth: {
        service: number;
        ambiance: number;
        staff: number;
        value: number;
        cleanliness: number;
        parking: number;
      };
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboardResponse, analyticsResponse, therapistsResponse] = await Promise.all([
          api.getDashboardStats(),
          api.getAnalytics(),
          api.getTherapists({ active: undefined }),
        ]);
        
        if (dashboardResponse.success && dashboardResponse.data) {
          setData(dashboardResponse.data);
        } else {
          setError(dashboardResponse.message || "Failed to load dashboard data");
        }

        if (analyticsResponse.success && analyticsResponse.data) {
          setAnalytics(analyticsResponse.data);
        }

        if (therapistsResponse.success && therapistsResponse.data) {
          setTherapists(therapistsResponse.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-primary" />
          </div>
          <p className="mt-4 text-lg font-medium text-foreground">Loading dashboard...</p>
          <p className="text-sm text-muted-foreground">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center max-w-md p-8 rounded-2xl bg-card shadow-xl">
          <div className="mx-auto w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">Oops! Something went wrong</h3>
          <p className="mt-2 text-muted-foreground">{error || "Failed to load dashboard data"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-all hover:shadow-lg"
          >
            <span>Try Again</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const { stats, recentBookings, recentContacts } = data;

  // Calculate stats for display
  const statsCards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings.toString(),
      change: `+${stats.confirmedBookings} confirmed`,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "New Contacts",
      value: stats.totalContacts.toString(),
      change: `${stats.unreadContacts} unread`,
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100 dark:bg-green-500/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.estimatedRevenue),
      change: `+${stats.completedBookings} completed`,
      icon: IndianRupee,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Active Clients",
      value: stats.uniqueClients.toString(),
      change: `${stats.confirmedBookings} active`,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  // Chart data from analytics
  const barChartData = analytics?.monthlyBookings || [
    { name: "Jan", bookings: 0, revenue: 0 },
    { name: "Feb", bookings: 0, revenue: 0 },
    { name: "Mar", bookings: 0, revenue: 0 },
    { name: "Apr", bookings: 0, revenue: 0 },
    { name: "May", bookings: 0, revenue: 0 },
    { name: "Jun", bookings: 0, revenue: 0 },
  ];

  const barChartConfig = {
    bookings: { label: "Bookings", color: "#3b82f6" },
    revenue: { label: "Revenue (₹)", color: "#10b981" },
  };

  const lineChartData = analytics?.weeklyData || [
    { name: "Mon", visitors: 0, bookings: 0 },
    { name: "Tue", visitors: 0, bookings: 0 },
    { name: "Wed", visitors: 0, bookings: 0 },
    { name: "Thu", visitors: 0, bookings: 0 },
    { name: "Fri", visitors: 0, bookings: 0 },
    { name: "Sat", visitors: 0, bookings: 0 },
    { name: "Sun", visitors: 0, bookings: 0 },
  ];

  const lineChartConfig = {
    visitors: { label: "Visitors", color: "#8b5cf6" },
    bookings: { label: "Bookings", color: "#f59e0b" },
  };

  const servicesData = analytics?.servicesDistribution || [];
  const doughnutData = {
    labels: servicesData.map((s) => s.name),
    datasets: [
      {
        data: servicesData.map((s) => s.value),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"],
        borderWidth: 0,
      },
    ],
  };

  const statusData = analytics?.statusDistribution || [];
  const pieData = {
    labels: statusData.map((s) => s.name),
    datasets: [
      {
        data: statusData.map((s) => s.value),
        backgroundColor: ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"],
        borderWidth: 0,
      },
    ],
  };

  const peakHoursData = analytics?.peakHours || [];
  const polarAreaData = {
    labels: peakHoursData.map((p) => p.name),
    datasets: [
      {
        data: peakHoursData.map((p) => p.value),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#ef4444"],
      },
    ],
  };

  const radarData = {
    labels: ["Service", "Ambiance", "Staff", "Value", "Cleanliness", "Parking"],
    datasets: [
      {
        label: "Current Month",
        data: analytics?.customerSatisfaction?.currentMonth
          ? [
              analytics.customerSatisfaction.currentMonth.service,
              analytics.customerSatisfaction.currentMonth.ambiance,
              analytics.customerSatisfaction.currentMonth.staff,
              analytics.customerSatisfaction.currentMonth.value,
              analytics.customerSatisfaction.currentMonth.cleanliness,
              analytics.customerSatisfaction.currentMonth.parking,
            ]
          : [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        borderWidth: 2,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#3b82f6",
      },
      {
        label: "Last Month",
        data: analytics?.customerSatisfaction?.lastMonth
          ? [
              analytics.customerSatisfaction.lastMonth.service,
              analytics.customerSatisfaction.lastMonth.ambiance,
              analytics.customerSatisfaction.lastMonth.staff,
              analytics.customerSatisfaction.lastMonth.value,
              analytics.customerSatisfaction.lastMonth.cleanliness,
              analytics.customerSatisfaction.lastMonth.parking,
            ]
          : [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10b981",
        borderWidth: 2,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10b981",
      },
    ],
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-8"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="mt-1 text-muted-foreground">
                Welcome back! Here's what's happening with your spa today.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-card bg-gradient-to-br from-primary/80 to-primary"
              />
            ))}
          </div> */}
          {/* <span className="text-sm text-muted-foreground">Active now</span> */}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl"
          >
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-foreground/5 to-foreground/10 blur-2xl transition-all group-hover:scale-150" />
            
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className={`rounded-xl ${stat.bgColor} p-3 ${stat.iconColor} transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/20 dark:text-green-400">
                  <TrendingUp size={14} />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Bookings & Revenue
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Last 6 months performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs text-muted-foreground">Bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar yAxisId="right" dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Weekly Activity
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Visitors and booking trends
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
                <span className="text-xs text-muted-foreground">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-xs text-muted-foreground">Bookings</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/20 p-3">
              <CalendarCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Bookings</p>
              <p className="text-2xl font-bold text-foreground">{stats.pendingBookings}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-amber-500/20 p-3">
              <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Booking Value</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(stats.estimatedRevenue / (stats.totalBookings || 1))}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-500/20 p-3">
              <UserPlus className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {((stats.completedBookings / (stats.totalBookings || 1)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-500/20 p-3">
              <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Therapists</p>
              <p className="text-2xl font-bold text-foreground">
                {therapists.filter(t => t.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity & Therapists */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Bookings */}
        <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Recent Bookings
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Latest {recentBookings.length} bookings
              </p>
            </div>
            <Link
              to="/admin/bookings"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No bookings yet
            </div>
          ) : (
            <div className="divide-y">
              {recentBookings.slice(0, 5).map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-semibold">
                        {booking.name.charAt(0)}
                      </div>
                      {booking.status === 'pending' && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-500 ring-2 ring-card" />
                      )}
                      {booking.status === 'confirmed' && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-card" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground line-clamp-1">
                        {booking.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {booking.service}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {booking.time}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ChartJS Charts */}
        <motion.div variants={itemVariants} className="lg:col-span-2 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Doughnut Chart */}
            <div className="rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                Services
              </h2>
              <div className="h-[200px] flex items-center justify-center">
                <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          padding: 16,
                          usePointStyle: true,
                          boxWidth: 6,
                          boxHeight: 6,
                          color: "var(--foreground)",
                        },
                      },
                    },
                    cutout: "70%",
                  }}
                />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                Booking Status
              </h2>
              <div className="h-[200px] flex items-center justify-center">
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          padding: 16,
                          usePointStyle: true,
                          boxWidth: 6,
                          boxHeight: 6,
                          color: "var(--foreground)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Therapists Section */}
      <motion.div variants={itemVariants} className="rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Top Therapists
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Based on performance and reviews
            </p>
          </div>
          <Link
            to="/admin/therapists"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            View All
            <ChevronRight size={16} />
          </Link>
        </div>
        {therapists.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No therapists yet
          </div>
        ) : (
          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {therapists.slice(0, 4).map((therapist, index) => (
              <motion.div
                key={therapist._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 p-4 transition-all hover:shadow-lg"
              >
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-primary/10 blur-2xl transition-all group-hover:scale-150" />
                
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center overflow-hidden ring-2 ring-primary/20">
                        {therapist.profilePic ? (
                          <img
                            src={getProfilePicUrl(therapist.profilePic) || ""}
                            alt={therapist.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-primary">
                            {therapist.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card bg-emerald-500" />
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-semibold text-foreground">
                          {therapist.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {therapist.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h3 className="font-serif font-semibold text-foreground line-clamp-1">
                      {therapist.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {therapist.title}
                    </p>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {therapist.specialties?.slice(0, 2).map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {therapist.experience} exp.
                    </span>
                    <span className="font-medium text-foreground">
                      {therapist.bookingCount} bookings
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Advanced Charts */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        {/* Polar Area Chart */}
        <div className="rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Peak Hours
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Busiest times of the day
            </p>
          </div>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PolarArea
                data={polarAreaData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                        boxWidth: 6,
                        boxHeight: 6,
                        color: "var(--foreground)",
                      },
                    },
                  },
                }}
              />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Customer Satisfaction
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Month over month comparison
            </p>
          </div>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <Radar
                data={radarData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                        boxWidth: 6,
                        boxHeight: 6,
                        color: "var(--foreground)",
                      },
                    },
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        stepSize: 20,
                        color: "var(--muted-foreground)",
                      },
                      grid: {
                        color: "var(--border)",
                      },
                      pointLabels: {
                        color: "var(--foreground)",
                      },
                    },
                  },
                }}
              />
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Recent Contacts */}
      <motion.div variants={itemVariants} className="rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Recent Contacts
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.unreadContacts} unread messages
            </p>
          </div>
          <Link
            to="/admin/contacts"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            View All
            <ChevronRight size={16} />
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No contacts yet
          </div>
        ) : (
          <div className="divide-y">
            {recentContacts.slice(0, 5).map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-semibold">
                      {contact.name.charAt(0)}
                    </div>
                    {contact.status === "unread" && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary ring-2 ring-card" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground line-clamp-1">
                      {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {contact.subject || "No subject"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusBadge(
                      contact.status
                    )}`}
                  >
                    {contact.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;