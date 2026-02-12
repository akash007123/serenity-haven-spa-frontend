import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  Loader2,
  RefreshCw,
  Filter,
  BarChart3,
  Activity,
  DollarSign,
  Star,
  ChevronDown,
} from "lucide-react";
import api from "../lib/api";

interface AnalyticsData {
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
  summary: {
    totalBookings: number;
    totalRevenue: number;
    totalContacts: number;
    totalServices: number;
  };
}

const AdminAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("AdminAnalytics component mounted");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const response = await api.getAnalytics();
      console.log("Response:", response);
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message || "Failed to load analytics");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg font-medium text-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-card shadow-xl">
          <p className="text-red-500">Error: {error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Data loaded successfully!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Calendar size={24} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{data.summary.totalBookings}</p>
          <p className="text-sm text-muted-foreground">Total Bookings</p>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <DollarSign size={24} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">₹{data.summary.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <MessageSquare size={24} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{data.summary.totalContacts}</p>
          <p className="text-sm text-muted-foreground">Total Contacts</p>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <Users size={24} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{data.summary.totalServices}</p>
          <p className="text-sm text-muted-foreground">Total Services</p>
        </div>
      </div>

      {/* Monthly Data Preview */}
      <div className="rounded-2xl bg-card p-6 shadow-lg">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Monthly Bookings</h2>
        <div className="space-y-2">
          {data.monthlyBookings.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">{item.bookings} bookings</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
