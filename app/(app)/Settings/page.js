"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,"use client";

  import { useState, useEffect } from "react";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { Bell, User, Shield } from "lucide-react";
  import { Switch } from "@/components/ui/switch";
  
  export default function SettingsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    // Assume logged-in admin's email
    const adminEmail = "admin@example.com"; // Replace with auth logic
  
    // Fetch Admin Details on Load
    useEffect(() => {
      async function fetchAdminData() {
        try {
          const response = await fetch(`/api/settings?type=account&userId=${adminEmail}`);
          const accountData = await response.json();
  
          const notificationResponse = await fetch(`/api/settings?type=notifications&userId=${adminEmail}`);
          const notificationData = await notificationResponse.json();
  
          setName(accountData.name);
          setEmail(accountData.email);
          setNotificationsEnabled(notificationData.notifications_enabled);
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      }
      fetchAdminData();
    }, [adminEmail]);
  
    // Handle Account Update
    const handleAccountUpdate = async () => {
      const response = await fetch(`/api/settings?type=account`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
  
      if (response.ok) {
        alert("Account updated successfully!");
      } else {
        alert("Error updating account.");
      }
    };
  
    // Handle Notifications Update
    const handleNotificationsUpdate = async () => {
      const response = await fetch(`/api/settings?type=notifications`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationsEnabled, email }),
      });
  
      if (response.ok) {
        alert("Notification preferences updated!");
      } else {
        alert("Error updating notifications.");
      }
    };
  
    // Handle Password Change
    const handlePasswordChange = async () => {
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      const response = await fetch(`/api/settings?type=security`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, email }),
      });
  
      if (response.ok) {
        alert("Password updated successfully!");
      } else {
        alert("Error updating password.");
      }
    };
  
    return (
      <section className="min-h-screen bg-black">
        <div className="container max-w-6xl mx-auto py-10 text-white">
          <header>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-b from-red-500 via-red-700 to-black text-transparent bg-clip-text">
              Settings
            </h1>
            <p className="text-gray-400">Manage your account settings and preferences.</p>
          </header>
  
          <Tabs defaultValue="account">
            <TabsList className="bg-red-700 p-1 rounded-lg">
              <TabsTrigger value="account"><User className="mr-2" />Account</TabsTrigger>
              <TabsTrigger value="notifications"><Bell className="mr-2" />Notifications</TabsTrigger>
              <TabsTrigger value="security"><Shield className="mr-2" />Security</TabsTrigger>
            </TabsList>
  
            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAccountUpdate}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
  
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
                <CardContent>
                  <Label>Email Notifications</Label>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleNotificationsUpdate}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
  
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
                <CardContent>
                  <Input placeholder="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                  <Input placeholder="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <Input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </CardContent>
                <CardFooter>
                  <Button onClick={handlePasswordChange}>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    );
  }
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Bell, User, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  // State for account settings
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle update for Account information
  const handleAccountUpdate = async () => {
    const response = await fetch("/api/settings?type=account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      alert("Account updated successfully");
    } else {
      alert("Error updating account");
    }
  };

  // Handle update for Notification preferences
  const handleNotificationsUpdate = async () => {
    const response = await fetch("/api/settings?type=notifications", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationsEnabled }),
    });

    if (response.ok) {
      alert("Notification preferences updated successfully");
    } else {
      alert("Error updating notification preferences");
    }
  };

  // Handle update for Security settings (password change)
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("/api/settings?type=security", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (response.ok) {
      alert("Password updated successfully");
    } else {
      alert("Error updating password");
    }
  };

  return (
    <section className="min-h-screen bg-black">
      <div className="container max-w-6xl mx-auto py-10 w-2/3 m-auto space-y-8 min-h-full text-white">
        <header className="space-y-2">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
            Settings
          </h1>
          <p className="text-gray-400">Manage your account settings and preferences.</p>
        </header>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-red-700 p-1 rounded-lg">
            <TabsTrigger value="account" className="text-white">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-white">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="text-white">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-gray-800 text-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="bg-gray-800 text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleAccountUpdate}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose your notification settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive updates via email.</p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Browser Notifications</Label>
                      <p className="text-sm text-gray-400">Get notified in your browser.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleNotificationsUpdate}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Two-Factor Authentication</Label>
                    <Switch />
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-gray-300">Change Password</Label>
                    <div className="space-y-2">
                      <Input
                        type="password"
                        placeholder="Current password"
                        className="bg-gray-800 text-white"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <Input
                        type="password"
                        placeholder="New password"
                        className="bg-gray-800 text-white"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        className="bg-gray-800 text-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button className="mt-2 bg-red-600 hover:bg-red-700" onClick={handlePasswordChange}>
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
