import { AlignJustify, LogOut, Search, UserCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  return (
    <header className="flex items-center gap-4 px-4 py-3 bg-background border-b">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="icon"
        className="lg:hidden"
      >
        <AlignJustify className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search products…"
          className="pl-9 pr-3 py-2 rounded-md"
        />
      </div>

      {/* Right content */}
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-primary/20 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground font-extrabold">
                {user?.userName ? user.userName[0].toUpperCase() : <UserCircle2 />}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>{user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>Dashboard</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;
