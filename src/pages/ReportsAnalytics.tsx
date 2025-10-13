import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  CreditCard,
  Activity,
  Download,
  Loader2,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";
import {
  useCustomers,
  useEmployees,
  useEvents,
  useIncomeRecords,
  useExpenseRecords,
  useProfitDistributions
} from "@/hooks/useSupabase";

const ReportsAnalytics = () => {
  const { data: customers, loading: customersLoading } = useCustomers();
  const { data: employees, loading: employeesLoading } = useEmployees();
  const { data: events, loading: eventsLoading } = useEvents();
  const { data: incomeRecords, loading: incomeLoading } = useIncomeRecords();
  const { data: expenseRecords, loading: expensesLoading } = useExpenseRecords();
  const { data: profitDistributions, loading: profitLoading } = useProfitDistributions();

  // Calculate comprehensive analytics
  const analytics = {
    // Customer Analytics
    totalCustomers: customers?.length || 0,
    activeCustomers: customers?.filter(c => c.status === 'active').length || 0,
    totalCustomerValue: customers?.reduce((sum, c) => sum + c.total_spent, 0) || 0,

    // Employee Analytics
    totalEmployees: employees?.length || 0,
    activeEmployees: employees?.filter(e => e.status === 'active').length || 0,
    totalSalary: employees?.reduce((sum, e) => sum + e.salary, 0) || 0,

    // Event Analytics
    totalEvents: events?.length || 0,
    activeEvents: events?.filter(e => e.status === 'in-progress').length || 0,
    completedEvents: events?.filter(e => e.status === 'completed').length || 0,
    totalEventBudget: events?.reduce((sum, e) => sum + e.budget, 0) || 0,

    // Financial Analytics
    totalIncome: incomeRecords?.reduce((sum, record) => sum + record.amount, 0) || 0,
    totalExpenses: expenseRecords?.reduce((sum, record) => sum + record.amount, 0) || 0,
    netProfit: (incomeRecords?.reduce((sum, record) => sum + record.amount, 0) || 0) -
               (expenseRecords?.reduce((sum, record) => sum + record.amount, 0) || 0),

    // Monthly Analytics (Current Month)
    currentMonth: new Date().toISOString().slice(0, 7), // YYYY-MM format
    monthlyIncome: incomeRecords?.filter(record => record.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((sum, record) => sum + record.amount, 0) || 0,
    monthlyExpenses: expenseRecords?.filter(record => record.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((sum, record) => sum + record.amount, 0) || 0,
    monthlyProfit: 0, // Will calculate after getting totals

    // Profit Distribution Analytics
    totalDistributed: profitDistributions?.reduce((sum, dist) => sum + dist.partner_share, 0) || 0,
    totalCompanyRetained: profitDistributions?.reduce((sum, dist) => sum + dist.company_share, 0) || 0,
  };

  // Calculate derived metrics
  analytics.monthlyProfit = analytics.monthlyIncome - analytics.monthlyExpenses;
  analytics.customerRetentionRate = analytics.totalCustomers > 0 ? (analytics.activeCustomers / analytics.totalCustomers) * 100 : 0;
  analytics.eventCompletionRate = analytics.totalEvents > 0 ? (analytics.completedEvents / analytics.totalEvents) * 100 : 0;
  analytics.profitMargin = analytics.totalIncome > 0 ? (analytics.netProfit / analytics.totalIncome) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isLoading = customersLoading || employeesLoading || eventsLoading || incomeLoading || expensesLoading || profitLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive business analytics and insights
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2" size={16} />
          Export Report
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(analytics.totalIncome)}</p>
                <p className="text-xs text-muted-foreground">
                  +{formatCurrency(analytics.monthlyIncome)} this month
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(analytics.totalExpenses)}</p>
                <p className="text-xs text-muted-foreground">
                  +{formatCurrency(analytics.monthlyExpenses)} this month
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                <p className={`text-3xl font-bold ${analytics.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(analytics.netProfit)}
                </p>
                <p className={`text-xs ${analytics.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.monthlyProfit >= 0 ? '+' : ''}{formatCurrency(analytics.monthlyProfit)} this month
                </p>
              </div>
              <Activity className={`h-8 w-8 ${analytics.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                <p className={`text-3xl font-bold ${analytics.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.profitMargin.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  Target: 20%
                </p>
              </div>
              <BarChart3 className={`h-8 w-8 ${analytics.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2" size={20} />
            Customer Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold">{analytics.totalCustomers}</p>
              <p className="text-xs text-muted-foreground">
                {analytics.activeCustomers} active
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Customer Value</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(analytics.totalCustomerValue)}
              </p>
              <p className="text-xs text-muted-foreground">
                Avg: {analytics.totalCustomers > 0 ? formatCurrency(analytics.totalCustomerValue / analytics.totalCustomers) : '₹0'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {analytics.customerRetentionRate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                Active vs Total
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2" size={20} />
            Event Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Events</p>
              <p className="text-2xl font-bold">{analytics.totalEvents}</p>
              <p className="text-xs text-muted-foreground">
                {analytics.activeEvents} in progress
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {analytics.eventCompletionRate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                {analytics.completedEvents} completed
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Event Budget</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(analytics.totalEventBudget)}
              </p>
              <p className="text-xs text-muted-foreground">
                Across all events
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2" size={20} />
            Employee Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold">{analytics.totalEmployees}</p>
              <p className="text-xs text-muted-foreground">
                {analytics.activeEmployees} active
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Salary Cost</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(analytics.totalSalary)}
              </p>
              <p className="text-xs text-muted-foreground">
                Monthly payroll
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profit Distribution Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="mr-2" size={20} />
            Profit Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Distributed</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(analytics.totalDistributed)}
              </p>
              <p className="text-xs text-muted-foreground">
                To partners
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Company Retained</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(analytics.totalCompanyRetained)}
              </p>
              <p className="text-xs text-muted-foreground">
                For reinvestment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2" size={20} />
            Current Month Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Income</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(analytics.monthlyIncome)}</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(analytics.monthlyExpenses)}</p>
                  </div>
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profit</p>
                    <p className={`text-lg font-bold ${analytics.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(analytics.monthlyProfit)}
                    </p>
                  </div>
                  <Activity className={`h-6 w-6 ${analytics.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Badge variant={analytics.profitMargin >= 20 ? 'default' : 'destructive'}>
                {analytics.profitMargin >= 20 ? 'Good' : 'Needs Improvement'}
              </Badge>
              <span className="text-sm">
                Profit margin is {analytics.profitMargin.toFixed(1)}% {analytics.profitMargin >= 20 ? '(meeting target)' : '(below 20% target)'}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Badge variant={analytics.customerRetentionRate >= 80 ? 'default' : 'secondary'}>
                {analytics.customerRetentionRate >= 80 ? 'Excellent' : 'Good'}
              </Badge>
              <span className="text-sm">
                Customer retention rate is {analytics.customerRetentionRate.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Badge variant={analytics.eventCompletionRate >= 90 ? 'default' : 'secondary'}>
                {analytics.eventCompletionRate >= 90 ? 'Excellent' : 'Good'}
              </Badge>
              <span className="text-sm">
                Event completion rate is {analytics.eventCompletionRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
