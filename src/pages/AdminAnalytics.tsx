import { motion } from "framer-motion";

const AdminAnalytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="font-serif text-3xl font-bold text-foreground">Analytics</h1>
      <p className="text-muted-foreground">View spa performance metrics and reports</p>
      <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
        <p className="text-muted-foreground">Analytics dashboard coming soon</p>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
