import { motion } from "framer-motion";

const AdminTherapists = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="font-serif text-3xl font-bold text-foreground">Therapists</h1>
      <p className="text-muted-foreground">Manage therapist profiles and schedules</p>
      <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
        <p className="text-muted-foreground">Therapist management coming soon</p>
      </div>
    </motion.div>
  );
};

export default AdminTherapists;
