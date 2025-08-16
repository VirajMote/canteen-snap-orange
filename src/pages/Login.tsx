import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rollNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter your roll number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login(rollNumber);
      toast({
        title: "Success",
        description: "Login successful!"
      });
      navigate('/home');
    } catch (error) {
      toast({
        title: "Error", 
        description: "Invalid roll number. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">College Canteen</CardTitle>
          <CardDescription>Enter your roll number to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Student Roll Number</Label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center mb-2">Demo Roll Numbers:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>12345 - Sushil Ashok Pote</div>
              <div>67890 - Rahul Sharma</div>
              <div>11111 - Priya Patel</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;