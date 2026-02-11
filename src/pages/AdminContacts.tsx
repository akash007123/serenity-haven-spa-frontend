import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Reply,
  Archive,
  Flag,
  Loader2,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Types
interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
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
    new: "bg-blue-100 text-blue-700 font-medium",
    read: "bg-muted text-muted-foreground",
    replied: "bg-green-100 text-green-700",
    archived: "bg-amber-100 text-amber-700",
  };
  return styles[status] || "bg-muted text-muted-foreground";
};

const getPriorityBadge = (contact: Contact) => {
  // Priority based on status and recency
  if (contact.status === "new") {
    return "bg-red-100 text-red-700";
  }
  // Check if recent (within 24 hours)
  const createdAt = new Date(contact.createdAt);
  const now = new Date();
  const hoursSinceCreated = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  
  if (hoursSinceCreated < 24 && contact.status !== "archived") {
    return "bg-orange-100 text-orange-700";
  }
  
  return "bg-gray-100 text-gray-700";
};

const getPriorityLabel = (contact: Contact) => {
  if (contact.status === "new") return "high";
  const createdAt = new Date(contact.createdAt);
  const now = new Date();
  const hoursSinceCreated = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  
  if (hoursSinceCreated < 24 && contact.status !== "archived") return "urgent";
  return "normal";
};

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats>({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    archived: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch contacts from API
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      const response = await fetch(`${API_URL}/contacts?${params}`);
      const result = await response.json();
      
      if (result.success) {
        // Filter by search term on client side for better UX
        let filtered = result.data;
        if (searchTerm) {
          filtered = filtered.filter(
            (contact: Contact) =>
              contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (contact.subject?.toLowerCase() || "").includes(searchTerm.toLowerCase())
          );
        }
        setContacts(filtered);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast({
        title: "Error",
        description: "Failed to load contacts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm, toast]);

  // Fetch stats from API
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/contacts/stats`);
      const result = await response.json();
      
      if (result.success) {
        const backendData = result.data;
        setStats({
          total: backendData.total || 0,
          new: backendData.newMessages || 0,
          read: backendData.byStatus?.read || 0,
          replied: backendData.byStatus?.replied || 0,
          archived: backendData.byStatus?.archived || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [fetchContacts, fetchStats]);

  // Refetch when filters change
  useEffect(() => {
    fetchContacts();
  }, [statusFilter, fetchContacts]);

  const handleView = async (contact: Contact) => {
    setSelectedContact(contact);
    setReplyMode(false);
    setReplyMessage("");
    setDialogOpen(true);

    // Mark as read if new
    if (contact.status === "new") {
      try {
        await fetch(`${API_URL}/contacts/${contact._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" }),
        });
        setContacts((prev) =>
          prev.map((c) =>
            c._id === contact._id ? { ...c, status: "read" } : c
          )
        );
        setStats((prev) => ({
          ...prev,
          new: prev.new - 1,
          read: prev.read + 1,
        }));
        setSelectedContact((prev) => prev ? { ...prev, status: "read" } : null);
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const handleReply = () => {
    setReplyMode(true);
    setReplyMessage(`Hi ${selectedContact?.name.split(" ")[0]},\n\nThank you for reaching out. \n\nBest regards,\nTripod Wellness Team`);
  };

  const handleSendReply = async () => {
    if (!selectedContact) return;

    try {
      const response = await fetch(`${API_URL}/contacts/${selectedContact._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: "replied",
          notes: replyMessage
        }),
      });

      if (response.ok) {
        setContacts((prev) =>
          prev.map((c) =>
            c._id === selectedContact._id ? { ...c, status: "replied" } : c
          )
        );
        setStats((prev) => ({
          ...prev,
          replied: prev.replied + 1,
          read: Math.max(0, prev.read - 1),
        }));
        toast({
          title: "Success",
          description: "Reply sent successfully!",
        });
        setDialogOpen(false);
      } else {
        throw new Error("Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "archived" }),
      });

      if (response.ok) {
        setContacts((prev) =>
          prev.map((contact) =>
            contact._id === id ? { ...contact, status: "archived" } : contact
          )
        );
        
        // Update stats
        setStats((prev) => {
          const contact = contacts.find(c => c._id === id);
          if (!contact) return prev;
          
          return {
            ...prev,
            archived: prev.archived + 1,
            [contact.status]: Math.max(0, prev[contact.status as keyof ContactStats] - 1),
          };
        });
        
        toast({
          title: "Archived",
          description: "Contact has been archived.",
        });
      }
    } catch (error) {
      console.error("Error archiving contact:", error);
      toast({
        title: "Error",
        description: "Failed to archive contact. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      setDeletingId(id);
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deletedContact = contacts.find((c) => c._id === id);
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
        
        // Update stats
        if (deletedContact) {
          setStats((prev) => ({
            ...prev,
            total: prev.total - 1,
            [deletedContact.status]: Math.max(0, prev[deletedContact.status as keyof ContactStats] - 1),
          }));
        }
        
        toast({
          title: "Deleted",
          description: "Contact has been deleted.",
        });
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast({
        title: "Error",
        description: "Failed to delete contact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Contact["status"]) => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const oldContact = contacts.find((c) => c._id === id);
        setContacts((prev) =>
          prev.map((contact) =>
            contact._id === id ? { ...contact, status: newStatus } : contact
          )
        );
        
        // Update stats
        if (oldContact) {
          setStats((prev) => ({
            ...prev,
            [oldContact.status]: Math.max(0, prev[oldContact.status as keyof ContactStats] - 1),
            [newStatus]: prev[newStatus as keyof ContactStats] + 1,
          }));
        }
        
        toast({
          title: "Status Updated",
          description: `Contact marked as ${newStatus}`,
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
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
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
            Contacts
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage customer inquiries and messages
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => {
            setStatusFilter("archived");
          }}>
            <Archive className="mr-2 h-4 w-4" />
            View Archived
          </Button>
          <Button 
            className="bg-primary text-primary-foreground"
            onClick={() => fetchContacts()}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-blue-500">
          <p className="text-sm text-muted-foreground">Total Messages</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-primary">
          <p className="text-sm text-muted-foreground">New</p>
          <p className="text-3xl font-bold">{stats.new}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-green-500">
          <p className="text-sm text-muted-foreground">Read</p>
          <p className="text-3xl font-bold">{stats.read}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-amber-500">
          <p className="text-sm text-muted-foreground">Replied</p>
          <p className="text-3xl font-bold">{stats.replied}</p>
        </div>
        <div className="rounded-xl bg-card p-4 shadow border-l-4 border-gray-400">
          <p className="text-sm text-muted-foreground">Archived</p>
          <p className="text-3xl font-bold">{stats.archived}</p>
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
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // Debounce the search
              const timer = setTimeout(() => fetchContacts(), 300);
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
              <DropdownMenuItem onClick={() => setStatusFilter("new")}>
                New
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("read")}>
                Read
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("replied")}>
                Replied
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("archived")}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Contacts Table */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl bg-card shadow-lg"
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No messages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Priority
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
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className={`transition-colors cursor-pointer ${
                      contact.status === "new"
                        ? "bg-primary/5 hover:bg-primary/10"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleView(contact)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                            contact.status === "new"
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {contact.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {contact.email}
                          </p>
                          {contact.mobile && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {contact.mobile}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">
                        {contact.subject || "General Inquiry"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(contact.createdAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(contact.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getPriorityBadge(contact)}>
                        {getPriorityLabel(contact)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusBadge(contact.status)}>
                        {contact.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleView(contact);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleReply();
                          }}>
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>
                          {contact.status !== "archived" && (
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleArchive(contact._id);
                            }}>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          )}
                          {contact.status === "archived" && (
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(contact._id, "read");
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              Unarchive
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(contact._id);
                            }}
                            className="text-red-600"
                            disabled={deletingId === contact._id}
                          >
                            {deletingId === contact._id ? (
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
      </motion.div>

      {/* Contact Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              View and reply to customer message
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-semibold">
                    {selectedContact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {selectedContact.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityBadge(selectedContact)}>
                    {getPriorityLabel(selectedContact)}
                  </Badge>
                  <Badge className={getStatusBadge(selectedContact.status)}>
                    {selectedContact.status}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {selectedContact.email}
                </div>
                {selectedContact.mobile && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {selectedContact.mobile}
                  </div>
                )}
              </div>

              {/* Subject */}
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Subject
                </h4>
                <p className="text-muted-foreground">
                  {selectedContact.subject || "General Inquiry"}
                </p>
              </div>

              {/* Message */}
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  Message
                </h4>
                <div className="rounded-lg bg-muted p-4 text-sm">
                  {selectedContact.message}
                </div>
              </div>

              {/* Date */}
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedContact.createdAt)}
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {formatTime(selectedContact.createdAt)}
                </div>
              </div>

              {/* Reply Section */}
              {!replyMode ? (
                <div className="flex gap-3">
                  <Button onClick={handleReply} className="bg-primary text-primary-foreground">
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                  {selectedContact.status !== "archived" && (
                    <Button variant="outline" onClick={() => handleArchive(selectedContact._id)}>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </Button>
                  )}
                  {selectedContact.status === "archived" && (
                    <Button variant="outline" onClick={() => handleStatusChange(selectedContact._id, "read")}>
                      <Eye className="mr-2 h-4 w-4" />
                      Unarchive
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this message?")) {
                        handleDelete(selectedContact._id);
                        setDialogOpen(false);
                      }
                    }}
                    className="ml-auto text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={6}
                  />
                  <div className="flex gap-3">
                    <Button onClick={handleSendReply} className="bg-primary text-primary-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Reply
                    </Button>
                    <Button variant="outline" onClick={() => setReplyMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminContacts;
