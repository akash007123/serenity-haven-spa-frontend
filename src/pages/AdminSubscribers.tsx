import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Mail,
  Download,
  Loader2,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  UserMinus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

// Types
interface NewsletterSubscriber {
  _id: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  createdAt: string;
  updatedAt: string;
}

interface SubscriberStats {
  subscribed: number;
  unsubscribed: number;
  total: number;
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
  const styles: Record<string, { class: string; icon: typeof CheckCircle }> = {
    subscribed: {
      class: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    unsubscribed: {
      class: "bg-gray-100 text-gray-600",
      icon: XCircle,
    },
  };
  return styles[status] || styles.subscribed;
};

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [stats, setStats] = useState<SubscriberStats>({
    subscribed: 0,
    unsubscribed: 0,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch subscribers from API
  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      const result = await api.getNewsletterSubscribers({
        status: statusFilter !== "all" ? statusFilter : undefined,
      });

      if (result.success) {
        // Filter by search term on client side
        let filtered = result.data || [];
        if (searchTerm) {
          filtered = filtered.filter((sub) =>
            sub.email.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setSubscribers(filtered);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast({
        title: "Error",
        description: "Failed to load subscribers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm, toast]);

  // Fetch stats from API
  const fetchStats = useCallback(async () => {
    try {
      const result = await api.getNewsletterCount();
      if (result.success && result.data) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchSubscribers();
    fetchStats();
  }, [fetchSubscribers, fetchStats]);

  // Refetch when filters change
  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter, fetchSubscribers]);

  const handleUnsubscribe = async (id: string) => {
    const subscriber = subscribers.find((s) => s._id === id);
    if (!subscriber) return;

    try {
      const result = await api.unsubscribeFromNewsletter(subscriber.email);
      if (result.success) {
        setSubscribers((prev) =>
          prev.map((s) =>
            s._id === id ? { ...s, status: "unsubscribed" } : s
          )
        );
        setStats((prev) => ({
          ...prev,
          subscribed: Math.max(0, prev.subscribed - 1),
          unsubscribed: prev.unsubscribed + 1,
        }));
        toast({
          title: "Unsubscribed",
          description: "Subscriber has been unsubscribed.",
        });
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast({
        title: "Error",
        description: "Failed to unsubscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      setDeletingId(id);
      const result = await api.deleteSubscriber(id);

      if (result.success) {
        const deletedSubscriber = subscribers.find((s) => s._id === id);
        setSubscribers((prev) => prev.filter((s) => s._id !== id));

        if (deletedSubscriber) {
          setStats((prev) => ({
            ...prev,
            total: prev.total - 1,
            [deletedSubscriber.status === "subscribed"
              ? "subscribed"
              : "unsubscribed"]: Math.max(
              0,
              prev[
                deletedSubscriber.status === "subscribed"
                  ? "subscribed"
                  : "unsubscribed"
              ] - 1
            ),
          }));
        }

        toast({
          title: "Deleted",
          description: "Subscriber has been deleted.",
        });
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast({
        title: "Error",
        description: "Failed to delete subscriber. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleExport = () => {
    // Export subscribers to CSV
    const subscribedSubscribers = subscribers.filter(
      (s) => s.status === "subscribed"
    );
    const csvContent = [
      ["Email", "Status", "Subscribed At"],
      ...subscribedSubscribers.map((s) => [
        s.email,
        s.status,
        new Date(s.createdAt).toISOString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast({
      title: "Exported",
      description: `Exported ${subscribedSubscribers.length} subscribers to CSV.`,
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Subscribers
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage newsletter subscribers and email list
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={() => {
              fetchSubscribers();
              fetchStats();
            }}
          >
            <Mail className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div className="rounded-xl bg-card p-4 shadow">
          <p className="text-sm text-muted-foreground">Total Subscribers</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow">
          <p className="text-sm text-muted-foreground">Active Subscribers</p>
          <p className="text-2xl font-bold text-green-500">{stats.subscribed}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow">
          <p className="text-sm text-muted-foreground">Unsubscribed</p>
          <p className="text-2xl font-bold text-gray-400">{stats.unsubscribed}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 rounded-2xl bg-card p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              const timer = setTimeout(() => fetchSubscribers(), 300);
              return () => clearTimeout(timer);
            }}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="subscribed">Subscribed</SelectItem>
              <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Subscribers Table */}
      <motion.div variants={itemVariants} className="rounded-2xl bg-card shadow-lg">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No subscribers found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "No one has subscribed yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Subscribed At
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => {
                  const statusConfig = getStatusBadge(subscriber.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr
                      key={subscriber._id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`gap-1 ${statusConfig.class}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {subscriber.status.charAt(0).toUpperCase() +
                            subscriber.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {formatDate(subscriber.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {subscriber.status === "subscribed" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUnsubscribe(subscriber._id)
                                }
                                className="text-amber-600"
                              >
                                <UserMinus className="mr-2 h-4 w-4" />
                                Unsubscribe
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDelete(subscriber._id)}
                              className="text-red-600"
                              disabled={deletingId === subscriber._id}
                            >
                              <span className="mr-2">
                                {deletingId === subscriber._id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  "🗑️"
                                )}
                              </span>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminSubscribers;
