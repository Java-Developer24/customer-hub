import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SortAsc, Grid, List, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/marketplace/Navbar';
import Footer from '@/components/marketplace/Footer';
import ProductCard from '@/components/marketplace/ProductCard';
import { products, categories, getProductsByCategory, searchProducts, getCategoryById } from '@/data/products';
import { FloatingParticles, GradientMesh } from '@/components/effects/AnimatedBackground';

const ProductCatalog = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const category = categoryId ? getCategoryById(categoryId) : null;

  const filteredProducts = useMemo(() => {
    let result = categoryId ? getProductsByCategory(categoryId) : products;

    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    if (localSearch && !searchQuery) {
      const query = localSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedRatings.length > 0) {
      result = result.filter(p => selectedRatings.some(r => p.rating >= r));
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [categoryId, searchQuery, localSearch, priceRange, selectedRatings, sortBy]);

  const handleRatingToggle = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <GradientMesh className="opacity-50" />
        <FloatingParticles count={20} />
      </div>
      
      <Navbar />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            {category && (
              <>
                <span>/</span>
                <span className="text-foreground">{category.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-gradient-primary">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : category
                ? category.name
                : 'All Products'}
            </h1>
          </div>
          {category && (
            <p className="text-muted-foreground mt-2">{category.description}</p>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card variant="glass" className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Filters
                </h3>

                {/* Categories */}
                {!categoryId && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <a
                          key={cat.id}
                          href={`/products/${cat.id}`}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <span className="group-hover:text-primary transition-colors">{cat.name}</span>
                          <Badge variant="secondary" className="text-xs glass-subtle">
                            {cat.productCount}
                          </Badge>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={5}
                    className="mb-3"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="glass-subtle px-2 py-1 rounded">${priceRange[0]}</span>
                    <span className="glass-subtle px-2 py-1 rounded">${priceRange[1]}+</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                        <Checkbox
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => handleRatingToggle(rating)}
                          className="border-primary/50"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {rating}+ stars
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full glass-subtle border-border/50 hover:border-primary/50 hover:glow-soft"
                  onClick={() => {
                    setPriceRange([0, 200]);
                    setSelectedRatings([]);
                    setLocalSearch('');
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            </motion.div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-4 mb-6 glass-card p-4 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden glass-subtle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">{filteredProducts.length}</span> products found
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search in results..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="pl-10 w-48 glass-subtle border-border/50 focus:border-primary"
                  />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 glass-subtle border-border/50">
                    <SortAsc className="h-4 w-4 mr-2 text-primary" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden md:flex items-center glass-subtle rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    className={`rounded-none ${viewMode === 'grid' ? 'bg-primary' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    className={`rounded-none ${viewMode === 'list' ? 'bg-primary' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 glass-card rounded-2xl"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground mb-4">No products found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  className="glass-subtle glow-border"
                  onClick={() => {
                    setPriceRange([0, 200]);
                    setSelectedRatings([]);
                    setLocalSearch('');
                  }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductCatalog;
