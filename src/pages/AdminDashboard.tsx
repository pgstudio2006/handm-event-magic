import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  CreditCard,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
  Plus,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCustomers, useEmployees, useEvents, useIncomeRecords, useExpenseRecords } from "@/hooks/useSupabase";

const AdminDashboard = () => {
  // Fetch real data from Supabase
  const { data: customers, loading: customersLoading } = useCustomers();
  const { data: employees, loading: employeesLoading } = useEmployees();
  const { data: events, loading: eventsLoading } = useEvents();
  const { data: incomeRecords, loading: incomeLoading } = useIncomeRecords();
  const { data: expenseRecords, loading: expensesLoading } = useExpenseRecords();

  // Calculate stats from real data
  const stats = {
    totalIncome: incomeRecords?.reduce((sum, record) => sum + record.amount, 0) || 0,
    totalExpenses: expenseRecords?.reduce((sum, record) => sum + record.amount, 0) || 0,
    netProfit: (incomeRecords?.reduce((sum, record) => sum + record.amount, 0) || 0) -
               (expenseRecords?.reduce((sum, record) => sum + record.amount, 0) || 0),
    totalEvents: events?.length || 0,
    activeEvents: events?.filter(event => event.status === 'in-progress').length || 0,
    totalCustomers: customers?.length || 0,
    thisMonthIncome: incomeRecords?.filter(record => {
      const recordDate = new Date(record.date);
      const now = new Date();
      return recordDate.getMonth() === now.getMonth() &&
             recordDate.getFullYear() === now.getFullYear();
    }).reduce((sum, record) => sum + record.amount, 0) || 0,
    thisMonthExpenses: expenseRecords?.filter(record => {
      const recordDate = new Date(record.date);
      const now = new Date();
      return recordDate.getMonth() === now.getMonth() &&
             recordDate.getFullYear() === now.getFullYear();
    }).reduce((sum, record) => sum + record.amount, 0) || 0,
    profitMargin: 0, // Will calculate after getting totals
  };

  // Calculate profit margin
  stats.profitMargin = stats.totalIncome > 0 ?
    Math.round((stats.netProfit / stats.totalIncome) * 100 * 100) / 100 : 0;

  const recentEvents = events?.slice(0, 4).map(event => ({
    id: event.id,
    name: event.event_name,
    date: event.event_date,
    status: event.status,
    income: event.budget // Using budget as income for now
  })) || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isLoading = customersLoading || employeesLoading || eventsLoading || incomeLoading || expensesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your event management business performance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link to="/admin/events">
              <Calendar className="mr-2" size={16} />
              Manage Events
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/admin/reports">
              <TrendingUp className="mr-2" size={16} />
              View Reports
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalIncome)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                This month: <span className="font-semibold text-green-600">{formatCurrency(stats.thisMonthIncome)}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(stats.totalExpenses)}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                This month: <span className="font-semibold text-red-600">{formatCurrency(stats.thisMonthExpenses)}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(stats.netProfit)}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Margin: <span className="font-semibold text-primary">{stats.profitMargin}%</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-3xl font-bold">{stats.totalEvents}</p>
              </div>
              <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Active: <span className="font-semibold">{stats.activeEvents}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Events */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <Activity className="mr-2 h-5 w-5" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge variant={event.status === 'completed' ? 'default' : 'secondary'} className="shrink-0">
                      {event.status}
                    </Badge>
                    <span className="font-semibold text-green-600 shrink-0">{formatCurrency(event.income)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No events found</p>
            )}
            <div className="pt-4 border-t">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/admin/events">
                  View All Events <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild className="h-20 flex-col gap-2">
                <Link to="/admin/events">
                  <Calendar size={20} />
                  <span className="text-sm">Add Event</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link to="/admin/income">
                  <IndianRupee size={20} />
                  <span className="text-sm">Add Income</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link to="/admin/expenses">
                  <CreditCard size={20} />
                  <span className="text-sm">Add Expense</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link to="/admin/customers">
                  <Users size={20} />
                  <span className="text-sm">Add Customer</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold">{employees?.filter(emp => emp.status === 'active').length || 0}</p>
              </div>
              <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold">
                  {events?.filter(event => event.status === 'planning' || event.status === 'confirmed').length || 0}
                </p>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
