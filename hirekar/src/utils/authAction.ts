import { supabase } from "@/src/config/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";

export async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.replace("/(app)/(auth)");
  } catch (err: any) {
    console.error("Logout error:", err.message);
  }
}


export const  deleteUser = async()=>{
  try {
    const {
              data: { user },
              error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
              Alert.alert("Error", "Unable to fetch user. Please log in again.");
              return;
            }

            // Step 3️⃣ Delete user data from 'users' table
            const { error: deleteError } = await supabase
              .from("users")
              .delete()
              .eq("id", user.id);

            if (deleteError) {
              Alert.alert("Error", "Failed to delete user data from database.");
              console.error("Database delete error:", deleteError);
              return;
            }

            // Step 4️⃣ Delete the user from Supabase Auth
            const { error: authError } = await supabase.rpc("delete_user", {
              user_id: user.id,
            });

            if (authError) {
              Alert.alert(
                "Error",
                "Could not delete authentication record. Contact support."
              );
              console.error("Auth delete error:", authError);
              return;
            }

            // Step 5️⃣ Sign out & navigate to login
            await supabase.auth.signOut();
            Alert.alert("Account Deleted", "Your account has been removed.");
            router.replace('/(app)/(auth)');
  } catch (error:any) {
    console.log(error)
  }
}