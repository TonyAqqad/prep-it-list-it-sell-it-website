"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, MouseEvent, ReactNode } from "react";

interface HashLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function HashLink({ href, children, className, onClick }: HashLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Only handle hash links to home page
      if (!href.startsWith("/#")) {
        onClick?.();
        return;
      }

      const hash = href.slice(1); // Remove leading "/"
      const targetId = hash.slice(1); // Remove "#"

      // If already on home page, just scroll
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        onClick?.();
        return;
      }

      // If on different page, navigate then scroll
      e.preventDefault();
      router.push("/");

      // Wait for navigation, then scroll
      const checkAndScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // Retry if element not found yet
          setTimeout(checkAndScroll, 100);
        }
      };

      setTimeout(checkAndScroll, 150);
      onClick?.();
    },
    [href, pathname, router, onClick]
  );

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
