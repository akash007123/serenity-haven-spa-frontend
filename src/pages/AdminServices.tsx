import { motion } from "framer-motion";

const AdminServices = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="font-serif text-3xl font-bold text-foreground">Services</h1>
      <p className="text-muted-foreground">Manage spa services and pricing</p>
      <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
        <p className="text-muted-foreground">Services management coming soon</p>
      </div>
    </motion.div>
  );
};

export default AdminServices;
