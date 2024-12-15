import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LuMoveRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { clearAllUserErrors } from "@/store/slices/userSlice";
import MyProfile from "@/components/MyProfile";
import UpdateProfile from "@/components/UpdateProfile";
import UpdatePassword from "@/components/UpdatePassword";

export default function Account() {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const router = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const section = searchParams.get("section");

  

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (section) {
      const formattedSection = section
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
      setComponentName(formattedSection);
    }
  }, [dispatch, error, loading, isAuthenticated, router, section]);

  const renderComponent = () => {
    switch (componentName) {
      case "My Profile":
        return <MyProfile />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      default:
        return <MyProfile />;
    }
  };

  const menuItems = [
    { name: "My Profile", role: "all", query: "my-profile" },
    { name: "Update Profile", role: "all", query: "update-profile" },
    { name: "Update Password", role: "all", query: "update-password" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
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
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Card className="flex-1">
          <CardContent className="p-6">{renderComponent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
