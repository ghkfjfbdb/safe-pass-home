
import React, { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { X, Check } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "bg-muted" };

    // Check length
    const lengthScore = Math.min(Math.floor(password.length / 8), 3);

    // Check character variety
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const varietyScore =
      (hasLowercase ? 1 : 0) +
      (hasUppercase ? 1 : 0) +
      (hasNumber ? 1 : 0) +
      (hasSpecial ? 1 : 0);

    // Final score (0-10)
    const finalScore = Math.min(lengthScore * 2 + varietyScore, 10);

    // Map score to strength label and color
    if (finalScore < 4) {
      return {
        score: finalScore * 10,
        label: "Fraca",
        color: "bg-weak",
        criteria: {
          length: password.length >= 8,
          uppercase: hasUppercase,
          lowercase: hasLowercase,
          numbers: hasNumber,
          special: hasSpecial,
        },
      };
    } else if (finalScore < 7) {
      return {
        score: finalScore * 10,
        label: "Média",
        color: "bg-warning",
        criteria: {
          length: password.length >= 8,
          uppercase: hasUppercase,
          lowercase: hasLowercase,
          numbers: hasNumber,
          special: hasSpecial,
        },
      };
    } else {
      return {
        score: finalScore * 10,
        label: "Forte",
        color: "bg-success",
        criteria: {
          length: password.length >= 8,
          uppercase: hasUppercase,
          lowercase: hasLowercase,
          numbers: hasNumber,
          special: hasSpecial,
        },
      };
    }
  }, [password]);

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">Força da Senha:</span>
        <span
          className={`text-sm font-medium ${
            strength.label === "Fraca"
              ? "text-weak"
              : strength.label === "Média"
              ? "text-warning"
              : "text-success"
          }`}
        >
          {strength.label}
        </span>
      </div>

      <Progress value={strength.score} className={strength.color} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs">
        <div className="flex items-center">
          {strength.criteria?.length ? (
            <Check className="h-3 w-3 mr-1.5 text-success" />
          ) : (
            <X className="h-3 w-3 mr-1.5 text-weak" />
          )}
          <span>Mínimo 8 caracteres</span>
        </div>
        <div className="flex items-center">
          {strength.criteria?.uppercase ? (
            <Check className="h-3 w-3 mr-1.5 text-success" />
          ) : (
            <X className="h-3 w-3 mr-1.5 text-weak" />
          )}
          <span>Letra maiúscula</span>
        </div>
        <div className="flex items-center">
          {strength.criteria?.lowercase ? (
            <Check className="h-3 w-3 mr-1.5 text-success" />
          ) : (
            <X className="h-3 w-3 mr-1.5 text-weak" />
          )}
          <span>Letra minúscula</span>
        </div>
        <div className="flex items-center">
          {strength.criteria?.numbers ? (
            <Check className="h-3 w-3 mr-1.5 text-success" />
          ) : (
            <X className="h-3 w-3 mr-1.5 text-weak" />
          )}
          <span>Número</span>
        </div>
        <div className="flex items-center">
          {strength.criteria?.special ? (
            <Check className="h-3 w-3 mr-1.5 text-success" />
          ) : (
            <X className="h-3 w-3 mr-1.5 text-weak" />
          )}
          <span>Caractere especial</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
