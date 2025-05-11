
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
}

const PasswordGenerator: React.FC = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: "Senha copiada!",
        description: "A senha foi copiada para a área de transferência.",
        duration: 3000,
      });
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };

  const handleOptionChange = (
    option: keyof PasswordOptions,
    value: boolean | number
  ) => {
    setOptions({ ...options, [option]: value });
  };

  const generatePassword = (options: PasswordOptions): string => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const similarChars = "il1Lo0O";

    let validChars = "";
    if (options.uppercase) validChars += uppercaseChars;
    if (options.lowercase) validChars += lowercaseChars;
    if (options.numbers) validChars += numberChars;
    if (options.symbols) validChars += symbolChars;

    if (options.excludeSimilar) {
      for (const char of similarChars) {
        validChars = validChars.replace(char, "");
      }
    }

    // Ensure at least one character type is selected
    if (!validChars) {
      validChars = lowercaseChars;
    }

    let password = "";
    const length = Math.max(4, Math.min(64, options.length));

    // Generate random password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }

    return password;
  };

  // Generate password on component mount
  useEffect(() => {
    handleGeneratePassword();
  }, []);

  // Generate new password when options change
  useEffect(() => {
    handleGeneratePassword();
  }, [options]);

  return (
    <Card className="w-full max-w-xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Gerador de Senhas Seguras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Display */}
        <div className="space-y-2">
          <Label htmlFor="password">Senha Gerada</Label>
          <div className="flex">
            <div className="relative flex-1">
              <Input
                id="password"
                value={password}
                readOnly
                type={showPassword ? "text" : "password"}
                className="pr-10 font-mono text-lg"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleShowPassword}
                className="absolute right-10 top-0 h-full"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              onClick={handleCopyPassword}
              variant="outline"
              className="ml-2"
              aria-label="Copiar senha"
            >
              <Copy className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Copiar</span>
            </Button>
          </div>

          {/* Password Strength Indicator */}
          <PasswordStrengthIndicator password={password} />
        </div>

        {/* Password Length */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="length">Tamanho da Senha</Label>
            <span className="text-sm font-medium">{options.length} caracteres</span>
          </div>
          <Slider
            id="length"
            min={4}
            max={64}
            step={1}
            defaultValue={[options.length]}
            onValueChange={(value) => handleOptionChange("length", value[0])}
          />
        </div>

        {/* Character Types */}
        <div className="space-y-3">
          <h3 className="font-medium">Tipos de Caracteres</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) => handleOptionChange("uppercase", checked)}
              />
              <Label htmlFor="uppercase">Letras maiúsculas (A-Z)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked) => handleOptionChange("lowercase", checked)}
              />
              <Label htmlFor="lowercase">Letras minúsculas (a-z)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked) => handleOptionChange("numbers", checked)}
              />
              <Label htmlFor="numbers">Números (0-9)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked) => handleOptionChange("symbols", checked)}
              />
              <Label htmlFor="symbols">Símbolos especiais (!@#$...)</Label>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <h3 className="font-medium">Opções Adicionais</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="excludeSimilar"
              checked={options.excludeSimilar}
              onCheckedChange={(checked) => handleOptionChange("excludeSimilar", checked)}
            />
            <Label htmlFor="excludeSimilar">Evitar caracteres semelhantes (i, l, 1, L, o, 0, O)</Label>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGeneratePassword}
          className="w-full"
          size="lg"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Gerar Nova Senha
        </Button>

        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>Todas as senhas são geradas localmente no seu navegador.</p>
          <p>Nenhuma informação é enviada para servidores externos.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
