import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function useUserContext() {
  return useContext(UserContext);
}

export function useUserData() {
  const { users } = useUserContext().state;
  return users;
}

export function useLoading() {
  const { loading } = useUserContext().state;
  return loading;
}

export function useEditing() {
  const { editing } = useUserContext().state;
  return editing;
}

export function useSelectedId() {
  const { selectedId } = useUserContext().state;
  return selectedId;
}

export function useSelectedUser() {
  const { selectedUser } = useUserContext().state;
  return selectedUser;
}
