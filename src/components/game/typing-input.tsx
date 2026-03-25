"use client";

import { useRef, useEffect } from "react";

interface Props {
  targetName: string;
  onCorrect: () => void;
  disabled: boolean;
  cryUrl?: string;
}

export function TypingInput({ targetName, onCorrect, disabled, cryUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef(false);
  const targetRef = useRef(targetName);
  const onCorrectRef = useRef(onCorrect);
  const cryUrlRef = useRef(cryUrl);

  targetRef.current = targetName;
  onCorrectRef.current = onCorrect;
  cryUrlRef.current = cryUrl;

  // Clear input when target changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [targetName]);

  // Attach native event listeners
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const checkAnswer = () => {
      if (input.value === targetRef.current) {
        // Play cry directly in user gesture callback
        if (cryUrlRef.current) {
          const audio = new Audio(cryUrlRef.current);
          audio.volume = 0.4;
          audio.play().catch(() => {});
        }
        onCorrectRef.current();
        input.value = "";
      }
    };

    const onCompositionStart = () => {
      isComposingRef.current = true;
    };

    const onCompositionEnd = () => {
      isComposingRef.current = false;
      checkAnswer();
    };

    const onInput = () => {
      if (!isComposingRef.current) {
        checkAnswer();
      }
    };

    input.addEventListener("compositionstart", onCompositionStart);
    input.addEventListener("compositionend", onCompositionEnd);
    input.addEventListener("input", onInput);

    return () => {
      input.removeEventListener("compositionstart", onCompositionStart);
      input.removeEventListener("compositionend", onCompositionEnd);
      input.removeEventListener("input", onInput);
    };
  }, []);

  // Auto focus
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        autoFocus
        enterKeyHint="done"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="ポケモンの名前を入力..."
        className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4 text-center text-lg sm:text-xl font-medium
          shadow-sm transition-all duration-200
          focus:border-blue-400 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]
          disabled:bg-gray-50 disabled:text-gray-400
          placeholder:text-gray-300"
        style={{ fontSize: "16px" }}
      />
      <div className="pointer-events-none absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </div>
    </div>
  );
}
