'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/hooks/use-toast';

export default function ProfileForm() {
  const { user, updateProfile, uploadAvatar } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    email: user?.email || '',
    preferences: user?.preferences || {
      theme: 'system' as const,
      notifications: true,
      privacy: 'public' as const,
    },
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const avatarUrl = await uploadAvatar(file);
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload profile picture.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(formData);
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user?.name?.charAt(0) || user?.address?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <Label htmlFor="avatar" className="cursor-pointer">
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              disabled={isLoading}
            />
            <Button type="button" variant="outline">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.upload className="mr-2 h-4 w-4" />
              )}
              Change Picture
            </Button>
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <Label>Theme Preference</Label>
          <Select
            value={formData.preferences.theme}
            onValueChange={(theme: 'light' | 'dark' | 'system') =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, theme },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="notifications"
            checked={formData.preferences.notifications}
            onCheckedChange={(notifications) =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, notifications },
              })
            }
          />
          <Label htmlFor="notifications">Enable Notifications</Label>
        </div>

        <div>
          <Label>Privacy Setting</Label>
          <Select
            value={formData.preferences.privacy}
            onValueChange={(privacy: 'public' | 'private') =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, privacy },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select privacy setting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.save className="mr-2 h-4 w-4" />
        )}
        Save Changes
      </Button>
    </form>
  );
}