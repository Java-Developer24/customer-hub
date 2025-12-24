import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Package,
  Users,
  MoreHorizontal,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const initialRegions = [
  { id: 1, name: 'North America', code: 'NA', countries: ['USA', 'Canada', 'Mexico'], products: 12, customers: 1245, active: true },
  { id: 2, name: 'Europe', code: 'EU', countries: ['UK', 'Germany', 'France', 'Spain', 'Italy'], products: 10, customers: 890, active: true },
  { id: 3, name: 'Asia Pacific', code: 'APAC', countries: ['Japan', 'Australia', 'Singapore', 'South Korea'], products: 8, customers: 456, active: true },
  { id: 4, name: 'Latin America', code: 'LATAM', countries: ['Brazil', 'Argentina', 'Chile'], products: 5, customers: 234, active: true },
  { id: 5, name: 'Middle East', code: 'ME', countries: ['UAE', 'Saudi Arabia', 'Israel'], products: 4, customers: 156, active: false },
  { id: 6, name: 'Africa', code: 'AF', countries: ['South Africa', 'Nigeria', 'Kenya'], products: 3, customers: 89, active: false },
];

const RegionManagement = () => {
  const [regions, setRegions] = useState(initialRegions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    countries: '',
    active: true,
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const countriesArray = formData.countries.split(',').map(c => c.trim()).filter(Boolean);
    
    if (editingRegion) {
      setRegions(regions.map(r => 
        r.id === editingRegion.id 
          ? { ...r, ...formData, countries: countriesArray }
          : r
      ));
      toast({
        title: "Region Updated",
        description: `${formData.name} has been updated`,
      });
    } else {
      const newRegion = {
        id: Date.now(),
        ...formData,
        countries: countriesArray,
        products: 0,
        customers: 0,
      };
      setRegions([...regions, newRegion]);
      toast({
        title: "Region Created",
        description: `${formData.name} has been created`,
      });
    }
    
    resetForm();
  };

  const handleDelete = (region) => {
    setRegions(regions.filter(r => r.id !== region.id));
    toast({
      title: "Region Deleted",
      description: `${region.name} has been deleted`,
      variant: "destructive",
    });
  };

  const handleEdit = (region) => {
    setEditingRegion(region);
    setFormData({
      name: region.name,
      code: region.code,
      countries: region.countries.join(', '),
      active: region.active,
    });
    setShowAddModal(true);
  };

  const toggleActive = (region) => {
    setRegions(regions.map(r => 
      r.id === region.id ? { ...r, active: !r.active } : r
    ));
    toast({
      title: region.active ? "Region Deactivated" : "Region Activated",
      description: `${region.name} is now ${region.active ? 'inactive' : 'active'}`,
    });
  };

  const resetForm = () => {
    setShowAddModal(false);
    setEditingRegion(null);
    setFormData({
      name: '',
      code: '',
      countries: '',
      active: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Regional Control</h1>
          <p className="text-muted-foreground">
            Manage product availability by geographic region
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Region
        </Button>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((region, index) => (
          <motion.div
            key={region.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`glass card-hover ${!region.active && 'opacity-60'}`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      region.active ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Globe className={`w-6 h-6 ${region.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{region.name}</h3>
                      <span className="text-sm text-muted-foreground">{region.code}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(region)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleActive(region)}>
                        {region.active ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(region)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {region.countries.slice(0, 3).map((country) => (
                    <span
                      key={country}
                      className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground"
                    >
                      {country}
                    </span>
                  ))}
                  {region.countries.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">
                      +{region.countries.length - 3} more
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{region.products}</p>
                      <p className="text-xs text-muted-foreground">Products</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{region.customers}</p>
                      <p className="text-xs text-muted-foreground">Customers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Region Modal */}
      <Dialog open={showAddModal} onOpenChange={resetForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingRegion ? 'Edit Region' : 'Add New Region'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Region Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., North America"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Region Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g., NA"
                maxLength={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="countries">Countries (comma-separated)</Label>
              <Input
                id="countries"
                value={formData.countries}
                onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                placeholder="e.g., USA, Canada, Mexico"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active Status</Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">
                {editingRegion ? 'Update Region' : 'Create Region'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegionManagement;
