import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface SelectLanguageProps {
  currentLanguage: any;
  onChange: (lng: any) => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
];

const SelectLanguage: React.FC<SelectLanguageProps> = ({
  currentLanguage,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <Select onValueChange={onChange} defaultValue={currentLanguage}>
      <SelectTrigger className="w-[180px] text-[var(--headline)]">
        <SelectValue placeholder={t("SelectLanguage")} />
      </SelectTrigger>
      <SelectContent className="bg-[var(--card-background)]">
        <SelectGroup>
          {languages.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className="text-[var(--headline)]"
            >
              {t(language.name)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
