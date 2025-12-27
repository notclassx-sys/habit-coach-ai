import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import fitoxLogo from '@/assets/fitox-logo.jpg';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Invalid or expired reset link');
        navigate('/auth');
      }
    };
    checkSession();
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    toast.success('Password updated successfully!');
    setIsLoading(false);
    
    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <img 
              src={fitoxLogo} 
              alt="FITOX Logo" 
              className="w-32 h-32 mx-auto rounded-2xl object-cover mb-4"
            />
          </div>

          <div className="glass-strong rounded-2xl p-6 border border-border/50 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-500/10 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Password Updated!</h2>
            <p className="text-muted-foreground">
              Your password has been successfully reset. Redirecting you to the app...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <img 
            src={fitoxLogo} 
            alt="FITOX Logo" 
            className="w-32 h-32 mx-auto rounded-2xl object-cover mb-4"
          />
          <p className="text-muted-foreground">Create a new password</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 border border-border/50">
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 bg-secondary/50"
                />
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-secondary/50"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 gap-2"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}