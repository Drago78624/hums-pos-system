import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigate } from "react-router-dom"
import { LogOut, User, Settings, BarChart3, ShoppingCart, Package, Users, TrendingUp } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">HUMS POS System</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Manage your point of sale operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">$2,431</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">45</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">1,234</div>
              <p className="text-xs text-muted-foreground">
                3 items low in stock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button size="lg" className="h-16 text-base font-medium">
              <ShoppingCart className="h-5 w-5 mr-2" />
              New Sale
            </Button>
            <Button variant="outline" size="lg" className="h-16 text-base font-medium">
              <Package className="h-5 w-5 mr-2" />
              View Products
            </Button>
            <Button variant="outline" size="lg" className="h-16 text-base font-medium">
              <BarChart3 className="h-5 w-5 mr-2" />
              Inventory
            </Button>
            <Button variant="outline" size="lg" className="h-16 text-base font-medium">
              <TrendingUp className="h-5 w-5 mr-2" />
              Reports
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Sale completed - $45.99</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Product added - MacBook Pro</span>
                  </div>
                  <span className="text-xs text-muted-foreground">5 minutes ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Customer registered - John Doe</span>
                  </div>
                  <span className="text-xs text-muted-foreground">10 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 