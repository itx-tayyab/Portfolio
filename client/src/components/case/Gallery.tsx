"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { cn } from "@/lib/cn";

type GalleryProps = {
  title: string;
  images: ProjectImage[];
};

/**
 * Screenshot gallery: a large lead image and a grid of thumbnails. Every
 * image is a real <button> that opens a lightbox on the native modal
 * <dialog> (focus trap and Esc to close come with it). Inside the
 * lightbox, Left/Right arrows step through the images.
 */
export function Gallery({ title, images }: GalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const count = images.length;
  const current = images[index];

  function open(i: number, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setIndex(i);
    dialogRef.current?.showModal();
  }

  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  }

  const [lead, ...rest] = images;
  // Pick a column count the thumbnails fill evenly, so no row has an orphan.
  const threeCols = rest.length % 3 === 0;

  return (
    <>
      <ul className={cn("grid gap-3 sm:grid-cols-2", threeCols && "lg:grid-cols-3")}>
        {[lead, ...rest].map((img, i) => (
          <li key={img.src} className={cn(i === 0 && (threeCols ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-2"))}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group/shot block w-full overflow-hidden rounded-media bg-surface ring-1 ring-line transition-[box-shadow] duration-(--duration-ui) ease-out hover:ring-ink/30"
            >
              <span className="sr-only">
                Open screenshot {i + 1} of {count} in the viewer:{" "}
              </span>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes={i === 0 ? "(min-width: 1240px) 1192px, 100vw" : threeCols ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                priority={i === 0}
                className={cn(
                  "block w-full transition-transform duration-(--duration-media) ease-out group-hover/shot:scale-[1.01]",
                  i === 0 ? "h-auto" : "aspect-[16/10] object-cover object-left-top",
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} screenshots`}
        onKeyDown={onKeyDown}
        onClose={() => returnFocusRef.current?.focus()}
        className="modal-sheet on-dark m-0 h-dvh max-h-none w-full max-w-none bg-ink/95 p-0 text-white"
      >
        <div className="flex h-full flex-col px-4 pb-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <p className="text-label text-muted-dark" aria-live="polite">
              <span className="tabular-nums">
                {index + 1} / {count}
              </span>
              <span className="sr-only">: {current.alt}</span>
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/50 px-4 text-label font-medium"
            >
              <X aria-hidden="true" size={18} />
              Close
            </button>
          </div>

          <figure className="relative flex min-h-0 flex-1 flex-col">
            <div className="relative min-h-0 flex-1">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="animate-rise object-contain [animation-duration:200ms]"
              />
            </div>
            <figcaption className="mx-auto mt-4 max-w-[60ch] text-center text-label text-muted-dark">
              {current.alt}
            </figcaption>
          </figure>

          {count > 1 ? (
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="grid size-12 place-items-center rounded-full border border-current/50 transition-transform duration-(--duration-press) ease-out active:scale-[0.94]"
              >
                <ChevronLeft aria-hidden="true" size={20} />
                <span className="sr-only">Previous screenshot</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="grid size-12 place-items-center rounded-full border border-current/50 transition-transform duration-(--duration-press) ease-out active:scale-[0.94]"
              >
                <ChevronRight aria-hidden="true" size={20} />
                <span className="sr-only">Next screenshot</span>
              </button>
            </div>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
