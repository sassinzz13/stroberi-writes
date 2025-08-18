import AddPost from "@/components/AddPost/AddPost"
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const addpost = () => {
  return <ProtectedRoute><AddPost /></ProtectedRoute>;
};

export default addpost;
