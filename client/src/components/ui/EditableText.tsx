import { cn } from "@/utils/lib";
import { HTMLAttributes, useEffect, useRef } from "react";

type Props = {
  onEdit?: (value: string) => void;
  onBlur?: (value: string) => void;
  value: string;
  placeholder?: string;
};

export default function EditableText({
  onEdit,
  value,
  onBlur,
  placeholder,
  ...props
}: Props & Omit<HTMLAttributes<HTMLDivElement>, "onBlur">) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef("text");
  useEffect(() => {
    if (!elementRef.current) return;
    ref.current = value;
    elementRef.current.textContent = ref.current || placeholder || "";
    if (ref.current) {
      elementRef.current.style.color = "white";
    } else {
      elementRef.current.style.color = "#737b97";
    }
  }, [value, placeholder]);

  return (
    <div
      {...props}
      ref={elementRef}
      className={cn(props.className)}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onFocus={() => {
        if (!elementRef.current) return;
        if (!ref.current) {
          elementRef.current.textContent = "";
        }
      }}
      onBlur={() => {
        if (onBlur) onBlur(ref.current);
        if (!elementRef.current) return;
        if (!ref.current) {
          elementRef.current.textContent = placeholder || "";
        }
      }}
      onKeyDown={(e) => {
        if (!elementRef.current) return;
        if (e.key === "Enter" || e.key === "Esc") {
          e.preventDefault();
          elementRef.current.blur();
          return;
        }
      }}
      onInput={(e) => {
        ref.current = e.currentTarget.textContent || "";
        if (onEdit) onEdit(e.currentTarget.textContent || "");
        if (!elementRef.current) return;
        if (ref.current) {
          elementRef.current.style.color = "white";
        } else {
          elementRef.current.style.color = "#737b97";
        }
      }}
    ></div>
  );
}
