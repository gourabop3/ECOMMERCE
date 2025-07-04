import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Settings,
  Tag,
  FileText,
  BarChart3,
  Package,
  Image,
  Star,
  LogOut,
  User
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { resetTokenAndCredentials } from "@/store/auth-slice";
import { Avatar, AvatarFallback } from "../ui/avatar";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
    section: "main"
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
    section: "main"
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
    section: "main"
  },
  {
    id: "customers",
    label: "Customers",
    path: "/admin/customers",
    icon: <Users />,
    section: "main"
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/admin/analytics",
    icon: <BarChart3 />,
    section: "reports"
  },
  {
    id: "reviews",
    label: "Reviews",
    path: "/admin/reviews",
    icon: <Star />,
    section: "reports"
  },
  {
    id: "categories",
    label: "Categories",
    path: "/admin/categories",
    icon: <Tag />,
    section: "catalog"
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <Image />,
    section: "catalog"
  },
  {
    id: "inventory",
    label: "Inventory",
    path: "/admin/inventory",
    icon: <Package />,
    section: "catalog"
  },
  {
    id: "reports",
    label: "Reports",
    path: "/admin/reports",
    icon: <FileText />,
    section: "reports"
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <Settings />,
    section: "system"
  }
];

const menuSections = {
  main: "Main",
  catalog: "Catalog Management",
  reports: "Reports & Analytics",
  system: "System"
};

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const groupedMenuItems = adminSidebarMenuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <nav className="mt-8 flex-col flex gap-1">
      {Object.entries(groupedMenuItems).map(([section, items]) => (
        <div key={section} className="mb-6">
          <h3 className="mb-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {menuSections[section]}
          </h3>
          <div className="space-y-1">
            {items.map((menuItem) => {
              const isActive = location.pathname === menuItem.path;
              return (
                <div
                  key={menuItem.id}
                  onClick={() => {
                    navigate(menuItem.path);
                    setOpen ? setOpen(false) : null;
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className={`${isActive ? "text-white" : "text-gray-500"}`}>
                    {menuItem.icon}
                  </div>
                  <span>{menuItem.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function UserProfile({ setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="mt-auto p-4 border-t">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="bg-gradient-to-r from-blue-500 to-purple-600">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
            {user?.userName?.[0]?.toUpperCase() || "A"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.userName || "Admin"}
          </p>
          <p className="text-xs text-gray-500 truncate">Administrator</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => {
            navigate("/admin/profile");
            setOpen && setOpen(false);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <User className="w-4 h-4" />
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <SheetTitle className="flex gap-3 items-center text-white">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ChartNoAxesCombined size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold">ShopCart Admin</h1>
                  <p className="text-sm opacity-90">Management Panel</p>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4">
              <MenuItems setOpen={setOpen} />
            </div>
            <UserProfile setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      
      <aside className="hidden w-80 flex-col border-r bg-white shadow-sm lg:flex">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-3 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            <div className="p-2 bg-white/20 rounded-lg">
              <ChartNoAxesCombined size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">ShopCart Admin</h1>
              <p className="text-sm opacity-90">Management Panel</p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4">
            <MenuItems />
          </div>
          
          {/* User Profile */}
          <UserProfile />
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
