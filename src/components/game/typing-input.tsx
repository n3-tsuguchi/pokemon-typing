"use client";

import { useRef, useEffect } from "react";

interface Props {
  targetName: string;
  onCorrect: () => void;
  disabled: boolean;
}

export function TypingInput({ targetName, onCorrect, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef(false);
  const targetRef = useRef(targetName);
  const onCorrectRef = useRef(onCorrect);

  targetRef.current = targetName;
  onCorrectRef.current = onCorrect;

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
    <input
      ref={inputRef}
      type="text"
      disabled={disabled}
      autoFocus
      placeholder="ポケモンの名前を入力..."
      className="w-full max-w-md rounded-lg border-2 border-gray-300 px-4 py-3 text-center text-xl
        focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
    />
  );
}
