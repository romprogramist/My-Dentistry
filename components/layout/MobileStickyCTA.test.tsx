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
});
