import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong");
    },
  });
  return { logout, isLoading };
}
