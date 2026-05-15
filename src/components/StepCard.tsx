"use client";

import { ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  hint?: string;
}

interface SingleSelectProps {
  type: "single";
  options: Option[];
  value: string | null;
  onChange: (v: string) => void;
}

interface MultiSelectProps {
  type: "multi";
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
}

type Props = {
  eyebrow: string;
  question: string;
  helper?: string;
  children?: ReactNode;
} & (SingleSelectProps | MultiSelectProps);

export default function StepCard(props: Props) {
  const { eyebrow, question, helper } = props;

  return (
    <div className="w-full">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-serif text-3xl leading-tight text-tayah-black md:text-4xl">
        {question}
      </h2>
      {helper && (
        <p className="mt-3 font-sans text-sm text-tayah-gray-700">{helper}</p>
      )}

      <div className="mt-10 space-y-3">
        {props.type === "single"
          ? props.options.map((opt) => (
              <RadioOption
                key={opt.value}
                option={opt}
                selected={props.value === opt.value}
                onSelect={() => props.onChange(opt.value)}
              />
            ))
          : props.options.map((opt) => {
              const checked = props.value.includes(opt.value);
              return (
                <CheckboxOption
                  key={opt.value}
                  option={opt}
                  checked={checked}
                  onToggle={() => {
                    if (checked) {
                      props.onChange(props.value.filter((v) => v !== opt.value));
                    } else {
                      props.onChange([...props.value, opt.value]);
                    }
                  }}
                />
              );
            })}
      </div>
    </div>
  );
}

function RadioOption({
  option,
  selected,
  onSelect,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-start gap-4 border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-tayah-red bg-tayah-red/5"
          : "border-tayah-gray-200 bg-white hover:border-tayah-red/40 hover:bg-tayah-cream/40"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected
            ? "border-tayah-red bg-tayah-red"
            : "border-tayah-gray-300 bg-white group-hover:border-tayah-red/60"
        }`}
        aria-hidden
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span className="flex-1">
        <span
          className={`block font-sans text-base ${
            selected ? "text-tayah-black" : "text-tayah-gray-900"
          }`}
        >
          {option.label}
        </span>
        {option.hint && (
          <span className="mt-1 block font-sans text-xs text-tayah-gray-700">
            {option.hint}
          </span>
        )}
      </span>
    </button>
  );
}

function CheckboxOption({
  option,
  checked,
  onToggle,
}: {
  option: Option;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group flex w-full items-start gap-4 border p-5 text-left transition-all duration-200 ${
        checked
          ? "border-tayah-red bg-tayah-red/5"
          : "border-tayah-gray-200 bg-white hover:border-tayah-red/40 hover:bg-tayah-cream/40"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors ${
          checked
            ? "border-tayah-red bg-tayah-red"
            : "border-tayah-gray-300 bg-white group-hover:border-tayah-red/60"
        }`}
        aria-hidden
      >
        {checked && (
          <svg
            viewBox="0 0 14 14"
            className="h-3 w-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="2,7 6,11 12,3" />
          </svg>
        )}
      </span>
      <span className="flex-1 font-sans text-base text-tayah-gray-900">
        {option.label}
      </span>
    </button>
  );
}
