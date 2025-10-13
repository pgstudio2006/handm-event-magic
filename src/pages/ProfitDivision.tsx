import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  Loader2,
  IndianRupee,
  Search
} from "lucide-react";
import { useProfitDistributions } from "@/hooks/useSupabase";

const profitDistributionSchema = z.object({
  month: z.string().min(1, "Month is required"),
  year: z.number().min(2020).max(2030, "Year must be between 2020-2030"),
  total_profit: z.number().min(0, "Total profit must be positive"),
  partner1_percentage: z.number().min(0).max(100, "Percentage must be between 0-100"),
  partner2_percentage: z.number().min(0).max(100, "Percentage must be between 0-100"),
  distribution_date: z.string().min(1, "Distribution date is required"),
});

type ProfitDistributionFormData = z.infer<typeof profitDistributionSchema>;

const ProfitDivision = () => {
  const { data: profitDistributions, loading, error, add, update, remove } = useProfitDistributions();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDistribution, setEditingDistribution] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState<string>("");

  const form = useForm<ProfitDistributionFormData>({
    resolver: zodResolver(profitDistributionSchema),
    defaultValues: {
      month: "",
      year: new Date().getFullYear(),
      total_profit: 0,
      partner1_percentage: 50,
      partner2_percentage: 50,
      distribution_date: new Date().toISOString().split('T')[0],
    },
  });

  // Auto-calculate shares when profit or percentages change
  const calculateShares = (profit: number, partner1Percentage: number, partner2Percentage: number) => {
    const partner1Share = (profit * partner1Percentage) / 100;
    const partner2Share = (profit * partner2Percentage) / 100;
    return { partner1Share, partner2Share };
  };

  const filteredDistributions = profitDistributions?.filter(distribution => {
    const period = `${distribution.month} ${distribution.year}`;
    const matchesSearch = period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterMonth || period.includes(filterMonth);
    return matchesSearch && matchesFilter;
  }) || [];

  const totalDistributed = profitDistributions?.reduce((sum, dist) => sum + dist.partner1_share + dist.partner2_share, 0) || 0;

  const onSubmit = async (data: ProfitDistributionFormData) => {
    try {
      const { partner1Share, partner2Share } = calculateShares(
        data.total_profit,
        data.partner1_percentage,
        data.partner2_percentage
      );

      if (editingDistribution) {
        await update(editingDistribution.id, {
          month: data.month,
          year: data.year,
          total_profit: data.total_profit,
          partner1_percentage: data.partner1_percentage,
          partner2_percentage: data.partner2_percentage,
          partner1_share: partner1Share,
          partner2_share: partner2Share,
          distribution_date: data.distribution_date,
          distributed: true,
        });
        setEditingDistribution(null);
      } else {
        await add({
          month: data.month,
          year: data.year,
          total_profit: data.total_profit,
          partner1_percentage: data.partner1_percentage,
          partner2_percentage: data.partner2_percentage,
          partner1_share: partner1Share,
          partner2_share: partner2Share,
          distribution_date: data.distribution_date,
          distributed: true,
        });
      }

      form.reset();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error saving profit distribution:', error);
    }
  };

  const handleEdit = (distribution: any) => {
    setEditingDistribution(distribution);
    form.reset({
      month: distribution.month,
      year: distribution.year,
      total_profit: distribution.total_profit,
      partner1_percentage: distribution.partner1_percentage,
      partner2_percentage: distribution.partner2_percentage,
      distribution_date: distribution.distribution_date || new Date().toISOString().split('T')[0],
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this profit distribution?')) {
      try {
        await remove(id);
      } catch (error) {
        console.error('Error deleting profit distribution:', error);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading profit distributions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading profit distributions</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profit Division</h1>
          <p className="text-muted-foreground mt-1">
            Manage profit distributions between partners
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2" size={16} />
              Add Distribution
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingDistribution ? 'Edit Profit Distribution' : 'Add New Profit Distribution'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <FormControl>
                          <Input placeholder="January, February, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2024"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="total_profit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Profit (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="partner1_percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partner 1 Share (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50"
                            min="0"
                            max="100"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="partner2_percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partner 2 Share (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50"
                            min="0"
                            max="100"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="distribution_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distribution Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setEditingDistribution(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingDistribution ? 'Update' : 'Add'} Distribution
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Distributed</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalDistributed)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Distributions</p>
                <p className="text-2xl font-bold">{profitDistributions?.length || 0}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by month/year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profit Distributions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Profit Distributions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Total Profit</TableHead>
                <TableHead>Partner 1 Share</TableHead>
                <TableHead>Partner 2 Share</TableHead>
                <TableHead>Distribution Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDistributions.length > 0 ? (
                filteredDistributions.map((distribution) => (
                  <TableRow key={distribution.id}>
                    <TableCell className="font-medium">
                      {distribution.month} {distribution.year}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(distribution.total_profit)}
                    </TableCell>
                    <TableCell className="text-blue-600">
                      {formatCurrency(distribution.partner1_share)} ({distribution.partner1_percentage}%)
                    </TableCell>
                    <TableCell className="text-green-600">
                      {formatCurrency(distribution.partner2_share)} ({distribution.partner2_percentage}%)
                    </TableCell>
                    <TableCell>
                      {distribution.distribution_date || 'Not set'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={distribution.distributed ? 'default' : 'secondary'}>
                        {distribution.distributed ? 'Distributed' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(distribution)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(distribution.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No profit distributions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitDivision;
