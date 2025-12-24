import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  Check, 
  ChevronRight, 
  Minus, 
  Plus,
  Shield,
  Zap,
  HeadphonesIcon,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/marketplace/Navbar';
import Footer from '@/components/marketplace/Footer';
import ProductCard from '@/components/marketplace/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getProductsByCategory, getCategoryById } from '@/data/products';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const category = getCategoryById(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const guarantees = [
    { icon: Shield, label: '30-Day Money Back' },
    { icon: Zap, label: '99.9% Uptime' },
    { icon: HeadphonesIcon, label: '24/7 Support' },
  ];

  // Mock reviews
  const reviews = [
    { id: 1, author: 'John D.', rating: 5, date: '2024-01-15', content: 'Excellent service! Setup was quick and performance has been outstanding.' },
    { id: 2, author: 'Sarah M.', rating: 4, date: '2024-01-10', content: 'Great value for the price. Support team was very helpful during migration.' },
    { id: 3, author: 'Mike R.', rating: 5, date: '2024-01-05', content: 'Been using this for 6 months now. Couldn\'t be happier with the reliability.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <ChevronRight className="h-4 w-4" />
          {category && (
            <>
              <Link to={`/products/${category.id}`} className="hover:text-foreground">
                {category.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-video rounded-xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
            {discountPercent > 0 && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Save {discountPercent}%
              </Badge>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge variant="secondary" className="mb-3 capitalize">
              {product.category}
            </Badge>

            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-muted-foreground">
                /{product.subscription === 'yearly' ? 'year' : 'month'}
              </span>
            </div>

            {/* Features */}
            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">What's Included:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            <Button variant="outline" size="lg" className="w-full mb-6" onClick={handleBuyNow}>
              Buy Now
            </Button>

            {/* Guarantees */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              {guarantees.map((guarantee) => (
                <div key={guarantee.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <guarantee.icon className="h-4 w-4 text-primary" />
                  <span>{guarantee.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews ({product.reviews})
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                {product.description} Our {product.name} solution is designed to meet the needs
                of businesses of all sizes. With our industry-leading infrastructure and 24/7 support,
                you can focus on what matters most - growing your business.
              </p>
              <h3 className="text-foreground mt-6 mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">{review.author[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.content}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <div className="space-y-4">
              {[
                { q: 'How do I get started?', a: 'After purchase, you\'ll receive instant access to your dashboard where you can configure your service.' },
                { q: 'Can I upgrade my plan later?', a: 'Yes! You can upgrade or downgrade your plan at any time from your account settings.' },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' },
              ].map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
