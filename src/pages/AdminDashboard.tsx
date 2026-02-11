import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/api";

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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.getDashboardStats();
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(response.message || "Failed to load dashboard data");
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
      icon: DollarSign,
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
    </motion.div>
  );
};

export default AdminDashboard;
