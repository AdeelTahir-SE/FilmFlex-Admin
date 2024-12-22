"use client";

import { useState } from "react";
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
import { Bell, User, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/Settings/Account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message);
      } else {
        const errorData = await response.json();
        setError(`Failed to update profile: ${errorData.message || response.statusText}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePasswords = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/Settings/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setConfirmPassword("");
        setCurrentPassword("");
        setNewPassword("");
        setSuccess(data.message);
      } else {
        const errorData = await response.json();
        setError(`Failed to change password: ${errorData.message || response.statusText}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while changing the password.");
    } finally {
      setIsLoading(false);
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-gray-800 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="bg-gray-800 text-white"
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  {success && <p className="text-green-500">{success}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          
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
                 
                  <Separator />
                  <div>
                    <Label className="text-gray-300">Change Password</Label>
                    <div className="space-y-2">
                      <Input
                        type="password"
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-800 text-white"
                      />
                      <Input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-800 text-white"
                      />
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-800 text-white"
                      />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <Button
                      className="mt-2 bg-red-600 hover:bg-red-700"
                      onClick={handleChangePasswords}
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Password"}
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
