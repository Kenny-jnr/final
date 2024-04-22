import { Subscription, UserDetails } from "@/types"
import { SupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
};

export const myUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [UserDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from('users').select('*').single();
  const getSubscription = () => supabase.from('subcriptions').select('*, prices(*, product(*))').in('status', ['trailing', 'active']).single();


}