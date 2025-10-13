import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

// Type aliases for easier use
type Tables = Database['public']['Tables'];
export type Customer = Tables['customers']['Row'];
export type Employee = Tables['employees']['Row'];
export type Event = Tables['events']['Row'];
export type IncomeRecord = Tables['income_records']['Row'];
export type ExpenseRecord = Tables['expense_records']['Row'];
export type ProfitDistribution = Tables['profit_distributions']['Row'];
export type Receipt = Tables['receipts']['Row'];

// Generic CRUD hook
export function useSupabaseTable<T extends keyof Tables>(
  tableName: T,
  options?: {
    select?: string;
    orderBy?: string;
    ascending?: boolean;
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase.from(tableName).select(options?.select || '*');

      if (options?.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? true });
      }

      const { data: result, error } = await query;

      if (error) throw error;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName]);

  const add = async (item: Tables[T]['Insert']) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(item)
        .select()
        .single();

      if (error) throw error;
      setData(prev => prev ? [...prev, result] : [result]);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
      throw err;
    }
  };

  const update = async (id: string, updates: Tables[T]['Update']) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setData(prev => prev ? prev.map(item => item.id === id ? result : item) : [result]);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      setData(prev => prev ? prev.filter(item => item.id !== id) : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    add,
    update,
    remove
  };
}

// Specific hooks for each table
export const useCustomers = (options?: Parameters<typeof useSupabaseTable>[1]) =>
  useSupabaseTable('customers', options);

export const useEmployees = (options?: Parameters<typeof useSupabaseTable>[1]) =>
  useSupabaseTable('employees', options);

export const useEvents = (options?: Parameters<typeof useSupabaseTable>[1]) =>
  useSupabaseTable('events', options);

export const useIncomeRecords = (options?: Parameters<typeof useSupabaseTable>[1]) =>
  useSupabaseTable('income_records', options);

export const useExpenseRecords = (options?: Parameters<typeof useSupabaseTable>[1]) =>
  useSupabaseTable('expense_records', options);

export const useProfitDistributions = (options?: Parameters<typeof useSupabaseTable>[1]) =>
  useSupabaseTable('profit_distributions', options);

export const useReceipts = (options?: Parameters<typeof useSupabaseTable>[1]) =>
  useSupabaseTable('receipts', options);
