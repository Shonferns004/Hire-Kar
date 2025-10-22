import { createClient } from '@supabase/supabase-js';
import * as SecureStore from "expo-secure-store";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};




const SUPABASE_URL: any = process.env.EXPO_PUBLIC_SUPABASE_URL;;
const SUPABASE_ANON_KEY: any = process.env.EXPO_PUBLIC_SUPABASE_API_KEY;;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{
    auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
