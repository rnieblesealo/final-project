import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY

export async function handleSignIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // You can show error to user
    console.error('Error signing in:', error.message);
    return null
  } else {
    // maybe redirect to /home or wherever you want
    console.log('Signed in!', data);
    return data
  }
}

export async function handleSignUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username // include username in supabase user metadata
      }
    }
  });

  if (error) {
    // Show error to user
    console.error('Error signing up:', error.message);
    return null
  } else {
    // Depending on your settings:
    // - You might need to verify their email before they can log in
    // - OR Supabase might auto-login them (depending on settings)
    console.log('Sign-up success!', data);
    return data
  }
}

/// Get Supabase session info
export async function getSession() {
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    console.log('User is authenticated:', session.user);
    return session
  } else {
    console.log('No authenticated user');
    return null
  }
}

/// Sign out current user, return status
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    return false
  } else {
    console.log('Signed out successfully.');
    return true
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
