import EditPost from "@/components/EditPost/EditPost";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const EditPostPage = () => {
  return <ProtectedRoute><EditPost /></ProtectedRoute>;
};

export default EditPostPage;
