import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Types
interface Booking {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  therapist?: string;
  date: string;
  time: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no-show";
  createdAt: string;
  updatedAt: string;
}

interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  noShow: number;
  totalRevenue: number;
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
    "no-show": "bg-gray-100 text-gray-700",
  };
  return styles[status] || "bg-muted text-muted-foreground";
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
    noShow: 0,
    totalRevenue: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Service pricing (in production, this would come from the backend)
  const servicePrices: Record<string, number> = {
    "Swedish Massage": 89,
    "Hot Stone Therapy": 149,
    "Aromatherapy": 99,
    "Thai Massage": 109,
    "Deep Tissue": 119,
    "Reflexology": 79,
    "Sports Massage": 129,
    "Couples Massage": 199,
    "Facial Treatment": 99,
    "Body Scrub": 89,
  };

  const getPrice = (service: string) => {
    return servicePrices[service] || 99;
  };

  // Fetch bookings from API
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      const response = await fetch(`${API_URL}/bookings?${params}`);
      const result = await response.json();
      
      if (result.success) {
        // Filter by search term on client side for better UX
        let filtered = result.data;
        if (searchTerm) {
          filtered = filtered.filter(
            (booking: Booking) =>
              booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
              booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (booking.therapist?.toLowerCase() || "").includes(searchTerm.toLowerCase())
          );
        }
        setBookings(filtered);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm, toast]);

  // Fetch stats from API
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/bookings/stats`);
      const result = await response.json();
      
      if (result.success) {
        const backendData = result.data;
        setStats({
          total: backendData.total || 0,
          pending: backendData.byStatus?.pending || 0,
          confirmed: backendData.byStatus?.confirmed || 0,
          cancelled: backendData.byStatus?.cancelled || 0,
          completed: backendData.byStatus?.completed || 0,
          noShow: backendData.byStatus?.["no-show"] || 0,
          totalRevenue: 0, // Calculate from bookings if needed
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, [fetchBookings, fetchStats]);

  // Refetch when filters change
  useEffect(() => {
    fetchBookings();
  }, [statusFilter, fetchBookings]);

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: Booking["status"]) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const oldBooking = bookings.find((b) => b._id === id);
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id ? { ...booking, status: newStatus } : booking
          )
        );
        
        // Update stats
        if (oldBooking) {
          setStats((prev) => ({
            ...prev,
            [oldBooking.status]: Math.max(0, prev[oldBooking.status as keyof BookingStats] - 1),
            [newStatus]: prev[newStatus as keyof BookingStats] + 1,
          }));
        }
        
        toast({
          title: "Status Updated",
          description: `Booking marked as ${newStatus}`,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      setDeletingId(id);
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deletedBooking = bookings.find((b) => b._id === id);
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
        
        // Update stats
        if (deletedBooking) {
          setStats((prev) => ({
            ...prev,
            total: prev.total - 1,
            [deletedBooking.status]: Math.max(0, prev[deletedBooking.status as keyof BookingStats] - 1),
          }));
        }
        
        toast({
          title: "Deleted",
          description: "Booking has been deleted.",
        });
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        title: "Error",
        description: "Failed to delete booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    // Time is stored as string, just return as-is
    return timeString;
  };

  // Get duration based on service
  const getDuration = (service: string) => {
    const durations: Record<string, string> = {
      "Swedish Massage": "60 min",
      "Hot Stone Therapy": "90 min",
      "Aromatherapy": "60 min",
      "Thai Massage": "75 min",
      "Deep Tissue": "60 min",
      "Reflexology": "45 min",
      "Sports Massage": "60 min",
      "Couples Massage": "60 min",
      "Facial Treatment": "45 min",
      "Body Scrub": "45 min",
    };
    return durations[service] || "60 min";
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
            Bookings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track all spa bookings
          </p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground"
          onClick={() => fetchBookings()}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-blue-500">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-amber-500">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-green-500">
          <p className="text-sm text-muted-foreground">Confirmed</p>
          <p className="text-3xl font-bold">{stats.confirmed}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-primary">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-3xl font-bold">{stats.completed}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-red-500">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-3xl font-bold">{stats.cancelled}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-gray-400">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold">
            ${stats.totalRevenue?.toLocaleString() || 0}
          </p>
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
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // Debounce the search
              const timer = setTimeout(() => fetchBookings(), 300);
              return () => clearTimeout(timer);
            }}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter === "all" ? "All Status" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>
                Confirmed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                Cancelled
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("no-show")}>
                No Show
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl bg-card shadow-lg"
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {booking.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {booking.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">
                        {booking.service}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.therapist || "Any Available"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatTime(booking.time)} ({getDuration(booking.service)})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-foreground">
                        ${getPrice(booking.service)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusBadge(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(booking)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {booking.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(booking._id, "confirmed")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Confirm
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(booking._id, "cancelled")
                                }
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(booking._id, "completed")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(booking._id, "cancelled")
                                }
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(booking._id, "no-show")
                                }
                                className="text-gray-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Mark No Show
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status === "cancelled" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(booking._id, "confirmed")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Reopen Booking
                            </DropdownMenuItem>
                          )}
                          {booking.status === "completed" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(booking._id, "confirmed")
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Re-book
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(booking._id)}
                            className="text-red-600"
                            disabled={deletingId === booking._id}
                          >
                            {deletingId === booking._id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {bookings.length === 0 && !loading && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No bookings found</p>
          </div>
        )}
      </motion.div>

      {/* Booking Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information for this booking
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                  {selectedBooking.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold">
                    {selectedBooking.name}
                  </h3>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusBadge(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 rounded-xl bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{selectedBooking.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{selectedBooking.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedBooking.service}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Therapist</p>
                  <p className="font-medium">{selectedBooking.therapist || "Any Available"}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(selectedBooking.date)}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium">
                    {formatTime(selectedBooking.time)} ({getDuration(selectedBooking.service)})
                  </p>
                </div>
              </div>

              {selectedBooking.message && (
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{selectedBooking.message}</p>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <div className="text-lg font-bold">Total</div>
                <div className="text-lg font-bold text-primary">
                  ${getPrice(selectedBooking.service)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedBooking.status === "pending" && (
                  <>
                    <Button 
                      onClick={() => handleStatusChange(selectedBooking._id, "confirmed")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleStatusChange(selectedBooking._id, "cancelled")}
                      className="text-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                )}
                {selectedBooking.status === "confirmed" && (
                  <Button 
                    onClick={() => handleStatusChange(selectedBooking._id, "completed")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Completed
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this booking?")) {
                      handleDelete(selectedBooking._id);
                      setDialogOpen(false);
                    }
                  }}
                  className="ml-auto text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminBookings;
