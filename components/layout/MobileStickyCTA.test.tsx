import { vi } from "vitest";
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => <a href={href} {...rest}>{children}</a>,
}));
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MobileStickyCTA } from "./MobileStickyCTA";

describe("MobileStickyCTA", () => {
  test("renders call and book links", () => {
    render(<MobileStickyCTA />);
    expect(screen.getByRole("link", { name: /позвонить/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /записаться/i })).toBeInTheDocument();
  });

  test("call link uses tel: protocol", () => {
    render(<MobileStickyCTA />);
    const call = screen.getByRole("link", { name: /позвонить/i });
    expect(call.getAttribute("href")).toMatch(/^tel:/);
  });

  test("book link points to /zapis/", () => {
    render(<MobileStickyCTA />);
    const book = screen.getByRole("link", { name: /записаться/i });
    expect(book).toHaveAttribute("href", "/zapis/");
  });

  test("container is hidden on md+ via responsive class", () => {
    const { container } = render(<MobileStickyCTA />);
    expect(container.firstChild).toHaveClass("md:hidden");
  });

  test("buttons receive flex-1 and min-h-11 utility classes via buttonVariants", () => {
    render(<MobileStickyCTA />);
    const call = screen.getByRole("link", { name: /позвонить/i });
    const book = screen.getByRole("link", { name: /записаться/i });
    expect(call.className).toMatch(/\bflex-1\b/);
    expect(call.className).toMatch(/\bmin-h-11\b/);
    expect(book.className).toMatch(/\bflex-1\b/);
    expect(book.className).toMatch(/\bmin-h-11\b/);
  });
});
