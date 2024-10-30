'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Wallet, CreditCard, Loader2, RefreshCw, Play, Pause } from 'lucide-react';
import { withAuth } from '@/components/auth/withAuth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  nftName: z.string().min(1, 'NFT name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  royalties: z.number().min(0).max(100, 'Royalties must be between 0 and 100'),
  category: z.string().min(1, 'Category is required'),
  duration: z.string().min(1, 'Duration is required'),
  language: z.string().min(1, 'Language is required'),
  voiceType: z.string().min(1, 'Voice type is required'),
});

type FormData = z.infer<typeof formSchema>;

const CreateNFT = () => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: 'entertainment',
      duration: 'short',
      language: 'english',
      voiceType: 'natural',
    },
  });

  useEffect(() => {
    // Retrieve voice data from sessionStorage
    const voiceData = sessionStorage.getItem('voiceNFTData');
    if (voiceData) {
      const { audioUrl: storedAudioUrl } = JSON.parse(voiceData);
      setAudioUrl(storedAudioUrl);
      const audio = new Audio(storedAudioUrl);
      setAudioElement(audio);
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement NFT creation with voice data
      console.log('Creating NFT with data:', data);
      toast.success('NFT created successfully!');
      sessionStorage.removeItem('voiceNFTData');
      router.push('/profile/collection');
    } catch (error) {
      console.error('Error creating NFT:', error);
      toast.error('Failed to create NFT. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Voice NFT</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Voice Recording</CardTitle>
              </CardHeader>
              <CardContent>
                {audioUrl ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={togglePlay}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                    </div>
                    <p className="text-center text-sm">Your voice recording is ready</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No voice recording found. Please record your voice first.</p>
                    <Button
                      type="button"
                      onClick={() => router.push('/voice-capture')}
                      className="mt-4"
                    >
                      Go to Voice Capture
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NFT Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nftName">NFT Name</Label>
                    <Controller
                      name="nftName"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                    {errors.nftName && <p className="text-red-500">{errors.nftName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => <Textarea {...field} />}
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Voice Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Controller
                      name="duration"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short (0-30s)</SelectItem>
                            <SelectItem value="medium">Medium (30s-2m)</SelectItem>
                            <SelectItem value="long">Long (2m+)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Controller
                      name="language"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="voiceType">Voice Type</Label>
                    <Controller
                      name="voiceType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select voice type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="natural">Natural</SelectItem>
                            <SelectItem value="processed">Processed</SelectItem>
                            <SelectItem value="character">Character</SelectItem>
                            <SelectItem value="singing">Singing</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price (ETH)</Label>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      )}
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="royalties">Royalties (%)</Label>
                    <Controller
                      name="royalties"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="0.1"
                          max="100"
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      )}
                    />
                    {errors.royalties && <p className="text-red-500">{errors.royalties.message}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={!audioUrl}>
                  Create NFT
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withAuth(CreateNFT);