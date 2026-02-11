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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
    new: "bg-primary/10 text-primary",
    read: "bg-muted text-muted-foreground",
    unread: "bg-primary/10 text-primary",
    replied: "bg-purple-100 text-purple-700",
    archived: "bg-gray-100 text-gray-700",
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
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error || "Failed to load dashboard data"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
          >
            Retry
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
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      label: "New Contacts",
      value: stats.totalContacts.toString(),
      change: `${stats.unreadContacts} unread`,
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.estimatedRevenue),
      change: `+${stats.completedBookings} completed`,
      icon: IndianRupee,
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
    {
      label: "Active Clients",
      value: stats.uniqueClients.toString(),
      change: `${stats.confirmedBookings} active`,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
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
    revenue: { label: "Revenue", color: "#10b981" },
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
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
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
      },
    ],
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back! Here's an overview of your spa.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div
                className={`rounded-xl ${stat.bgColor} p-3 ${stat.color}`}
              >
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                <TrendingUp size={16} />
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Bookings */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card shadow-lg">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Recent Bookings
            </h2>
            <Link
              to="/admin/bookings"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No bookings yet
            </div>
          ) : (
            <div className="divide-y">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {booking.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {booking.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">
                      {booking.date} at {booking.time}
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Contacts */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card shadow-lg">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Recent Contacts
            </h2>
            <Link
              to="/admin/contacts"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No contacts yet
            </div>
          ) : (
            <div className="divide-y">
              {recentContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.subject || "No subject"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusBadge(
                        contact.status
                      )}`}
                    >
                      {contact.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Therapists Section */}
      <motion.div variants={itemVariants} className="rounded-2xl bg-card shadow-lg">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Therapists
          </h2>
          <Link
            to="/admin/therapists"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </Link>
        </div>
        {therapists.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No therapists yet
          </div>
        ) : (
          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {therapists.slice(0, 8).map((therapist) => (
              <div
                key={therapist._id}
                className="overflow-hidden rounded-xl bg-muted/50 transition-all hover:bg-muted"
              >
                {/* Profile Pic */}
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
                  {therapist.profilePic ? (
                    <img
                      src={getProfilePicUrl(therapist.profilePic) || ""}
                      alt={therapist.name}
                      className="absolute inset-x-0 bottom-0 h-24 w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-x-0 bottom-0 flex h-24 items-center justify-center bg-primary/10">
                      <span className="text-4xl font-bold text-primary">
                        {therapist.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      therapist.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {therapist.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {therapist.isFeatured && (
                    <div className="absolute top-2 left-2">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-foreground truncate">
                    {therapist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {therapist.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="text-amber-500">★</span>
                    <span className="font-medium">{therapist.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({therapist.reviewCount} reviews)</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>📚</span>
                    <span>{therapist.experience}</span>
                  </div>
                  {therapist.languages && therapist.languages.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {therapist.languages.slice(0, 3).map((lang) => (
                        <span
                          key={lang}
                          className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {therapist.bookingCount} bookings
                    </span>
                    {therapist.specialties && therapist.specialties.length > 0 && (
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {therapist.specialties[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={itemVariants} className="space-y-8">
        {/* Bar Chart */}
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            Bookings & Revenue Overview
          </h2>
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="bookings" fill="var(--color-bookings)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Line Chart */}
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            Weekly Visitors & Bookings
          </h2>
          <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
            <AreaChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="var(--color-bookings)"
                fill="var(--color-bookings)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Doughnut & Pie Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 shadow-lg">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Services Distribution
            </h2>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-lg">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Booking Status
            </h2>
            <div className="h-[300px] flex items-center justify-center">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Polar Area & Radar Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 shadow-lg">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Peak Hours Distribution
            </h2>
            <div className="h-[300px] flex items-center justify-center">
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
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-lg">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Customer Satisfaction
            </h2>
            <div className="h-[300px] flex items-center justify-center">
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
                      },
                    },
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
