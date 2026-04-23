import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hexagon, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  role: "user" | "provider";
  joinedAt: string;
  category?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user profile from localStorage or create default
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail") || "user@example.com";
    const userName = localStorage.getItem("userName") || "John Doe";
    const userPhone = localStorage.getItem("userPhone") || "";
    const userLocation = localStorage.getItem("userLocation") || "";
    const userBio = localStorage.getItem("userBio") || "";
    const userCategory = localStorage.getItem("userCategory") || "";

    const userProfile: UserProfile = {
      id: "current-user",
      name: userName,
      email: userEmail,
      phone: userPhone,
      location: userLocation,
      bio: userBio,
      role: (userRole as "user" | "provider") || "user",
      joinedAt: localStorage.getItem("joinedAt") || new Date().toISOString().split('T')[0],
      category: userCategory,
    };

    setProfile(userProfile);
    setFormData(userProfile);
  }, []);

  const handleSave = () => {
    if (!profile) return;

    // Save to localStorage
    localStorage.setItem("userName", formData.name || "");
    localStorage.setItem("userEmail", formData.email || "");
    localStorage.setItem("userPhone", formData.phone || "");
    localStorage.setItem("userLocation", formData.location || "");
    localStorage.setItem("userBio", formData.bio || "");
    if (formData.category) {
      localStorage.setItem("userCategory", formData.category);
    }

    setProfile({ ...profile, ...formData });
    setIsEditing(false);
    toast({ title: "Success", description: "Profile updated successfully!" });
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userLocation");
    localStorage.removeItem("userBio");
    localStorage.removeItem("userCategory");
    localStorage.removeItem("joinedAt");
    toast({ title: "Logged Out", description: "You have been logged out successfully." });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  if (!profile) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="card-elevated rounded-xl bg-card p-8">
        <div className="mb-6 text-center">
          <Hexagon className="mx-auto mb-3 h-12 w-12 text-accent" strokeWidth={2.5} />
          <h1 className="font-heading text-3xl font-bold text-foreground">My Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your account details</p>
        </div>

        <div className="space-y-6">
          {/* Profile Picture Placeholder */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-accent" />
            </div>
          </div>

          {/* User Info Header (Read-only properties) */}
          <div className="grid gap-4">
            {/* The Email is now editable below */}

            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Member since</p>
                <p className="font-medium">{new Date(profile.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{profile.role}</p>
              </div>
            </div>
          </div>
          {/* Editable Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.name}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.phone || "Not provided"}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your location"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.location || "Not provided"}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              ) : (
                <div className="p-3 bg-secondary/50 rounded-md">
                  <p className="text-sm">{profile.bio || "No bio provided"}</p>
                </div>
              )}
            </div>

            {profile.role === "provider" && (
              <div>
                <Label>Service Category</Label>
                {isEditing ? (
                  <Select
                    value={formData.category || ""}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your service category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="plumber">Plumber</SelectItem>
                      <SelectItem value="cleaner">Cleaner</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="carpenter">Carpenter</SelectItem>
                      <SelectItem value="painter">Painter</SelectItem>
                      <SelectItem value="gardener">Gardener</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-3 bg-secondary/50 rounded-md">
                    <p className="text-sm capitalize">{profile.category || "Not specified"}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">Cancel</Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)} className="flex-1">Edit Profile</Button>
                <Button variant="destructive" onClick={handleLogout} className="flex-1">Log out</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;