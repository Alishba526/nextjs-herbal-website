"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { store, useStore } from "@/lib/store";
import { PRODUCTS, saveProducts, CATEGORY_LIST, saveCategories } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Trash2,
  Edit,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Mail
} from "lucide-react";
import { alert } from "@/lib/alert";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();
  const { isAdmin, orders, customers, offers, settings: siteSettings } = useStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, router, mounted]);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Authenticating...</div>;
  }

  const handleLogout = () => {
    store.logout();
    router.push("/admin/login");
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    totalCustomers: customers.length,
    totalProducts: PRODUCTS.length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo.png" alt="Growzix" width={48} height={48} className="h-12 w-auto" />
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Growzix Natural</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders ({stats.pendingOrders})</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab stats={stats} orders={orders} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab orders={orders} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>

          <TabsContent value="customers">
            <CustomersTab customers={customers} />
          </TabsContent>

          <TabsContent value="offers">
            <OffersTab offers={offers} customers={customers} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab settings={siteSettings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OverviewTab({ stats, orders }: any) {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold">{stats.totalOrders}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-3xl font-bold">{stats.pendingOrders}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-3xl font-bold">{stats.totalCustomers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-green-500" />
              <span className="text-3xl font-bold">{stats.totalProducts}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from customers</CardDescription>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${order.total.toFixed(2)}</p>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function OrdersTab({ orders }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
        <CardDescription>Manage customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border border-border rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment</p>
                    <p className="font-medium uppercase">{order.payment}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="text-sm">{order.address}, {order.city}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-semibold mb-2">Items:</p>
                  <div className="space-y-1">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{item.title} × {item.qty}</span>
                        <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => {
                      store.setOrderStatus(order.id, "confirmed");
                      alert.success("Order confirmed");
                    }}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Confirm
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      store.setOrderStatus(order.id, "shipping");
                      alert.success("Order marked as shipping");
                    }}>
                      <Truck className="w-4 h-4 mr-1" />
                      Ship
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => {
                      if (confirm("Delete this order?")) {
                        store.deleteOrder(order.id);
                        alert.success("Order deleted");
                      }
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProductsTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState(PRODUCTS);

  useEffect(() => {
    const handler = () => setProducts([...PRODUCTS]);
    window.addEventListener("growzix-data-update", handler);
    return () => window.removeEventListener("growzix-data-update", handler);
  }, []);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter(p => p.id !== id);
      saveProducts(updated);
      alert.success("Product deleted successfully!");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Products Management</CardTitle>
                <CardDescription>Total products: {products.length}</CardDescription>
              </div>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                  <Image src={product.image} alt={product.title} width={60} height={60} className="w-15 h-15 object-contain rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <p className="text-sm font-bold text-primary mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                    <p className="text-xs text-muted-foreground">Rating: {product.rating}⭐</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <ProductForm product={editingProduct} onClose={handleFormClose} />
      )}
    </div>
  );
}

function ProductForm({ product, onClose }: { product: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    slug: product?.slug || "",
    category: product?.category || "Hair Care",
    description: product?.description || "",
    price: product?.price || 0,
    oldPrice: product?.oldPrice || 0,
    image: product?.image || "",
    stock: product?.stock || 0,
    rating: product?.rating || 5,
    reviews: product?.reviews || 0,
    badge: product?.badge || "",
    benefits: product?.benefits?.join("\n") || "",
    ingredients: product?.ingredients?.join(", ") || "",
    usage: product?.usage || "",
  });
  const [imagePreview, setImagePreview] = useState(product?.image || "");

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData(prev => ({ ...prev, image: base64String }));
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.slug || !formData.description || !formData.image) {
      alert.error("Please fill all required fields");
      return;
    }

    const newProduct = {
      id: product?.id || Date.now().toString(),
      slug: formData.slug,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      image: formData.image,
      images: product?.images || [formData.image],
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      stock: Number(formData.stock),
      badge: formData.badge || undefined,
      benefits: formData.benefits.split("\n").filter(Boolean),
      ingredients: formData.ingredients.split(",").map(s => s.trim()).filter(Boolean),
      usage: formData.usage,
      currency: "USD" as const,
    };

    let updated;
    if (product) {
      updated = PRODUCTS.map(p => p.id === product.id ? newProduct : p);
      alert.success("Product updated successfully!");
    } else {
      updated = [...PRODUCTS, newProduct];
      alert.success("Product added successfully!");
    }

    saveProducts(updated);
    onClose();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
            <CardDescription>Fill in the product details</CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Product Title *</Label>
            <Input value={formData.title} onChange={e => handleChange("title", e.target.value)} placeholder="Product name" />
          </div>
          <div>
            <Label>Slug (URL) *</Label>
            <Input value={formData.slug} onChange={e => handleChange("slug", e.target.value)} placeholder="product-slug" />
          </div>
        </div>

        <div>
          <Label>Category *</Label>
          <Input value={formData.category} onChange={e => handleChange("category", e.target.value)} placeholder="Hair Care" />
        </div>

        <div>
          <Label>Product Image *</Label>
          <div className="space-y-3">
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
            <p className="text-xs text-muted-foreground">Upload product image (Max 2MB, JPG/PNG)</p>
            {imagePreview && (
              <div className="border border-border rounded-lg p-3 bg-secondary/30">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <Image src={imagePreview} alt="Preview" width={120} height={120} className="w-30 h-30 object-contain rounded" />
              </div>
            )}
          </div>
        </div>

        <div>
          <Label>Description *</Label>
          <Textarea value={formData.description} onChange={e => handleChange("description", e.target.value)} rows={3} placeholder="Product description" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Price ($) *</Label>
            <Input type="number" step="0.01" value={formData.price} onChange={e => handleChange("price", e.target.value)} />
          </div>
          <div>
            <Label>Old Price ($)</Label>
            <Input type="number" step="0.01" value={formData.oldPrice} onChange={e => handleChange("oldPrice", e.target.value)} />
          </div>
          <div>
            <Label>Stock *</Label>
            <Input type="number" value={formData.stock} onChange={e => handleChange("stock", e.target.value)} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Rating (1-5)</Label>
            <Input type="number" step="0.1" min="1" max="5" value={formData.rating} onChange={e => handleChange("rating", e.target.value)} />
          </div>
          <div>
            <Label>Reviews Count</Label>
            <Input type="number" value={formData.reviews} onChange={e => handleChange("reviews", e.target.value)} />
          </div>
          <div>
            <Label>Badge</Label>
            <Input value={formData.badge} onChange={e => handleChange("badge", e.target.value)} placeholder="Sale, New, Hot" />
          </div>
        </div>

        <div>
          <Label>Benefits (one per line)</Label>
          <Textarea value={formData.benefits} onChange={e => handleChange("benefits", e.target.value)} rows={4} placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3" />
        </div>

        <div>
          <Label>Ingredients (comma separated)</Label>
          <Input value={formData.ingredients} onChange={e => handleChange("ingredients", e.target.value)} placeholder="Ingredient 1, Ingredient 2, Ingredient 3" />
        </div>

        <div>
          <Label>Usage Instructions</Label>
          <Textarea value={formData.usage} onChange={e => handleChange("usage", e.target.value)} rows={3} placeholder="How to use this product" />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </CardContent>
    </Card>
  );
}

function CustomersTab({ customers }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>Total customers: {customers.length}</CardDescription>
      </CardHeader>
      <CardContent>
        {customers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No customers yet</p>
        ) : (
          <div className="space-y-3">
            {customers.map((customer: any) => (
              <div key={customer.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-semibold">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Joined: {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OffersTab({ offers, customers }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");

  const createOffer = () => {
    if (!title || !description || !discount) {
      alert.error("Please fill all fields");
      return;
    }
    store.createOffer(title, description, discount);
    alert.success("Offer created!");
    setTitle("");
    setDescription("");
    setDiscount("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Offer</CardTitle>
          <CardDescription>Send promotional offers to all customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Offer Title</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Summer Sale" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Get amazing discounts..." rows={3} />
          </div>
          <div>
            <Label>Discount</Label>
            <Input value={discount} onChange={e => setDiscount(e.target.value)} placeholder="30% OFF" />
          </div>
          <Button onClick={createOffer}>
            <Plus className="w-4 h-4 mr-2" />
            Create Offer
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Offers</CardTitle>
          <CardDescription>Manage promotional offers</CardDescription>
        </CardHeader>
        <CardContent>
          {offers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No offers created yet</p>
          ) : (
            <div className="space-y-3">
              {offers.map((offer: any) => (
                <div key={offer.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold">{offer.title}</p>
                      <p className="text-sm text-primary font-semibold">{offer.discount}</p>
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => {
                      if (confirm("Delete this offer?")) {
                        store.deleteOffer(offer.id);
                        alert.success("Offer deleted");
                      }
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {offer.notifiedCount ? `Sent to ${offer.notifiedCount} customers` : "Not sent yet"}
                    </p>
                    <Button size="sm" onClick={() => {
                      const result = store.notifyOffer(offer.id);
                      window.location.href = result.mailto;
                      alert.success(`Offer sent to ${result.count} customers!`);
                    }}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send to Customers
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsTab({ settings }: any) {
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [phone, setPhone] = useState(settings.contactPhone);
  const [email, setEmail] = useState(settings.contactEmail);
  const [address, setAddress] = useState(settings.contactAddress);
  const [facebook, setFacebook] = useState(settings.social.facebook);
  const [twitter, setTwitter] = useState(settings.social.twitter);
  const [instagram, setInstagram] = useState(settings.social.instagram);

  const saveSettings = () => {
    store.updateSettings({
      whatsappNumber: whatsapp,
      contactPhone: phone,
      contactEmail: email,
      contactAddress: address,
      social: { facebook, twitter, instagram }
    });
    alert.success("Settings saved!");
  };

  const resetToDefaults = async () => {
    if (confirm("This will overwrite your current products and categories with the latest default data from the code. Continue?")) {
      const { DEFAULT_PRODUCTS, DEFAULT_CATEGORIES } = await import("@/lib/products");
      await saveProducts(DEFAULT_PRODUCTS);
      await saveCategories(DEFAULT_CATEGORIES);
      alert.success("Reset to defaults successful!");
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Manage website configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>WhatsApp Number (for orders)</Label>
          <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="923001234567" />
          <p className="text-xs text-muted-foreground mt-1">Format: Country code + number (no spaces or +)</p>
        </div>
        <div>
          <Label>Contact Phone</Label>
          <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+92 300 1234567" />
        </div>
        <div>
          <Label>Contact Email</Label>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@growzix.com" />
        </div>
        <div>
          <Label>Contact Address</Label>
          <Textarea value={address} onChange={e => setAddress(e.target.value)} rows={2} />
        </div>
        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold mb-3">Social Media Links</h3>
          <div className="space-y-3">
            <div>
              <Label>Facebook URL</Label>
              <Input value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <Label>Twitter URL</Label>
              <Input value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="https://twitter.com/..." />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4 border-t border-border">
          <Button onClick={saveSettings} className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string; icon: any }> = {
    pending: { label: "Pending", className: "bg-orange-500/10 text-orange-500", icon: Clock },
    confirmed: { label: "Confirmed", className: "bg-blue-500/10 text-blue-500", icon: CheckCircle },
    shipping: { label: "Shipping", className: "bg-purple-500/10 text-purple-500", icon: Truck },
    delivered: { label: "Delivered", className: "bg-green-500/10 text-green-500", icon: CheckCircle },
    cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-500", icon: XCircle },
  };

  const { label, className, icon: Icon } = config[status] || config.pending;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
