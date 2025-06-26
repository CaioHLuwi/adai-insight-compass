
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RegistrationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export function RegistrationSuccessModal({ 
  open, 
  onOpenChange, 
  onContinue 
}: RegistrationSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Conta criada com sucesso!
            </h2>
            <p className="text-sm text-muted-foreground">
              Bem-vindo à Otmizy.ai! Sua conta foi criada e você já pode começar a usar nossa plataforma.
            </p>
          </div>
          <Button 
            onClick={onContinue}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
          >
            Continuar para o Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
