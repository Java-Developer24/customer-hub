import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Eye,
  UserCog,
  Mail,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { extendedCustomerData } from '@/data/admin-dashboard-data';
import { cn } from '@/lib/utils';

const CustomerSearchAutocomplete = ({ onSelect, placeholder = "Search customers...", className }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const filteredCustomers = query.length >= 2
    ? extendedCustomerData.filter(customer =>
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase()) ||
        customer.shopperId.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!isOpen || filteredCustomers.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCustomers.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCustomers.length) % filteredCustomers.length);
        break;
      case 'Enter':
        e.preventDefault();
        handleSelectCustomer(filteredCustomers[selectedIndex]);
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelectCustomer = (customer) => {
    if (onSelect) {
      onSelect(customer);
    } else {
      navigate(`/admin/customers/${customer.id}`);
    }
    setQuery('');
    setIsOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'suspended': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length >= 2);
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-9 pr-8 bg-secondary border-border"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredCustomers.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-border">
              <p className="text-xs text-muted-foreground px-2">
                {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filteredCustomers.map((customer, index) => (
                <div
                  key={customer.id}
                  onClick={() => handleSelectCustomer(customer)}
                  className={cn(
                    "flex items-center gap-3 p-3 cursor-pointer transition-colors",
                    index === selectedIndex ? "bg-accent" : "hover:bg-secondary/50"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium text-primary">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">{customer.name}</p>
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(customer.status))}>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate">{customer.email}</span>
                      <span>•</span>
                      <span className="font-mono text-xs">{customer.shopperId}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/customers/${customer.id}`);
                        setQuery('');
                        setIsOpen(false);
                      }}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border bg-secondary/30">
              <p className="text-xs text-muted-foreground text-center">
                Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">↵</kbd> to select, 
                <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs ml-1">↑↓</kbd> to navigate
              </p>
            </div>
          </motion.div>
        )}

        {isOpen && query.length >= 2 && filteredCustomers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-50 p-6 text-center"
          >
            <User className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No customers found for "{query}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerSearchAutocomplete;
