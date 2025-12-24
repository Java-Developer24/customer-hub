import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.badge && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
            {discountPercent > 0 && (
              <Badge variant="destructive" className="absolute top-3 right-3">
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Content Section */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs capitalize">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span>({product.reviews})</span>
              </div>
            </div>

            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Features Preview */}
            <ul className="space-y-1 mb-4">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  /{product.subscription === 'yearly' ? 'yr' : 'mo'}
                </span>
              </div>
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
