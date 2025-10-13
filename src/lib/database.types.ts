import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from './supabase';

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

// Database Types
export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          company: string | null;
          address: string | null;
          notes: string | null;
          status: 'active' | 'inactive';
          total_events: number;
          total_spent: number;
          join_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          address?: string | null;
          notes?: string | null;
          status?: 'active' | 'inactive';
          total_events?: number;
          total_spent?: number;
          join_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          address?: string | null;
          notes?: string | null;
          status?: 'active' | 'inactive';
          total_events?: number;
          total_spent?: number;
          join_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      employees: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          position: string;
          department: string;
          salary: number;
          join_date: string;
          address: string | null;
          emergency_contact: string | null;
          notes: string | null;
          status: 'active' | 'inactive';
          events_handled: number;
          performance: 'excellent' | 'good' | 'average' | 'needs_improvement';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          position: string;
          department: string;
          salary: number;
          join_date: string;
          address?: string | null;
          emergency_contact?: string | null;
          notes?: string | null;
          status?: 'active' | 'inactive';
          events_handled?: number;
          performance?: 'excellent' | 'good' | 'average' | 'needs_improvement';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          position?: string;
          department?: string;
          salary?: number;
          join_date?: string;
          address?: string | null;
          emergency_contact?: string | null;
          notes?: string | null;
          status?: 'active' | 'inactive';
          events_handled?: number;
          performance?: 'excellent' | 'good' | 'average' | 'needs_improvement';
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          event_name: string;
          event_type: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string;
          location: string;
          event_date: string;
          employee_name: string;
          budget: number;
          description: string | null;
          status: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_name: string;
          event_type: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string;
          location: string;
          event_date: string;
          employee_name: string;
          budget: number;
          description?: string | null;
          status?: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_name?: string;
          event_type?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string;
          location?: string;
          event_date?: string;
          employee_name?: string;
          budget?: number;
          description?: string | null;
          status?: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      income_records: {
        Row: {
          id: string;
          event_name: string;
          customer_name: string;
          amount: number;
          payment_method: string;
          description: string | null;
          date: string;
          status: 'received' | 'pending' | 'overdue';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_name: string;
          customer_name: string;
          amount: number;
          payment_method: string;
          description?: string | null;
          date: string;
          status?: 'received' | 'pending' | 'overdue';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_name?: string;
          customer_name?: string;
          amount?: number;
          payment_method?: string;
          description?: string | null;
          date?: string;
          status?: 'received' | 'pending' | 'overdue';
          created_at?: string;
          updated_at?: string;
        };
      };
      expense_records: {
        Row: {
          id: string;
          category: string;
          description: string;
          amount: number;
          vendor: string;
          payment_method: string;
          date: string;
          receipt_number: string | null;
          status: 'paid' | 'pending' | 'overdue';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          description: string;
          amount: number;
          vendor: string;
          payment_method: string;
          date: string;
          receipt_number?: string | null;
          status?: 'paid' | 'pending' | 'overdue';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          description?: string;
          amount?: number;
          vendor?: string;
          payment_method?: string;
          date?: string;
          receipt_number?: string | null;
          status?: 'paid' | 'pending' | 'overdue';
          created_at?: string;
          updated_at?: string;
        };
      };
      profit_distributions: {
        Row: {
          id: string;
          month: string;
          year: number;
          total_profit: number;
          partner1_percentage: number;
          partner2_percentage: number;
          partner1_share: number;
          partner2_share: number;
          distributed: boolean;
          distribution_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          month: string;
          year: number;
          total_profit: number;
          partner1_percentage: number;
          partner2_percentage: number;
          partner1_share: number;
          partner2_share: number;
          distributed?: boolean;
          distribution_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          month?: string;
          year?: number;
          total_profit?: number;
          partner1_percentage?: number;
          partner2_percentage?: number;
          partner1_share?: number;
          partner2_share?: number;
          distributed?: boolean;
          distribution_date?: string | null;
          created_at?: string;
        };
      };
      receipts: {
        Row: {
          id: string;
          receipt_number: string;
          customer_name: string;
          event_name: string;
          amount: number;
          payment_method: string;
          date: string;
          status: 'paid' | 'pending';
          created_at: string;
        };
        Insert: {
          id?: string;
          receipt_number: string;
          customer_name: string;
          event_name: string;
          amount: number;
          payment_method: string;
          date: string;
          status?: 'paid' | 'pending';
          created_at?: string;
        };
        Update: {
          id?: string;
          receipt_number?: string;
          customer_name?: string;
          event_name?: string;
          amount?: number;
          payment_method?: string;
          date?: string;
          status?: 'paid' | 'pending';
          created_at?: string;
        };
      };
    };
  };
}
