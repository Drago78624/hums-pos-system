import { supabase } from "@/lib/supabase"

export const signIn = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return;
}

export const signUp = async (email, password) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return;
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }

  return;
}