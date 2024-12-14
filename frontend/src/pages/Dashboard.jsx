import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LuMoveRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout, clearAllUserErrors } from "@/store/slices/userSlice";
import MyProfile from "@/components/MyProfile";
import UpdateProfile from "@/components/UpdateProfile";
import UpdatePassword from "@/components/UpdatePassword";
import MyJobs from "@/components/MyJobs";
import JobPost from "@/components/JobPost";
import Applications from "@/components/Applications";
import MyApplications from "@/components/MyApplications";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const router = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const section = searchParams.get("section"); // Get the section query parameter

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    // Handle section change when URL query changes
    if (section) {
      setComponentName(section.replace("-", " ")); // Format section name (e.g., 'my-profile' -> 'My Profile')
    }

    // Redirect to home if not authenticated
    // if (!isAuthenticated) {
    //   router.push('/');
    // }
  }, [dispatch, error, loading, isAuthenticated, router, section]);

  const renderComponent = () => {
    switch (componentName) {
      case "My Profile":
        return <MyProfile />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      case "Job Post":
        return <JobPost />;
      case "My Jobs":
        return <MyJobs />;
      case "Applications":
        return <Applications />;
      case "My Applications":
        return <MyApplications />;
      default:
        return <MyProfile />;
    }
  };

  const menuItems = [
    { name: "My Profile", role: "all" },
    { name: "Update Profile", role: "all" },
    { name: "Update Password", role: "all" },
    { name: "Job Post", role: "Employer" },
    { name: "My Jobs", role: "Employer" },
    { name: "Applications", role: "Employer" },
    { name: "My Applications", role: "Job Seeker" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Welcome! <span className="font-semibold">{user && user.name}</span>
          </p>
        </CardHeader>
      </Card>

      <div className="flex flex-col md:flex-row gap-8">
        <Sheet open={show} onOpenChange={setShow}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4">
              <LuMoveRight className="mr-2 h-4 w-4" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
              <div className="flex flex-col space-y-2">
                {menuItems.map(
                  (item) =>
                    (item.role === "all" ||
                      (user && user.role === item.role)) && (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          setComponentName(item.name);
                          setShow(false);
                        }}
                      >
                        {item.name}
                      </Button>
                    )
                )}
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <Card className="w-64 hidden md:block">
          <CardHeader>
            <CardTitle>Manage Account</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="flex flex-col space-y-2">
                {menuItems.map(
                  (item) =>
                    (item.role === "all" ||
                      (user && user.role === item.role)) && (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className="justify-start"
                        onClick={() => setComponentName(item.name)}
                      >
                        {item.name}
                      </Button>
                    )
                )}
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-6">{renderComponent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
