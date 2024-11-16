"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Bell, User, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <section className="min-h-full bg-black">
      <div className="container max-w-6xl mx-auto py-10 w-2/3 m-auto space-y-8 min-h-full text-white">
        <header className="space-y-2">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your account settings and preferences.
          </p>
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
                      <Input id="name" placeholder="John Doe" className="bg-gray-800 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input id="email" type="email" placeholder="email@example.com" className="bg-gray-800 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
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
                    <Switch defaultChecked />
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
                      <Input type="password" placeholder="Current password" className="bg-gray-800 text-white" />
                      <Input type="password" placeholder="New password" className="bg-gray-800 text-white" />
                      <Input type="password" placeholder="Confirm password" className="bg-gray-800 text-white" />
                    </div>
                    <Button className="mt-2 bg-red-600 hover:bg-red-700">Update Password</Button>
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
